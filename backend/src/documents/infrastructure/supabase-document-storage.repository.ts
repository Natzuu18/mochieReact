import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { StorageUrlReturn } from '../domain/entities/document.type';
import { DocumentStorageRepository } from '../domain/repositories/storageService.repository';

@Injectable()
export class SupabaseDocumentStorageRepository
  implements DocumentStorageRepository {
  constructor(
    @Inject('SUPABASE')
    private readonly supabase: any,
  ) {}

  async upload(blob: Blob, name: string): Promise<StorageUrlReturn> {
    try {
      const safeName = name.replace(/\s+/g, '_');
      const filePath = `documents/${Date.now()}_${safeName}`;

      const { error } = await this.supabase.storage
        .from('documents')
        .upload(filePath, blob, {
          upsert: false,
          contentType: blob.type || 'application/octet-stream',
        });

      if (error) {
        throw new BadRequestException(error.message);
      }

      const { data } = this.supabase.storage.from('documents').getPublicUrl(filePath);

      return {
        storageUrl: data.publicUrl,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message || 'Failed to upload file to storage');
    }
  }
}
