import { GetLocationByLocationTypeService } from '@modules/locations/services/Locations/getLocationByLocationType/GetLocationByLocationTypeService'
import { GetLocationByServiceTypeService } from '@modules/locations/services/Locations/getLocationByServiceType/GetLocationByServiceTypeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import messages from '../../../../../shared/helpers/messages'
import { responseStatus, statusCode } from '../../../../../shared/helpers/status'
import CreateLocationService from '../../../services/Locations/createLocation/CreateLocationService'
import DeleteLocationService from '../../../services/Locations/deleteLocation/DeleteLocationService'
import GenerateReportService from '../../../services/Locations/generateReport/GenerateReportService'
import GetAllLocationsService from '../../../services/Locations/getAllLocations/GetAllLocationsService'
import GetLocationByServiceAndCoordinatesService from '../../../services/Locations/getLocationByServiceAndCoordinates/GetLocationByServiceAndCoordinatesService'
import GetLocationsWithCoordinatesService from '../../../services/Locations/getLocationsWithCoordinates/GetLocationsWithCoordinatesService'
import GetOneLocationService from '../../../services/Locations/getOneLocation/GetOneLocationService'
import UpdateOneLocationService from '../../../services/Locations/updateOneLocation/UpdateOneLocationService'

export default class LocationController {
     public async create(
          request: Request,
          response: Response
     ): Promise<Response> {
          const data = request.body

          const createLocation = container.resolve(CreateLocationService)

          const location = await createLocation.execute(data)

          return response.status(statusCode.created).json({
               status: responseStatus.success,
               data: location,
          })
     }

     public async delete(
          request: Request,
          response: Response
     ): Promise<Response> {
          const locationId = request.params.locationId

          const deleteLocation = container.resolve(DeleteLocationService)

          await deleteLocation.execute(locationId)

          return response.status(statusCode.noContent).json({
               message: responseStatus.success,
          })
     }

     public async getOne(
          request: Request,
          response: Response
     ): Promise<Response> {
          const locationId = request.params.locationId

          const getOneLocationService = container.resolve(GetOneLocationService)

          const location = await getOneLocationService.execute(locationId)

          return response.status(statusCode.ok).json({
               message: responseStatus.success,
               data: location,
          })
     }

     public async getAll(
          request: Request,
          response: Response
     ): Promise<Response> {
          const getAllLocations = container.resolve(GetAllLocationsService)

          const locations = await getAllLocations.execute()

          return response.status(statusCode.ok).json({
               message: responseStatus.success,
               length: locations.length,
               data: locations,
          })
     }

     public async updateOne(
          request: Request,
          response: Response
     ): Promise<Response> {
          const { locationId } = request.params

          const updateOneLocationService = container.resolve(
               UpdateOneLocationService
          )

          const updatedLocation = await updateOneLocationService.execute(
               locationId,
               request.body
          )

          return response.status(statusCode.ok).json({
               message: responseStatus.success,
               data: updatedLocation,
          })
     }

     public async getLocationsWithCoordinates(
          request: Request,
          response: Response
     ): Promise<Response> {
          const coordinates = request.params.coordinates

          const getLocationsWithCoordinates = container.resolve(
               GetLocationsWithCoordinatesService
          )

          const locations = await getLocationsWithCoordinates.execute(
               coordinates
          )

          return response.status(statusCode.ok).json({
               message: responseStatus.success,
               length: locations.length,

               data: locations,
          })
     }

     public async getNearLocationsByService(
          request: Request,
          response: Response
     ): Promise<Response> {
          let locations

          try {
               const { coordinates, serviceId } = request.params

               const { address, serviceName } = request.body

               const getLocationByServiceAndCoordinatesService = container.resolve(
                    GetLocationByServiceAndCoordinatesService
               )

               //TODO: Get Things Beyond Coordinates

               locations = await getLocationByServiceAndCoordinatesService.execute(
                    coordinates,
                    serviceId
               )

               //############## Generating Report after everything ################

               const generateReport = container.resolve(GenerateReportService)

               await generateReport.execute(
                    coordinates,
                    serviceId,
                    serviceName,
                    address
               )

               return response.status(statusCode.ok).json({
                    message: responseStatus.success,
                    length: locations?.length,

                    data: locations,
               })
          } catch (error) {
               messages.logs(
                    'LocationController/getNearLocationsByService',
                    error
               )

               return response.status(statusCode.ok).json({
                    message: responseStatus.fail,

                    data: [],
               })
          }
     }

     public async getLocationsByServiceType(
          request: Request,
          response: Response
     ): Promise<Response> {
          const { serviceType, coordinates } = request.params

          const getLocationByServiceTypeService = container.resolve(
               GetLocationByServiceTypeService
          )

          const locations = await getLocationByServiceTypeService.execute(
               serviceType,
               coordinates
          )

          return response.status(statusCode.ok).json({
               lenght: locations.length,
               message: responseStatus.success,
               data: locations,
          })
     }

     public async getLocationsByLocationType(
          request: Request,
          response: Response
     ): Promise<Response> {
          const { locationType, coordinates } = request.params

          const getLocationByLocationTypeService = container.resolve(
               GetLocationByLocationTypeService
          )

          const locations = await getLocationByLocationTypeService.execute(
               locationType,
               coordinates
          )

          return response.status(statusCode.ok).json({
               lenght: locations.length,
               message: responseStatus.success,
               data: locations,
          })
     }
}
