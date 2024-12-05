import { UserRepository } from "../../repositories";

export class UpdateUserRolUseCase{

    async updateUserRol(userId: string, updateRol: string):Promise<boolean> {
        const userRepository = new UserRepository();
        const exists = await userRepository.getById(userId);
        if(!exists){
            return false;
        }
        // const updateService = {...exists, ...newServiceData};
        return await userRepository.updateRol(userId, updateRol);
    }
}