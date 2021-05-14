export class CustomError extends Error {

    constructor(message: string, public error: number){
        super(message)
        this.error = 400
    }
}