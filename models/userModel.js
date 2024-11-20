// models/userModel.js
const pool = require("../config/db");

// Obtener todos los usuarios
const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT * FROM users ORDER BY user_id ASC LIMIT 10 "
  );
  return result.rows;
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  return result.rows[0];
};
const getUserByName = async (user) => {
  const name ="%"+ user.name + "%";
  console.log(user.name);
  const result = await pool.query("SELECT * FROM users WHERE name ILIKE $1", [
    name,
  ]);
  console.log(result.rows);
  return result.rows;
};

const getUserByPhone = async (user) => {
  const phone = user.phone_number + "%";
  const result = await pool.query(
    "SELECT user_id, name, last_name, phone_number FROM users WHERE phone_number LIKE $1 OR name ILIKE $1",
    [phone]
  );
  return result.rows;
};
const getUserByNameOrLast = async (user) => {
  const name = user.name + "%";

  const result = await pool.query(
    "SELECT user_id, name, last_name, phone_number,access_email FROM users WHERE name ILIKE $1 OR last_name ILIKE $1",
    [name]
  );
  return result.rows;
};

// Crear un nuevo usuario
const createUser = async (user) => {
  console.log(user);
  const {
    name,
    last_name,
    access_email,
    password,
    role_id = 3,
    phone_number,
  } = user;
  const result = await pool.query(
    "INSERT INTO users (name, last_name,access_email,password,role_id,phone_number) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
    [name, last_name, access_email, password, role_id, phone_number]
  );
  return result.rows[0];
};

// Actualizar un usuario existente
const updateUser = async (user) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, last_name = $2,access_email = $3, password = $4, phone_number = $5 WHERE user_id = $6 RETURNING *",
    [
      user.name,
      user.last_name,
      user.access_email,
      user.password,
      user.phone_number,
      user.user_id,
    ]
  );
  return result.rows[0];
};

// Eliminar un usuario
const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE user_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByName,
  getUserByPhone,
  getUserByNameOrLast,
};
