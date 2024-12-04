import express, { Router } from "express"
import { errorHandler } from "../middleware";
import cors from "cors";
import cookieParser from "cookie-parser";

interface Options{
    port?: number;
    routes: Router;
}
const cortsOptions = {
    origin:"http://localhost:5173",
    // methods:["GET","POST","PUT","DELETE"],
    // allowedHeaders:["Content-Type","Authorization"],
    credentials: true,
}

export class Server{
    public readonly app = express();
    public readonly port : number ;
    public readonly routes : Router ;

    constructor(options: Options){
        const { port = 3100, routes} = options;
        this.port = port;
        this.routes = routes;
    }
    async start(){
        this.app.use(cors({
            origin: 'http://localhost:5173', // Especifica el dominio permitido
            credentials: true // Permite el uso de cookies
            }))
        // this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true}));
        
        this.app.use(cookieParser())

        this.app.use(this.routes);
        this.app.use(errorHandler);
        this.app.listen(this.port, ()=>{
            console.log("listening on port " + this.port);
        })
    }
}
