import { NextFunction, Request, Response } from "express";
import { CreateServiceUseCase, DeleteServiceUseCase, GetServicesListUseCase, GetServiceUseCase, UpdateServiceUseCase } from "../useCases";
import { ServiceEntity } from "../entities";
import { GetServiceByBoletaUseCase } from "../useCases/serviceUseCase/getServiceByBoletaUseCase";
import { GetCheckBoletaUpdateUseCase } from "../useCases/serviceUseCase/getCheckBoletaUpdateUseCase";


export class ServiceController {

    private readonly getServicesListUseCase : GetServicesListUseCase;
    private readonly getServiceUseCase : GetServiceUseCase;
    private readonly createServiceUseCase : CreateServiceUseCase;
    private readonly updateServiceUseCase: UpdateServiceUseCase;
    private readonly deleteServiceUseCase: DeleteServiceUseCase;
    private readonly getServiceByBoleta : GetServiceByBoletaUseCase;
    private readonly getCheckBoletaUpdateUseCase : GetCheckBoletaUpdateUseCase;

    constructor(){
        this.getServicesListUseCase = new GetServicesListUseCase();
        this.getServiceUseCase = new GetServiceUseCase();
        this.createServiceUseCase = new CreateServiceUseCase();
        this.updateServiceUseCase = new UpdateServiceUseCase();
        this.deleteServiceUseCase = new DeleteServiceUseCase();
        this.getServiceByBoleta = new GetServiceByBoletaUseCase();
        this.getCheckBoletaUpdateUseCase = new GetCheckBoletaUpdateUseCase();
    }

    getServicesList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log("[REQUEST_USER]",req)
            // console.log("[access_token] ",JSON.stringify(req.cookies.access_token));
            // console.log("resultVerify:",resultVerify.rol)
            // if(resultVerify as string === 'admin'){

            // }


            const result = await this.getServicesListUseCase.getServicesList();
            
            res.status(200).json({
                code: "success",
                message: "Servicios cargados correctamente",
                data: result
            })
            // throw {
            //     status: 400,
            //     message:'Error de prueba'
            // };
        } catch (error) {
            next(error);
        }
        
        // this.getServicesListUseCase.getServicesList()
        //     .then(services => res.json(services))
        //     .catch(err => res.status(400).json(err));
    }
    getService  = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const {id} = req.params;
            const serviceId = id;
            const result = await this.getServiceUseCase.getService(serviceId);
            res.status(200).json({
                code: "success",
                message: "Servicio encontrado correctamente",
                data: result
            })
            // res.status(200).json(result)
                    
        } catch (error) {
            next(error);
        }
        // const {id} = req.params;
        // const serviceId = id;
        // this.getServiceUseCase.getService(serviceId)
        //         .then(service => res.status(201).json(service))
        //         .catch(err => res.status(400).json(err));
    }
    createService = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const service = new ServiceEntity(
                "",
                req.body.boleta,
                req.body.congregacion,
                req.body.fecha,
                req.body.mes,
                req.body.escuelaDominical,
                req.body.invitados,
                req.body.miembros,
                req.body.asistencia,
                req.body.oficiante,
                req.body.ofrenda,
                req.body.observacion
            )
            const verification = await this.getServiceByBoleta.getServiceByBoleta(service.boleta);
            console.log("[verification]",verification)
            if(verification){
                res.status(200).json({
                    code: 'warning',
                    message: "El número de boleta ya existe",
                    data: null,
                    dataArray: null,
                })
                // throw new Error('El número de boleta debe ser único')
            }else{
                const result = await this.createServiceUseCase.createService(service)
                res.status(200).json({
                    code:"success",
                    message: "Registro correcto",
                    data: result,
                    dataArray: null
                })
            }
        } catch (error) {
            next(error)
        }
    }
    updateService = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const {id } = req.params;
            const service = new ServiceEntity(
                id,
                req.body.boleta,
                req.body.congregacion,
                req.body.fecha,
                req.body.mes,
                req.body.escuelaDominical,
                req.body.invitados,
                req.body.miembros,
                req.body.asistencia,
                req.body.oficiante,
                req.body.ofrenda,
                req.body.observacion                
            )
            const verification =  await this.getCheckBoletaUpdateUseCase.getCheckBoletaUpdate(id, service.boleta);
            if(!verification){
                res.status(200).json({
                    code: 'warning',
                    message: "El número de boleta ya existe en otro servicio",
                    data: null,
                    dataArray: null,
                })
            }else{
                const result = await this.updateServiceUseCase.updateService(id, service)
                res.status(200).json({
                    code:"success",
                    message: "Registro actualizado",
                    data: result,
                    dataArray: null
                })
            }

            
        } catch (error) {
            next(error)
        }
    }
    deleteService = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const result = await this.deleteServiceUseCase.deleteService(id);
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}