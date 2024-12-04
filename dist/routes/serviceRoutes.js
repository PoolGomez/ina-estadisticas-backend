"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const tokenMiddleware_1 = require("../middleware/tokenMiddleware");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
// import {StudentController} from '../controllers'
class ServiceRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new serviceController_1.ServiceController();
        router.post('/', tokenMiddleware_1.tokenMiddleware, verifyAdmin_1.verifyAdmin, controller.createService);
        router.get('/', tokenMiddleware_1.tokenMiddleware, verifyAdmin_1.verifyAdmin, controller.getServicesList);
        router.get('/:id', tokenMiddleware_1.tokenMiddleware, verifyAdmin_1.verifyAdmin, controller.getService);
        router.put('/:id', tokenMiddleware_1.tokenMiddleware, verifyAdmin_1.verifyAdmin, controller.updateService);
        router.delete('/:id', tokenMiddleware_1.tokenMiddleware, verifyAdmin_1.verifyAdmin, controller.deleteService);
        return router;
    }
}
exports.ServiceRoutes = ServiceRoutes;
