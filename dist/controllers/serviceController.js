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
exports.ServiceController = void 0;
const useCases_1 = require("../useCases");
const entities_1 = require("../entities");
const getServiceByBoletaUseCase_1 = require("../useCases/serviceUseCase/getServiceByBoletaUseCase");
const getCheckBoletaUpdateUseCase_1 = require("../useCases/serviceUseCase/getCheckBoletaUpdateUseCase");
class ServiceController {
    constructor() {
        this.getServicesList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("[REQUEST_USER]",req)
                // console.log("[access_token] ",JSON.stringify(req.cookies.access_token));
                // console.log("resultVerify:",resultVerify.rol)
                // if(resultVerify as string === 'admin'){
                // }
                const result = yield this.getServicesListUseCase.getServicesList();
                res.status(200).json(result);
                // throw {
                //     status: 400,
                //     message:'Error de prueba'
                // };
            }
            catch (error) {
                next(error);
            }
            // this.getServicesListUseCase.getServicesList()
            //     .then(services => res.json(services))
            //     .catch(err => res.status(400).json(err));
        });
        this.getService = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const serviceId = id;
                const result = yield this.getServiceUseCase.getService(serviceId);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
            // const {id} = req.params;
            // const serviceId = id;
            // this.getServiceUseCase.getService(serviceId)
            //         .then(service => res.status(201).json(service))
            //         .catch(err => res.status(400).json(err));
        });
        this.createService = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new entities_1.ServiceEntity("", req.body.boleta, req.body.congregacion, req.body.fecha, req.body.mes, req.body.escuelaDominical, req.body.invitados, req.body.miembros, req.body.asistencia, req.body.oficiante, req.body.ofrenda, req.body.observacion);
                const verification = yield this.getServiceByBoleta.getServiceByBoleta(service.boleta);
                console.log("[verification]", verification);
                if (verification) {
                    res.status(200).json({
                        code: 'warning',
                        message: "El número de boleta ya existe",
                        data: null,
                        dataArray: null,
                    });
                    // throw new Error('El número de boleta debe ser único')
                }
                else {
                    const result = yield this.createServiceUseCase.createService(service);
                    res.status(200).json({
                        code: "success",
                        message: "Registro correcto",
                        data: result,
                        dataArray: null
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.updateService = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const service = new entities_1.ServiceEntity(id, req.body.boleta, req.body.congregacion, req.body.fecha, req.body.mes, req.body.escuelaDominical, req.body.invitados, req.body.miembros, req.body.asistencia, req.body.oficiante, req.body.ofrenda, req.body.observacion);
                const verification = yield this.getCheckBoletaUpdateUseCase.getCheckBoletaUpdate(id, service.boleta);
                if (!verification) {
                    res.status(200).json({
                        code: 'warning',
                        message: "El número de boleta ya existe en otro servicio",
                        data: null,
                        dataArray: null,
                    });
                }
                else {
                    const result = yield this.updateServiceUseCase.updateService(id, service);
                    res.status(200).json({
                        code: "success",
                        message: "Registro actualizado",
                        data: result,
                        dataArray: null
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteService = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.deleteServiceUseCase.deleteService(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.getServicesListUseCase = new useCases_1.GetServicesListUseCase();
        this.getServiceUseCase = new useCases_1.GetServiceUseCase();
        this.createServiceUseCase = new useCases_1.CreateServiceUseCase();
        this.updateServiceUseCase = new useCases_1.UpdateServiceUseCase();
        this.deleteServiceUseCase = new useCases_1.DeleteServiceUseCase();
        this.getServiceByBoleta = new getServiceByBoletaUseCase_1.GetServiceByBoletaUseCase();
        this.getCheckBoletaUpdateUseCase = new getCheckBoletaUpdateUseCase_1.GetCheckBoletaUpdateUseCase();
    }
}
exports.ServiceController = ServiceController;
