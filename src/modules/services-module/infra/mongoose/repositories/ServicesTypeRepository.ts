
import ServiceType from '@modules/services-module/infra/mongoose/entities/ServiceType';
import IServiceTypeRepository, { IServiceTypeBody } from '@modules/services-module/repositories/IServiceTypeRepository';



export default class ServiceTypeRepository implements IServiceTypeRepository{


    public async create(data: IServiceTypeBody):Promise<any>{
        

        const service = await ServiceType.create(data)


        return service

    }

    public async getOne(id:string):Promise<any>{
        const service = await ServiceType.findById(id)

        return service
    }

    public async getAll():Promise<any>{

        const services = await ServiceType.find().sort('name')

        return services
    }

    public async deleteOne(serviceId:string):Promise<void>{

        console.log({serviceId})

            await ServiceType.findByIdAndDelete(serviceId)
        
    }

}