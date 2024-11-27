// Modelo para Platillos
const mongoose = require("mongoose");

const PlatilloSchema = new mongoose.Schema(
  {
    nombre: { 
      type: String, 
      required: true 
    },

    ingredientes: { 
      type: [String], 
      required: true 
    },

    precio: { 
      type: Number, 
      required: true
    },

    imagenes: { 
      type: [String], 
      default: [] 
    },
    categoriaId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Categoria', 
      required: true 
    }
  },
  { timestamps: true }
);

const Platillo = mongoose.model("Platillo", PlatilloSchema);

module.exports = Platillo;
