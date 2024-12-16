const { Server } = require('socket.io');
const Mensaje = require('./db/models/Mensaje');

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado', socket.id);

    socket.on('message', async (data) => {
      console.log('Mensaje recibido:', data);
      
      try {
        const nuevoMensaje = new Mensaje({
          emisor: data.emisor,
          mensaje: data.mensaje,
        });
        await nuevoMensaje.save();
        console.log('Mensaje guardado en la base de datos');
        io.emit('message', data);


      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado', socket.id);
    });
  });

  return io;
};

module.exports = configureSocket; 