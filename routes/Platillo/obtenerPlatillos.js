const express = require('express');
const Platillo = require('../../db/models/Platillo');

const router = express.Router();

router.get('/api/platillos', async (req, res) => {
  try {
    const platillos = await Platillo.find();

    if (!platillos || platillos.length === 0) {
      return res.status(404).send({ mensaje: 'No existen platillos registrados en el sistema' });
    }

    res.status(200).send( platillos );
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los platillos: ${error.message}` });
  }
});

module.exports = router;
