const express = require('express');
const Categoria = require('../../db/models/Categoria');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

// Obtener una categoría por ID
router.get('/api/categorias/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findById(id);
  
      if (!categoria) {
        return res.status(404).send({ mensaje: 'Categoría no encontrada' });
      }
  
      res.status(200).send(categoria);
    } catch (error) {
      res.status(500).send({ error: `Error al obtener la categoría: ${error.message}` });
    }
  });
  
  module.exports = router;