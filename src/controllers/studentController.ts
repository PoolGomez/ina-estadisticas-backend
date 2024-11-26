import { Request, Response } from 'express'
import { StudentEntity } from '../entities'
import { CreateStudentUseCase, DeleteStudentUseCase, GetStudentsListUseCase, GetStudentUseCase, UpdateStudentUseCase } from '../useCases'

export class StudentController {

    private readonly createStudentUseCase: CreateStudentUseCase;
    private readonly deleteStudentUseCase: DeleteStudentUseCase;
    private readonly updateStudentUseCase: UpdateStudentUseCase;
    private readonly getStudentUseCase: GetStudentUseCase;
    private readonly getStudentsListUseCase: GetStudentsListUseCase;

    constructor(
        // private readonly studentRepository: StudentRepository
        
    ){
        this.createStudentUseCase= new CreateStudentUseCase();
        this.deleteStudentUseCase= new DeleteStudentUseCase();
        this.updateStudentUseCase= new UpdateStudentUseCase();
        this.getStudentUseCase= new GetStudentUseCase();
        this.getStudentsListUseCase= new GetStudentsListUseCase();
    }

    createStudent = (req: Request, res: Response) => {
        const student = new StudentEntity(
            0,
            req.body.name,
            req.body.nationality,
            req.body.career,
            req.body.password,
            req.body.phone,
            req.body.age,
        )
        this.createStudentUseCase.createStudent(student)
            .then(student => res.json(student))
            .catch(err => res.status(400).json(err));
    }

    getStudentList = (req: Request, res: Response) => {
        
        this.getStudentsListUseCase.getStudentsList()
            .then(students => res.json(students))
            .catch(err => res.status(400).json(err));
    }
    getStudent = (req: Request, res: Response) => {
        const {id} = req.params;
        const studentId = parseInt(id);
        this.getStudentUseCase.getStudent(studentId)
            .then(students => res.json(students))
            .catch(err => res.status(400).json(err));
    }
    updateStudent = (req: Request, res: Response) => {
        const {id} = req.params;
        const studentId = parseInt(id);
        const student = new StudentEntity(
            studentId,
            req.body.name,
            req.body.nationality,
            req.body.career,
            req.body.password,
            req.body.phone,
            req.body.age,
        )
        this.updateStudentUseCase.updateStudent(studentId, student)
            .then(student => res.json(student))
            .catch(err => res.status(400).json(err));
    }
    deleteStudent = (req: Request, res: Response) => {
        const {id} = req.params;
        const studentId = parseInt(id);
        this.deleteStudentUseCase.deleteStudent(studentId)
            .then(student => res.json({deleted:student}))
            .catch(err => res.status(400).json(err));
    }
}