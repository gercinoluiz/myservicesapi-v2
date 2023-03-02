import { AuthenticateService } from '@modules/users/services/Authenticate/AuthenticateService'
import { googleAuthenticator } from '@modules/users/services/oAuth/googleAuthenticator'
import { RefreshTokenService } from '@modules/users/services/RefreshToken/RefreshTokenService'
import { SignUpUserService } from '@modules/users/services/SignUp/SignUpUserService'
import { AppError } from '@shared/errors/AppError'
import messages from '@shared/helpers/messages'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class UserController {
     public async signUp(
          request: Request,
          response: Response
     ): Promise<Response> {
          const data = request.body

          

          let user

          const signUp = container.resolve(SignUpUserService)

          //      //TODO: A parte de baixo está ok

          if (data.provider === 'google') {

               user = await googleAuthenticator(data.accessToken)

              

               if (!user) {
                    throw new AppError('Access Denied', 400, 'fail')
               }

               user = await signUp.execute(user)

          } else {

               user = await signUp.execute(data)
          }

          
          

          // Aftert SignUp We log in the user


          const authenticateService = container.resolve(AuthenticateService)

          const authInfo = await authenticateService.execute({
               email: user.email,

               password: user.password,
          })

          return response.status(statusCode.created).json({
               status: responseStatus.success,
               data: authInfo,
          })
     }

     public async authenticate(
          request: Request,
          response: Response
     ): Promise<Response> {
          const { email, password, provider, accessToken } = request.body


          const authenticateUseCase = container.resolve(AuthenticateService)

          if (provider) {
               const user = await googleAuthenticator(accessToken)


               if (!user) {
                    throw new AppError(
                         'Access Denied',
                         statusCode.badRequest,
                         responseStatus.fail
                    )
               }

               const authInfo = await authenticateUseCase.execute({
                    email: user.email,

                    password,
                    provider,
               })

               return response.status(statusCode.ok).json({
                    status: responseStatus.success,
                    data: authInfo,
               })
          } else {
               
               const authInfo = await authenticateUseCase.execute({
                    email,
                    password,
                    provider,
               })

               return response.status(statusCode.ok).json({
                    status: responseStatus.success,
                    data: authInfo,
               })
          }
     }

     public async refreshToken(
          request: Request,
          response: Response
     ): Promise<Response> {
          const refreshTokennService = container.resolve(RefreshTokenService)

          const authHeader = request.headers.authorization

          if (!authHeader) {
               throw new AppError(
                    'Token is missing',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }
          const [, token] = authHeader.split(' ') // I only want the second option of desetructuring

          const newToken = await refreshTokennService.execute(token)

          

          return response.status(statusCode.ok).json({
               status: responseStatus.success,
               data: newToken,
          })
     }
}
