const express = require("express");
const Cliente = require("../../db/models/Cliente");
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get("/api/clientes", authenticateToken, async (req, res) => {
  try {
    const clientes = await Cliente.find();

    if (!clientes.length) {
      return res.status(404).send({ mensaje: "No se encontraron clientes" });
    }

    res.status(200).send(clientes);
  } catch (error) {
    res
      .status(500)
      .send({ error: `Error al obtener los clientes: ${error.message}` });
  }
});

module.exports = router;
