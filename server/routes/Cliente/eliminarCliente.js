const express = require('express');
const Cliente = require('../../db/models/Cliente');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.delete('/api/clientes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const clienteEliminado = await Cliente.findByIdAndDelete(id);

    if (!clienteEliminado) {
      return res.status(404).send({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).send({
      mensaje: 'Cliente eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el cliente: ${error.message}` });
  }
});

module.exports = router;
