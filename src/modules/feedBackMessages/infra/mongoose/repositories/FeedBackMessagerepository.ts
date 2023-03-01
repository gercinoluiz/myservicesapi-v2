

import {IfeedBackMessagesBody, IfeedBackMessagesRepository} from '@modules/feedBackMessages/repositories/IfeedBackMessagesRepository'

import FeedBackModule from '../entities/feedBackMessages'



export default class FeedBackRepository implements IfeedBackMessagesRepository{


    public async create(data: IfeedBackMessagesBody):Promise<any>{
        

        const message = await FeedBackModule.create(data)


        return message

    }


}