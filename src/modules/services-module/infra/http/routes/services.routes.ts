import { 
     EnsureAuthenticantion } from '@modules/middlewares/EnsureAuthenticantion'
import {ensureTokenExists} from '@modules/middlewares/ensureTokenExists'
import { Router } from 'express'

import ServicesControler from '../controllers/ServicesController'

const servicesRouter = Router()

const serviceController = new ServicesControler()

servicesRouter.post(
     '/',
     
     serviceController.create
)

servicesRouter.get('/:id', serviceController.getOne)
servicesRouter.get('/', serviceController.getAll)
servicesRouter.delete(
     '/:msKey/:serviceId',
     ensureTokenExists,
     serviceController.deletOne
)

export default servicesRouter
