const express = require('express');
const morgan = require('morgan');

const registrarPlatillo = require('./routes/Platillo/registrarPlatillo');
const obtenerPlatillo = require('./routes/Platillo/obtenerPlatillo');
const actualizarPlatillo = require('./routes/Platillo/actualizarPlatillo');
const eliminarPlatillo = require('./routes/Platillo/eliminarPlatillo');

const registrarCategoria = require('./routes/Categoria/registrarCategoria');
const obtenerCategorias = require('./routes/Categoria/obtenerCategorias');
const actualizarCategoria = require('./routes/Categoria/actualizarCategoria');
const eliminarCategoria = require('./routes/Categoria/eliminarCategoria');

const registrarCliente = require('./routes/Cliente/registrarCliente');
const obtenerCliente = require('./routes/Cliente/obtenerCliente');
const actualizarCliente = require('./routes/Cliente/actualizarCliente');
const eliminarCliente = require('./routes/Cliente/eliminarCliente');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

//Rutas
app.use(registrarPlatillo)
app.use(obtenerPlatillo)
app.use(actualizarPlatillo)
app.use(eliminarPlatillo)

app.use(registrarCategoria)
app.use(obtenerCategorias)
app.use(actualizarCategoria)
app.use(eliminarCategoria)

app.use(registrarCliente)
app.use(obtenerCliente)
app.use(actualizarCliente)
app.use(eliminarCliente)

module.exports = app