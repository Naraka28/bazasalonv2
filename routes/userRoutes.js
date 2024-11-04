// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas para CRUD de usuarios
router.get("/", userController.getUsers);
router.get("/:id", userController.userById);
router.post("/name", userController.getUser);
router.post("/phone", userController.getUserByPhoneController);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
