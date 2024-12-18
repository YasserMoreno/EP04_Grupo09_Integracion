const express = require('express');
const Orden = require('../../db/models/Orden');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get('/api/ordenes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await Orden.findById(id)
      .populate('mesaId')       
      .populate('clienteId')    
      .populate('meseroId')     
      .populate('platillos.platilloId'); 

    if (!orden) {
      return res.status(404).send({ mensaje: 'No se encontró la orden con el ID proporcionado' });
    }

    res.status(200).send(orden);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener la orden: ${error.message}` });
  }
});

module.exports = router;
