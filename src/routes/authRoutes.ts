import {Request, Response, Router} from "express"
import { authentication, db } from "../adapters";
import { generateToken } from "../utils/tokenManager";
import { UserController } from "../controllers";

export class AuthRoutes{
    static get routes(): Router{
        const router = Router();

        const controller = new UserController();

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
                    path: '/',
                    httpOnly: true, // la cookie solo se puede acceder en el servidor
                    secure: true, //process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
                    sameSite: 'none',
                    // sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
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

        router.post('/logout',async (req: Request, res: Response) => {
            try {
                res.clearCookie('access_token');
                res.status(200).json({message: "Sesión cerrada"})    
            } catch (error) {
                res.status(400).json({message: 'Error al cerrar la sesión'})
            }
            
        })

        router.post('/register', controller.createUser);
        // router.get('/:id', controller.getService);
        // router.put('/:id', controller.updateService);
        // router.delete('/:id', controller.deleteService);

        return router;
    }
}