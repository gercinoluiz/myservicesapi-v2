import { Request } from 'express'
import { inject, injectable } from 'tsyringe'
import {AppError} from '@shared/errors/AppError'
import dependencies from '@shared/container/dependencies'
import ILocationTypeRepository, {
     ILocationTypeBody,
} from '@modules/locations/repositories/ILocationTypeRepository'

@injectable()
export default class GetAllLocationTypesService {
     
     constructor(
          @inject(dependencies.LocationTypeRepository)
          private locationTypeRepositoy: ILocationTypeRepository
     ) {}

     //TODO: Change the request thing bellow, it has to come from a DTO
     public async execute(): Promise<any> {
          // const checkLocationName = this.locationRepositoy.findByName()  ==> DEVO FAZER AINDA


          const locationTypes = await this.locationTypeRepositoy.getAll()

          console.log({locationTypes})

          
          return locationTypes
     }
}
