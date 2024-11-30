const express = require("express");
const bcrypt = require("bcryptjs");
const Mesero = require("../../db/models/Mesero");

const router = express.Router();

router.post("/api/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res
        .status(400)
        .send({ error: "Usuario y contraseña son requeridos" });
    }

    const mesero = await Mesero.findOne({ usuario });

    if (!mesero) {
      return res.status(404).send({ error: "Mesero no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, mesero.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Contraseña incorrecta" });
    }

    res.status(200).send({ mensaje: "Inicio de sesión exitoso", mesero });
  } catch (error) {
    console.error("Error al iniciar sesión:", error); // Log error for debugging
    res
      .status(500)
      .send({ error: `Error al iniciar sesión: ${error.message}` });
  }
});

module.exports = router;
