const express = require('express');
const Cliente = require('../../db/models/Cliente');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.put('/api/clientes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, dni } = req.body;

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { nombre, correo, telefono, dni },
      { new: true, runValidators: true }
    );

    if (!clienteActualizado) {
      return res.status(404).send({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).send({
      cliente: clienteActualizado,
      mensaje: 'Cliente actualizado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el cliente: ${error.message}` });
  }
});

module.exports = router;
