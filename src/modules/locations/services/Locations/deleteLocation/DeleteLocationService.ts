import { injectable, inject } from "tsyringe";
import ILocationRepository from '../../../repositories/ILocationRepository';

import dependencies from '../../../../../shared/container/dependencies';
import { AppError } from "@shared/errors/AppError";
import { responseStatus, statusCode } from "@shared/helpers/status";

@injectable()
export default class DeleteLocationService {

    constructor(
        @inject(dependencies.LocationRepository)

        private locationRepository: ILocationRepository
    ){}

    public async execute(locationId: string): Promise<void> {

// TODO: Apply some bussines rule here


   
        await this.locationRepository.delete(locationId)


    }


}