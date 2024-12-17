const express = require('express');
const Mesa = require('../../db/models/Mesa');  

const router = express.Router();

router.get('/api/mesas/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const mesa = await Mesa.findById(id);
    if (!mesa) {
      return res.status(404).json({ message: 'Mesa no encontrada' });
    }
    res.status(200).json(mesa); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la mesa', error });
  }
});

module.exports = router;
