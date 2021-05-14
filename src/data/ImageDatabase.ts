import { DuplicateEntryError } from "../errors/DuplicateEntryError"
import { BaseDatabase } from "./BaseDatabase"

export class ImageDatabase extends BaseDatabase {

    private static TABLE_NAME = "PROJFULL_IMAGE"

    async create(id:string,
        subtitle:string,
        author:string,
        date:string,
        file:string,
        tags:string,
        collection:string): Promise<void> {

            try {
                await this.getConnection()
                .insert({
                    id,
                    subtitle,
                    author,
                    date,
                    file,
                    tags,
                    collection
                }).into(ImageDatabase.TABLE_NAME)
                
            } catch (error) {
                if(error.code === 1062){
                    throw new DuplicateEntryError()
                }
                throw new Error(error.sqlMessage || error.message)
            }
        }
}