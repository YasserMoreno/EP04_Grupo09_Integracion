const express = require('express');
const Categoria = require('../../db/models/Categoria');

const router = express.Router();

router.delete('/api/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    if (!categoriaEliminada) {
      return res.status(404).send({ mensaje: 'Categoría no encontrada' });
    }

    res.status(200).send({
      mensaje: 'Categoría eliminada exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar la categoría: ${error.message}` });
  }
});

module.exports = router;
