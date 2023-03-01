

export  class AppError  {

    public readonly message: string;
    public readonly statusCode: number;
    public readonly status: string;

    constructor(message: string, statusCode = 400, status:string){

        

        this.message = message
        this.statusCode = statusCode
        this.status = status

        Error.captureStackTrace(this, this.constructor)

    }


}

export  class GlobaLError extends Error {

    public readonly message: string;
    public readonly statusCode: number;
    public readonly status: string;

    constructor(message: string, statusCode = 400, status:string){

        super(message)

        this.message = message
        this.statusCode = statusCode
        this.status = status

        Error.captureStackTrace(this, this.constructor)

    }


}