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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRefreshMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const tokenRefreshMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresToken = req.cookies.refresh_token;
        if (!refresToken)
            throw new Error("No existe el token");
        // token = token.split(" ")[1]
        const payload = jsonwebtoken_1.default.verify(refresToken, config_1.envs.REFRESH_TOKEN_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
    // const token = req.cookies.access_token;
    // try {
    //     if(!token){
    //         throw {
    //             status: 403,
    //             message: "User not authorized"
    //         };
    //     }
    //     jwt.verify(token, envs.ACCESS_TOKEN_SECRET!,(err: any, user: any)=>{
    //         if(err)throw{status:403,message:"verificacion fallida"}
    //         req.user = user;
    //         next();
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).json({message: error});
    // }
});
exports.tokenRefreshMiddleware = tokenRefreshMiddleware;
