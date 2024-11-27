const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const connectiondb = mongoose.connection;

const mongoConnection = () => {

    connectiondb.once('connected', _ =>{
        console.log(`La base de datos esta conectada en ${MONGO_URI}`);
    })

    connectiondb.once('open', _ =>{
        console.log(`Conexión abierta en ${MONGO_URI}`);
    })

    connectiondb.on('error',error => {
        console.log(error);
    })

    return mongoose.connect(MONGO_URI)
    .catch(err => console.log)
}

module.exports = mongoConnection