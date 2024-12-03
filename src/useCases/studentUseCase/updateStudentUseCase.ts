import { StudentEntity } from "../../entities";
import { StudentRepository } from "../../repositories";

// export const updateStudentUseCase =  async(studentId: number,newStudentData: StudentEntity): Promise<StudentEntity | null> => {
//     const studentRepository = new StudentRepository();
//     const exists = await studentRepository.getById(studentId);
//     if(!exists){
//         return null;
//     }
//     const updateStudent = {...exists, ...newStudentData};
//     return await studentRepository.update(studentId, updateStudent);
// }

export class UpdateStudentUseCase{

    async updateStudent(studentId: number, newStudentData: StudentEntity):Promise<StudentEntity | null> {
        const studentRepository = new StudentRepository();
        const exists = await studentRepository.getById(studentId);
        if(!exists){
            return null;
        }
        const updateStudent = {...exists, ...newStudentData};
        return await studentRepository.update(studentId, updateStudent);
    }
}