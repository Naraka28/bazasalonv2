// models/ProductsModel.js
const pool = require("../config/db");

// Obtener todos los usuarios
const getAllServices = async () => {
  const result = await pool.query(
    `SELECT service_id, name, c.catalogue, price, CAST(EXTRACT(epoch FROM duration) / 60 AS INTEGER) AS duration_in_minutes 
  FROM services
  INNER JOIN catalogues as c ON services.catalogue_id = c.catalogue_id
  

  ORDER BY service_id ASC;`
  );
  return result.rows;
};
const getServiceById = async (id) => {
  const result = await pool.query(
    "SELECT service_id, name, catalogue_id, price, CAST(EXTRACT(epoch FROM duration) / 60 AS INTEGER) AS duration_in_minutes FROM services WHERE service_id = $1",
    [id]
  );
  return result.rows[0];
};
const getServiceByName = async (service) => {
  const name = "%"+service.name + "%";
  const result = await pool.query(
    `SELECT service_id, name, c.catalogue, price, CAST(EXTRACT(epoch FROM duration) / 60 AS INTEGER) AS duration_in_minutes 
    FROM services
    INNER JOIN catalogues as c ON services.catalogue_id = c.catalogue_id
    WHERE name ILIKE $1 or c.catalogue ILIKE $1
    ORDER BY service_id ASC;`,
    [name]
  );
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
const updateService = async (service) => {
  const result = await pool.query(
    "UPDATE services SET name = $1, price = $2, duration = ($3 || 'minutes')::INTERVAL WHERE service_id = $4 RETURNING *",
    [service.name, service.price, service.duration, service.service_id]
  );
  return result.rows[0];
};

const deleteService = async (id) => {
  const result = await pool.query(
    "DELETE FROM services WHERE service_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllServices,
  createService,
  deleteService,
  getServiceById,
  updateService,
  getServiceByName,
};
