const express = require('express');
const Platillo = require('../../db/models/Platillo');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.put('/api/platillos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ingredientes, precio, imagenes, categoriaId } = req.body;

    const platilloActualizado = await Platillo.findByIdAndUpdate(
      id,
      { nombre, ingredientes, precio, imagenes, categoriaId },
      { new: true, runValidators: true }
    );

    if (!platilloActualizado) {
      return res.status(404).send({ mensaje: 'Platillo no encontrado' });
    }

    res.status(200).send({
      platillo: platilloActualizado,
      mensaje: 'Platillo actualizado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el platillo: ${error.message}` });
  }
});

module.exports = router;
