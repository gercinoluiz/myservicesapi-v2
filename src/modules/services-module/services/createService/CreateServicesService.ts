import { inject, injectable } from 'tsyringe'

import IServicesRepository from '@modules/services-module/repositories/IServiceRepository'
import { IServiceBody } from '../../repositories/IServiceRepository'
import { AppError } from '../../../../shared/errors/AppError'
import dependencies from '../../../../shared/container/dependencies'
import { responseStatus, statusCode } from '@shared/helpers/status'

@injectable()
export default class CreateServicesService {
     constructor(
          @inject(dependencies.ServiceRepository)
          private serviceRepository: IServicesRepository
     ) {}

     public async execute(body: IServiceBody): Promise<any> {
          // TODO: Corrigir o envio do body completo

          const { active, name } = body

          if (!name) {
               throw new AppError(
                    'O Serviço deve possuir um nome',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }
          

          const service = await this.serviceRepository.create(body)

          return service
     }
}
