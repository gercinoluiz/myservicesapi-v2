export interface ILocationTypeBody {
     name: string;
     active: boolean;
     
}

interface ILocationTypeRepository {
     create(data: ILocationTypeBody): Promise<any>
     // delete(id: string): Promise<void>;
     // getOne(id:string): Promise<any>;
     getAll ():Promise<ILocationTypeBody[]>;
     // updateOne(id:string, body:object):Promise<any>;
     // getLocationsWithCoordinates(coordinates: string):Promise<any>;
     // getNearLocationsByService(coordinates: string, serviceId: string):Promise<any>;
}

export default ILocationTypeRepository
