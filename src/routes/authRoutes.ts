import {Request, Response, Router} from "express"
// import { ServiceController } from "../controllers/serviceController";
import { authentication, db } from "../adapters";
import jwt from 'jsonwebtoken';
import { envs } from "../config";
import { generateToken, gerenateRefreshToken } from "../utils/tokenManager";
// import {StudentController} from '../controllers'

export class AuthRoutes{
    static get routes(): Router{
        const router = Router();
        // const controller = new ServiceController();

        // router.post('/', controller.createService);
        router.post('/login', async (req: Request, res: Response) => {
            const { token } = req.body;
            // const token='eyJhbGciOiJSUzI1NiIsImtpZCI6IjkyODg2OGRjNDRlYTZhOThjODhiMzkzZDM2NDQ1MTM2NWViYjMwZDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBwLWFkbWluZy1wZy0yIiwiYXVkIjoiYXBwLWFkbWluZy1wZy0yIiwiYXV0aF90aW1lIjoxNzMyODI4NjgzLCJ1c2VyX2lkIjoiU1hudFdCT3BrSFZDd0RJN3NFODQ0M3BCeTRpMiIsInN1YiI6IlNYbnRXQk9wa0hWQ3dESTdzRTg0NDNwQnk0aTIiLCJpYXQiOjE3MzI4Mjg2ODMsImV4cCI6MTczMjgzMjI4MywiZW1haWwiOiJwZ29tZXo0NzkwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwZ29tZXo0NzkwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.NtgT2AodKUeKJ5vwmbcva4zpK7VXOoKkLutVOU0mgivffzsqlfcBRM2rYod30hALT9PEymoqEFRMZ4I04AWwcqdf8Xcs7KO_M-Bdtgp6DrZGjVP3VtQr-bFE4HDnsgPj9DPTqxPqxLwj3-kRZQxIitUF4TEnWQsHuEr8HDbOMijcJSps2sDfSPdGNFveCWXoJ47cDyAdOLVA9gk542p6nS6pgVcYJDrG5HgehrWsEJib1GMmMtWnyMpcqyCWXcR5z-snITP_43ry_fGMB5S6bTyrKVj44YDPjCFbZDor7PAvxDsCt3nNXh-xPT_FiFiB7n7QVGiCcNo-oTq4q5q6xA'
            try {
                // console.log("token:",token);
                //autenticacion del usuario
                const decodedToken  = await authentication.verifyIdToken(token);
                const uid = decodedToken.uid;

                const userDoc = await db.collection('users').doc(uid).get();

                if(!userDoc.exists){
                    res.status(404).json({message: 'Usuario no encontrado en Firestore'})
                }

                const userData = userDoc.data();
            
                const resultToken = generateToken({
                    id: uid,
                    name: userData?.name,
                    email: userData?.email,
                    rol: userData?.rol
                });

                res.cookie('access_token', resultToken?.token, {
                    // domain:'localhost:5173',
                    path: '/',
                    httpOnly: true, // la cookie solo se puede acceder en el servidor
                    secure: true, //process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
                    // sameSite: 'none',// sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
                })

                
                res.json({
                    token:  resultToken?.token,
                    expireIn: resultToken?.expireIn,
                    info:{
                        name:userData?.name, 
                        email: userData?.email,
                        rol: userData?.rol,
                    }
                    
                })



            } catch (error) {
                console.log('Error en el login: ', error);
                res.status(401).json({message: 'Error de autenticacion'})
            }
        } );
        // router.get('/:id', controller.getService);
        // router.put('/:id', controller.updateService);
        // router.delete('/:id', controller.deleteService);

        return router;
    }
}