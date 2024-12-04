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
exports.GetCheckBoletaUpdateUseCase = void 0;
const repositories_1 = require("../../repositories");
class GetCheckBoletaUpdateUseCase {
    getCheckBoletaUpdate(id, boleta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceRepository = new repositories_1.ServiceRepository();
                const result = yield serviceRepository.getByBoleta(boleta);
                for (const doc of result) {
                    if (doc.id !== id) {
                        return false;
                    }
                }
                return true;
            }
            catch (error) {
                throw {
                    status: 400,
                    message: 'Error en GetServiceByBoleta : ' + error.message,
                };
            }
            // const serviceRepository = new ServiceRepository();
            // return await serviceRepository.getById(studentId);
        });
    }
}
exports.GetCheckBoletaUpdateUseCase = GetCheckBoletaUpdateUseCase;
