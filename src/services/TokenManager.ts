import * as jwt from "jsonwebtoken"

export class TokenManager {
    generate(id: string): string{
        return jwt.sign({
            id: id
        },
        "Augusto",
        {expiresIn: "1d"})
    }

    get(token: string): object{
        const payload = jwt.verify(token, "Augusto")
        return payload as object
    }