const express = require('express');
const Orden = require('../../db/models/Orden');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.post('/api/ordenes', authenticateToken, async (req, res) => {
  try {
    const { mesaId, clienteId, meseroId, platillos } = req.body;

    const nuevaOrden = new Orden({
      mesaId,
      clienteId,
      meseroId,
      platillos,
      estado: 'pendiente'
    });

    await nuevaOrden.save();

    res.status(201).send({
      orden: nuevaOrden,
      mensaje: 'Orden creada exitosamente'
    });
  } catch (error) {
    res.status(500).send({ error: `Error al crear la orden: ${error.message}` });
  }
});

module.exports = router;
