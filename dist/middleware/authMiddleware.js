"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const adapters_1 = require("../adapters");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado' });
    }
    else {
        const token = authHeader.split(' ')[1]; //extraer el token
        try {
            //verificar el token
            const decodedToken = yield adapters_1.authentication.verifyIdToken(token);
            console.log("[decodedToken]", decodedToken);
            next();
        }
        catch (error) {
            console.error('Error al verificar el token: ', error);
            res.status(403).json({ message: 'Token invalido' });
        }
    }
});
exports.authMiddleware = authMiddleware;
