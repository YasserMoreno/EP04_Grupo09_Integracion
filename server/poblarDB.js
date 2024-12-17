const mongoose = require('mongoose');
const Categoria = require('./db/models/Categoria');
const Cliente = require('./db/models/Cliente');
const Mesa = require('./db/models/Mesa');
const Mesero = require('./db/models/Mesero');
const Orden = require('./db/models/Orden');
const Platillo = require('./db/models/Platillo');
const Mensaje = require('./db/models/Mensaje');
require('dotenv').config();

const categoriasData = [
  {
    _id: new mongoose.Types.ObjectId("674696b342b9d0bbd24f1d5a"),
    nombre: "Antipasti",
    descripcion: "Aperitivos tradicionales de la cocina italiana, perfectos para abrir el apetito y comenzar una experiencia culinaria auténtica.",
    createdAt: new Date("2024-11-27T03:49:07.344Z"),
    updatedAt: new Date("2024-12-17T04:12:16.223Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("674696ed42b9d0bbd24f1d5c"),
    nombre: "Primi Piatti",
    descripcion: "Platos principales de pasta, arroz y sopas que representan el corazón de la gastronomía Toscana y Romana.",
    createdAt: new Date("2024-11-27T03:50:05.086Z"),
    updatedAt: new Date("2024-11-27T03:50:05.086Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("674696f942b9d0bbd24f1d5e"),
    nombre: "Vinos",
    descripcion: "Selección de vinos que complementan perfectamente cada plato de la carta. La gama de vinos está seleccionada para resaltar los sabores y la tradición de la región.",
    createdAt: new Date("2024-11-27T03:50:17.503Z"),
    updatedAt: new Date("2024-11-27T03:50:17.503Z"),
    __v: 0
  }
];

const clientesData = [
  {
    _id: new mongoose.Types.ObjectId("676100bd2d08b37bcffeffc5"),
    nombre: "Juan Pérez",
    correo: "juan.perez@email.com",
    telefono: "987654321",
    dni: "12345678",
    createdAt: new Date("2024-12-17T04:40:29.533Z"),
    updatedAt: new Date("2024-12-17T05:01:47.693Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("676100cf2d08b37bcffeffc7"),
    nombre: "Ana Gómez",
    correo: "ana.gomez@email.com",
    telefono: "976543210",
    dni: "23456789",
    createdAt: new Date("2024-12-17T04:40:47.821Z"),
    updatedAt: new Date("2024-12-17T04:40:47.821Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("676100d72d08b37bcffeffc9"),
    nombre: "Carlos Díaz",
    correo: "carlos.diaz@email.com",
    telefono: "965432109",
    dni: "34567890",
    createdAt: new Date("2024-12-17T04:40:55.179Z"),
    updatedAt: new Date("2024-12-17T04:40:55.179Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("676100df2d08b37bcffeffcb"),
    nombre: "Laura Martínez",
    correo: "laura.martinez@email.com",
    telefono: "954321098",
    dni: "45678901",
    createdAt: new Date("2024-12-17T04:41:03.832Z"),
    updatedAt: new Date("2024-12-17T04:41:03.832Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("676100e52d08b37bcffeffcd"),
    nombre: "Pedro Rodríguez",
    correo: "pedro.rodriguez@email.com",
    telefono: "943210987",
    dni: "56789012",
    createdAt: new Date("2024-12-17T04:41:09.986Z"),
    updatedAt: new Date("2024-12-17T04:41:09.986Z"),
    __v: 0
  }
];

const mesasData = [
  { _id: new mongoose.Types.ObjectId("6761b249943f78195cbe7601"), numero: 1 },
  { _id: new mongoose.Types.ObjectId("6761b252943f78195cbe7603"), numero: 2 },
  { _id: new mongoose.Types.ObjectId("6761b25a943f78195cbe7605"), numero: 3 },
  { _id: new mongoose.Types.ObjectId("6761b261943f78195cbe7607"), numero: 4 },
  { _id: new mongoose.Types.ObjectId("6761b26a943f78195cbe7609"), numero: 5 }
];

const meserosData = [
  {
    _id: new mongoose.Types.ObjectId("676108ed7c8ffea7e0f614b2"),
    nombre: "Juan Gomez",
    correo: "juan.gomez@example.com",
    telefono: "555-1234",
    usuario: "juangomez",
    password: "$2a$10$ApvJDzpvjFAz.msbNqSu5e67ynT.F7GNWp/EZGi/HxzDWK1SZYmUe",
    activo: true,
    createdAt: new Date("2024-12-17T05:15:25.066Z"),
    updatedAt: new Date("2024-12-17T18:50:32.303Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("676108f97c8ffea7e0f614b4"),
    nombre: "María Sanchez",
    correo: "maria.sanchez@example.com",
    telefono: "555-5678",
    usuario: "mariasanchez",
    password: "$2a$10$sNmh2CN5C0d/ISuFkh6GSeusU8tzklxqDyqcCETl/zFvfIKNobebm",
    activo: true,
    createdAt: new Date("2024-12-17T05:15:37.690Z"),
    updatedAt: new Date("2024-12-17T18:50:41.967Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("676109007c8ffea7e0f614b6"),
    nombre: "Carlos Romero",
    correo: "carlos.romero@example.com",
    telefono: "555-8765",
    usuario: "carlosromero",
    password: "$2a$10$7skeI8tCyJ.uZ30FKdE4sO.F93znzgkE3imY3rnGqZYyvQWZQnbOq",
    activo: true,
    createdAt: new Date("2024-12-17T05:15:44.331Z"),
    updatedAt: new Date("2024-12-17T18:50:50.869Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("676109067c8ffea7e0f614b8"),
    nombre: "Ana Rodríguez",
    correo: "ana.rodriguez@example.com",
    telefono: "555-4321",
    usuario: "anarodriguez",
    password: "$2a$10$Ie4V3hPMALPgePJ2K4WaGOgsZI8GlIi9sU5qmECk12d8CuMqnYiY6",
    activo: true,
    createdAt: new Date("2024-12-17T05:15:50.706Z"),
    updatedAt: new Date("2024-12-17T05:15:50.706Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6761090c7c8ffea7e0f614ba"),
    nombre: "Luis Gómez",
    correo: "luis.gomez@example.com",
    telefono: "555-2468",
    usuario: "luisgomez",
    password: "$2a$10$9Iaomq4bd4d0f7v5ghfE0eWZPuFYSevTEuyyADJvY5cz4Ab6qE0Sm",
    activo: true,
    createdAt: new Date("2024-12-17T05:15:56.728Z"),
    updatedAt: new Date("2024-12-17T05:15:56.728Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("67610e427c8ffea7e0f614ec"),
    nombre: "Yasser Moreno",
    correo: "yassermorenor@gmail.com",
    telefono: "955837126",
    usuario: "Yaxs786",
    password: "$2a$10$1DrBStczlFrnWT66mFGSOeSV2v.m8yXTWHWrKoj5EPlYUHDL8fHWi",
    activo: true,
    createdAt: new Date("2024-12-17T05:38:10.430Z"),
    updatedAt: new Date("2024-12-17T05:38:10.430Z"),
    __v: 0
  }
];

const ordenesData = [
  {
    _id: new mongoose.Types.ObjectId("6761b3bc17a5c1bc54bc9cf5"),
    mesaId: new mongoose.Types.ObjectId("6761b249943f78195cbe7601"),
    clienteId: new mongoose.Types.ObjectId("676100bd2d08b37bcffeffc5"),
    meseroId: new mongoose.Types.ObjectId("676108ed7c8ffea7e0f614b2"),
    platillos: [
      {
        platilloId: new mongoose.Types.ObjectId("6746977d42b9d0bbd24f1d60"),
        cantidad: 2,
        _id: new mongoose.Types.ObjectId("6761b3bc17a5c1bc54bc9cf6")
      },
      {
        platilloId: new mongoose.Types.ObjectId("6746979742b9d0bbd24f1d62"),
        cantidad: 1,
        _id: new mongoose.Types.ObjectId("6761b3bc17a5c1bc54bc9cf7")
      },
      {
        platilloId: new mongoose.Types.ObjectId("674697a442b9d0bbd24f1d64"),
        cantidad: 2,
        _id: new mongoose.Types.ObjectId("6761c5b07b06b796ec01a978")
      }
    ],
    estado: "entregado",
    createdAt: new Date("2024-12-17T17:24:12.715Z"),
    updatedAt: new Date("2024-12-17T18:51:01.249Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6761b3c317a5c1bc54bc9cf9"),
    mesaId: new mongoose.Types.ObjectId("6761b252943f78195cbe7603"),
    clienteId: new mongoose.Types.ObjectId("676100cf2d08b37bcffeffc7"),
    meseroId: new mongoose.Types.ObjectId("676108f97c8ffea7e0f614b4"),
    platillos: [
      {
        platilloId: new mongoose.Types.ObjectId("6746977d42b9d0bbd24f1d60"),
        cantidad: 3,
        _id: new mongoose.Types.ObjectId("6761b3c317a5c1bc54bc9cfa")
      }
    ],
    estado: "pendiente",
    createdAt: new Date("2024-12-17T17:24:19.176Z"),
    updatedAt: new Date("2024-12-17T17:24:19.176Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6761b3c817a5c1bc54bc9cfc"),
    mesaId: new mongoose.Types.ObjectId("6761b25a943f78195cbe7605"),
    clienteId: new mongoose.Types.ObjectId("676100d72d08b37bcffeffc9"),
    meseroId: new mongoose.Types.ObjectId("676109007c8ffea7e0f614b6"),
    platillos: [
      {
        platilloId: new mongoose.Types.ObjectId("6746977d42b9d0bbd24f1d60"),
        cantidad: 1,
        _id: new mongoose.Types.ObjectId("6761b3c817a5c1bc54bc9cfd")
      },
      {
        platilloId: new mongoose.Types.ObjectId("674697a442b9d0bbd24f1d64"),
        cantidad: 2,
        _id: new mongoose.Types.ObjectId("6761b3c817a5c1bc54bc9cfe")
      }
    ],
    estado: "pendiente",
    createdAt: new Date("2024-12-17T17:24:24.312Z"),
    updatedAt: new Date("2024-12-17T17:24:24.312Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6761b3cd17a5c1bc54bc9d00"),
    mesaId: new mongoose.Types.ObjectId("6761b261943f78195cbe7607"),
    clienteId: new mongoose.Types.ObjectId("676100df2d08b37bcffeffcb"),
    meseroId: new mongoose.Types.ObjectId("676109067c8ffea7e0f614b8"),
    platillos: [
      {
        platilloId: new mongoose.Types.ObjectId("6746979742b9d0bbd24f1d62"),
        cantidad: 2,
        _id: new mongoose.Types.ObjectId("6761b3cd17a5c1bc54bc9d01")
      }
    ],
    estado: "pendiente",
    createdAt: new Date("2024-12-17T17:24:29.987Z"),
    updatedAt: new Date("2024-12-17T17:24:29.987Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6761b3d217a5c1bc54bc9d03"),
    mesaId: new mongoose.Types.ObjectId("6761b26a943f78195cbe7609"),
    clienteId: new mongoose.Types.ObjectId("676100e52d08b37bcffeffcd"),
    meseroId: new mongoose.Types.ObjectId("6761090c7c8ffea7e0f614ba"),
    platillos: [
      {
        platilloId: new mongoose.Types.ObjectId("6746977d42b9d0bbd24f1d60"),
        cantidad: 1,
        _id: new mongoose.Types.ObjectId("6761b3d217a5c1bc54bc9d04")
      },
      {
        platilloId: new mongoose.Types.ObjectId("6760f23cb7452d3da60afa76"),
        cantidad: 1,
        _id: new mongoose.Types.ObjectId("6761b3d217a5c1bc54bc9d05")
      }
    ],
    estado: "pendiente",
    createdAt: new Date("2024-12-17T17:24:34.526Z"),
    updatedAt: new Date("2024-12-17T17:24:34.526Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6761daf57b06b796ec01abc4"),
    mesaId: new mongoose.Types.ObjectId("6761b252943f78195cbe7603"),
    clienteId: new mongoose.Types.ObjectId("676100d72d08b37bcffeffc9"),
    meseroId: new mongoose.Types.ObjectId("67610e427c8ffea7e0f614ec"),
    platillos: [
      {
        platilloId: new mongoose.Types.ObjectId("6746979742b9d0bbd24f1d62"),
        cantidad: 3,
        _id: new mongoose.Types.ObjectId("6761daf57b06b796ec01abc5")
      }
    ],
    estado: "entregado",
    createdAt: new Date("2024-12-17T20:11:33.523Z"),
    updatedAt: new Date("2024-12-17T20:11:45.129Z"),
    __v: 0
  }
];

const platillosData = [
  {
    _id: new mongoose.Types.ObjectId("6746977d42b9d0bbd24f1d60"),
    nombre: "Bruschetta",
    ingredientes: [
      "pan tostado",
      "tomate",
      "albahaca",
      "ajo",
      "aceite de oliva",
      "sal",
      "pimienta"
    ],
    precio: 8.5,
    imagenes: [
      "https://www.sanpellegrino.com/es/sites/g/files/xknfdk2326/files/styles/open_graph_image/public/bruschetta_0.jpg?itok=on_-STNb",
      "https://www.allrecipes.com/thmb/QSsjryxShEx1L6o0HLer1Nn4jwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54165-balsamic-bruschetta-DDMFS-4x3-e2b55b5ca39b4c1783e524a2461634ea.jpg"
    ],
    categoriaId: new mongoose.Types.ObjectId("674696b342b9d0bbd24f1d5a"),
    createdAt: new Date("2024-11-27T03:52:29.417Z"),
    updatedAt: new Date("2024-12-17T03:35:31.725Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6746979742b9d0bbd24f1d62"),
    nombre: "Risotto alla Milanese",
    ingredientes: [
      "arroz arborio",
      "caldo de pollo",
      "vino blanco",
      "azafrán",
      "cebolla",
      "queso parmesano",
      "mantequilla"
    ],
    precio: 18,
    imagenes: [
      "https://imag.bonviveur.com/presentacion-principal-del-risotto-alla-milanese.jpg"
    ],
    categoriaId: new mongoose.Types.ObjectId("674696ed42b9d0bbd24f1d5c"),
    createdAt: new Date("2024-11-27T03:52:55.445Z"),
    updatedAt: new Date("2024-11-27T03:52:55.445Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("674697a442b9d0bbd24f1d64"),
    nombre: "Chianti Reserva 2019",
    ingredientes: [
      "uva Sangiovese",
      "uva Canaiolo",
      "fermentación en barricas de roble"
    ],
    precio: 45,
    imagenes: [
      "https://s.tannico.it/media/catalog/product//c/h/chiantiriserva_cecchi_1_1_1_1_1.jpg"
    ],
    categoriaId: new mongoose.Types.ObjectId("674696f942b9d0bbd24f1d5e"),
    createdAt: new Date("2024-11-27T03:53:08.171Z"),
    updatedAt: new Date("2024-12-16T16:52:42.199Z"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("6760f23cb7452d3da60afa76"),
    nombre: "Bruschetta al Pomodoro",
    ingredientes: [
      "pan de campo, tomates frescos, albahaca, ajo, aceite de oliva, sal, pimienta"
    ],
    precio: 9,
    imagenes: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxCZH9yrvRvnoc3RYmRbA0m2rBBfEQqz4CA&s",
      "https://img-global.cpcdn.com/recipes/8f4e0473c9521f20/1200x630cq70/photo.jpg"
    ],
    categoriaId: new mongoose.Types.ObjectId("674696b342b9d0bbd24f1d5a"),
    createdAt: new Date("2024-12-17T03:38:36.508Z"),
    updatedAt: new Date("2024-12-17T03:46:57.770Z"),
    __v: 0
  }
];

async function seedDB() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos');

    await Categoria.deleteMany({});
    await Cliente.deleteMany({});
    await Mesa.deleteMany({});
    await Mesero.deleteMany({});
    await Orden.deleteMany({});
    await Platillo.deleteMany({});
    await Mensaje.deleteMany({}); 

    await Categoria.insertMany(categoriasData);
    console.log('Categorias insertadas');
    await Cliente.insertMany(clientesData);
    console.log('Clientes insertados');
    await Mesa.insertMany(mesasData);
    console.log('Mesas insertadas');
    await Mesero.insertMany(meserosData);
    console.log('Meseros insertados');
    await Platillo.insertMany(platillosData);
    console.log('Platillos insertados');
    await Orden.insertMany(ordenesData);
    console.log('Ordenes insertadas');

    await mongoose.disconnect();
    console.log('Desconectado de la base de datos');
  } catch (error) {
    console.error('Error durante el seed:', error);
    process.exit(1);
  }
}

seedDB();
