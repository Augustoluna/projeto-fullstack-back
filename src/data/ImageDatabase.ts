import { DuplicateEntryError } from "../errors/DuplicateEntryError"
import { image } from "../model/Image"
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
                if(error.errno === 1062){
                    throw new DuplicateEntryError()
                }
                throw new Error(error.sqlMessage || error.message)
            }
        }

        async get(): Promise<image[]> {
            try {
                
                const result = await this.getConnection()
                .select("*")
                .from(ImageDatabase.TABLE_NAME)

                const images: image[] = []

                for(let img of result){
                    images.push({id: img.id, subtitle: img.subtitle, author: img.author, date: img.date, file: img.file, tags: img.tags, collection: img.collection})
                }

                return images

            } catch (error) {
                throw new Error("Error searching for images: " + error.sqlMessage)
            }
        }
}