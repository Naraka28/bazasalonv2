// models/appointmentModel.js
const pool = require('../config/db');

// Obtener todos los usuarios
const getAllAppointments = async () => {
  const result = await pool.query('SELECT * FROM appointments ORDER BY appointment_id ASC');
  return result.rows;
};

// Obtener un usuario por ID
const getAppointmentById = async (id) => {
  const result = await pool.query('SELECT * FROM appointments WHERE appointment_id = $1', [id]);
  return result.rows[0];
};

// Crear un nuevo usuario
const createAppointment = async (appointment) => {
  const { name, email } = user;
  const result = await pool.query(
    'INSERT INTO appointments (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateAppointment = async (id, appointment) => {
  const { name, email } = user;
  const result = await pool.query(
    'UPDATE appointments SET name = $1, email = $2 WHERE appointment_id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteAppointment = async (id) => {
  const result = await pool.query('DELETE FROM appointments WHERE appointment_id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};