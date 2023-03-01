import mongoose, { Schema, Document } from 'mongoose'

export interface IMongooseLocation extends Document {
     name: string
     geographic_position: {}
     address: {}
     services: []
     contact_info: {
          mobile: String
          phone: String
          email: String
          website: String
          scheduleWebSite: String
     }
     workingTime: string

     imagesUrl: []
     status: string

     avatarUrl: string
     nickname: string
     description: string
     serviceTypes: []
     locationType: string
     admType: string
}

const locationSchema: Schema = new Schema({
     name: {
          type: String,
     },
     geographic_position: {
          type: {
               type: String,
               default: 'Point',
               enum: ['Point'],
          },
          coordinates: [Number],
     },
     address: {
          street: String,
          number: String,
          city: String,
          country: String,
          description: String,
          cep: String,
     },

     contact_info: {
          mobile: String,
          phone: String,
          email: String,
          website: String,
          scheduleWebSite: String,
     },

     services: [
          {
               service: {
                    type: Schema.Types.ObjectId,
                    ref: 'Service',
               },
               workingTime: [
                    {
                         _id: false,
                         weekDay: String,
                         hours: [
                              {
                                   _id: false,

                                   start: String,
                                   end: String,
                              },
                         ],
                    },
               ],
          },
     ],

     workingTime: [
          {
               _id: false,
               weekDay: String,
               hours: {
                    start: String,
                    end: String,
               },
          },
     ],

     serviceTypes: [
          {
               type: Schema.Types.ObjectId,
               ref: 'ServiceType',
          },
     ],

     locationType: {
          type: Schema.Types.ObjectId,
          ref: 'LocationType',
     },

     imagesUrl: [],

     avatarUrl: String,

     nickname: String,

     description: String,

     status: {
          type: String,
          default: 'Ativa',
     },

     admType: String,
})

locationSchema.index({
     geographic_position: '2dsphere',
})

export default mongoose.model<IMongooseLocation>('Location', locationSchema)
