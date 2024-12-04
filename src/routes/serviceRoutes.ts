import {Router} from "express"
import { ServiceController } from "../controllers/serviceController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { verifyAdmin } from "../middleware/verifyAdmin";


// import {StudentController} from '../controllers'

export class ServiceRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new ServiceController();

        router.post('/', tokenMiddleware, verifyAdmin, controller.createService);
        router.get('/', tokenMiddleware, verifyAdmin ,controller.getServicesList);
        router.get('/:id', tokenMiddleware, verifyAdmin, controller.getService);
        router.put('/:id', tokenMiddleware, verifyAdmin, controller.updateService);
        router.delete('/:id', tokenMiddleware, verifyAdmin, controller.deleteService);

        return router;
    }
}