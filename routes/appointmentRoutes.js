const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController.js");

router.get("/", appointmentController.getAppointments);
router.get("/calendar", appointmentController.getAppointmentsForCalendar);
router.get("/:id", appointmentController.getAppointment);
router.post("/create", appointmentController.createAppointment);
router.post("/search", appointmentController.searchAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
