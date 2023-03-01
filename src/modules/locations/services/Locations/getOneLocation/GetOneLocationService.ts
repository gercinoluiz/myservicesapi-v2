
import { injectable } from 'tsyringe';
import { inject } from 'tsyringe';
import ILocationRepository from '../../../repositories/ILocationRepository';
import dependencies from '../../../../../shared/container/dependencies';
import { ILocationTypeBody } from '@modules/locations/repositories/ILocationTypeRepository';
import { ILocationResponse } from '@modules/locations/dtos/ICreateLocationDTO';



@injectable()

export default class GetOneLocationService{

    constructor (

        @inject(dependencies.LocationRepository)

        private locationRepository: ILocationRepository


    ){}


    public async execute (id: string): Promise<ILocationResponse>{

        //TODO: Some business rules here
        
        const location = await this.locationRepository.getOne(id)

        return location

    }

}