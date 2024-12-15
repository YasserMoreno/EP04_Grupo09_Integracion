const express = require('express');
const Orden = require('../../db/models/Orden');

const router = express.Router();

router.delete('/api/ordenes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const ordenEliminada = await Orden.findByIdAndDelete(id);

    if (!ordenEliminada) {
      return res.status(404).send({ mensaje: 'Orden no encontrada' });
    }

    res.status(200).send({
      mensaje: 'Orden eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar la orden: ${error.message}` });
  }
});

module.exports = router;
