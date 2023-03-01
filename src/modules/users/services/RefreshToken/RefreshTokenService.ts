import 'reflect-metadata'
import {
     IAccessTokenResponse,
     IRefreshTokenResponse,
} from '@modules/users/dtos/userDTO'
import { IUser } from '@modules/users/repositories/IUser'
import dependencies from '@shared/container/dependencies'
import { AppError } from '@shared/errors/AppError'
import enviroment from '@shared/helpers/enviroment'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import {
     generateToken,
     verifyToken,
} from '@modules/users/helpers/security/securityUtils'

@injectable()
export class RefreshTokenService {
     constructor(
          @inject(dependencies.userRepository)
          private userRepository: IUser
     ) {}

     async execute(refreshToken: string): Promise<IAccessTokenResponse> {
          try {
               // I receive the refresh token out of the client

               
               const { sub } = verifyToken(
                    refreshToken,
                    enviroment().REFRESH_TOKEN_SECRET || ''
               )


               const userId = sub

               // I chek if it belongs to the user or if even exists
               const user = await this.userRepository.findbyIdAndToken(
                    userId,
                    refreshToken
               )

               if (!user) {
                    throw new AppError(
                         'Invalid token',
                         statusCode.badRequest,
                         responseStatus.fail
                    )
               }

               // before Returning the User, I have to generate a new token

               const newToken = generateToken(userId, 'acessToken')


               
               

               delete user.refreshToken
               

               const returningUser: IAccessTokenResponse = {
                   user:{
                    name:user.name,
                    avatarUrl:user.avatarUrl,
                    email:user.email,
                    contact_info:user.contact_info,
                    nickname:user.nickname,
                    
                    userId:user.id,
                    description:user.description
                   },
                   token:newToken
               }

               

               return returningUser
          } catch (error) {
               throw new AppError(
                    'RefreshToken inválido',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }
     }
}
