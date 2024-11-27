const mongoose = require("mongoose");

// Modelo para Mesa
const MesaSchema = new mongoose.Schema(
  {
    numero: { 
      type: Number, 
      required: true, 
      unique: true 
    }
  },
  { timestamps: true } // Añade automáticamente createdAt y updatedAt
);

const Mesa = mongoose.model("Mesa", MesaSchema);

module.exports = Mesa;