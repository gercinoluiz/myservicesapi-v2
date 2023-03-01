import ILocationRepository from '@modules/locations/repositories/ILocationRepository'
import { ILocationTypeBody } from '@modules/locations/repositories/ILocationTypeRepository'
import dependencies from '@shared/container/dependencies'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetLocationByLocationTypeService {
     constructor(
          @inject(dependencies.LocationRepository)
          private locationRepository: ILocationRepository
     ) {}


     public async execute (locationTypeId:string, coordinates:string): Promise<ILocationTypeBody[]>{
         const locations = await this.locationRepository.getLocationByLocationType(locationTypeId, coordinates)

         

         return locations
     }
}
