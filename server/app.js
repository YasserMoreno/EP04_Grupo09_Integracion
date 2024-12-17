const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const registrarPlatillo = require("./routes/Platillo/registrarPlatillo");
const obtenerPlatillo = require("./routes/Platillo/obtenerPlatillo");
const indexPlatillo = require("./routes/Platillo/indexPlatillo");
const actualizarPlatillo = require("./routes/Platillo/actualizarPlatillo");
const eliminarPlatillo = require("./routes/Platillo/eliminarPlatillo");

const registrarCategoria = require("./routes/Categoria/registrarCategoria");
const obtenerCategorias = require("./routes/Categoria/obtenerCategorias");
const obtenerCategoria = require("./routes/Categoria/obtenerCategoria");
const actualizarCategoria = require("./routes/Categoria/actualizarCategoria");
const eliminarCategoria = require("./routes/Categoria/eliminarCategoria");

const registrarCliente = require("./routes/Cliente/registrarCliente");
const obtenerCliente = require("./routes/Cliente/obtenerCliente");
const actualizarCliente = require("./routes/Cliente/actualizarCliente");
const eliminarCliente = require("./routes/Cliente/eliminarCliente");
const indexClientes = require("./routes/Cliente/indexClientes");

const registrarMesero = require("./routes/Mesero/registrarMesero");
const obtenerMeseros = require("./routes/Mesero/obtenerMeseros");
const obtenerMesero = require("./routes/Mesero/obtenerMesero");
const actualizarMesero = require("./routes/Mesero/actualizarMesero");
const eliminarMesero = require("./routes/Mesero/eliminarMesero");
const loginMesero = require("./routes/Mesero/loginMesero");

const registrarOrden = require("./routes/Orden/registrarOrden");
const obtenerOrdenPorMesa = require("./routes/Orden/obtenerOrdenPorMesa");
const obtenerOrdenPorId = require("./routes/Orden/obtenerOrdenPorId");
const indexOrden = require("./routes/Orden/indexOrden");
const actualizarOrden = require("./routes/Orden/actualizarOrden");
const eliminarOrden = require("./routes/Orden/eliminarOrden");

const indexMesa = require('./routes/Mesa/indexMesa');
const obtenerMesa = require('./routes/Mesa/obtenerMesa');
const eliminarMesa = require('./routes/Mesa/eliminarMesa');
const actualizarMesa = require('./routes/Mesa/actualizarMesa');
const registrarMesa = require('./routes/Mesa/registrarMesa');

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Rutas
app.use(registrarPlatillo);
app.use(obtenerPlatillo);
app.use(indexPlatillo);
app.use(actualizarPlatillo);
app.use(eliminarPlatillo);

app.use(registrarCategoria);
app.use(obtenerCategorias);
app.use(obtenerCategoria);
app.use(actualizarCategoria);
app.use(eliminarCategoria);

app.use(registrarCliente);
app.use(obtenerCliente);
app.use(actualizarCliente);
app.use(eliminarCliente);
app.use(indexClientes);

app.use(registrarMesero);
app.use(obtenerMeseros);
app.use(obtenerMesero);
app.use(actualizarMesero);
app.use(eliminarMesero);
app.use(loginMesero);

app.use(registrarOrden);
app.use(obtenerOrdenPorMesa);
app.use(obtenerOrdenPorId);
app.use(indexOrden);
app.use(actualizarOrden);
app.use(eliminarOrden);

app.use(indexMesa);    
app.use(obtenerMesa);      
app.use(eliminarMesa);    
app.use(actualizarMesa);   
app.use(registrarMesa);  

module.exports = app;
