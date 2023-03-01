import { inject, injectable } from "tsyringe";
import IServicesRepository  from '@modules/services-module/repositories/IServiceRepository';
import dependencies from '../../../../shared/container/dependencies';






@injectable()
export default class GetAllServicesService {

    constructor(

        @inject(dependencies.ServiceRepository)
        private serviceRepository: IServicesRepository


    ){}


    public async execute ():Promise<Array<IServicesRepository>>{

        const services = await this.serviceRepository.getAll()

        return services

    }


}
