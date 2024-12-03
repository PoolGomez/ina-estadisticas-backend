import { StudentEntity } from "../../entities";
import { StudentRepository } from "../../repositories";

// export const getStudentUseCase =  async(studentId: number): Promise<StudentEntity|null> => {
//     const studentRepository = new StudentRepository()
//     return await studentRepository.getById(studentId);
// }

export class GetStudentUseCase{

    async getStudent(studentId: number):Promise<StudentEntity|null> {
        const studentRepository = new StudentRepository();
        return await studentRepository.getById(studentId);
    }
}