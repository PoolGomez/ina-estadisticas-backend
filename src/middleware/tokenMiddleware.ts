import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { envs } from "../config";
import { InfoTokenEntity } from "../entities/infoTokenEntity";

interface IGetUserAuthInfoRequest extends Request {
    user?: InfoTokenEntity | jwt.JwtPayload | undefined;
}
export const tokenMiddleware = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    
    try {
        const accessToken = req.cookies.access_token;
        if(!accessToken) throw new Error("No existe el token")
        
        // token = token.split(" ")[1]
        const payload = jwt.verify(accessToken, envs.ACCESS_TOKEN_SECRET!);
        console.log('[payload]', payload)
        req.user = payload as InfoTokenEntity;

        next()
    } catch (error: any) {
        console.log(error)
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