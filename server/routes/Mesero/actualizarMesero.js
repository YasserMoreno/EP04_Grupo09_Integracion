const express = require('express');
const bcrypt = require('bcryptjs');
const Mesero = require('../../db/models/Mesero');

const router = express.Router();

router.put('/api/meseros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, usuario, password, activo } = req.body;

    // Crear objeto de actualización dinámicamente
    const camposActualizados = { nombre, correo, telefono, usuario, activo };

    // Si se recibe el password, encriptarlo y añadirlo al objeto de actualización
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      camposActualizados.password = hashedPassword;
    }

    const meseroActualizado = await Mesero.findByIdAndUpdate(
      id,
      camposActualizados,
      { new: true, runValidators: true }
    );

    if (!meseroActualizado) {
      return res.status(404).send({ mensaje: 'Mesero no encontrado' });
    }

    res.status(200).send({
      mesero: meseroActualizado,
      mensaje: 'Mesero actualizado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el mesero: ${error.message}` });
  }
});

module.exports = router;
