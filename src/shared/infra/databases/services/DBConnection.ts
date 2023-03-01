import { inject, injectable } from "tsyringe";
import IConection from '../IConection';


@injectable()
export default class DBConnection {
    constructor(
        @inject('DBConnection')
        private dbConnection: IConection
    ){}

    public async execute(){
     await this.dbConnection.connect()
    }
}