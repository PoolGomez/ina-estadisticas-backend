import { Router } from "express";
import { UserController } from "../controllers";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { verifyAdmin } from "../middleware/verifyAdmin";

export class UserRoutes {
    static get routes() : Router{
        const router = Router();
        const controller = new UserController()

        router.get('/',
             tokenMiddleware, verifyAdmin, 
            controller.getUserList);
        router.get('/:id', tokenMiddleware, verifyAdmin, controller.getUser);
        router.put('/:id',tokenMiddleware, verifyAdmin, controller.updateRolUser);


        return router;
    }
}