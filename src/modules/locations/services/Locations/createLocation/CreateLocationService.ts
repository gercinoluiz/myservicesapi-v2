import { Request } from 'express'
import { inject, injectable } from 'tsyringe'
import ILocationRepository from '../../../repositories/ILocationRepository'
import { AppError } from '../../../../../shared/errors/AppError'
import getCoordinates from '../../../../../shared/providers/GeoLocation/googleMaps/implementations/getLocationCoordinates'
import ICoordinates from '../../../../../shared/providers/GeoLocation/googleMaps/models/ICoordinates'
import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO'
import dependencies from '../../../../../shared/container/dependencies'
import { responseStatus, statusCode } from '@shared/helpers/status'

@injectable()
export default class CreateLocationService {
     constructor(
          @inject(dependencies.LocationRepository)
          private locationRepositoy: ILocationRepository,
          @inject(dependencies.getCoordinates)
          private getCoordinates: ICoordinates
     ) {}

     //TODO: Change the request thing bellow, it has to come from a DTO
     public async execute({
          name,
          geographic_position,
          address,
          services,
          contact_info,
          imagesUrl,
          serviceTypes,
          locationType,
          nickname,
          workingTime,
     }: ICreateLocationDTO): Promise<any> {
          // const checkLocationName = this.locationRepositoy.findByName()  ==> DEVO FAZER AINDA

          if (!name) {
               throw new AppError(
                    'Unidade deve possuir um nome',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          const { lat, lng } = await this.getCoordinates.getCoordinates(address)

          const location = await this.locationRepositoy.create({
               name,
               geographic_position: {
                    coordinates: [lng, lat],
               },
               address,
               services,
               contact_info,
               imagesUrl,
               serviceTypes,
               locationType,
               nickname,
               workingTime,
          })

          await location.save()

          return location
     }
}
