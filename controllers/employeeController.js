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
    const Employee = await Employee.getEmployeeById(id);
    if (!Employee) {
      return res
        .status(404)
        .json({ message: `empleado con ID ${id} no encontrado` });
    }
    res.status(200).json({ employee: Employee });
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
  //const hashed_pwd = bcrypt.hash(password, 10);
  try {
    const data = await Employee.loginEmployees(email, password);
    if (!data.success) {
      return res
        .status(401)
        .json({ message: `Usuario o contraseña incorrecta` });
    }
    const token = jwt.sign(
      { id: result.rows[0].employee_id },
      process.env.SECRET,
      {
        expiresIn: 86400,
      }
    );
    data["token"] = token;
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
  const { name, email } = req.body;
  try {
    const existingEmployee = await Employee.getEmployeeById(id);
    if (!existingEmployee) {
      return res
        .status(404)
        .json({ message: `empleado con ID ${id} no encontrado` });
    }
    const updatedEmployee = await Employee.updateEmployee(id, { name, email });
    res.status(200).json(updatedEmployee);
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
