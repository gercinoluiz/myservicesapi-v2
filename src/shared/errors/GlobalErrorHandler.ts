

import { Request, Response, NextFunction } from 'express'
import messages from '../helpers/messages';
import {AppError, GlobaLError} from './AppError';



const GlobalErrorHandler = (err: Error, request: Request, response: Response, _: NextFunction) => {

    

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }



    messages.logs("The error stack is: ", err)

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })






}

export default GlobalErrorHandler