import mongoose, { Schema, Document } from 'mongoose'

export interface IMongooseServiceType extends Document {
     name: string
     active: boolean,
     description:string,
     icon?:string
}

const serviceTypeSchema: Schema = new Schema({
     name: {
          type: String,
          unique: true,
     },

     active: Boolean,

     description:String,

     icon: String,

})

export default mongoose.model<IMongooseServiceType>('ServiceType', serviceTypeSchema)
