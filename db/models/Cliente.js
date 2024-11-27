const mongoose = require("mongoose");

// Modelo para Clientes
const ClienteSchema = new mongoose.Schema(
    {
      nombre: { 
        type: String, 
        required: true 
      },
      correo: { 
        type: String, 
        required: true, 
        unique: true 
      },
      telefono: { 
        type: String, 
        required: true 
      },
      dni: { 
        type: String, 
        required: true, 
        unique: true 
      }
    },
    { timestamps: true }
  );
  
  const Cliente = mongoose.model("Cliente", ClienteSchema);

  module.exports = Cliente;
  