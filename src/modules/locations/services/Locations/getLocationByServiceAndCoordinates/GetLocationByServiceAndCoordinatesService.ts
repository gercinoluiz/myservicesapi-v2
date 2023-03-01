

import { injectable, inject } from "tsyringe";
import ILocationRepository from '../../../repositories/ILocationRepository';
import dependencies from '../../../../../shared/container/dependencies';
import { ILocationTypeBody } from "@modules/locations/repositories/ILocationTypeRepository";
import { ILocationResponse } from "@modules/locations/dtos/ICreateLocationDTO";




@injectable()


export default class GetLocationByServiceAndCoordinatesService {
    constructor(
        

        @inject(dependencies.LocationRepository)
        private locationsRepository: ILocationRepository

    ){}

    public async execute (coordinates:string, serviceId:string): Promise<ILocationResponse[]>{

        const location = await this.locationsRepository.getNearLocationsByService(coordinates, serviceId)

        return location

    }
}