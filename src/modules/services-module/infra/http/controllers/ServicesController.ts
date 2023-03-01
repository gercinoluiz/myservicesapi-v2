import { Request, Response } from 'express'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { container } from 'tsyringe'
import CreateServicesService from '@modules/services-module/services/createService/CreateServicesService'
import GetOneServiceService from '@modules/services-module//services/getOneService/GetOneServiceService'
import GetAllServicesService from '@modules/services-module//services/getAllServices/GetAllServiceService'
import DeleteServiceService from '@modules/services-module/services/deleteService/DeleteServiceService'

export default class ServicesTypeController {
     public async create(
          request: Request,
          response: Response
     ): Promise<Response> {
          const data = request.body

          const createService = container.resolve(CreateServicesService)

          const service = await createService.execute(data)

          return response.status(statusCode.created).json({
               message: responseStatus.success,
               data: service,
          })
     }

     public async getOne(
          request: Request,
          response: Response
     ): Promise<Response> {
          const { id } = request.params

          const getOneService = container.resolve(GetOneServiceService)

          const service = await getOneService.execute(id)

          return response.status(statusCode.ok).json({
               message: responseStatus.success,
               data: service,
          })
     }

     public async getAll(
          request: Request,
          response: Response
     ): Promise<Response> {
          const getAllServices = container.resolve(GetAllServicesService)

          let services = await getAllServices.execute()

          return response.status(statusCode.ok).json({
               lenght: services.length,
               message: responseStatus.success,
               data: services,
          })
     }

     public async deletOne(
          request: Request,
          response: Response
     ): Promise<Response> {
          const serviceId = request.params.serviceId

          const deleteService = container.resolve(DeleteServiceService)

          await deleteService.execute(serviceId)

          return response.status(204).json()
     }
}
