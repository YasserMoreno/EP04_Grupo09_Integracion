const express = require('express');
const Mesa = require('../../db/models/Mesa');  
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.delete('/api/mesas/:id', authenticateToken,  async (req, res) => {
  const { id } = req.params;
  
  try {
    const mesa = await Mesa.findByIdAndDelete(id);
    if (!mesa) {
      return res.status(404).json({ message: 'Mesa no encontrada' });
    }
    res.status(200).json({ message: 'Mesa eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la mesa', error });
  }
});

module.exports = router;
