import { inject, injectable } from "tsyringe";
import {AppError} from '../../../shared/errors/AppError';
import { IfeedBackMessagesRepository } from '@modules/feedBackMessages/repositories/IfeedBackMessagesRepository'
import  {IfeedBackMessagesBody} from '@modules/feedBackMessages/repositories/IfeedBackMessagesRepository';
import dependencies from '../../../shared/container/dependencies';










@injectable()

export default class CreateFeedBackMessageService {


    constructor(

        @inject(dependencies.FeedBackMessageRepository)
        private feedBackRepository: IfeedBackMessagesRepository


    ) {


    }


    public async execute (body:IfeedBackMessagesBody):Promise<any>{

        // TODO: Corrigir o envio do body completo


        const message = await this.feedBackRepository.create(body)

        return message

    }


}

