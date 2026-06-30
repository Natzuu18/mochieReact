import { Inject, Injectable } from '@nestjs/common';
import type { DocumentRepository } from '../domain/repositories/document.repository';
import type { DocumentStorageRepository } from '../domain/repositories/storageService.repository';
import { InsertDocumentInput, InsertMultipleDocumentsInput } from './inputs/insert-document.input';
import { InsertStudentUsecase } from 'src/students/application/insert-student.usecase';
import * as XLSX from 'xlsx';
import type { student } from 'src/students/domain/entities/student.type';

@Injectable()
export class InsertDocumentUseCase {
  constructor(
    @Inject('DocumentRepository') private readonly documentRepository: DocumentRepository,
    @Inject('DocumentStorageRepository') private readonly documentStorageRepository: DocumentStorageRepository,
    private readonly insertStudentUsecase: InsertStudentUsecase,
  ) {}

  async execute(input: InsertDocumentInput): Promise<void> {
    try {
      const insertData = await this.documentStorageRepository.upload(
        input.blob, 
        input.name
    );

      const fileBuffer = Buffer.from(await input.blob.arrayBuffer());
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json<student>(sheet);
      
      const importIds = await this.documentRepository.insertDocument([
        {
          name: input.name,
          row_size: rows.length,
          storage_url: insertData.storageUrl,
          uploaded_by: input.uploaded_by,
        },
      ]);

      const normalizedRows = rows.map((row: any) => ({
        student_number: row["Student Number"],
        lastname: row["Last Name"],
        firstname: row["First Name"],
        middlename: row["Middle Name"],
        sex: row["Sex"],
        birthdate: row["Birthdate"],
        course: row["Course"],
        year_level: row["Year Level"],
        section: row["Section"],
        email: row["Email"],
        address: row["Address"],
        contact_number: row["Contact Number"],
        import_id : importIds
      }));

      await this.insertStudentUsecase.execute(normalizedRows);


    } catch (error: any) {
      throw new Error(`Failed to process document: ${error.message}`);
    }
  }

  async executeMultiple(input: InsertMultipleDocumentsInput): Promise<void> {
    try {
      const documentRecords = [];
      const allStudents = [];

      // Process each file
      for (const file of input.files) {
        // Upload file to storage
        const insertData = await this.documentStorageRepository.upload(
          file.blob,
          file.name
        );

        // Read and parse Excel file
        const fileBuffer = Buffer.from(await file.blob.arrayBuffer());
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<student>(sheet);

        // Collect document record for batch insert
        documentRecords.push({
          name: file.name,
          row_size: rows.length,
          storage_url: insertData.storageUrl,
          uploaded_by: input.uploaded_by,
        });

        // Store rows for later processing
        allStudents.push({ rows, fileName: file.name });
      }

      // Insert all documents at once
      const importIds = await this.documentRepository.insertDocument(documentRecords);

      // Normalize and prepare all student records
      const normalizedAllRows = allStudents.flatMap((studentData, index) =>
        studentData.rows.map((row: any) => ({
          student_number: row["Student Number"],
          lastname: row["Last Name"],
          firstname: row["First Name"],
          middlename: row["Middle Name"],
          sex: row["Sex"],
          birthdate: row["Birthdate"],
          course: row["Course"],
          year_level: row["Year Level"],
          section: row["Section"],
          email: row["Email"],
          address: row["Address"],
          contact_number: row["Contact Number"],
          import_id: importIds[index],
        }))
      );

      // Insert all students at once
      await this.insertStudentUsecase.execute(normalizedAllRows);

    } catch (error: any) {
      throw new Error(`Failed to process multiple documents: ${error.message}`);
    }
  }
}