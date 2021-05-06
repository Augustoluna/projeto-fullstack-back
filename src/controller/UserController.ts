import { Request, Response } from "express"
import { UserDatabase } from "../data/UserDatabase"
import { UserBusiness } from "../business/UserBusiness"


export class UserController {

    async create(req: Request, res: Response){

        const userBusiness = new UserBusiness();

        try {

            const name: string = req.body.name;
            const email: string = req.body.email;
            const nickname: string = req.body.nickname;
            const password: string = req.body.password; 

            const token: string = await userBusiness.create(name, email, nickname, password)
            res.status(200).send({token: token})
            
        } catch (error) {
            res.status(400).send({message: error.message})
        }

    }

}