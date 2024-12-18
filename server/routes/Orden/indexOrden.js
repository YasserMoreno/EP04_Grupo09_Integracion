const express = require('express');
const Orden = require('../../db/models/Orden');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get('/api/ordenes', authenticateToken, async (req, res) => {
  try {
    const ordenes = await Orden.find()
      .populate('mesaId') 
      .populate('clienteId') 
      .populate('meseroId') 
      .populate('platillos.platilloId');

    if (!ordenes.length) {
      return res.status(404).send({ mensaje: 'No se encontraron órdenes' });
    }

    res.status(200).send(ordenes);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las órdenes: ${error.message}` });
  }
});

module.exports = router;
