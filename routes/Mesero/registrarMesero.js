const express = require("express");
const bcrypt = require("bcryptjs");
const Mesero = require("../../db/models/Mesero");

const router = express.Router();

router.post("/api/meseros", async (req, res) => {
  try {
    const { nombre, correo, telefono, usuario, password } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el "salt rounds"

    const nuevoMesero = new Mesero({
      nombre,
      correo,
      telefono,
      usuario,
      password: hashedPassword, // Almacenar la contraseña encriptada
      activo: true,
    });

    await nuevoMesero.save();

    res.status(201).send({
      mesero: nuevoMesero,
      mensaje: "Mesero registrado exitosamente con contraseña encriptada",
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: `Error al registrar el mesero: ${error.message}` });
  }
});

module.exports = router;
