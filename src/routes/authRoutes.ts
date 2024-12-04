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
            const authorization = req.headers.authorization;
            const token = authorization?.split(' ')[1] ?? ''
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
                    sameSite: 'none',// sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
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