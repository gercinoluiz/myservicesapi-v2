

export interface IServiceTypeBody{

    name:string;
    active: boolean;
    description: string;
    icon:string;

}

export default interface IServiceTypeRepository {

    create(data:IServiceTypeBody):Promise<any>;
    getOne(id:string):Promise<any>;
    getAll():Promise<any>;
    deleteOne(serviceTypeId:string):Promise<void>;

}