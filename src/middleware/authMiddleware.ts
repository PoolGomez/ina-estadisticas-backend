import { NextFunction, Request, Response } from "express";
import { authentication } from "../adapters";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message: 'Token no proporcionado'});
    }else{
        const token = authHeader.split(' ')[1]; //extraer el token

        try {
            //verificar el token
            
            const decodedToken = await authentication.verifyIdToken(token);
            console.log("[decodedToken]", decodedToken);
            next();
        } catch (error) {
            console.error('Error al verificar el token: ', error);
            res.status(403).json({message: 'Token invalido'});
        }
    }
    
}