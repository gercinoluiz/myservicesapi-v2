import { EnsureAuthenticantion } from '@modules/middlewares/EnsureAuthenticantion'
import { ensureRole } from '@modules/middlewares/ensureRole'
import { Router } from 'express'
import LocationController from '../controllers/LocationController'

const locationRouter = Router()
const locationController = new LocationController()
const ensureAuthenticantion = new EnsureAuthenticantion()

// GET
locationRouter.get('/:locationId', locationController.getOne)
locationRouter.get(
     '/',

     locationController.getAll
)
locationRouter.get(
     '/coordinates/:coordinates',
     locationController.getLocationsWithCoordinates
)

locationRouter.get(
     '/getByServiceType/:coordinates/:serviceType',
     locationController.getLocationsByServiceType
)

locationRouter.get(
     '/getByLocationType/:coordinates/:locationType',
     locationController.getLocationsByLocationType
)

locationRouter.post(
     '/coordinates/:coordinates/service/:serviceId',
     locationController.getNearLocationsByService
)

//POST

//TODO: TERMINAR TODA TROCA PARA JWT = o ensureAuthenticantion está pronto

//First to be changed to JWT
locationRouter.post(
     '/',
     // ensureAuthenticantion.execute,
     // ensureRole.isAdmin,
     locationController.create
)

//DELETE
locationRouter.delete(
     '/:locationId',
     ensureAuthenticantion.execute,
     ensureRole.isAdmin,
     locationController.delete
)

//PATCH
locationRouter.patch(
     '/:locationId',
     // ensureAuthenticantion.execute,
     // ensureRole.isAdmin,
     locationController.updateOne
)
// locationRouter.patch('/updateOne/:locationId', locationController.updateOne)

export default locationRouter
