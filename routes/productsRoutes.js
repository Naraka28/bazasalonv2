const express = require('express');;
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para CRUD de productos
router.get('/', productController.getProducts);
router.post('/', productController.createProduct);


module.exports = router;