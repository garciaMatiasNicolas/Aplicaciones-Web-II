const express = require('express');
const router = express.Router();
const { createOrderAndSendEmail } = require('../controllers/ordersController');

router.post('/', async (req, res) => {
  const { cart, email } = req.body; 
  if (!cart || !email) {
    return res.status(400).json({ error: 'Faltan datos del carrito o email' });
  }
  const result = await createOrderAndSendEmail(cart, email);
  if (result.success) {
    res.status(201).json({ message: 'Orden creada y email enviado', orderId: result.orderId });
  } else {
    res.status(500).json({ error: result.error });
  }
});

module.exports = router;