const mongoose = require("mongoose");

const OrdenSchema = new mongoose.Schema(
  {
  
    mesaId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Mesa", 
      required: true 
    },
    

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
          min: 1 
        },
      },
    ],
    

    estado: {
      type: String,
      enum: ["pendiente", "entregado", "cancelado"],
      default: "pendiente",
    }
  },
  { 
    timestamps: true 
  }
);

const Orden = mongoose.model("Orden", OrdenSchema);

module.exports = Orden;
