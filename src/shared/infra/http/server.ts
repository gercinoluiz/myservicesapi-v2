import 'reflect-metadata'
import '@shared/container'
import 'express-async-errors' // It is mandatory to be right after express
import { container } from 'tsyringe'
import enviroment from '../../helpers/enviroment'
import DBConnection from '../databases/services/DBConnection'

import { app } from './app'

// Variables
const port = enviroment().PORT || 3000
const Enviroment = enviroment().ENVIROMENT
const dbConnection = container.resolve(DBConnection)



// SERVER CONECTION
dbConnection.execute()

app.listen(port, () => {
     console.log(
          ` 🎯 Server started on port: ${port}. And you are on ${Enviroment} mode.`
     )
})
