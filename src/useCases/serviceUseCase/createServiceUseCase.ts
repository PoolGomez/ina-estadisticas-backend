import { ServiceEntity } from "../../entities";
import { ServiceRepository } from "../../repositories";

// export const createStudentUseCase = async (student: StudentEntity): Promise<StudentEntity | null> => {
//     const studentRepository = new StudentRepository();
//     return await studentRepository.create(student);
// }
export class CreateServiceUseCase{
    
    async createService(service: ServiceEntity):Promise<ServiceEntity> {
        try {
            const serviceRepository = new ServiceRepository();
            const result = await serviceRepository.create(service);
            return result
        } catch (error: any) {
            throw {
                status: 400,
                message:'Error en CreateServiceUseCase : ' + error.message,
            }
        }
        
    }
}