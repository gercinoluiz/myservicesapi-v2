import { Router } from "express";

import {ensureTokenExists} from "../../../../middlewares/ensureTokenExists";
import UserController from "@modules/users/infra/http/controllers/UserController";



const userRouter = Router()
const userController = new UserController()




// // GET
// userRouter.get('/:userId', userController.getOne)
// userRouter.get('/', userController.getAll)
// userRouter.get('/getNearusers/:coordinates', userController.getusersWithCoordinates)



// userRouter.post('/getNearusersByService/:coordinates/:serviceId', userController.getNearusersByService)

//POST
userRouter.post('/signup',    userController.signUp)
userRouter.post('/refresh',    userController.refreshToken)

//POST
userRouter.post('/authenticate',  userController.authenticate)

// //DELETE
// userRouter.delete('/delete/msKey/:userId', ensureAuthetication, userController.delete)

// //PATCH
// userRouter.patch('/updateOne/:msKey/:userId', ensureAuthetication, userController.updateOne)
// // locationRouter.patch('/updateOne/:locationId', locationController.updateOne)



export default userRouter