const app = require('./app');
const mongoConnection = require('./db/service/connection');
require('dotenv').config();

const start = async () => {
    console.log('Iniciando aplicación de Tagliatore...')

    try{
        await mongoConnection();

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Tagliatore API esta en línea en el puerto ${port}.`)
        })

    } catch(error){
        console.log(`Error conectando a MongoDB: ${error}`)
    }
}

start();

