const app = require('./app');
const mongoConnection = require('./db/service/connection');
const http = require('http');
const configureSocket = require('./socket');
require('dotenv').config();

const start = async () => {
  console.log('Iniciando aplicación de Tagliatore...')

  try {
    await mongoConnection();

    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    
    const io = configureSocket(server);

    server.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

start();

