// routes/inventoryRoutes.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Rutas para CRUD de inventario
router.get("/", inventoryController.getInventory);                // Obtener todo el inventario
router.get("/:id", inventoryController.materialById);             // Obtener material por ID
router.post("/name", inventoryController.getMaterial);            // Obtener material por nombre
router.post("/", inventoryController.createMaterial);             // Crear nuevo material
router.put("/:id", inventoryController.updateMaterial);           // Actualizar material
router.delete("/:id", inventoryController.deleteMaterial);       // Eliminar material

module.exports = router;
