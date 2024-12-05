import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

export class CreateUserUseCase {
    async createUser(user: UserEntity): Promise<UserEntity> {
        try {
            const userRepository = new UserRepository();
            const result = await userRepository.create(user);
            return result;
        } catch (error: any) {
            throw {
                status: 400,
                message: 'Error en CreateUserUseCase : ' + error.message
            }
        }
    }
}