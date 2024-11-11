const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Rutas para CRUD de serviceos
router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getService);
router.delete("/:id", serviceController.deleteService);
router.put("/:id", serviceController.updateService);
router.post("/create", serviceController.insertService);

module.exports = router;
