const app = require('./app');
const mongoConnection = require('./db/service/connection');


const start = async () => {
    console.log('Iniciando aplicación de Tagliatore...')

    try{

        await mongoConnection();

        app.listen(3000, () => {
            console.log(`Tagliatore API esta en línea en el puerto ${3000}.`)
        })

    } catch(error){
        console.log(`Error conectando a MongoDB: ${error}`)
    }

}

start();

