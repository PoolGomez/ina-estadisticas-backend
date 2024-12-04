"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerificationErrors = exports.gerenateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const generateToken = (user) => {
    try {
        const expire = 60 * 60 * 24;
        // const expire = 60 * 15; //15min
        // const expire = 10 ; //10 seg
        const token = jsonwebtoken_1.default.sign(user, config_1.envs.ACCESS_TOKEN_SECRET, { expiresIn: expire });
        return { token, expireIn: expire };
    }
    catch (error) {
        console.log(error);
    }
};
exports.generateToken = generateToken;
const gerenateRefreshToken = (user, res) => {
    const expire = 60 * 60 * 24 * 30; // 30 dias
    try {
        const refreshToken = jsonwebtoken_1.default.sign({ user }, config_1.envs.REFRESH_TOKEN_SECRET, { expiresIn: expire });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, //!(envs.MODO === 'developer'),
            expires: new Date(Date.now() + expire * 1000)
        });
    }
    catch (error) {
        console.log("Error en gerenateRefreshToken");
        console.log(error);
    }
};
exports.gerenateRefreshToken = gerenateRefreshToken;
exports.tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "Utiliza formato Bearer",
    "jwt malformed": "JWT formato no válido",
};
