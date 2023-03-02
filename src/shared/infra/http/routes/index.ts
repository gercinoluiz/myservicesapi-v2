import { Router } from 'express'
import locationRouter from '../../../../modules/locations/infra/http/routes/location.routes'
import servicesRouter from '../../../../modules/services-module/infra/http/routes/services.routes'
import feedBackMessagesRouter from '../../../../modules/feedBackMessages/infra/http/routes/feedbackMessage.routes'
import servicesTypeRouter from '@modules/services-module/infra/http/routes/servicesType.routes'
import locationTypeRouter from '@modules/locations/infra/http/routes/locationtype.routes'
import userRouter from '@modules/users/infra/http/routes/users.routes'

// import devRouter from '@shared/dev-data/importers/dev.routes'

const routes = Router()

routes.use('/locations', locationRouter)
routes.use('/locationTypes', locationTypeRouter)
routes.use('/services', servicesRouter)
routes.use('/serviceType', servicesTypeRouter)
routes.use('/feedbackmessages', feedBackMessagesRouter)
routes.use('/users', userRouter)

//## DEV
// routes.use('/dev', devRouter)

export default routes
