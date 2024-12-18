const express = require('express');
const Categoria = require('../../db/models/Categoria');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.post('/api/categorias', authenticateToken, async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevaCategoria = new Categoria({
      nombre,
      descripcion,
    });

    await nuevaCategoria.save();

    res.status(201).send({
      categoria: nuevaCategoria,
      mensaje: 'Categoría creada exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al crear la categoría: ${error.message}` });
  }
});

module.exports = router;
