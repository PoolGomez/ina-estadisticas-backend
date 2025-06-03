import {Router} from "express"

import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { verifyAdmin } from "../middleware/verifyAdmin";
import { ServiceController } from "../controllers";

export class ServiceRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new ServiceController();

        router.post('/', tokenMiddleware, verifyAdmin, controller.createService);
        router.get('/', tokenMiddleware,controller.getServicesList);
        router.get('/:id', tokenMiddleware, verifyAdmin, controller.getService);
        router.put('/:id', tokenMiddleware, verifyAdmin, controller.updateService);
        router.delete('/:id', tokenMiddleware, verifyAdmin, controller.deleteService);

        return router;
    }
}