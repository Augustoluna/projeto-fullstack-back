import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {

    async create(name: string, 
        email: string, 
        nickname: string, 
        password: string): Promise<string>{

            try {
                const idGenerator = new IdGenerator()
                const hashManager = new HashManager()
                const tokenManager = new TokenManager()
                const userDatabase = new UserDatabase()

                const id = idGenerator.generate()
                const hashPassword = await hashManager.hash(password)

                if(!name || !password || !email || !nickname){
                    throw new Error("All fields must be filled.")
                }

                if(email.indexOf("@") === -1){
                    throw new Error("Invalid Email")
                }

                if(password.length < 6){
                    throw new Error("Password must be at least 6 characters")
                }

                await userDatabase.create(id, name, email, nickname, hashPassword)

                const token = tokenManager.generate(id)
                
                return token

                } catch (error) {
                throw new Error("Erro ao criar: "+ error.message)
            }

            
    }

}