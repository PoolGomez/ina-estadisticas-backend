"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const studentRoutes_1 = require("../routes/studentRoutes");
const serviceRoutes_1 = require("../routes/serviceRoutes");
const authRoutes_1 = require("../routes/authRoutes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/v1/students', studentRoutes_1.StudentRoutes.routes);
        router.use('/api/v1/services', serviceRoutes_1.ServiceRoutes.routes);
        router.use('/api/v1/auth', authRoutes_1.AuthRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
