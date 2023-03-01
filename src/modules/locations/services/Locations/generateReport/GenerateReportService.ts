
import { inject, injectable } from 'tsyringe';
import IReportRepository from '../../../repositories/IReportRepository';
import ICoordinates from '../../../../../shared/providers/GeoLocation/googleMaps/models/ICoordinates';
import enviroment from '../../../../../shared/helpers/enviroment';
import messages from '../../../../../shared/helpers/messages';
import dependencies from '../../../../../shared/container/dependencies';




@injectable()

export default class GenerateReportService {
    constructor(

        @inject(dependencies.ReportRepository)
        private reportRepository: IReportRepository,

        @inject(dependencies.getCoordinates)
        private getCoordinates: ICoordinates

    ) { }

    public async execute(coordinates: string, serviceId: string, serviceName: string, address: any): Promise<any> {

        enviroment().ENVIROMENT === 'development' && messages.logs('GenerateReportService/execute')



        await this.reportRepository.generateReport(coordinates, serviceId, serviceName, address)



    }
}