export interface DocumentStorageRepository{
    upload(
        blob:Blob,
        name:string,
    ):Promise<string>
}