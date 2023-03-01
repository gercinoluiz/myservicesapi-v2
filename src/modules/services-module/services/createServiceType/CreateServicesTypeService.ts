import { responseStatus, statusCode } from '@shared/helpers/status'
import { inject, injectable } from 'tsyringe'
import dependencies from '../../../../shared/container/dependencies'
import { AppError } from '../../../../shared/errors/AppError'
import IServiceTypeRepository, {
     IServiceTypeBody,
} from '../../repositories/IServiceTypeRepository'

@injectable()
export default class CreateServicesTypeService {
     constructor(
          @inject(dependencies.ServiceTypeRepository)
          private serviceTypeRepository: IServiceTypeRepository
     ) {}

     public async execute(body: IServiceTypeBody): Promise<any> {
          // TODO: Corrigir o envio do body completo

          const { name } = body

          if (!name) {
               throw new AppError(
                    'O tipo de Serviço deve possuir um nome',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          const serviceType = await this.serviceTypeRepository.create(body)

          return serviceType
     }
}
