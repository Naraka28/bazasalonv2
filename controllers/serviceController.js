const Service = require('../models/serviceModel');

const getServices = async (req, res) => {
    try {
        const services = await Service.getAllServices();
        res.status(200).json({services:services});
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los serviceos', error: error.message });
    }
}

const getService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.getServiceById(id);
        res.status(200).json({service:service});
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el serviceo', error: error.message });
    }
}

const insertService = async (req, res) => {
    try {
        const service  = req.body;
        const newService = await Service.createService(service);
        res.status(201).json({service:newService});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el serviceo', error: error.message });
    }
}

module.exports = {
    getServices,
    insertService,
};