import { Router } from "express";
import LocationTypeController from "../controllers/LocationTypeController";
import {ensureTokenExists} from "../../../../middlewares/ensureTokenExists";


const locationTypeRouter = Router()
const locationTypeController = new LocationTypeController()


// GET
// locationTypeRouter.get('/:locationTypeId', locationTypeController.getOne)
 locationTypeRouter.get('/', locationTypeController.getAll)
// locationTypeRouter.get('/getNearLocations/:coordinates', locationTypeController.getLocationsWithCoordinates)



// locationTypeRouter.post('/getNearLocationsByService/:coordinates/:serviceId', locationTypeController.getNearLocationsByService)

//POST
locationTypeRouter.post('/:msKey', ensureTokenExists, locationTypeController.create)

//DELETE
// locationTypeRouter.delete('/delete/msKey/:locationId', ensureAuthetication, locationTypeController.delete)

// //PATCH
// locationTypeRouter.patch('/updateOne/:msKey/:locationId', ensureAuthetication, locationTypeController.updateOne)
// locationTypeRouter.patch('/updateOne/:locationId', locationTypeController.updateOne)



export default locationTypeRouter