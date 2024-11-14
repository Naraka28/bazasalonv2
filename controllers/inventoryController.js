// controllers/userController.js
const Material = require("../models/inventoryModel");

// Obtener todos los materiales
const getInventory = async (req, res) => {
  try {
    const inventory = await Material.getAllMaterials();
    res.status(200).json({ inventory: inventory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el inventario", error: error.message });
  }
};

// Obtener un material por nombre
const getMaterial = async (req, res) => {
  const name = req.body;
  try {
    const material = await Material.getMaterialByName(name);
    if (!material) {
      return res
        .status(404)
        .json({ message: `Material con nombre ${name} no encontrado` });
    }
    res.status(200).json({ inventory: material });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el material", error: error.message });
  }
};

// Obtener material por ID
const materialById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const material = await Material.getMaterialById(id);
    if (!material) {
      return res
        .status(404)
        .json({ message: `Material con ID ${id} no encontrado` });
    }
    res.status(200).json({ inventory: material });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el material", error: error.message });
  }
};

// Crear un nuevo material
const createMaterial = async (req, res) => {
  const { name, quantity, price } = req.body;

  if (!name || !quantity || !price) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const newMaterial = await Material.createMaterial({
      name,
      quantity,
      price,
    });

    res.status(201).json({ material: newMaterial });
  } catch (error) {
    console.error("Error al crear el material:", error);
    res
      .status(500)
      .json({ message: "Error al crear el material", error: error.message });
  }
};

// Actualizar un material existente
const updateMaterial = async (req, res) => {
  const id = parseInt(req.params.id);
  const material = req.body;
  material.material_id = id;
  try {
    const updatedMaterial = await Material.updateMaterial(material);
    if (!updatedMaterial) {
      return res
        .status(404)
        .json({ message: `Material con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Material editado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el material",
      error: error.message,
    });
  }
};

// Eliminar un material
const deleteMaterial = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedMaterial = await Material.deleteMaterial(id);
    if (!deletedMaterial) {
      return res
        .status(404)
        .json({ message: `Material con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Material eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el material", error: error.message });
  }
};

module.exports = {
  getInventory,
  getMaterial,
  materialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,  // Exportamos la función de eliminar material
};
