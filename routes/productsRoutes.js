const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rutas para CRUD de productos
router.get("/", productController.getProducts);
router.post("/search", productController.getProductByName);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/reports/topProduct", productController.reporteProductoMasVendido);
router.get("/reports/inventory", productController.reporteInventario);
router.get("/reports/topEmployee", productController.reporteTopEmpleado);
router.get("/reports/topService", productController.reporteTopServicio);
router.get("/reports/prices", productController.reporteListaPrecios);
router.post("/", productController.insertProduct);

module.exports = router;
