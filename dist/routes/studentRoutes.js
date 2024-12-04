"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class StudentRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controllers_1.StudentController();
        router.post('/', controller.createStudent);
        router.get('/', controller.getStudentList);
        router.get('/:id', controller.getStudent);
        router.put('/:id', controller.updateStudent);
        router.delete('/:id', controller.deleteStudent);
        return router;
    }
}
exports.StudentRoutes = StudentRoutes;
