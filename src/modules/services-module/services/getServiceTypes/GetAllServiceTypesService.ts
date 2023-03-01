
import IServiceTypeRepository, { IServiceTypeBody } from "@modules/services-module/repositories/IServiceTypeRepository";
import { inject, injectable } from "tsyringe";

import dependencies from '../../../../shared/container/dependencies';






@injectable()
export default class GetAllServiceTypesService {

    constructor(

        @inject(dependencies.ServiceTypeRepository)
        private serviceTypeRepository: IServiceTypeRepository


    ){}


    public async execute ():Promise<Array<IServiceTypeRepository>>{

        const serviceTypes = await this.serviceTypeRepository.getAll()

        return serviceTypes

    }


}
