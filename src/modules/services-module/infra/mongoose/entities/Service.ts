import mongoose, { Schema, Document } from 'mongoose'

export interface IMongooseService extends Document {
     name: string
     active: boolean
     description: string
     isOnline: boolean
     serviceType:any
}

const serviceSchema: Schema = new Schema({
     name: {
          type: String,
          unique: true,
     },

     active: Boolean,

     description: String,

     isOnline: Boolean,

     serviceType: {
          type: Schema.Types.ObjectId,
          ref: 'ServiceType',
     },
})

export default mongoose.model<IMongooseService>('Service', serviceSchema)
