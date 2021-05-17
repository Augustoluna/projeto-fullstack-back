import express, {Express} from "express"
import cors from "cors"
import dotenv from "dotenv"
import { AddressInfo } from "net"
import { UserController } from "./controller/UserController"
import { ImageController } from "./controller/ImageController"
dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors())

const userController = new UserController()
app.post("/user/signup", userController.create)
app.post("/user/login", userController.login)

const imageController = new ImageController()
app.post("/image/createImage", imageController.create)
app.get("/image/", imageController.get)

const server = app.listen(process.env.PORT || 3003, () => {
    if(server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost: ${address.port}`)
    }else{
        console.error(`Failure upon starting server.`)
    }
})
