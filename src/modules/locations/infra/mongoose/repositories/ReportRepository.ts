
import IReportRepository from '../../../repositories/IReportRepository';
import Report from '../entities/Reports'
import messages from '../../../../../shared/helpers/messages';




// TODO: Transformar em Assyncrono/
// É só jogar tudo no finally?



export default class ReportRepository implements IReportRepository {

    public async generateReport(coordinates: string, serviceId: string, serviceName: string, address: any) {


        let [latitude, longitude] = coordinates.split(',')
        parseFloat(latitude)
        parseFloat(longitude)



        try {
            messages.logs('ReportRepository/generateReport', { coordinates, serviceId, address })


            const report = await Report.create({ serviceId: serviceId, serviceName: serviceName, address: address, coordinates: { coordinates: [longitude, latitude] } })

            report.save()

        } catch (error) {

            messages.logs('ReportRepository/generateReport/Error', error)
        }

    }

}