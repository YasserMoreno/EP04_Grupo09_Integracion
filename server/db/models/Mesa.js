const mongoose = require("mongoose");

const MesaSchema = new mongoose.Schema(
  {
    numero: { 
      type: Number, 
      required: true, 
      unique: true 
    }
  },
  { timestamps: true } 
);

const Mesa = mongoose.model("Mesa", MesaSchema);

module.exports = Mesa;