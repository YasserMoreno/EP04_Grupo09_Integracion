const express = require('express');
const Categoria = require('../../db/models/Categoria');

const router = express.Router();

router.get('/api/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).send(categorias);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las categorías: ${error.message}` });
  }
});

module.exports = router;
