const express = require('express');
const Mesero = require('../../db/models/Mesero');

const router = express.Router();

router.post('/api/meseros', async (req, res) => {
  try {
    const { nombre, correo, telefono, usuario, password } = req.body;

    const nuevoMesero = new Mesero({
      nombre,
      correo,
      telefono,
      usuario,
      password
    });

    await nuevoMesero.save();

    res.status(201).send({
      mesero: nuevoMesero,
      mensaje: 'Mesero registrado exitosamente',
    });
  } catch (error) {
    res.status(500).send({ error: `Error al registrar el mesero: ${error.message}` });
  }
});

module.exports = router;
