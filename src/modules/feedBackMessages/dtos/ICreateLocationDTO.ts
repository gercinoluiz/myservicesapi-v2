

interface ICreateLocationDTO{

    name: string,
    geographic_position: {
        coordinates: Array<any>
    },
    address:{
        street: string,
        number: string,
        city:string,
        country:string,
        description: string,
    }, 
    secretarias:[
        {
            name:string;
            services:[]
        }
    ],

    contact_info: {
        mobile: string,
        phone: string,
        email: string,
        website: string,
        scheduleWebSite: string,
    },

}

export default ICreateLocationDTO