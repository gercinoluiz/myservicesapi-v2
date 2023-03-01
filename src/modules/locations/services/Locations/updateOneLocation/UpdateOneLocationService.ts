
import { injectable } from 'tsyringe';
import { inject } from 'tsyringe';
import ILocationRepository from '../../../repositories/ILocationRepository';
import dependencies from '../../../../../shared/container/dependencies';
import ILocationTypeRepository from '@modules/locations/repositories/ILocationTypeRepository';
import { ILocationResponse } from '@modules/locations/dtos/ICreateLocationDTO';



@injectable()

export default class UpdateOneLocationService{

    constructor(

        @inject(dependencies.LocationRepository)
        private locationRepository: ILocationRepository

    ){}

    public async execute (id:string, body:object): Promise<ILocationResponse> {


        //TODO: some business rules here


        const location = await this.locationRepository.updateOne(id, body)

        return location

    }

}