import axios from "axios"
import ICoordinates from '../models/ICoordinates';
import enviroment from '../../../../helpers/enviroment';
import messages from '../../../../helpers/messages';

interface IAddress {
    street: string,
    number: string,
    city: string,
    country: string,
    description: string,
}


interface results {
    geometry: {
        location: {
            lat: any,
            lng: any
        }
    }
}



interface data {

    results: Array<results>

}

export default class getLocationCoordinatesInMemory implements ICoordinates {

    public async getCoordinates(address: IAddress) {



        

        const response = {
            lat:-23.550522,
            long: -23.550522
        }





        return response
    }



}
