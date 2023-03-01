import { injectable, inject } from "tsyringe";
import ILocationRepository from '../../../repositories/ILocationRepository';
import dependencies from '../../../../../shared/container/dependencies';
import { ILocationTypeBody } from "@modules/locations/repositories/ILocationTypeRepository";
import { ILocationResponse } from "@modules/locations/dtos/ICreateLocationDTO";



@injectable()
export default class GetLocationsWithCoordinatesService{

    constructor (

        @inject(dependencies.LocationRepository)

        private locationsRepository: ILocationRepository
    ){

    }

    public async execute(coordinates:string): Promise<ILocationResponse[]>{



        const locations = await this.locationsRepository.getLocationsWithCoordinates(coordinates)

        return locations


    }

}