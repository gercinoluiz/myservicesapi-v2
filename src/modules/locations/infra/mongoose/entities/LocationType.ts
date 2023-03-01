import mongoose, { Schema, Document } from 'mongoose'

export interface IMongooseLocation extends Document {
     name: string
     active: boolean
}

const locationTypeSchema: Schema = new Schema({
     name: {
          type: String,
          unique: true,
     },

     active: Boolean,
})

export default mongoose.model<IMongooseLocation>('LocationType', locationTypeSchema)
