import { insertStudent } from "../entities/student.type";

export interface StudentRepository{
    insertExtractedStudent(
        student:insertStudent[],
    ):Promise<void>
}