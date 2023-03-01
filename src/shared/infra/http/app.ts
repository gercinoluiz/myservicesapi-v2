import 'reflect-metadata'

import '@shared/container'
import cors from 'cors'
import dotenv from 'dotenv' // Enviroment variables
import express from 'express'
import 'express-async-errors' // It is mandatory to be right after express
import mongoSanitize from 'express-mongo-sanitize' // prevent against Nosql Injection
import rateLimit from 'express-rate-limit' // Limit the number of requests our API can receive (you can create many limiters)
import helmet from 'helmet' // security against HTTP headers
import hpp from 'hpp' // prevent parameter polution
import morgan from 'morgan' // loging middlewhere
import 'reflect-metadata'
//Documentation
import swaggerUi from 'swagger-ui-express'
import xss from 'xss-clean' // security againt cross domain scripting
import swaggerOptions from '../../../documentation/swaggerfile.json'
import GlobalErrorHandler from '../../errors/GlobalErrorHandler'
import routes from './routes/index'


dotenv.config({path: '.env'  })



export const app = express()

// 0 Variables
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })

// 1. MiddleWheres

// 1.1 Body Parsers

app.use(
     express.json({
          limit: '20kb',
     })
)

app.use(
     express.urlencoded({
          extended: true,
          limit: '10kb',
     })
)

// 1.2 Security MiddleWheres
app.use(cors())
app.use(limiter)
app.use(helmet())
app.use(hpp())
app.use(xss())
app.use(mongoSanitize())

app.use(morgan('dev'))
app.use(express.json())


// Documentation

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions))

//Routes
app.use(routes)

app.use(GlobalErrorHandler)