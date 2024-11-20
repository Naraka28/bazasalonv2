// models/userModel.js
const pool = require("../config/db");

// Obtener todos los usuarios
const getAllMaterials = async () => {
  const result = await pool.query(
    "SELECT * FROM materials ORDER BY material_id ASC LIMIT 10 "
  );
  return result.rows;
};

// Obtener un usuario por ID
const getMaterialById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM materials WHERE material_id = $1",
    [id]
  );
  return result.rows[0];
};
const getMaterialByName = async (material) => {
  const name ="%"+ material.name + "%";
  console.log(material.name);
  const result = await pool.query(
    "SELECT * FROM materials WHERE name ILIKE $1",
    [name]
  );
  console.log(result.rows);
  return result.rows;
};

// Crear un nuevo usuario
const createMaterial = async (material) => {
  console.log(material);
  const { name, quantity, price } = material;
  const result = await pool.query(
    "INSERT INTO materials (name, quantity, price) VALUES ($1, $2, $3) RETURNING *",
    [name, quantity, price]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateMaterial = async (material) => {
  const result = await pool.query(
    "UPDATE materials SET name = $1, quantity = $2,price = $3 WHERE material_id = $4 RETURNING *",
    [material.name, material.quantity, material.price, material.material_id]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteMaterial = async (id) => {
  const result = await pool.query(
    "DELETE FROM materials WHERE material_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialByName,
};
