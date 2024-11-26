import { Request, Response } from 'express'

import { StudentRepository } from '../repositories'
import { StudentEntity } from '../entities'

export class StudentController {

    constructor(
        private readonly studentRepository: StudentRepository
    ){}

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
        this.studentRepository.create(student)
            .then(student => res.json(student))
            .catch(err => res.status(400).json(err));
    }

    getStudentList = (req: Request, res: Response) => {
        
        this.studentRepository.getAll()
            .then(students => res.json(students))
            .catch(err => res.status(400).json(err));
    }
    getStudent = (req: Request, res: Response) => {
        const {id} = req.params;
        const studentId = parseInt(id);
        this.studentRepository.getById(studentId)
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
        this.studentRepository.update(studentId, student)
            .then(student => res.json(student))
            .catch(err => res.status(400).json(err));
    }
    deleteStudent = (req: Request, res: Response) => {
        const {id} = req.params;
        const studentId = parseInt(id);
        this.studentRepository.delete(studentId)
            .then(student => res.json({deleted:student}))
            .catch(err => res.status(400).json(err));
    }
}