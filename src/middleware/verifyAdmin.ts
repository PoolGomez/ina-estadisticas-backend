import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { InfoTokenEntity } from "../entities/infoTokenEntity";

interface IGetUserAuthInfoRequest extends Request {
    user?: InfoTokenEntity | jwt.JwtPayload | undefined;
}
export const verifyAdmin = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    
    try {
        const usuario = req.user;
        // console.log('[usuario.exp]',usuario?.exp)
        // console.log('[Rol]',usuario?.rol)
        if(usuario?.rol !== 'admin') throw new Error("No tiene permisos")
        
        // token = token.split(" ")[1]
        // const payload = jwt.verify(accessToken, envs.ACCESS_TOKEN_SECRET!);

        // req.user = payload;


        next()
    } catch (error: any) {
        res.status(401).json({error: error.message})
    }
    
    
    
    
    
    
    
    // const token = req.cookies.access_token;
    // try {
    //     if(!token){
    //         throw {
    //             status: 403,
    //             message: "User not authorized"
    //         };
    //     }
    //     jwt.verify(token, envs.ACCESS_TOKEN_SECRET!,(err: any, user: any)=>{
    //         if(err)throw{status:403,message:"verificacion fallida"}
    //         req.user = user;
    //         next();
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).json({message: error});
        
    // }
    
}