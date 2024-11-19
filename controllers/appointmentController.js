// controllers/AppointmentController.js
const Appointment = require("../models/appointmentModel");

// Obtener todos los Citas
const getAppointments = async (req, res) => {
  try {
    const Appointments = await Appointment.getAllAppointments();
    res.status(200).json({ appointments: Appointments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los Citas", error: error.message });
  }
};
const getAppointmentsForCalendar = async (req, res) => {
  try {
    const Appointments = await Appointment.getAppointmentsForCalendar();
    res.status(200).json({ appointments: Appointments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los Citas", error: error.message });
  }
};
const searchAppointment = async (req, res) => {
  const appointment = req.body;
  try {
    const cita = await Appointment.getAllAppointmentByName(appointment);
    if (!cita) {
      return res.status(404).json({
        message: `Cita con ese usario ${appointment.name} no encontrado`,
      });
    }
    res.status(200).json({ appointments: cita });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el Cita", error: error.message });
  }
};

// Obtener un Cita por ID
const getAppointment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const Appointment = await Appointment.getAppointmentById(id);
    if (!Appointment) {
      return res
        .status(404)
        .json({ message: `Cita con ID ${id} no encontrado` });
    }
    res.status(200).json(Appointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el Cita", error: error.message });
  }
};

// Crear un nuevo Cita
const createAppointment = async (req, res) => {
  const appointment = req.body;
  try {
    const newAppointment = await Appointment.createAppointment(appointment);
    if (!newAppointment) {
      return res.status(400).json({ message: "Error al crear el Cita" });
    }
    res.status(201).json({ message: "Cita creada exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el Cita", error: error.message });
  }
};

// Actualizar un Cita existente
const updateAppointment = async (req, res) => {
  const id = parseInt(req.params.id);
  const appointment = req.body;
  appointment.id = id;
  try {
    const existingAppointment = await Appointment.updateAppointment(
      appointment
    );
    if (!existingAppointment) {
      return res
        .status(404)
        .json({ message: `Cita con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Cita actualizado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el Cita", error: error.message });
  }
};

// Eliminar un Cita
const deleteAppointment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedAppointment = await Appointment.deleteAppointment(id);
    if (!deletedAppointment) {
      return res
        .status(404)
        .json({ message: `Cita con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Cita eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el Cita", error: error.message });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointment,
  getAppointmentsForCalendar,
};
