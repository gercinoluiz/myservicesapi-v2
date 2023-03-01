import IConection from '../../IConection'
import mongoose from 'mongoose'
import enviroment from '../../../../helpers/enviroment'

export default class MongooseConnection implements IConection {
     public async connect() {
          //Defining the enviroment

          const apiEnviroment = enviroment().ENVIROMENT
          let DataBaseConnectionString

          

          // TODO: Fazer um if para personal => meu atlas

          if (apiEnviroment === 'development') {
               DataBaseConnectionString = enviroment().dbDevelopment
          } else if (apiEnviroment === 'production') {
               DataBaseConnectionString = enviroment().dbProduction
          } else if (apiEnviroment === 'test') {
               DataBaseConnectionString = enviroment().dbTesting
          } else {
               throw new Error('No Database found!')
          }

          try {
               if (!DataBaseConnectionString) {
                    return
               }

               mongoose
                    .connect(DataBaseConnectionString, {
                         useNewUrlParser: true,
                         useCreateIndex: true,
                         useFindAndModify: true,
                         useUnifiedTopology: true,
                    })
                    .then(() => {
                         console.log(
                              `DATABASE has been connected succesfully in ${apiEnviroment} mode`
                         )
                    })
          } catch (err) {
               console.log(err)
          }
     }

     public async disconnect() {
          mongoose.connection.close()
     }
}
