const express = require("express");
const morgan = require("morgan");

const registrarPlatillo = require("./routes/Platillo/registrarPlatillo");
const obtenerPlatillo = require("./routes/Platillo/obtenerPlatillo");
const actualizarPlatillo = require("./routes/Platillo/actualizarPlatillo");
const eliminarPlatillo = require("./routes/Platillo/eliminarPlatillo");

const registrarCategoria = require("./routes/Categoria/registrarCategoria");
const obtenerCategorias = require("./routes/Categoria/obtenerCategorias");
const actualizarCategoria = require("./routes/Categoria/actualizarCategoria");
const eliminarCategoria = require("./routes/Categoria/eliminarCategoria");

const registrarCliente = require("./routes/Cliente/registrarCliente");
const obtenerCliente = require("./routes/Cliente/obtenerCliente");
const actualizarCliente = require("./routes/Cliente/actualizarCliente");
const eliminarCliente = require("./routes/Cliente/eliminarCliente");

const registrarMesero = require("./routes/Mesero/registrarMesero");
const obtenerMeseros = require("./routes/Mesero/obtenerMeseros");
const actualizarMesero = require("./routes/Mesero/actualizarMesero");
const eliminarMesero = require("./routes/Mesero/eliminarMesero");
const loginMesero = require("./routes/Mesero/loginMesero");

const registrarOrden = require("./routes/Orden/registrarOrden");
const obtenerOrden = require("./routes/Orden/obtenerOrden");
const actualizarOrden = require("./routes/Orden/actualizarOrden");
const eliminarOrden = require("./routes/Orden/eliminarOrden");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//Rutas
app.use(registrarPlatillo);
app.use(obtenerPlatillo);
app.use(actualizarPlatillo);
app.use(eliminarPlatillo);

app.use(registrarCategoria);
app.use(obtenerCategorias);
app.use(actualizarCategoria);
app.use(eliminarCategoria);

app.use(registrarCliente);
app.use(obtenerCliente);
app.use(actualizarCliente);
app.use(eliminarCliente);

app.use(registrarMesero);
app.use(obtenerMeseros);
app.use(actualizarMesero);
app.use(eliminarMesero);
app.use(loginMesero);

app.use(registrarOrden);
app.use(obtenerOrden);
app.use(actualizarOrden);
app.use(eliminarOrden);

module.exports = app;
