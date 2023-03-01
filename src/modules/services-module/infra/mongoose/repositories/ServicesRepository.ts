import IServicesRepository from '../../../repositories/IServiceRepository'
import { IServiceBody } from '../../../repositories/IServiceRepository'
import ServiceModule from '@modules/services-module/infra/mongoose/entities/Service'
import { AppError } from '@shared/errors/AppError'
import { responseStatus, statusCode } from '@shared/helpers/status'

export default class ServiceRepository implements IServicesRepository {
     public async create(data: IServiceBody): Promise<any> {
          try {
               const service = await ServiceModule.create(data)
               return service
          } catch (error) {
               const err = error as any

               if (err.code === 11000) {
                    throw new AppError(
                         'Serviço já existente',
                         statusCode.forbidden,
                         responseStatus.notAllowed
                    )
               }
          }
     }

     public async getOne(id: string): Promise<any> {
          const service = await ServiceModule.findById(id)

          return service
     }

     public async getAll(): Promise<any> {
          const services = await ServiceModule.find()
               .populate('serviceType')
               .select('-__v')
               .sort('name')

          // O serviceType acima, é a coluna que quero popular nessa collection em especico nao na que to buscando
          // ref: https://pt.stackoverflow.com/questions/493106/populate-mongoose-s%C3%B3-retorna-objectid

          return services
     }

     public async deleteOne(serviceId: string): Promise<void> {
          

          await ServiceModule.findByIdAndDelete(serviceId)
     }
}
