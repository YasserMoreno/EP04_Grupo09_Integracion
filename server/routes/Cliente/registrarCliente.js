const express = require('express');
const Cliente = require('../../db/models/Cliente');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.post('/api/clientes', authenticateToken, async (req, res) => {
  try {
    const { nombre, correo, telefono, dni } = req.body;

    const nuevoCliente = new Cliente({
      nombre,
      correo,
      telefono,
      dni
    });

    await nuevoCliente.save();

    res.status(201).send({
      cliente: nuevoCliente,
      mensaje: 'Cliente registrado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al registrar el cliente: ${error.message}` });
  }
});

module.exports = router;
