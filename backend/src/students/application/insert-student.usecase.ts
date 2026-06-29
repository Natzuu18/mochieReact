import { Inject, Injectable } from '@nestjs/common';
import type { StudentRepository } from '../domain/repositories/student.repository';
import type { student } from '../domain/entities/student.type';

@Injectable()
export class InsertStudentUsecase {
  constructor(
    @Inject('StudentRepository') private readonly studentRepository: StudentRepository,
  ) {}

  async execute(rows: student[]): Promise<void> {
    if (!rows?.length) {
      return;
    }

    await this.studentRepository.insertExtractStudent(rows);
  }
}