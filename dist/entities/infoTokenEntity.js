"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoTokenEntity = void 0;
class InfoTokenEntity {
    constructor(id, name, email, rol, iat, exp) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rol = rol;
        this.iat = iat;
        this.exp = exp;
    }
}
exports.InfoTokenEntity = InfoTokenEntity;
