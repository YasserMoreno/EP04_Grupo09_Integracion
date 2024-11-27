const mongoose = require("mongoose");

// Modelo para Meseros
const MeseroSchema = new mongoose.Schema(
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

    usuario: { 
      type: String, 
      required: true, 
      unique: true // Asegura que no haya nombres de usuario duplicados
    },

    password: { 
      type: String, 
      required: true 
    },

    activo: { 
      type: Boolean, 
      default: true 
    }
  },
  { 
    timestamps: true // Añade automáticamente createdAt y updatedAt
  }
);

const Mesero = mongoose.model("Mesero", MeseroSchema);

module.exports = Mesero;
