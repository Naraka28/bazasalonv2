// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Rutas para CRUD de usuarios
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployee);
router.post('/login', employeeController.getLoginEmpleado);
router.post('/create', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
