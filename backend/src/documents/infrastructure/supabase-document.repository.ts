import { Inject,Injectable,BadRequestException} from "@nestjs/common";
import { DocumentRepository } from "../domain/repositories/document.repository";
import { DocumentInput } from "../domain/entities/document.type";

@Injectable()
export class SupabaseDocumentRepository
    implements DocumentRepository{
        constructor(
            @Inject('SUPABASE')
            private readonly supabase:any
        ){}

        async insertDocument(files: DocumentInput[]): Promise<string[]> {
            let uploadedBy: string | undefined;

            try {
                const { data: { user }, error: authError } = await this.supabase.auth.getUser();

                if (!authError && user?.id) {
                    uploadedBy = user.id;
                }
            } catch {
                uploadedBy = undefined;
            }

            const payload = files.map((file) => ({
                filename: file.name,
                rows_imported : file.row_size,
                storage_url : file.storage_url,
                ...(uploadedBy || file.uploaded_by ? { uploaded_by: uploadedBy ?? file.uploaded_by } : {}),
            }));

            const {data, error } = await this.supabase
                .from('excel_imports')
                .insert(payload)
                .select('import_id');
   
             

            if (error) {
                throw new BadRequestException(error.message);
            }

           return (data ?? []).map((row: { import_id: string }) => row.import_id);
        
        }
    }