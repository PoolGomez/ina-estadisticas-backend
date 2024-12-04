
import { db } from "../adapters"
import { ServiceEntity } from "../entities";

const serviceCollection = "servicios";

export class ServiceRepository {

    

    public getAll = async (): Promise<ServiceEntity[]> => {
        return new Promise<ServiceEntity[]> (async (resolve, reject) => {
            try {
                const querySnapshot = await db.collection(serviceCollection).get();
                const servicios = querySnapshot.docs.map(doc =>({
                    id:doc.id,
                    ...doc.data()
                }))
                resolve(servicios as ServiceEntity[]);
            } catch (error) {
                console.log("error getAll ServiceRepository")
                reject(error)
            }
            
        })
    }

    public getById = async (serviceId: string): Promise<ServiceEntity | null> => {
        return new Promise<ServiceEntity | null>(async (resolve, reject) => {
            try {
                const document = await db.collection(serviceCollection).doc(serviceId).get();
                
                const documentoCurrent = {
                    id: document.id,
                    ...document.data()
                }
                resolve(documentoCurrent as ServiceEntity);
            } catch (error) {
                console.log("error getById ServiceRepository")
                reject(error)
            }
        })
    }

    public getByBoleta = async (boleta: string): Promise<ServiceEntity[]>=>{
        return new Promise<ServiceEntity[]>(async (resolve, reject) => {
            try {
                const document = await db.collection(serviceCollection).where('boleta','==',boleta).get();
                const docs = document.docs.map( item => ({
                    id: item.id,
                    ...item.data()
                }))
                console.log("[document]",docs)
                // if(document.size>0){
                //     resolve(true);
                // }
                resolve(docs as ServiceEntity[]);

            } catch (error) {
                reject(error)
            }
        })
    }

    public create = async (service : ServiceEntity) : Promise<ServiceEntity> => {
        return new Promise<ServiceEntity>(async (resolve, reject) => {
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
                }
                const result = await db.collection(serviceCollection).add(newService);
                resolve({
                    ...newService,
                    id: result.id,
                });
            } catch (error) {
                reject(error)
            }
        })
    }
    public update = async(serviceId: string, updateService: ServiceEntity): Promise<ServiceEntity | null> => {
        return new Promise<ServiceEntity | null>(async (resolve, reject) => {
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
                }

                await db.collection(serviceCollection)
                    .doc(serviceId)
                    .update(newService);
                resolve(updateService)
            } catch (error) {
                reject(error)
            }
        })
    }

    public delete = async (serviceId: string): Promise<boolean> => {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const docRef = db.collection(serviceCollection).doc(serviceId);
                const docSnapshot = await docRef.get()
                if(!docSnapshot.exists){
                    resolve(false)
                    return
                }
                await docRef.delete();                
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

}


