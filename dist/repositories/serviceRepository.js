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
exports.ServiceRepository = void 0;
const adapters_1 = require("../adapters");
const serviceCollection = "servicios";
class ServiceRepository {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const querySnapshot = yield adapters_1.db.collection(serviceCollection).get();
                    const servicios = querySnapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
                    resolve(servicios);
                }
                catch (error) {
                    console.log("error getAll ServiceRepository");
                    reject(error);
                }
            }));
        });
        this.getById = (serviceId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const document = yield adapters_1.db.collection(serviceCollection).doc(serviceId).get();
                    const documentoCurrent = Object.assign({ id: document.id }, document.data());
                    resolve(documentoCurrent);
                }
                catch (error) {
                    console.log("error getById ServiceRepository");
                    reject(error);
                }
            }));
        });
        this.getByBoleta = (boleta) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const document = yield adapters_1.db.collection(serviceCollection).where('boleta', '==', boleta).get();
                    const docs = document.docs.map(item => (Object.assign({ id: item.id }, item.data())));
                    console.log("[document]", docs);
                    // if(document.size>0){
                    //     resolve(true);
                    // }
                    resolve(docs);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
        this.create = (service) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const newService = {
                        boleta: service.boleta,
                        congregacion: service.congregacion,
                        fecha: service.fecha,
                        mes: service.mes,
                        escuelaDominical: service.escuelaDominical,
                        invitados: service.invitados,
                        miembros: service.miembros,
                        asistencia: service.asistencia,
                        oficiante: service.oficiante,
                        ofrenda: service.ofrenda,
                        observacion: service.observacion,
                    };
                    const result = yield adapters_1.db.collection(serviceCollection).add(newService);
                    resolve(Object.assign(Object.assign({}, newService), { id: result.id }));
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
        this.update = (serviceId, updateService) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const newService = {
                        boleta: updateService.boleta,
                        congregacion: updateService.congregacion,
                        fecha: updateService.fecha,
                        mes: updateService.mes,
                        escuelaDominical: updateService.escuelaDominical,
                        invitados: updateService.invitados,
                        miembros: updateService.miembros,
                        asistencia: updateService.asistencia,
                        oficiante: updateService.oficiante,
                        ofrenda: updateService.ofrenda,
                        observacion: updateService.observacion,
                    };
                    yield adapters_1.db.collection(serviceCollection)
                        .doc(serviceId)
                        .update(newService);
                    resolve(updateService);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
        this.delete = (serviceId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const docRef = adapters_1.db.collection(serviceCollection).doc(serviceId);
                    const docSnapshot = yield docRef.get();
                    if (!docSnapshot.exists) {
                        resolve(false);
                        return;
                    }
                    yield docRef.delete();
                    resolve(true);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
}
exports.ServiceRepository = ServiceRepository;
