const mongoose = require("mongoose");

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
      unique: true 
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
    timestamps: true 
  }
);

const Mesero = mongoose.model("Mesero", MeseroSchema);

module.exports = Mesero;
