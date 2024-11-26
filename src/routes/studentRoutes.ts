import {Router} from "express"
import {StudentController} from '../controllers'
import { StudentRepository } from "../repositories";

export class StudentRoutes{
    static get routes(): Router{
        const router = Router();
        const repo = new StudentRepository();
        const controller = new StudentController(repo);

        router.post('/', controller.createStudent);
        router.get('/', controller.getStudentList);
        router.get('/:id', controller.getStudent);
        router.put('/:id', controller.updateStudent);
        router.delete('/:id', controller.deleteStudent);

        return router;
    }
}