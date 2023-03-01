import LocationTypeModule from '@modules/locations/infra/mongoose/entities/LocationType'
import ILocationTypeRepository, {
     ILocationTypeBody,
} from '@modules/locations/repositories/ILocationTypeRepository'

export default class LocationTypeRepository implements ILocationTypeRepository {
     
     public async create(data: ILocationTypeBody): Promise<any> {
          const locationType = await LocationTypeModule.create(data)

          await locationType.save()

          return locationType
     }

     // public async delete(id: string): Promise<void> {
     //      //TODO: return an error here

     //      await LocationModule.deleteOne({ _id: id })
     // }

     // public async getOne(id: string): Promise<any> {
     //      const location = await LocationModule.findOne({ _id: id })

     //      return location
     // }

     public async getAll(): Promise<any> {
          const locationTypes = await LocationTypeModule.find()

          console.log({locationTypes})

          return locationTypes
     }

     // public async updateOne(id: string, body: object): Promise<any> {
     //      console.log(JSON.stringify(body, null, 4))

     //      const updatedLocation = await LocationModule.findByIdAndUpdate(
     //           { _id: id },
     //           body,
     //           { runValidators: true, useFindAndModify: false }
     //      ).select('-__v -_id -geographic_position -services')

     //      return { OLD: updatedLocation, NEW: body }
     // }

     
}
