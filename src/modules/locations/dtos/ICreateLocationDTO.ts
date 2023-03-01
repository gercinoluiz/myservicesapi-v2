interface ICreateLocationDTO {
     name?: string
     geographic_position?: {
          coordinates: Array<any>
     }
     address?: {
          street: string
          number: string
          city: string
          country: string
          description: string
          cep: string
     }

     services?: []
     imagesUrl?: []

     contact_info?: {
          mobile: string
          phone: string
          email: string
          website: string
          scheduleWebSite: string
     }
     workingTime?: []
     serviceTypes?:[]
     locationType?:string
     status?:string,
     nickname?:string
}

export interface ILocationResponse{

     name?: string
     geographic_position?: {
          coordinates: Array<any>
     }
     address?: {
          street: string
          number: string
          city: string
          country: string
          description: string
          cep: string
     }

     services?: []
     imagesUrl?: []

     contact_info?: {
          mobile: string
          phone: string
          email: string
          website: string
          scheduleWebSite: string
     }
     workingTime?: []
     serviceTypes?:[]
     locationType?:string
     status?:string,
     nickname?:string


}

export default ICreateLocationDTO
