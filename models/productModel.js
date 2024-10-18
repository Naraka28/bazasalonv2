// models/ProductsModel.js
const pool = require('../config/db');

// Obtener todos los usuarios
const getAllproducts = async () => {
  const result = await pool.query('SELECT * FROM products ORDER BY product_id ASC');
  return result.rows;
};

// Obtener un usuario por ID
const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo usuario
const createProduct = async (product) => {
  const result = await pool.query(
    'INSERT INTO products (name, quantity, price) VALUES ($1, $2, $3) RETURNING *',
    [product.name, product.quantity, product.price]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateProduct = async (id, Products) => {
  const { name, email } = Products;
  const result = await pool.query(
    'UPDATE products SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteProduct = async (id) => {
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