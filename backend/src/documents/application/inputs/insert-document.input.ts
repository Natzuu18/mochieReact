export interface InsertDocumentInput{
    name:string;
    blob:Blob;
    size: number;
    uploaded_by?: string;
}