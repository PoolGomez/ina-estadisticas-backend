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
exports.GetServiceByBoletaUseCase = void 0;
const repositories_1 = require("../../repositories");
class GetServiceByBoletaUseCase {
    getServiceByBoleta(boleta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceRepository = new repositories_1.ServiceRepository();
                const result = yield serviceRepository.getByBoleta(boleta);
                if (result.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
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
exports.GetServiceByBoletaUseCase = GetServiceByBoletaUseCase;
