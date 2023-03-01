import { Request, Response } from 'express'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { container } from 'tsyringe'
import CreateServicesService from '../../../services/createService/CreateServicesService'
import GetOneServiceService from '../../../services/getOneService/GetOneServiceService'
import GetAllServicesService from '../../../services/getAllServices/GetAllServiceService'
import DeleteServiceService from '@modules/services-module/services/deleteService/DeleteServiceService'
import CreateServicesTypeService from '@modules/services-module/services/createServiceType/CreateServicesTypeService'
import GetAllServiceTypesService from '@modules/services-module/services/getServiceTypes/GetAllServiceTypesService'

export default class ServicesTypeController {
     public async create(
          request: Request,
          response: Response
     ): Promise<Response> {
          const data = request.body

          const createService = container.resolve(CreateServicesTypeService)

          const serviceType = await createService.execute(data)

          return response.status(statusCode.created).json({
               message: responseStatus.success,

               data: serviceType,
          })
     }

     //  public async getOne(
     //       request: Request,
     //       response: Response
     //  ): Promise<Response> {
     //       const { id } = request.params

     //       const getOneService = container.resolve(GetOneServiceService)

     //       const service = await getOneService.execute(id)

     //       return response.status(statusCode.ok).json({
     //            message: responseStatus.success,
     //            data: service,
     //       })
     //  }

     public async getAll(
          request: Request,
          response: Response
     ): Promise<Response> {
          const getAllServiceTypes = container.resolve(
               GetAllServiceTypesService
          )

          let services = await getAllServiceTypes.execute()

          return response.status(statusCode.ok).json({
               quantity: services.length,
               message: responseStatus.success,
               data: services,
          })
     }

     //  public async deletOne(
     //       request: Request,
     //       response: Response
     //  ): Promise<Response> {
     //       const serviceId = request.params.serviceId

     //       const deleteService = container.resolve(DeleteServiceService)

     //       await deleteService.execute(serviceId)

     //       return response.status(204).json()
     //  }
}
