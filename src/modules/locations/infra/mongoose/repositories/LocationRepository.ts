import ILocationRepository from '../../../repositories/ILocationRepository'
import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO'
import LocationModule from '@modules/locations/infra/mongoose/entities/Location'
import {AppError} from '../../../../../shared/errors/AppError'
import mongoose from 'mongoose'

export default class LocationRepository implements ILocationRepository {
     public async create(data: ICreateLocationDTO): Promise<any> {
          const location = await LocationModule.create(data)

          console.log(
               'LocationRepository/create',
               JSON.stringify(data, null, 2)
          )

          await location.save()

          return location
     }

     public async delete(id: string): Promise<void> {
          //TODO: return an error here

          await LocationModule.deleteOne({ _id: id })
     }

     public async getOne(id: string): Promise<any> {
          const location = await LocationModule.findOne({ _id: id })

          return location
     }

     public async getAll(): Promise<any> {
          const location = await LocationModule.find()
               .populate({
                    path: 'services',
                    populate: {
                         path: 'service',
                         model: 'Service',
                    },
               })
               .select('-__v')
               .populate({ path: 'serviceTypes', select: 'name id' })
               .limit(100)

          return location
     }

     public async updateOne(id: string, body: object): Promise<any> {
          console.log(JSON.stringify(body, null, 4))

          const updatedLocation = await LocationModule.findByIdAndUpdate(
               { _id: id },
               body,
               { runValidators: true, useFindAndModify: false }
          ).select('-__v -_id -geographic_position -services')

          return { OLD: updatedLocation, NEW: body }
     }

     public async getLocationsWithCoordinates(
          coordinates: string
     ): Promise<any> {
          try {
               const [lat, lng] = coordinates.split(',')

               console.log({ lat, lng })

               const locations = await LocationModule.aggregate([
                    {
                         $geoNear: {
                              near: {
                                   type: 'Point',
                                   coordinates: [
                                        parseFloat(lng),
                                        parseFloat(lat),
                                   ],
                              },
                              distanceField: 'distance',
                              distanceMultiplier: 1.26 / 1000,
                         },
                    },
               ]).limit(100)

               //Techinique bellow is awesome

               const newLocationWithPopulate = await LocationModule.populate(
                    locations,
                    {
                         path: 'services',
                         populate: {
                              path: 'service',
                              model: 'Service',
                         },
                    }
               )

               return newLocationWithPopulate
          } catch (error) {
               console.log('########getLocationsWithCoordinates#####', {
                    error,
               })
          }
     }

     public async getNearLocationsByService(
          coordinates: string,
          serviceId: string
     ): Promise<any> {
          const [lat, lng] = coordinates.split(',')

          const serviceIdAsMongooseObjectType = mongoose.Types.ObjectId(
               serviceId
          )

          const locations = await LocationModule.aggregate([
               {
                    $geoNear: {
                         near: {
                              type: 'Point',
                              coordinates: [parseFloat(lng), parseFloat(lat)],
                         },
                         distanceField: 'distance',
                         distanceMultiplier: 1.26 / 1000,
                         query: { "services.service": serviceIdAsMongooseObjectType },
                    },
               },
          ]).limit(100)

          const newLocationWithPopulate = await LocationModule.populate(
               locations,
               {
                    path: 'services',
                    populate: {
                         path: 'service',
                         model: 'Service',
                    },
               }
          )

          return newLocationWithPopulate
     }

     public async getLocationByServiceType(
          serviceType: string,
          coordinates: string
     ): Promise<any> {
          const [lat, lng] = coordinates.split(',')

          const serviceTypeIdAsMongooseObjectType = mongoose.Types.ObjectId(
               serviceType
          )

          const locations = await LocationModule.aggregate([
               {
                    $geoNear: {
                         near: {
                              type: 'Point',
                              coordinates: [parseFloat(lng), parseFloat(lat)],
                         },
                         distanceField: 'distance',
                         distanceMultiplier: 1.26 / 1000,
                         query: {
                              serviceTypes: serviceTypeIdAsMongooseObjectType,
                         },
                    },
               },
          ]).limit(100)

          const newLocationWithPopulate = await LocationModule.populate(
               locations,
               {
                    path: 'services serviceTypes',
                    populate: {
                         path: 'service',
                         model: 'Service',
                    },
               }
          )

          return newLocationWithPopulate
     }

     public async getLocationByLocationType(
          locationType: string,
          coordinates: string
     ): Promise<any> {
          const [lat, lng] = coordinates.split(',')

          console.log({ locationType }, { coordinates })

          const locationTypeIdAsMongooseObjectType = mongoose.Types.ObjectId(
               locationType
          )

          const locations = await LocationModule.aggregate([
               {
                    $geoNear: {
                         near: {
                              type: 'Point',
                              coordinates: [parseFloat(lng), parseFloat(lat)],
                         },
                         distanceField: 'distance',
                         distanceMultiplier: 1.26 / 1000,
                         query: {
                              locationType: locationType,
                         },
                    },
               },
          ]).limit(100)

          const newLocationWithPopulate = await LocationModule.populate(
               locations,
               {
                    path: 'services serviceTypes',
                    populate: {
                         path: 'service',
                         model: 'Service',
                    },
               }
          )

          return newLocationWithPopulate
     }
}
