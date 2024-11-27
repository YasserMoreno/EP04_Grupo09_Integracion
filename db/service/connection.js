const mongoose =require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/Tagliatore';
const connectiondb = mongoose.connection

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