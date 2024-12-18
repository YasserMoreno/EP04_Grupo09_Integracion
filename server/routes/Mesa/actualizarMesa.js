const express = require('express');
const Mesa = require('../../db/models/Mesa');  
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.put('/api/mesas/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { numero } = req.body;
  
  try {
    const mesa = await Mesa.findByIdAndUpdate(id, { numero }, { new: true });
    if (!mesa) {
      return res.status(404).json({ message: 'Mesa no encontrada' });
    }
    res.status(200).json(mesa); 
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la mesa', error });
  }
});

module.exports = router;
