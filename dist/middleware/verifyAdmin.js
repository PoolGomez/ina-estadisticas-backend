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
exports.verifyAdmin = void 0;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = req.user;
        console.log('[usuario.exp]', usuario === null || usuario === void 0 ? void 0 : usuario.exp);
        console.log('[Rol]', usuario === null || usuario === void 0 ? void 0 : usuario.rol);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.rol) !== 'admin')
            throw new Error("No tiene permisos");
        // token = token.split(" ")[1]
        // const payload = jwt.verify(accessToken, envs.ACCESS_TOKEN_SECRET!);
        // req.user = payload;
        next();
    }
    catch (error) {
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
exports.verifyAdmin = verifyAdmin;
