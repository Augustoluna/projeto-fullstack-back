import { ImageDatabase } from "../data/ImageDatabase";
import { CustomError } from "../errors/CustomError";
import { image } from "../model/Image";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class ImageBusiness {

    async create(subtitle: string, author: string, date: string, file: string, tags: string, collection: string, token: string): Promise<void>{
        try {
            if(!subtitle || !author || !date || !file){
                throw new Error("Invalid entry. Please fill the fields.")
            }
            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const tokenManager = new TokenManager()
            const verifiedToken = tokenManager.get(token)

            if(!verifiedToken){
                throw new Error("Please log in")
            }

            const imageDatabase = new ImageDatabase()

            await imageDatabase.create(id, subtitle, author, date, file, tags, collection)

        } catch (error) {
            throw new CustomError(error.message, error.code)
        }
    }

    async get(token: string): Promise<image[]> {

        const tokenManager = new TokenManager()
        const verifiedToken = tokenManager.get(token)

        if(!verifiedToken){
            throw new Error("Please log in")
        }

        const imageDatabase = new ImageDatabase()
        const images: image[] = await imageDatabase.get()

        return images

        try {
            
        } catch (error) {
            throw new CustomError(error.message, error.code)
        }
    }
}

