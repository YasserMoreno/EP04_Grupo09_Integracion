const express = require('express');
const Categoria = require('../../db/models/Categoria');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get('/api/categorias', authenticateToken, async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).send(categorias);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las categorías: ${error.message}` });
  }
});

module.exports = router;
