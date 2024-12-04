"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEntity = void 0;
class ServiceEntity {
    constructor(id, boleta, congregacion, fecha, mes, escuelaDominical, invitados, miembros, asistencia, oficiante, ofrenda, observacion) {
        this.id = id;
        this.boleta = boleta;
        this.congregacion = congregacion;
        this.fecha = fecha;
        this.mes = mes;
        this.escuelaDominical = escuelaDominical;
        this.invitados = invitados;
        this.miembros = miembros;
        this.asistencia = asistencia;
        this.oficiante = oficiante;
        this.ofrenda = ofrenda;
        this.observacion = observacion;
    }
}
exports.ServiceEntity = ServiceEntity;
