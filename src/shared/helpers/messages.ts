import enviroment from './enviroment';

const messages = {

    error: {},

    logs: (message?: string, variable?: any) => {

        

        if (enviroment().ENVIROMENT === 'development' || 'testing') {

            return console.log('############# Ambiente de desenvolvimento #############', '\n', {message} , '\n',  {variable})
        }

        return null



    }




}


export default messages