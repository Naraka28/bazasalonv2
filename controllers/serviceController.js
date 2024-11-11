const Service = require("../models/serviceModel");

const getServices = async (req, res) => {
  try {
    const services = await Service.getAllServices();
    res.status(200).json({ services: services });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los serviceos",
      error: error.message,
    });
  }
};

const getService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const service = await Service.getServiceById(id);
    res.status(200).json({ service: service });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el serviceo", error: error.message });
  }
};

const insertService = async (req, res) => {
  try {
    const service = req.body;
    const newService = await Service.createService(service);
    res.status(201).json({ service: newService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el serviceo", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = req.body;
    service.service_id = parseInt(req.params.id);
    const updatedService = await Service.updateService(service);
    if (!updatedService) {
      return res.status(404).json({
        message: `Hubo un error al realizar la edición del servicio con ID ${service.service_id}`,
      });
    }
    res.status(200).json({ message: "Servicio editado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el servicio",
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedService = await Service.deleteService(id);
    if (!deletedService) {
      return res
        .status(404)
        .json({ message: `Servicio con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Servicio eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el servicio", error: error.message });
  }
};

module.exports = {
  getServices,
  insertService,
  deleteService,
  getService,
  updateService,
};
