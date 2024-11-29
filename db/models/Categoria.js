const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema(
    {
      nombre: { 
        type: String, 
        required: true, 
        unique: true 
      },
      descripcion: { 
        type: String 
      }
    },
    { timestamps: true }
  );
  
  const Categoria = mongoose.model("Categoria", CategoriaSchema);

  module.exports = Categoria;
  