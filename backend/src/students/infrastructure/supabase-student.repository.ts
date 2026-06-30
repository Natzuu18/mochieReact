import { Inject,Injectable,BadRequestException } from "@nestjs/common";
import { StudentRepository } from "../domain/repositories/student.repository";
import { insertStudent } from "../domain/entities/student.type";

@Injectable()
export class SupabaseStudentRepository
    implements StudentRepository{
        constructor(
            @Inject('SUPABASE')
            private readonly supabase:any
        ){}

        async insertExtractedStudent(student: insertStudent[]): Promise<void> {
            
        }
    }