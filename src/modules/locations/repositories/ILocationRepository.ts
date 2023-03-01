import ICreateLocationDTO from "@modules/locations/dtos/ICreateLocationDTO"


interface ILocationRepository{
    create(data: ICreateLocationDTO): Promise<any>;
    delete(id: string): Promise<void>;
    getOne(id:string): Promise<any>;
    getAll ():Promise<any>;
    updateOne(id:string, body:object):Promise<any>;
    getLocationsWithCoordinates(coordinates: string):Promise<any>;
    getNearLocationsByService(coordinates: string, serviceId: string):Promise<any>;
    getLocationByServiceType(serviceType:string, coordinates:string): Promise<any>
    getLocationByLocationType(locationTypeId:string, coordinates:string): Promise<any>
    
}

export default ILocationRepository