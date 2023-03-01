import { AppError } from '@shared/errors/AppError'
import { responseStatus, statusCode } from '@shared/helpers/status'
import { Request, Response, NextFunction } from 'express'

export const ensureRole = {
     isAdmin: (request: Request, response: Response, next: NextFunction) => {
          const user = request.user

          if (user.role === 'admin') {
               return next()
          } else {
               throw new AppError(
                    'Não autorizado',
                    statusCode.forbidden,
                    responseStatus.notAllowed
               )
          }
     },

     isManager: (request: Request, response: Response, next: NextFunction) => {
          const user = request.user

          if (user.role === 'manager' || user.role === 'admin') {
               return next()
          } else {
               throw new AppError(
                    'Não autorizado',
                    statusCode.forbidden,
                    responseStatus.notAllowed
               )
          }
     },

     isUser: (request: Request, response: Response, next: NextFunction) => {
          const user = request.user

          if (
               user.role === 'admin' ||
               user.role === 'manager' ||
               user.role === 'user'
          ) {
               return next()
          } else {
               throw new AppError(
                    'Não autorizado',
                    statusCode.forbidden,
                    responseStatus.notAllowed
               )
          }
     },
}
