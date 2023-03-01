import {
     IRefreshTokenResponse,
     ICreateUserDTO,
     IAccessTokenResponse,
} from '@modules/users/dtos/userDTO'
import { IUser } from '@modules/users/repositories/IUser'
import { AppError } from '@shared/errors/AppError'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { v4 } from 'uuid'

export default class UserRepositoryInMemory implements IUser {
     findById(id: string): Promise<IAccessTokenResponse> {
          throw new Error('Method not implemented.')
     }
     private users: any[] = []

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
          const user = {
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
          }

          this.users.push(user)

          return user
     }

     deleteUser(): Promise<void> {
          throw new Error('Method not implemented.')
     }

     updateUser(): Promise<void> {
          throw new Error('Method not implemented.')
     }

     public async findByEmail(email: string): Promise<any> {
          const finduser = this.users.filter((item) => item.email === email)

          if (finduser.length < 1) {
               return undefined
          } else {
               return finduser[0]
          }
     }

     findAllUsers(): Promise<void> {
          throw new Error('Method not implemented.')
     }

     deleteToken(userId: string, token: string): Promise<void> {
          throw new Error('Method not implemented.')
     }
     async findbyIdAndToken(
          userId: string,
          token: string
     ): Promise<IRefreshTokenResponse> {
          const findUser = this.users.filter(
               (item) => item.userId === userId && item.refreshToken === token
          )

          if (!findUser) {
               throw new AppError(
                    'Usuário não encontrado',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          return findUser[0]
     }

     updateRefreshToken(
          userId: string,
          refreshToken: string
     ): Promise<IRefreshTokenResponse> {
          const findUser = this.users
               .filter((item) => item.userId === userId)
               .map((obj) => ({ ...obj, refreshToken }))

          this.users = findUser

          if (!findUser) {
               throw new AppError(
                    'Usuário não encontrado',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          return findUser[0]
     }
}
