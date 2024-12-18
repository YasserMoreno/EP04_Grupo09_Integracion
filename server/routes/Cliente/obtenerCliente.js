const express = require("express");
const Cliente = require("../../db/models/Cliente");
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.get("/api/clientes/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).send({ mensaje: "Cliente no encontrado" });
    }

    res.status(200).send(cliente);
  } catch (error) {
    res
      .status(500)
      .send({ error: `Error al obtener el cliente: ${error.message}` });
  }
});

module.exports = router;
