import { ILocationResponse } from '@modules/locations/dtos/ICreateLocationDTO'
import ILocationRepository from '@modules/locations/repositories/ILocationRepository'
import { ILocationTypeBody } from '@modules/locations/repositories/ILocationTypeRepository'
import dependencies from '@shared/container/dependencies'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetLocationByServiceTypeService {
     constructor(
          @inject(dependencies.LocationRepository)
          private locationRepository: ILocationRepository
     ) {}


     public async execute (serviceId:string, coordinates:string) : Promise<ILocationResponse[]>{
         const locations = await this.locationRepository.getLocationByServiceType(serviceId, coordinates)

         

         return locations
     }
}
