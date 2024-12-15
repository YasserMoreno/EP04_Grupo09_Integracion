const express = require('express');
const Categoria = require('../../db/models/Categoria');

const router = express.Router();

router.put('/api/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      { nombre, descripcion },
      { new: true, runValidators: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).send({ mensaje: 'Categoría no encontrada' });
    }

    res.status(200).send({
      categoria: categoriaActualizada,
      mensaje: 'Categoría actualizada exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar la categoría: ${error.message}` });
  }
});

module.exports = router;
