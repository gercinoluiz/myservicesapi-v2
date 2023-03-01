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

export default class getLocationCoordinates implements ICoordinates {

    public async getCoordinates(address: IAddress) {


        // Mouting the strret string
        const fullAddress = `${address.street}, ${address.number}`

        const encodedAddress = encodeURI(fullAddress) // MAPS API only accepts encoded format

        // fetching the API

        const googleMapsresponse = await axios.get<data>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${enviroment().googleMapsKey}`)

        messages.logs('getLocationCoordinates',googleMapsresponse)

        // TODO: You gotta change the code bellow to give the entire object, and then you extrat the rest in the service that uses it

        const response = googleMapsresponse.data.results[0].geometry.location

        




        return response
    }



}
