
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";


export class GetUsersListUseCase{

    async getUsersList():Promise<UserEntity[]> {
        try {
            const userRepository = new UserRepository();
            const result = await userRepository.getAll();
            return result; 
        } catch (error: any) {
            throw {
                status: 400,
                message: 'Error en getUsersList' + error.message
            }
        }

        // const serviceRepository = new ServiceRepository();
        // return await serviceRepository.getAll();
    }
}