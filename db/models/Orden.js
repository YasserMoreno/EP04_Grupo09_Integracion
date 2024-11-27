const mongoose = require("mongoose");

// Modelo para Órdenes
const OrdenSchema = new mongoose.Schema(
  {
    // Referencia a la Mesa
    mesaId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Mesa", 
      required: true 
    },
    
    // Lista de platillos en la orden
    platillos: [
      {
        platilloId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Platillo",
          required: true,
        },
        cantidad: { 
          type: Number, 
          required: true, 
          min: 1 // Asegura que la cantidad mínima sea 1
        },
      },
    ],
    
    // Estado de la orden
    estado: {
      type: String,
      enum: ["pendiente", "entregado", "cancelado"],
      default: "pendiente",
    }
  },
  { 
    timestamps: true // Añade automáticamente createdAt y updatedAt
  }
);

const Orden = mongoose.model("Orden", OrdenSchema);

module.exports = Orden;
