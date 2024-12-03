import { ServiceEntity } from "../../entities";
import { ServiceRepository } from "../../repositories";

// export const getStudentListUseCase =  async(): Promise<StudentEntity[]> => {
//     const studentRepository = new StudentRepository();
//     return await studentRepository.getAll();
// }

export class GetServicesListUseCase{

    async getServicesList():Promise<ServiceEntity[]> {
        try {
            const serviceRepository = new ServiceRepository();
            const result = await serviceRepository.getAll();
            return result; 
        } catch (error: any) {
            throw {
                status: 400,
                message: 'Error en getServicesList' + error.message
            }
        }

        // const serviceRepository = new ServiceRepository();
        // return await serviceRepository.getAll();
    }
}