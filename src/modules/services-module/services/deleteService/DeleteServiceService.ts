import dependencies from '@shared/container/dependencies';
import { inject, injectable } from 'tsyringe'
import IServicesRepository from '../../repositories/IServiceRepository';




@injectable()

export default class DeleteServiceService {

    constructor(
        @inject(dependencies.ServiceRepository)
        private servicesRepository: IServicesRepository
    ) { }

    public async execute(serviceId: string): Promise<void> {

        await this.servicesRepository.deleteOne(serviceId)

    }
}