const express = require('express');
const Mesero = require('../../db/models/Mesero');

const router = express.Router();

// Ruta para obtener un mesero por ID
router.get('/api/meseros/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de los parámetros de la URL
    const mesero = await Mesero.findById(id); // Buscar el mesero por ID

    if (!mesero) {
      return res.status(404).send({ mensaje: 'Mesero no encontrado' });
    }

    res.status(200).send(mesero); // Responder con los datos del mesero encontrado
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el mesero: ${error.message}` });
  }
});

module.exports = router;
