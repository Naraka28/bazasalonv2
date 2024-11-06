// controllers/EmployeeController.js
const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");

// Obtener todos los empleados
const getEmployees = async (req, res) => {
  try {
    const Employees = await Employee.getAllEmployees();
    res.status(200).json({ employees: Employees });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los empleados",
      error: error.message,
    });
  }
};

// Obtener un empleado por ID
const getEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const empleado = await Employee.getEmployeeById(id);
    if (!empleado) {
      return res
        .status(404)
        .json({ message: `empleado con ID ${id} no encontrado` });
    }
    res.status(200).json({ employee: empleado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el empleado", error: error.message });
  }
};

const getColumns = async (req, res) => {
  try {
    const columns = await Employee.getColumns();
    res.status(200).json({ columns: columns });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las columnas", error: error.message });
  }
};

// Crear un nuevo empleado
const createEmployee = async (req, res) => {
  const employee = req.body;
  try {
    const newEmployee = await Employee.createEmployee(employee);
    res.status(201).json(newEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el empleado", error: error.message });
  }
};

const getLoginEmpleado = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }
  try {
    const data = await Employee.loginEmployees(email, password);
    console.log(data);
    if (!data.success) {
      return res
        .status(401)
        .json({ message: `Usuario o contraseña incorrecta` });
    }
    const token = jwt.sign({ id: data.employee_id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
    data.token = token;
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el empleado", error: error.message });
  }
};

// Actualizar un empleado existente
const updateEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  const employee = req.body;
  employee.employee_id = id;
  try {
    const updatedEmployee = await Employee.updateEmployee(employee);
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ message: `Empleado con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Empleado actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el empleado",
      error: error.message,
    });
  }
};

// Eliminar un empleado
const deleteEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedEmployee = await Employee.deleteEmployee(id);
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ message: `empleado con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "empleado eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el empleado", error: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getLoginEmpleado,
};
