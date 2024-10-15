// controllers/AppointmentController.js
const Appointment = require('../models/appointmentModel');

// Obtener todos los Citas
const getAppointments = async (req, res) => {
  try {
    const Appointments = await Appointment.getAllAppointments();
    res.status(200).json(Appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Citas', error: error.message });
  }
};

// Obtener un Cita por ID
const getAppointment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const Appointment = await Appointment.getAppointmentById(id);
    if (!Appointment) {
      return res.status(404).json({ message: `Cita con ID ${id} no encontrado` });
    }
    res.status(200).json(Appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Cita', error: error.message });
  }
};

// Crear un nuevo Cita
const createAppointment = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newAppointment = await Appointment.createAppointment({ name, email });
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el Cita', error: error.message });
  }
};

// Actualizar un Cita existente
const updateAppointment = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const existingAppointment = await Appointment.getAppointmentById(id);
    if (!existingAppointment) {
      return res.status(404).json({ message: `Cita con ID ${id} no encontrado` });
    }
    const updatedAppointment = await Appointment.updateAppointment(id, { name, email });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el Cita', error: error.message });
  }
};

// Eliminar un Cita
const deleteAppointment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedAppointment = await Appointment.deleteAppointment(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: `Cita con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: 'Cita eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Cita', error: error.message });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
