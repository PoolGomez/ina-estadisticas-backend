export class ServiceEntity{

    constructor (
        public id: string,
        public boleta: string,
        public congregacion: string,
        public fecha: string,
        public mes: string,
        public escuelaDominical: number,
        public invitados: number,
        public miembros: number,
        public asistencia: number,
        public oficiante: string,
        public ofrenda: number,
        public observacion: string,
    ){}

    
}

