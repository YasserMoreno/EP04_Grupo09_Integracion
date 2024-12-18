const express = require('express');
const Platillo = require('../../db/models/Platillo');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get('/api/platillos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const platillo = await Platillo.findById(id).populate('categoriaId', 'nombre');

    if (!platillo) {
      return res.status(404).send({ mensaje: 'Platillo no encontrado' });
    }

    res.status(200).send(platillo);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el platillo: ${error.message}` });
  }
});

module.exports = router;
