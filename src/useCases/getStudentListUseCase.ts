import { StudentEntity } from "../entities";
import { StudentRepository } from "../repositories";

export const getStudentListUseCase =  async(): Promise<StudentEntity[]> => {
    const studentRepository = new StudentRepository();
    return await studentRepository.getAll();
}