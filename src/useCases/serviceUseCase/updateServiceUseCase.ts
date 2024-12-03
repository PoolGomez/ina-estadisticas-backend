import { ServiceEntity, StudentEntity } from "../../entities";
import { ServiceRepository, StudentRepository } from "../../repositories";

// export const updateStudentUseCase =  async(studentId: number,newStudentData: StudentEntity): Promise<StudentEntity | null> => {
//     const studentRepository = new StudentRepository();
//     const exists = await studentRepository.getById(studentId);
//     if(!exists){
//         return null;
//     }
//     const updateStudent = {...exists, ...newStudentData};
//     return await studentRepository.update(studentId, updateStudent);
// }

export class UpdateServiceUseCase{

    async updateService(serviceId: string, newServiceData: ServiceEntity):Promise<ServiceEntity | null> {
        const serviceRepository = new ServiceRepository();
        const exists = await serviceRepository.getById(serviceId);
        if(!exists){
            return null;
        }
        const updateService = {...exists, ...newServiceData};
        return await serviceRepository.update(serviceId, updateService);
    }
}