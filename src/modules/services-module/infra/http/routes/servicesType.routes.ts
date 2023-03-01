import {ensureTokenExists} from '@modules/middlewares/ensureTokenExists'
import { Router } from 'express'
import ServicesTypeController from '../controllers/ServicesTypeController'

const servicesTypeRouter = Router()

const serviceController = new ServicesTypeController()

servicesTypeRouter.post(
     '/create/:msKey',
     ensureTokenExists,
     serviceController.create
)


 servicesTypeRouter.get('/getAll', serviceController.getAll)


export default servicesTypeRouter
