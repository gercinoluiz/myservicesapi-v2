import { Request, Response, NextFunction } from 'express'
import { AppError } from '@shared/errors/AppError'
import { responseStatus, statusCode } from '@shared/helpers/status'

export  function ensureTokenExists(
     request: Request,
     response: Response,
     next: NextFunction
): any {
     try {
          const { msKey } = request.params

          // console.log(typeof(msKey))
          // console.log(typeof(process.env.msKey))

          // console.log({msKey, env:process.env.msKey})

          if (msKey !== process.env.msKey) {
               return response.status(404).json({
                    error: 'Access denied',
                    message: 'Access tokens do not match',
               })
          }

          return next()
     } catch (error) {
          throw new AppError(
               'Something went wrong',
               statusCode.internalServerError,
               responseStatus.fail
          )
     }
}
