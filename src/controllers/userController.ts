import { NextFunction, Request, Response } from "express";
import { GetUsersListUseCase } from "../useCases/userUseCase";
import { GetUserUseCase } from "../useCases/userUseCase/getUserUseCase";
import { UpdateUserRolUseCase } from "../useCases/userUseCase/updateUserUseCase";

export class UserController {
    private readonly getUsersListUseCase: GetUsersListUseCase;
    private readonly getUserUseCase: GetUserUseCase;
    private readonly updateUserRolUseCase: UpdateUserRolUseCase;
    constructor(){
        this.getUsersListUseCase = new GetUsersListUseCase();
        this.getUserUseCase = new GetUserUseCase();
        this.updateUserRolUseCase = new UpdateUserRolUseCase();
    }
    getUserList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.getUsersListUseCase.getUsersList();
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = id;
            const result = await this.getUserUseCase.getUser(userId);
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    updateRolUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const rol = req.body.rol;

            const updated = await this.updateUserRolUseCase.updateUserRol(id,rol);

            if(!updated){
                res.status(500).json({
                    code:"error",
                    message:"No se pudo actualizar",
                    data:null,
                    dataArray:null,
                })
            }else{
                res.status(200).json({
                    code:"success",
                    message:"Se actualizo correctamente",
                    data:null,
                    dataArray:null,
                })
            }

        } catch (error) {
            next(error)
        }
    }
}