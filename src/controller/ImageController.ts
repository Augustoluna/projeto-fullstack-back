import { Request, Response } from "express"
import { ImageBusiness } from "../business/ImageBusiness"

export class ImageController {

    async create(req: Request, res: Response){
        
        try {

            const subtitle: string = req.body.subtitle
            const author: string = req.body.author
            const date: string = req.body.date
            const file: string = req.body.file
            const tags: string = req.body.tags
            const collection: string = req.body.collection
            const token = req.headers.authorization as string

            const imageBusiness = new ImageBusiness()

            await imageBusiness.create(subtitle, author, date, file, tags, collection, token)
            res.status(200).send({message: "Image successfully created"})
            
        } catch (error) {
            res.status(error.code || 400).send({ message: error.message })
        }

    }

    async get (req: Request, res: Response){
        try {
            const token = req.headers.authorization as string 
            const imageBusiness = new ImageBusiness()
            const images = await imageBusiness.get(token)

            res.status(200).send({images})

        } catch (error) {
            res.status(error.code || 400).send({ message: error.message })
        }
    }
}