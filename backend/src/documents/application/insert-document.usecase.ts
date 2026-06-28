import { Inject,Injectable } from "@nestjs/common";
import type { DocumentRepository } from "../domain/repositories/document.repository";
import type { DocumentStorageRepository } from "../domain/repositories/storageService.repository";
import { InsertDocumentInput } from "./inputs/insert-document.input";
import type { StudentRepository } from "src/students/domain/repositories/student.repository";


@Injectable()
export class InsertDocumentUseCase{
    constructor(
        @Inject('DocumentRepository') private readonly documentRepository : DocumentRepository,
        @Inject('DocumentStorageRepository') private readonly documentStorageRepository : DocumentStorageRepository,
        @Inject('StudentRepository') private readonly studentRepository: StudentRepository,
    ){}

    async execute(input:InsertDocumentInput){
        
        const insertData = await this.documentStorageRepository.upload(
            input.blob,
            input.name,           
        );

        
    }
}