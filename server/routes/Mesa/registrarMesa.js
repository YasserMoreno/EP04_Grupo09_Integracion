const express = require('express');
const Mesa = require('../../db/models/Mesa');  
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

router.post('/api/mesas', authenticateToken,  async (req, res) => {
  const { numero } = req.body;
  
  try {
    const nuevaMesa = new Mesa({ numero });
    await nuevaMesa.save();
    res.status(201).json(nuevaMesa); 
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la mesa', error });
  }
});

module.exports = router;
