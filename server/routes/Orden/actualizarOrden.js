const express = require('express');
const Orden = require('../../db/models/Orden');

const router = express.Router();

router.put('/api/ordenes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { mesaId, clienteId, meseroId, platillos, estado } = req.body;

    const ordenActualizada = await Orden.findByIdAndUpdate(
      id,
      { mesaId, clienteId, meseroId, platillos, estado },
      { new: true, runValidators: true }
    );

    if (!ordenActualizada) {
      return res.status(404).send({ mensaje: 'Orden no encontrada' });
    }

    res.status(200).send({
      orden: ordenActualizada,
      mensaje: 'Orden actualizada exitosamente'
    });
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar la orden: ${error.message}` });
  }
});

module.exports = router;
