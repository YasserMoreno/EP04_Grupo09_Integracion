const express = require('express');
const Platillo = require('../../db/models/Platillo');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.post('/api/platillos', authenticateToken, async (req, res) => {
  try {
    const { nombre, ingredientes, precio, imagenes, categoriaId } = req.body;

    const nuevoPlatillo = new Platillo({
      nombre,
      ingredientes,
      precio,
      imagenes,
      categoriaId,
    });

    await nuevoPlatillo.save();

    res.status(201).send({
      platillo: nuevoPlatillo,
      mensaje: 'Platillo creado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al crear el platillo: ${error.message}` });
  }
});

module.exports = router;
