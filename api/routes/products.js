const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

// Rutas de productos
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.post('/buscar', productController.findProductByName);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
