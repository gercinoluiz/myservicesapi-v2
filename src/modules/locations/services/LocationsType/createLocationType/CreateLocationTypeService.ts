import { Request } from 'express'
import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import dependencies from '@shared/container/dependencies'
import ILocationTypeRepository, {
     ILocationTypeBody,
} from '@modules/locations/repositories/ILocationTypeRepository'
import { responseStatus, statusCode } from '@shared/helpers/status'

@injectable()
export default class CreateLocationTypeService {
     constructor(
          @inject(dependencies.LocationTypeRepository)
          private locationTypeRepositoy: ILocationTypeRepository
     ) {}

     //TODO: Change the request thing bellow, it has to come from a DTO
     public async execute({ name, active }: ILocationTypeBody): Promise<any> {
          // const checkLocationName = this.locationRepositoy.findByName()  ==> DEVO FAZER AINDA

          if (!name) {
               throw new AppError(
                    'Unidade deve possuir um nome',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          const locationType = await this.locationTypeRepositoy.create({
               name,
               active,
          })

          await locationType.save()

          return locationType
     }
}
