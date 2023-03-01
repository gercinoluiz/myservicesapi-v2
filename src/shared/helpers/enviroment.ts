

const enviroment = () => {

    return {
        ENVIROMENT: process.env.NODE_ENV,
        PORT: process.env.PORT,

        DATABASE: process.env.DATABASE,

        dbProduction: process.env.dbProduction,
        dbDevelopment: process.env.dbDevelopment,
        dbTesting: process.env.dbTesting,
        msKey: process.env.msKey,



        JWT_LIFETIME: process.env.JWT_LIFETIME,
        JWT_COOKIE_LIFETIME: process.env.JWT_COOKIE_LIFETIME,
        SECRET: process.env.SECRET,

        JWT_REFRESH_TOKEN_LIFETIME: process.env.JWT_REFRESH_TOKEN_LIFETIME,
        JWT_REFRESH_TOKEN_COOKIE_LIFETIME: process.env.JWT_REFRESH_TOKEN_COOKIE_LIFETIME,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,



        googleMapsKey: process.env.googleMapsKey,

        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_USERNAME: process.env.EMAIL_USERNAME,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    }
}


export default enviroment