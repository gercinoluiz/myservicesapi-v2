export interface IServiceBody {
     name: string
     active: boolean
     description: boolean
     serviceType: string
     isOnline:boolean
}

export default interface IServicesRepository {
     create(data: IServiceBody): Promise<any>
     getOne(id: string): Promise<any>
     getAll(): Promise<any>
     deleteOne(serviceId: string): Promise<void>
}
