// models/appointmentModel.js
const pool = require("../config/db");

// Obtener todos los usuarios
const getAllAppointments = async () => {
  const result =
    await pool.query(`SELECT ap.appointment_id, ap.date, u.name, u.last_name, mat.name as material, em.name as em_name, em.last_name as em_last_name, s.name as servicio, ap.total_price
  FROM appointments as ap
  INNER JOIN users as u ON ap.user_id = u.user_id
  INNER JOIN materials as mat ON ap.material_id = mat.material_id
  INNER JOIN employees as em ON ap.employee_id = em.employee_id
  INNER JOIN services as s ON ap.service_id = s.service_id ORDER BY ap.appointment_id ASC;`);
  return result.rows;
};

// Obtener un usuario por ID
const getAppointmentById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM appointments WHERE appointment_id = $1",
    [id]
  );
  return result.rows[0];
};

// Crear un nuevo usuario
const createAppointment = async (appointment) => {
  const { name, email } = appointment;
  const result = await pool.query(
    "INSERT INTO appointments (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateAppointment = async (id, appointment) => {
  const { name, email } = appointment;
  const result = await pool.query(
    "UPDATE appointments SET name = $1, email = $2 WHERE appointment_id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteAppointment = async (id) => {
  const result = await pool.query(
    "DELETE FROM appointments WHERE appointment_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
