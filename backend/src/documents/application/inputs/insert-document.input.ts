export interface InsertDocumentInput {
  name: string;
  blob: Blob;
  size: number;
  uploaded_by?: string;
}

export interface InsertMultipleDocumentsInput {
  files: Array<{
    name: string;
    blob: Blob;
    size: number;
  }>;
  uploaded_by?: string;
}