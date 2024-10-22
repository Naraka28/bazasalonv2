// models/ProductsModel.js
const pool = require('../config/db');

// Obtener todos los usuarios
const getAllServices = async () => {
  const result = await pool.query('SELECT service_id, name, catalogue_id, price, CAST(EXTRACT(epoch FROM duration) / 60 AS INTEGER) AS duration_in_minutes FROM services;');
  return result.rows;
};

// Obtener un servicio por ID

// Crear un nuevo servicio
const createService = async (service) => {
  const result = await pool.query(
"INSERT INTO services (name, catalogue_id, price, duration) VALUES ($1, $2, $3, ($4 || 'minutes')::INTERVAL) RETURNING *",
    [service.name, service.catalogue_id, service.price, service.duration]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateProduct = async (id, Products) => {
  const { name, email } = Products;
  const result = await pool.query(
    'UPDATE services SET name = $1, email = $2 WHERE service_id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

// Eliminar un service
const deleteProduct = async (id) => {
  const result = await pool.query('DELETE FROM services WHERE service_id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
    getAllServices,
    createService

};