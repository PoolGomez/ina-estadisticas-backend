import { ServiceRepository } from "../../repositories";

export class GetCheckBoletaUpdateUseCase{
    
    async getCheckBoletaUpdate(id: string, boleta: string):Promise<boolean> {
        try {
            const serviceRepository = new ServiceRepository();
            const result = await serviceRepository.getByBoleta(boleta);
            for(const doc of result){
                if(doc.id !== id){
                    return false;
                }
            }
            return true;
        } catch (error:any) {
            throw {
                status: 400,
                message:'Error en GetServiceByBoleta : ' + error.message,
            }
        }
        // const serviceRepository = new ServiceRepository();
        // return await serviceRepository.getById(studentId);
    }
}