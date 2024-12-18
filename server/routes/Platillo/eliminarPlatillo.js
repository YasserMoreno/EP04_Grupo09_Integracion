const express = require('express');
const Platillo = require('../../db/models/Platillo');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.delete('/api/platillos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const platilloEliminado = await Platillo.findByIdAndDelete(id);

    if (!platilloEliminado) {
      return res.status(404).send({ mensaje: 'Platillo no encontrado' });
    }

    res.status(200).send({
      mensaje: 'Platillo eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el platillo: ${error.message}` });
  }
});

module.exports = router;
