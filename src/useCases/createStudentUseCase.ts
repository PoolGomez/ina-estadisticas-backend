import { StudentEntity } from "../entities";
import { StudentRepository } from "../repositories";

// export const createStudentUseCase = async (student: StudentEntity): Promise<StudentEntity | null> => {
//     const studentRepository = new StudentRepository();
//     return await studentRepository.create(student);
// }
export class CreateStudentUseCase{
    
    async createStudent(student: StudentEntity):Promise<StudentEntity | null> {
        const studentRepository = new StudentRepository();
        return await studentRepository.create(student);
    }
}