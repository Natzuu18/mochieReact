export interface Document{
    id:string;
    fileName:string;
    documentOwner:string;
    uploadDate:string;
    status:string;
    rowsHandled:string;
}

export interface DocumentInput {
  name: string;
  row_size: number;
  storage_url:string;
  uploaded_by?: string;
}

export interface StorageUrlReturn{
  storageUrl:string;
}