require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mesero = require("../../db/models/Mesero");
const secretKey = process.env.VALIDATE_KEY;

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
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    if (!mesero.activo) {
      return res.status(403).send({ error: "Usuario inactivo" });
    }

    const isMatch = await bcrypt.compare(password, mesero.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Contraseña incorrecta" });
    }

    const tokenKey = secretKey;

    if (!tokenKey) {
      throw new Error("Clave secreta para JWT no encontrada en .env");
    }

    const token = jwt.sign({ id: mesero._id }, tokenKey, { expiresIn: "1h" });

    const respuesta = {
      pass: true,
      message: "Autenticación Exitosa",
      userName: mesero.usuario,
      token,
    };

    res.status(200).json(respuesta);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send({ error: `Error al iniciar sesión: ${error.message}` });
  }
});

module.exports = router;
