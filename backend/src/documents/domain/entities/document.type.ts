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
  size: number;
  mimeType: string;
  blob: Blob;
}