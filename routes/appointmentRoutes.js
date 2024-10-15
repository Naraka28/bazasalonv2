const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

router.get('/',appointmentController.getAppointments)
router.get('/:id',appointmentController.getAppointment)
router.post('/',appointmentController.createAppointment)
router.put('/:id',appointmentController.updateAppointment)
router.delete('/:id',appointmentController.updateAppointment)

module.exports = router;