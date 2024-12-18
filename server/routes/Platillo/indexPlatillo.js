const express = require('express');
const Platillo = require('../../db/models/Platillo');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get('/api/platillos', authenticateToken, async (req, res) => {
  try {
    const platillos = await Platillo.find().populate('categoriaId', 'nombre');

    if (!platillos || platillos.length === 0) {
      return res.status(404).send({ mensaje: 'No se encontraron platillos' });
    }

    res.status(200).send(platillos);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los platillos: ${error.message}` });
  }
});

module.exports = router;