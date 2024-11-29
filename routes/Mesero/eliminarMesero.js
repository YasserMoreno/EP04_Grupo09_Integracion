const express = require('express');
const Mesero = require('../../db/models/Mesero');

const router = express.Router();

router.delete('/api/meseros/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const meseroEliminado = await Mesero.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );

    if (!meseroEliminado) {
      return res.status(404).send({ mensaje: 'Mesero no encontrado' });
    }

    res.status(200).send({
      mensaje: 'Mesero eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el mesero: ${error.message}` });
  }
});

module.exports = router;
