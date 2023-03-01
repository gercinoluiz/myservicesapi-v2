import {
     IRefreshTokenResponse,
     IUserRequest,
} from '@modules/users/dtos/userDTO'
import { SecutityRepository } from '@modules/users/infra/providers/jwt-bcrypt/repositories/SecutityRepository'
import { IUser } from '@modules/users/repositories/IUser'
import dependencies from '@shared/container/dependencies'
import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { generateToken } from '@modules/users/helpers/security/securityUtils'
import { responseStatus, statusCode } from '@shared/helpers/status'

@injectable()
export class AuthenticateService {
     constructor(
          @inject(dependencies.userRepository)
          private userRepository: IUser
     ) {}

     async execute({ email, password, provider }: IUserRequest) {


if (provider ){
     if (!email) {
          throw new AppError(
               'Email necessário',
               statusCode.badRequest,
               responseStatus.fail
          )
     }

     const user = await this.userRepository.findByEmail(email)

     if (!user || !user.userId) {
          throw new AppError(
               'usuário inexistente',
               statusCode.badRequest,
               responseStatus.fail
          )
     }

     const token = generateToken(user.userId, 'acessToken')

     const refreshToken = generateToken(user.userId, 'refreshToken')

     // save the refreshToken into the dataBase

     await this.userRepository.updateRefreshToken(
          user.userId,
          refreshToken
     )

     // Give the token back

     const tokenResponse: IRefreshTokenResponse = {
          user: {
               name: user.name,
               contact_info: user.contact_info,
               avatarUrl: user.avatarUrl,
               nickname: user.nickname,
               description: user.description,
               provider: user.provider,
               email: user.email,
               refreshToken,
          },
          token,
     }

     return tokenResponse


}else{

     if (!email) {
          throw new AppError(
               'Email necessário',
               statusCode.badRequest,
               responseStatus.fail
          )
     }

     if (!password) {
          throw new AppError(
               'password necessário',
               statusCode.badRequest,
               responseStatus.fail
          )
     }
     //Does the user exist?

     const user = await this.userRepository.findByEmail(email)

     if (!user || !user.userId) {
          throw new AppError(
               'usuário inexistente',
               statusCode.badRequest,
               responseStatus.fail
          )
     }

     if (!user.password) {
          throw new AppError(
               'usuário inexistente',
               statusCode.badRequest,
               responseStatus.fail
          )
     }

     // Is the password correct ?

     const passwordMatch = compare(password, user.password)

     if (!passwordMatch) {
          throw new AppError(
               'Email ou senha não conferem',
               statusCode.badRequest,
               responseStatus.fail
          )
     }

     // messages.logs('5 - Authenticate service', user)

     // Generate the token
     const token = generateToken(user.userId, 'acessToken')

     const refreshToken = generateToken(user.userId, 'refreshToken')

     // save the refreshToken into the dataBase

     await this.userRepository.updateRefreshToken(
          user.userId,
          refreshToken
     )

     // Give the token back

     const tokenResponse: IRefreshTokenResponse = {
          user: {
               name: user.name,
               contact_info: user.contact_info,
               avatarUrl: user.avatarUrl,
               nickname: user.nickname,
               description: user.description,
               provider: user.provider,
               email: user.email,
               refreshToken,
          },
          token,
     }

     return tokenResponse
}

     }
}

