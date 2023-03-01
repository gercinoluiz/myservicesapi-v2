import { Request, Response, NextFunction } from 'express'
import { AppError } from '@shared/errors/AppError'
import enviroment from '@shared/helpers/enviroment'
import { verify } from 'jsonwebtoken'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { verifyToken } from '@modules/users/helpers/security/securityUtils'
import { container, inject } from 'tsyringe'
import dependencies from '@shared/container/dependencies'
import { IUser } from '@modules/users/repositories/IUser'
import { ValidateRoleService } from '@modules/users/services/ValidateRole/ValidateRoleService'

interface TokenPayload {
     iat: number
     exp: number
     sub: string
}

export class EnsureAuthenticantion {
     public async execute(
          request: Request,
          response: Response,
          next: NextFunction
     ) {
          // JWT Validation

          const validateRole = container.resolve(ValidateRoleService)

          const authHeader = request.headers.authorization

          if (!authHeader) {
               throw new AppError(
                    'Token is missing',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }

          const [, token] = authHeader.split(' ') // I only want the second option of desetructuring

          try {
               const { sub } = verifyToken(token, enviroment().SECRET || '')
               console.log({ sub })

               const user = await validateRole.execute(sub)

               request.user = {
                    id: user.userId,
                    role: user.role,
                    email: user.email,
               }

               return next()
          } catch (error) {
               throw new AppError(
                    'Invalid JWT token',
                    statusCode.badRequest,
                    responseStatus.fail
               )
          }
     }
}
