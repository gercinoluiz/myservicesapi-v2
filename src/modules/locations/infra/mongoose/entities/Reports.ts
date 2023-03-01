import mongoose, { Schema, Document } from "mongoose"





export interface IMongooseReport extends Document {

    serviceId: string,
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    address: {}
    serviceName:string

}


const reportSchema: Schema = new Schema({

    serviceId: {
        type: Schema.Types.ObjectId,
        ref: "Service",
    },
    serviceName: String,

    coordinates: {
        type: {
            type: String,
            default: "Point",
            enum: ["Point"],
        },
        coordinates: [Number]
    },

    address: {}

})

reportSchema.index({
    coordinates: '2dsphere'
})



export default mongoose.model<IMongooseReport>('Report', reportSchema)

