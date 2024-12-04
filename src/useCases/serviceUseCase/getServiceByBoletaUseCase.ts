import { ServiceRepository } from "../../repositories";

export class GetServiceByBoletaUseCase{
    
    async getServiceByBoleta(boleta: string):Promise<boolean> {
        try {
            const serviceRepository = new ServiceRepository();
            const result = await serviceRepository.getByBoleta(boleta);
            if( result.length > 0){
                return true;
            }else{
                return false;
            }
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