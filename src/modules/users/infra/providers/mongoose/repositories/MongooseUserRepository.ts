import {
     ICreateUserDTO
} from '@modules/users/dtos/userDTO'
import { IUser } from '@modules/users/repositories/IUser'
import { AppError } from '@shared/errors/AppError'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { UserModel } from '../entities/User'

export default class MongooseUserRepository implements IUser {
     async findById(id: string): Promise<any> {

          const user = await UserModel.findOne({ userId: id })

          if (!user)
               throw new AppError(
                    'Usuário inválido',
                    statusCode.badRequest,
                    responseStatus.fail
               )

          return user
     }
     public async createUser({
          name,
          password,
          address,
          avatarUrl,
          contact_info,
          description,
          nickname,
          provider,
          userId,
          email,
     }: ICreateUserDTO): Promise<any> {
          const user = await UserModel.create({
               name,
               password,
               address,
               avatarUrl,
               contact_info,
               description,
               nickname,
               provider,
               userId,
               email,
          })

          return user
     }

     deleteUser(): Promise<void> {
          throw new Error('Method not implemented.')
     }
     updateUser(): Promise<void> {
          throw new Error('Method not implemented.')
     }
     public async findByEmail(email: string): Promise<any> {
          const user = await UserModel.findOne({ email: email })

          return user
     }
     findAllUsers(): Promise<void> {
          throw new Error('Method not implemented.')
     }

     deleteToken(userId: string, token: string): Promise<void> {
          throw new Error('Method not implemented.')
     }
     async findbyIdAndToken(userId: string, token: string): Promise<any> {
          const user = await UserModel.findOne({ userId, refreshToken: token })

          if (!user) {
               throw new AppError(
                    'Usuário não encontrado',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          return user
     }

     async updateRefreshToken(
          userId: string,
          refreshToken: string
     ): Promise<any> {
          try {
               const user = await UserModel.findOneAndUpdate(
                    { userId },
                    { refreshToken },
                    {
                         useFindAndModify: false,
                    }
               )

               if (!user) {
                    throw new AppError(
                         'Usuário não encontrado',
                         statusCode.badRequest,
                         responseStatus.fail
                    )
               }

               return user
          } catch (error) {
               throw new AppError(
                    'Usuário não encontrado',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }
     }
}
