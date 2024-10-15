// models/ProductsModel.js
const pool = require('../config/db');

// Obtener todos los usuarios
const getAllproducts = async () => {
  const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
  return result.rows;
};

// Obtener un usuario por ID
const getProductsById = async (id) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo usuario
const createProducts = async (Products) => {
  const { name, email } = Products;
  const result = await pool.query(
    'INSERT INTO products (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateProducts = async (id, Products) => {
  const { name, email } = Products;
  const result = await pool.query(
    'UPDATE products SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteProducts = async (id) => {
  const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllproducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};