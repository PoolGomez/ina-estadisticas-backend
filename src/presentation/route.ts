import { Router } from "express";
import { StudentRoutes } from "../routes/studentRoutes";
import { ServiceRoutes } from "../routes/serviceRoutes";
import { AuthRoutes } from "../routes/authRoutes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use('/api/v1/students', StudentRoutes.routes);
        router.use('/api/v1/services', ServiceRoutes.routes);
        router.use('/api/v1/auth', AuthRoutes.routes);
        return router;
    }
}