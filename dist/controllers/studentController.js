"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const entities_1 = require("../entities");
const useCases_1 = require("../useCases");
class StudentController {
    constructor(
    // private readonly studentRepository: StudentRepository
    ) {
        this.createStudent = (req, res) => {
            const student = new entities_1.StudentEntity(0, req.body.name, req.body.nationality, req.body.career, req.body.password, req.body.phone, req.body.age);
            this.createStudentUseCase.createStudent(student)
                .then(student => res.json(student))
                .catch(err => res.status(400).json(err));
        };
        this.getStudentList = (req, res) => {
            this.getStudentsListUseCase.getStudentsList()
                .then(students => res.json(students))
                .catch(err => res.status(400).json(err));
        };
        this.getStudent = (req, res) => {
            const { id } = req.params;
            const studentId = parseInt(id);
            this.getStudentUseCase.getStudent(studentId)
                .then(students => res.json(students))
                .catch(err => res.status(400).json(err));
        };
        this.updateStudent = (req, res) => {
            const { id } = req.params;
            const studentId = parseInt(id);
            const student = new entities_1.StudentEntity(studentId, req.body.name, req.body.nationality, req.body.career, req.body.password, req.body.phone, req.body.age);
            this.updateStudentUseCase.updateStudent(studentId, student)
                .then(student => res.json(student))
                .catch(err => res.status(400).json(err));
        };
        this.deleteStudent = (req, res) => {
            const { id } = req.params;
            const studentId = parseInt(id);
            this.deleteStudentUseCase.deleteStudent(studentId)
                .then(student => res.json({ deleted: student }))
                .catch(err => res.status(400).json(err));
        };
        this.createStudentUseCase = new useCases_1.CreateStudentUseCase();
        this.deleteStudentUseCase = new useCases_1.DeleteStudentUseCase();
        this.updateStudentUseCase = new useCases_1.UpdateStudentUseCase();
        this.getStudentUseCase = new useCases_1.GetStudentUseCase();
        this.getStudentsListUseCase = new useCases_1.GetStudentsListUseCase();
    }
}
exports.StudentController = StudentController;
