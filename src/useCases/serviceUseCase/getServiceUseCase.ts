import { ServiceEntity } from "../../entities";
import { ServiceRepository } from "../../repositories";

// export const getStudentUseCase =  async(studentId: number): Promise<StudentEntity|null> => {
//     const studentRepository = new StudentRepository()
//     return await studentRepository.getById(studentId);
// }

export class GetServiceUseCase{

    async getService(studentId: string):Promise<ServiceEntity|null> {
        try {
            const serviceRepository = new ServiceRepository();
            const result = await serviceRepository.getById(studentId);
            return result;
        } catch (error:any) {
            throw {
                status: 400,
                message:'Error en GetServiceUseCase : ' + error.message,
            }
        }
        // const serviceRepository = new ServiceRepository();
        // return await serviceRepository.getById(studentId);
    }
}