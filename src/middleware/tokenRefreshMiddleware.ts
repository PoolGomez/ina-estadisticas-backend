import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { envs } from "../config";

interface IGetUserAuthInfoRequest extends Request {
    user?: {} | jwt.JwtPayload | undefined;
}
export const tokenRefreshMiddleware = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    
    try {
        const refresToken = req.cookies.refresh_token
        if(!refresToken) throw new Error("No existe el token")
        
        // token = token.split(" ")[1]
        const payload = jwt.verify(refresToken, envs.REFRESH_TOKEN_SECRET!);

        req.user = payload;

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