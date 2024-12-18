const express = require('express');
const Mesero = require('../../db/models/Mesero');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get('/api/meseros/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; 
    const mesero = await Mesero.findById(id); 

    if (!mesero) {
      return res.status(404).send({ mensaje: 'Mesero no encontrado' });
    }

    res.status(200).send(mesero);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el mesero: ${error.message}` });
  }
});

module.exports = router;
