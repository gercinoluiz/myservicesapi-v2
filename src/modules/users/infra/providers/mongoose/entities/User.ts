import { ICreateUserDTO } from '@modules/users/dtos/userDTO'
import mongoose, { Schema, Document } from 'mongoose'

export interface IMongooseUser extends Document, ICreateUserDTO {
     refreshToken:string

}

const userSchema: Schema = new Schema({

     userId:String,

     name: String,
     

     address: {
          street: String,
          number: String,
          city: String,
          country: String,
          description: String,
          cep: String,
     },

     email: String,

     contact_info: {
          mobile: String,
          phone: String,
          facebook:String,
          instagram:String,
          twitter:String

     },

     avatarUrl: String,

     nickname: String,

     description: String,

     password: String,

     role:{
          type:String,
          enum:['admin' , 'manager' , 'user']
     },

     provider: {
          type:String,
          enum :['other', 'google', 'apple', 'application']
     },

     refreshToken:String
})

const UserModel = mongoose.model<IMongooseUser>('User', userSchema)

export { UserModel }
