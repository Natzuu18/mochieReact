    // import { Test, TestingModule } from '@nestjs/testing';
    // import { DocumentController } from './document.controller';
    // import { InsertDocumentUseCase } from '../application/insert-document.usecase';

    // describe('DocumentController', () => {
    // it('passes uploaded files to the use case', async () => {
    //     const execute = jest.fn().mockResolvedValue(undefined);

    //     const module: TestingModule = await Test.createTestingModule({
    //     controllers: [DocumentController],
    //     providers: [
    //         {
    //         provide: InsertDocumentUseCase,
    //         useValue: { execute },
    //         },
    //     ],
    //     }).compile();

    //     const controller = module.get(DocumentController);
    //     const uploadedFile = {
    //     originalname: 'sample.pdf',
    //     buffer: Buffer.from('hello world'),
    //     size: 11,
    //     } as Express.Multer.File;

    //     await controller.upload([uploadedFile]);

    //     expect(execute).toHaveBeenCalledWith({
    //     name: 'sample.pdf',
    //     blob: expect.any(Blob),
    //     size: 11,
    //     });
    // });
    // });
