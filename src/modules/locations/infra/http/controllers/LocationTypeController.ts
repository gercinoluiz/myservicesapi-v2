import CreateLocationTypeService from '@modules/locations/services/LocationsType/createLocationType/CreateLocationTypeService'
import GetAllLocationTypesService from '@modules/locations/services/LocationsType/getAllLocationTypes/GetAllLocationTypesService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { responseStatus, statusCode } from '@shared/helpers/status'

export default class LocationTypeController {
     public async create(
          request: Request,
          response: Response
     ): Promise<Response> {
          const data = request.body

          const createLocationType = container.resolve(
               CreateLocationTypeService
          )

          const locationType = await createLocationType.execute(data)

          return response.status(statusCode.created).json({
               status: responseStatus.success,
               data: locationType,
          })
     }

     // public async delete(request: Request, response: Response): Promise<Response> {

     //     const locationId = request.params.locationId

     //     const deleteLocation = container.resolve(DeleteLocationService)

     //     await deleteLocation.execute(locationId)

     //     return response.status(204).json()

     // }

     // public async getOne(request: Request, response: Response): Promise<Response> {

     //     const locationId = request.params.locationId

     //     const getOneLocationService = container.resolve(GetOneLocationService)

     //     const location = await getOneLocationService.execute(locationId)

     //     return response.status(statusCode.ok).json({
     //         message: responseStatus.success,
     //         data: location
     //     })

     // }

     public async getAll(
          request: Request,
          response: Response
     ): Promise<Response> {
          
          const getAllLocationsTypes = container.resolve(
               GetAllLocationTypesService
          )

          const locationsTypes = await getAllLocationsTypes.execute()

          return response.status(statusCode.ok).json({
               message: responseStatus.success,
               data: locationsTypes,
          })
     }

     // public async updateOne(request: Request, response: Response): Promise<Response> {

     //     const { locationId } = request.params

     //     const updateOneLocationService = container.resolve(UpdateOneLocationService)

     //     const updatedLocation = await updateOneLocationService.execute(locationId, request.body)

     //     return response.status(statusCode.ok).json({
     //         message: responseStatus.success,
     //         data: updatedLocation
     //     })

     // }

     // public async getLocationsWithCoordinates(request: Request, response: Response): Promise<Response> {

     //     const coordinates = request.params.coordinates

     //     const getLocationsWithCoordinates = container.resolve(GetLocationsWithCoordinatesService)

     //     const locations = await getLocationsWithCoordinates.execute(coordinates)

     //     return response.status(statusCode.ok).json({
     //         message: responseStatus.success,
     //         data: locations
     //     })

     // }

     // public async getNearLocationsByService(request: Request, response: Response): Promise<Response> {

     //     let locations;

     //     try {

     //         const { coordinates, serviceId } = request.params

     //         const { address, serviceName } = request.body

     //         const getLocationByServiceAndCoordinatesService = container.resolve(GetLocationByServiceAndCoordinatesService)

     //         //TODO: Get Things Beyond Coordinates

     //         locations = await getLocationByServiceAndCoordinatesService.execute(coordinates, serviceId)

     //         //############## Generating Report after everything ################

     //         const generateReport = container.resolve(GenerateReportService)

     //         await generateReport.execute(coordinates, serviceId, serviceName, address)

     //     } catch (error) {

     //         messages.logs('LocationTypeController/getNearLocationsByService', error)

     //     }

     //     return response.status(statusCode.ok).json({
     //         message: responseStatus.success,
     //         data: locations
     //     })

     // }
}
