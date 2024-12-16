const mongoose = require("mongoose");

const MensajeSchema = new mongoose.Schema(
  {
    emisor: { type: String, required: true }, // ID del cliente o "admin"
    mensaje: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Mensaje = mongoose.model("Mensaje", MensajeSchema);

module.exports = Mensaje;