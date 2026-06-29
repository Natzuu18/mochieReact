import { Inject, Injectable } from '@nestjs/common';
import type { DocumentRepository } from '../domain/repositories/document.repository';
import type { DocumentStorageRepository } from '../domain/repositories/storageService.repository';
import { InsertDocumentInput } from './inputs/insert-document.input';
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
      

      const normalizedRows = rows.map((row) => ({
        student_id: row.student_id,
        student_number: row.student_number,
        firstname: row.firstname,
        middlename: row.middlename,
        lastname: row.lastname,
        sex: row.sex,
        birthdate: row.birthdate,
        course: row.course,
        year_level: row.year_level,
        section: row.section,
        email: row.email,
        address: row.address,
        contact_number: row.contact_number,
      }));

      await this.insertStudentUsecase.execute(normalizedRows);

      await this.documentRepository.insertDocument([
        {
          name: input.name,
          row_size: rows.length,
          storage_url: insertData.storageUrl,
          uploaded_by: input.uploaded_by,
        },
      ]);
    } catch (error: any) {
      throw new Error(`Failed to process document: ${error.message}`);
    }
  }
}