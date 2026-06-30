import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InsertDocumentUseCase } from '../application/insert-document.usecase';

@Controller('documents')
export class DocumentController {
  constructor(private readonly insertDocumentUseCase: InsertDocumentUseCase) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files?.length) {
      return { message: 'No files uploaded' };
    }

    await Promise.all(
      files.map((file) =>
        this.insertDocumentUseCase.execute({
          name: file.originalname,
          blob: new Blob([new Uint8Array(file.buffer)]),
          size: file.size,
        }),
      ),  
    );

    return { message: 'Files uploaded' };
  }
}
