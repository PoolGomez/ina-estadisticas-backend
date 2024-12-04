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
exports.AuthRoutes = void 0;
const express_1 = require("express");
// import { ServiceController } from "../controllers/serviceController";
const adapters_1 = require("../adapters");
const tokenManager_1 = require("../utils/tokenManager");
// import {StudentController} from '../controllers'
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // const controller = new ServiceController();
        // router.post('/', controller.createService);
        router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const authorization = req.headers.authorization;
            const token = (_a = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1]) !== null && _a !== void 0 ? _a : '';
            // const token='eyJhbGciOiJSUzI1NiIsImtpZCI6IjkyODg2OGRjNDRlYTZhOThjODhiMzkzZDM2NDQ1MTM2NWViYjMwZDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBwLWFkbWluZy1wZy0yIiwiYXVkIjoiYXBwLWFkbWluZy1wZy0yIiwiYXV0aF90aW1lIjoxNzMyODI4NjgzLCJ1c2VyX2lkIjoiU1hudFdCT3BrSFZDd0RJN3NFODQ0M3BCeTRpMiIsInN1YiI6IlNYbnRXQk9wa0hWQ3dESTdzRTg0NDNwQnk0aTIiLCJpYXQiOjE3MzI4Mjg2ODMsImV4cCI6MTczMjgzMjI4MywiZW1haWwiOiJwZ29tZXo0NzkwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwZ29tZXo0NzkwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.NtgT2AodKUeKJ5vwmbcva4zpK7VXOoKkLutVOU0mgivffzsqlfcBRM2rYod30hALT9PEymoqEFRMZ4I04AWwcqdf8Xcs7KO_M-Bdtgp6DrZGjVP3VtQr-bFE4HDnsgPj9DPTqxPqxLwj3-kRZQxIitUF4TEnWQsHuEr8HDbOMijcJSps2sDfSPdGNFveCWXoJ47cDyAdOLVA9gk542p6nS6pgVcYJDrG5HgehrWsEJib1GMmMtWnyMpcqyCWXcR5z-snITP_43ry_fGMB5S6bTyrKVj44YDPjCFbZDor7PAvxDsCt3nNXh-xPT_FiFiB7n7QVGiCcNo-oTq4q5q6xA'
            try {
                console.log("token:", token);
                //autenticacion del usuario
                const decodedToken = yield adapters_1.authentication.verifyIdToken(token);
                const uid = decodedToken.uid;
                const userDoc = yield adapters_1.db.collection('users').doc(uid).get();
                if (!userDoc.exists) {
                    res.status(404).json({ message: 'Usuario no encontrado en Firestore' });
                }
                const userData = userDoc.data();
                const resultToken = (0, tokenManager_1.generateToken)({
                    id: uid,
                    name: userData === null || userData === void 0 ? void 0 : userData.name,
                    email: userData === null || userData === void 0 ? void 0 : userData.email,
                    rol: userData === null || userData === void 0 ? void 0 : userData.rol
                });
                res.cookie('access_token', resultToken === null || resultToken === void 0 ? void 0 : resultToken.token, {
                    // domain:'localhost:5173',
                    path: '/',
                    httpOnly: true, // la cookie solo se puede acceder en el servidor
                    secure: true, //process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
                    // sameSite: 'none',// sameSite: 'strict', //la cookie solo se puede acceder en el mismo dominio
                });
                res.json({
                    token: resultToken === null || resultToken === void 0 ? void 0 : resultToken.token,
                    expireIn: resultToken === null || resultToken === void 0 ? void 0 : resultToken.expireIn,
                    info: {
                        name: userData === null || userData === void 0 ? void 0 : userData.name,
                        email: userData === null || userData === void 0 ? void 0 : userData.email,
                        rol: userData === null || userData === void 0 ? void 0 : userData.rol,
                    }
                });
            }
            catch (error) {
                console.log('Error en el login: ', error);
                res.status(401).json({ message: 'Error de autenticacion' });
            }
        }));
        // router.get('/:id', controller.getService);
        // router.put('/:id', controller.updateService);
        // router.delete('/:id', controller.deleteService);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
