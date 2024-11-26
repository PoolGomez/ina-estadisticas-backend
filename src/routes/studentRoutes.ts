import {Router} from "express"
import {StudentController} from '../controllers'

export class StudentRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new StudentController();

        router.post('/', controller.createStudent);
        router.get('/', controller.getStudentList);
        router.get('/:id', controller.getStudent);
        router.put('/:id', controller.updateStudent);
        router.delete('/:id', controller.deleteStudent);

        return router;
    }
}