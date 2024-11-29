const express = require('express');
const Mesero = require('../../db/models/Mesero');

const router = express.Router();

router.get('/api/meseros', async (req, res) => {
  try {
    const meseros = await Mesero.find({ activo: true });
    res.status(200).send(meseros);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los meseros: ${error.message}` });
  }
});

module.exports = router;
