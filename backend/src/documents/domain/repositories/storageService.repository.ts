import { StorageUrlReturn } from "../entities/document.type";

export interface DocumentStorageRepository{
    upload(
        blob:Blob,
        name:string,
    ):Promise<StorageUrlReturn>
}