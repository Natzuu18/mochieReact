import { student } from "../entities/student.type";

export interface StudentRepository{
    insertExtractStudent(
        student:student,
    ):Promise<void>
}