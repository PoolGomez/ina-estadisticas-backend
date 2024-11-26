import { Router } from "express";
import { StudentRoutes } from "../routes/studentRoutes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use('/api/v1/students', StudentRoutes.routes);
        return router;
    }
}