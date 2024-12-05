import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export class GetUserUseCase{

    async getUser(userId: string):Promise<UserEntity|null> {
        try {
            const userRepository = new UserRepository();
            const result = await userRepository.getById(userId);
            return result;
        } catch (error:any) {
            throw {
                status: 400,
                message:'Error en GetUserUseCase : ' + error.message,
            }
        }
    }
}