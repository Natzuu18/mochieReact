import { Document,DocumentInput } from "../entities/document.type";

export interface DocumentRepository{
    insertDocument(
        file: DocumentInput[],
    ):Promise<void>


}
