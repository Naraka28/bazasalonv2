// models/userModel.js
const pool = require("../config/db");

// Obtener todos los usuarios
const getAllEmployees = async () => {
  const result = await pool.query(
    "SELECT * FROM employees ORDER BY employee_id ASC"
  );
  return result.rows;
};

//LOGIN
const loginEmployees = async (email, password) => {
  const result = await pool.query(
    "SELECT * FROM employees WHERE access_email=$1 AND password=$2",
    [email, password]
  );
  if (result.rows.length > 0) {
    res = { empleado: result.rows[0], success: true };
    return res;
  }
  res = { success: false };
  return res;
};

// Obtener un usuario por ID
const getEmployeeById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM employees WHERE employee_id = $1",
    [id]
  );
  return result.rows[0];
};

// Crear un nuevo usuario
const createEmployee = async (employee) => {
  console.log(employee.role_id);
  const result = await pool.query(
    "INSERT INTO employees( name, last_name, access_email, personal_email, password, phone_number, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7);",
    [
      employee.name,
      employee.last_name,
      employee.access_email,
      employee.personal_email,
      employee.password,
      employee.phone_number,
      employee.role_id,
    ]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateEmployee = async (employee) => {
  const result = await pool.query(
    "UPDATE employees SET name = $1, last_name = $2 ,access_email = $3, personal_email = $4, password = $5, phone_number = $6 WHERE employee_id = $7 RETURNING *",
    [
      employee.name,
      employee.last_name,
      employee.access_email,
      employee.personal_email,
      employee.password,
      employee.phone_number,
      employee.employee_id,
    ]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteEmployee = async (id) => {
  const result = await pool.query(
    "DELETE FROM employees WHERE employee_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

const getColumns = async () => {
  const result = await pool.query(
    "SELECT column_name FROM information_schema.columns WHERE table_name = employees"
  );
  return result.rows;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployees,
  getColumns,
};
