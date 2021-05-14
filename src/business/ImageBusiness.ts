import { ImageDatabase } from "../data/ImageDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class ImageBusiness {

    async create(subtitle: string, author: string, date: string, file: string, tags: string, collection: string, token: string){
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
            
        }
    }
}

