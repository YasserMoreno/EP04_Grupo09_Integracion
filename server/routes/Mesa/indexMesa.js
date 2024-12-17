const express = require('express');
const Mesa = require('../../db/models/Mesa');  

const router = express.Router();


router.get('/api/mesas', async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.status(200).json(mesas);  
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las mesas', error });
  }
});

module.exports = router;
