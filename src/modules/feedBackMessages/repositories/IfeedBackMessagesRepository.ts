
export interface IfeedBackMessagesBody{
    name: string,
    email: string,
    phone: string,
    message: string,


}

export  interface IfeedBackMessagesRepository {

    create(data:IfeedBackMessagesBody):Promise<any>;


}