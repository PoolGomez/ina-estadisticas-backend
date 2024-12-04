"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({
        code: 'error',
        message: error.message
            || 'Error interno del servidor'
    });
};
exports.errorHandler = errorHandler;
