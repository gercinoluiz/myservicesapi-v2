import mongoose, { Schema,Document } from "mongoose"





export interface IMongooseService extends Document {

    name: string,
    email: string,
    phone: string,
    message: string,



}


const feedBackMessages : Schema = new Schema ({

    name: String,
    email: String,
    phone: String,
    message: String,




})


export default mongoose.model<IMongooseService>('feedBackMessages', feedBackMessages)

