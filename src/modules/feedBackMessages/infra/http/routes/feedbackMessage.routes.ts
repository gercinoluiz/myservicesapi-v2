import { Router } from "express";
import LocationController from '../controllers/feedBackMessagesController';




const feedBackMessagesRouter = Router()
const locationController= new LocationController()


//POST
feedBackMessagesRouter.post('/create', locationController.create)



export default feedBackMessagesRouter