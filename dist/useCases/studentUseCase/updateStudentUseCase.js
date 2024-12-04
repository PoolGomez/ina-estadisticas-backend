"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentUseCase = void 0;
const repositories_1 = require("../../repositories");
// export const updateStudentUseCase =  async(studentId: number,newStudentData: StudentEntity): Promise<StudentEntity | null> => {
//     const studentRepository = new StudentRepository();
//     const exists = await studentRepository.getById(studentId);
//     if(!exists){
//         return null;
//     }
//     const updateStudent = {...exists, ...newStudentData};
//     return await studentRepository.update(studentId, updateStudent);
// }
class UpdateStudentUseCase {
    updateStudent(studentId, newStudentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentRepository = new repositories_1.StudentRepository();
            const exists = yield studentRepository.getById(studentId);
            if (!exists) {
                return null;
            }
            const updateStudent = Object.assign(Object.assign({}, exists), newStudentData);
            return yield studentRepository.update(studentId, updateStudent);
        });
    }
}
exports.UpdateStudentUseCase = UpdateStudentUseCase;
