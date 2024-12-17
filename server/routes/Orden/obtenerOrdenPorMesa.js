const express = require('express');
const Orden = require('../../db/models/Orden');

const router = express.Router();

router.get('/api/ordenes/mesa/:mesaId', async (req, res) => {
  try {
    const { mesaId } = req.params;
    const ordenes = await Orden.find({ mesaId })
    .populate('mesaId') 
    .populate('clienteId') 
    .populate('meseroId') 
    .populate('platillos.platilloId');

    if (!ordenes.length) {
      return res.status(404).send({ mensaje: 'No se encontraron órdenes para esta mesa' });
    }

    res.status(200).send(ordenes);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las órdenes: ${error.message}` });
  }
});

module.exports = router;
