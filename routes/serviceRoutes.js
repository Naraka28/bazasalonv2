const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Rutas para CRUD de serviceos
router.get('/', serviceController.getServices);
router.post('/', serviceController.insertService);


module.exports = router;
