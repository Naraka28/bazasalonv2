// models/appointmentModel.js
const pool = require("../config/db");

// Obtener todos los usuarios
const getAllAppointments = async () => {
  const result =
    await pool.query(`SELECT ap.appointment_id,TO_CHAR(ap.date, 'DD/MM/YYYY') as date, u.name, u.last_name, em.name as em_name, em.last_name as em_last_name, s.name as servicio, TO_CHAR(ap.hour,'HH24:MI') as hour,
    s.price as total_price, ap.employee_id, ap.service_id, ap.user_id
  FROM appointments as ap
  INNER JOIN users as u ON ap.user_id = u.user_id
  INNER JOIN employees as em ON ap.employee_id = em.employee_id
  INNER JOIN services as s ON ap.service_id = s.service_id ORDER BY ap.appointment_id ASC;`);
  return result.rows;
};

const getAppointmentsForCalendar = async () => {
  const result = await pool.query(`SELECT ap.appointment_id,
       TO_CHAR(ap.date, 'DD/MM/YYYY') as date,
        u.name,
        u.last_name,
        em.name as em_name,
        em.last_name as em_last_name,
        s.name as servicio,
        TO_CHAR(ap.hour, 'HH24:MI') as hour,
        s.price as total_price,
        ap.employee_id,
        ap.service_id,
        c.catalogue,
        ap.user_id
    FROM appointments as ap
    INNER JOIN users as u ON ap.user_id = u.user_id
    INNER JOIN employees as em ON ap.employee_id = em.employee_id
    INNER JOIN services as s ON ap.service_id = s.service_id
    INNER JOIN catalogues as c ON s.catalogue_id = c.catalogue_id
    ORDER BY ap.appointment_id ASC;
`);
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
  const result = await pool.query(
    "INSERT INTO appointments (date,hour,user_id,service_id,employee_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      appointment.date,
      appointment.hour,
      appointment.user_id,
      appointment.service_id,
      appointment.employee_id,
    ]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateAppointment = async (appointment) => {
  const result = await pool.query(
    "UPDATE appointments SET service_id = $1, employee_id = $2, date = $3, hour = $4 WHERE appointment_id = $5 RETURNING *",
    [
      appointment.service_id,
      appointment.employee_id,
      appointment.date,
      appointment.hour,
      appointment.id,
    ]
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
  getAppointmentsForCalendar,
};
