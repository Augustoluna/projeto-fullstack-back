import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase{

    private static TABLE_NAME = "PROJFULL_USER"
    
    async create(id:string,
        name:string,
        email:string,
        nickname:string,
        password:string){

            try {
                await this.getConnection()
                .insert({
                    id,
                    name,
                    email,
                    nickname,
                    password
                }).into(UserDatabase.TABLE_NAME)
                
            } catch (error) {
                throw new Error(error.sqlMessage || error.message)
            }
        }

}