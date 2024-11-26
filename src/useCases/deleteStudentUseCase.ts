import { StudentRepository } from "../repositories";

// export const deleteStudentUseCase =  async(studentId: number): Promise<boolean> => {
//     const studentRepository = new StudentRepository();
//     return await studentRepository.delete(studentId);
// }
export class DeleteStudentUseCase{
    constructor(){}
    
    async deleteStudent(studentId: number):Promise<boolean> {
        const studentRepository = new StudentRepository();
        return await studentRepository.delete(studentId);
    }
}