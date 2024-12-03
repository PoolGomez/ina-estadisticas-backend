import { ServiceRepository, StudentRepository } from "../../repositories";

// export const deleteStudentUseCase =  async(studentId: number): Promise<boolean> => {
//     const studentRepository = new StudentRepository();
//     return await studentRepository.delete(studentId);
// }
export class DeleteServiceUseCase{
    
    async deleteService(studentId: string):Promise<boolean> {
        const serviceRepository = new ServiceRepository();
        return await serviceRepository.delete(studentId);
    }
}