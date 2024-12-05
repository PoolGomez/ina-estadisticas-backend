import { db } from "../adapters";
import { UserEntity } from "../entities/user.entity";



const userCollection = "users";

export class UserRepository{

    public getAll = async (): Promise<UserEntity[]> => {
        return new Promise<UserEntity[]> (async (resolve, reject) => {
            try {
                const querySnapshot = await db.collection(userCollection).get();
                const usuarios = querySnapshot.docs.map(doc =>({
                    id:doc.id,
                    ...doc.data()
                }))
                resolve(usuarios as UserEntity[]);
            } catch (error) {
                console.log("error getAll UserRepository")
                reject(error)
            }
            
        })
    }

    public getById = async (userId: string): Promise<UserEntity | null> => {
        return new Promise<UserEntity | null>(async (resolve, reject) => {
            try {
                const document = await db.collection(userCollection).doc(userId).get();
                
                const documentoCurrent = {
                    id: document.id,
                    ...document.data()
                }
                resolve(documentoCurrent as UserEntity);
            } catch (error) {
                console.log("error getById UserRepository")
                reject(error)
            }
        })
    }

    public updateRol = async(userId: string, updateRol: string): Promise<boolean> => {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const newUser = {
                    rol: updateRol,
                }

                await db.collection(userCollection)
                    .doc(userId)
                    .update(newUser);
                resolve(true)
            } catch (error) {
                console.log(error)
                reject(false)
            }
        })
    }

}