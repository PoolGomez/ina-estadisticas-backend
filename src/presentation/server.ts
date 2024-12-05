import express, { Router } from "express"
import { errorHandler } from "../middleware";
import cors from "cors";
import cookieParser from "cookie-parser";

interface Options{
    port?: number;
    routes: Router;
}
// const cortsOptions = {
//     origin:"http://localhost:5173",
//     // methods:["GET","POST","PUT","DELETE"],
//     // allowedHeaders:["Content-Type","Authorization"],
//     credentials: true,
// }

var whitelist = ['http://localhost:5173','https://ina-estadisticas-app.vercel.app']
var corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (whitelist.includes(origin as string)) {
            callback(null, true); // Permitir el origen
        } else {
            callback(new Error('No autorizado por CORS')); // Denegar el origen
        }
    },
//   origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void ) {
//     if (whitelist.indexOf(origin as string) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
  credentials: true
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
        this.app.use(cors(
            corsOptions
            // {
            // origin: ['http://localhost:5173','https://ina-estadisticas-app.vercel.app'], // Especifica el dominio permitido
            // credentials: true // Permite el uso de cookies
            // }
        ))
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
