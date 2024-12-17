const express = require("express");
const Cliente = require("../../db/models/Cliente");

const router = express.Router();

// Obtener todos los clientes
router.get("/api/clientes", async (req, res) => {
  try {
    const clientes = await Cliente.find(); // Busca todos los clientes

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
