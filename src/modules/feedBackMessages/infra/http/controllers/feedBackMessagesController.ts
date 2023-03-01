import { Request, Response } from 'express'
import { responseStatus, statusCode } from '../../../../../shared/helpers/status'
import { container } from 'tsyringe'
import CreateFeedBackMessageService from '../../../services/CreateFeedBackMessageService'

export default class LocationController {
     public async create(
          request: Request,
          response: Response
     ): Promise<Response> {
          const data = request.body

          const createMessage = container.resolve(CreateFeedBackMessageService)

          const message = await createMessage.execute(data)

          return response.status(statusCode.ok).json({
               status: responseStatus.success,
               data: message,
          })
     }
}
