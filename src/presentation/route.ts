import { Router } from "express";
import { AuthRoutes, ServiceRoutes, StudentRoutes, UserRoutes } from "../routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use('/api/v1/students', StudentRoutes.routes);
        router.use('/api/v1/services', ServiceRoutes.routes);
        router.use('/api/v1/users', UserRoutes.routes)
        router.use('/api/v1/auth', AuthRoutes.routes);
        return router;
    }
}