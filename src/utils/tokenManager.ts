import jwt from 'jsonwebtoken'
import { envs } from "../config";
import { Response } from 'express';



export const generateToken = (user:{}) => {
    
    try {
        const expire = 60 * 60 * 24 * 7; //1 semana
        // const expire = 60 * 15; //15min
        // const expire = 10 ; //10 seg

        const token = jwt.sign(user, envs.ACCESS_TOKEN_SECRET!, { expiresIn: expire});
        return {token, expireIn: expire}

    } catch (error) {
        console.log(error)
    }

}
export const gerenateRefreshToken = (user:{}, res: Response)=>{
    const expire = 60 * 60 * 24 * 30; // 30 dias
    try {
        const refreshToken = jwt.sign({user}, envs.REFRESH_TOKEN_SECRET!, { expiresIn: expire});
        res.cookie("refreshToken", refreshToken,{
            httpOnly:true,
            secure:true, //!(envs.MODO === 'developer'),
            expires: new Date(Date.now() + expire * 1000)
        })

    } catch (error) {
        console.log("Error en gerenateRefreshToken")
        console.log(error)
    }
}
export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
}