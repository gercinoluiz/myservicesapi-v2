import { inject, injectable } from "tsyringe";
import IServicesRepository  from '@modules/services-module/repositories/IServiceRepository';
import dependencies from '../../../../shared/container/dependencies';






@injectable()
export default class GetOneServiceService {

    constructor(

        @inject(dependencies.ServiceRepository)
        private serviceRepository: IServicesRepository


    ){}


    public async execute (id:string):Promise<any>{

        const service = await this.serviceRepository.getOne(id)

        return service

    }


}
