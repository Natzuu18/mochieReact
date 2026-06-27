export interface DocumentStorageService{
    upload(
        blob:Blob,
        name:string,
    ):Promise<string>
}