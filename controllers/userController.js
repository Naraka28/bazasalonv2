// controllers/userController.js
const { format } = require("morgan");
const User = require("../models/userModel");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({ users: users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

// Obtener un usuario por ID
const getUser = async (req, res) => {
  const usuario = req.body;
  try {
    const user = await User.getUserByName(usuario);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Usuario con nombre ${usuario} no encontrado` });
    }
    res.status(200).json({ users: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};
const searchUserFullName = async (req, res) => {
  const usuario = req.body;
  try {
    const user = await User.getUserByNameOrLast(usuario);
    if (!user) {
      return res.status(404).json({
        message: `Usuarios con nombre o apellido ${usuario.name} no encontrado`,
      });
    }
    res.status(200).json({ users: user });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar", error: error.message });
  }
};
const userById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Usuario con ID ${id} no encontrado` });
    }
    res.status(200).json({ users: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};
const getUserByPhoneController = async (req, res) => {
  const phone = req.body;
  try {
    const user = await User.getUserByPhone(phone);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Usuario con telefono ${phone} no encontrado` });
    }
    res.status(200).json({ users: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  // Verificamos que los campos obligatorios estén presentes en la solicitud
  const { name, last_name, access_email, password, phone_number } = req.body;

  if (!name || !last_name || !access_email || !password || !phone_number) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // Aquí puedes incluir validaciones adicionales, como asegurarte de que el correo no esté ya registrado.

    // Creación del nuevo usuario
    const newUser = await User.createUser({
      name,
      last_name,
      access_email,
      password,
      phone_number,
    });

    // Si todo va bien, respondemos con el nuevo usuario
    res.status(201).json({ user: newUser });
  } catch (error) {
    // Si ocurre un error, lo capturamos y enviamos una respuesta con código 500
    console.error("Error al crear el usuario:", error);
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

// Actualizar un usuario existente
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body;
  user.user_id = id;
  try {
    const updatedUser = await User.updateUser(user);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `Usuario con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Usuario editado exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedUser = await User.deleteUser(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: `Usuario con ID ${id} no encontrado` });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};
const backup = async (req, res) => {
  const backupDir = path.join("/Users/danielestrada/bazasalonv2/", "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir); // Create the folder if it doesn't exist
  }
  const backupFile = path.join(backupDir, `backup_${Date.now()}.sql`); // Unique file name
  const command = `pg_dump -U postgres -h localhost MBSalon> "${backupFile}"`;

  exec(command, (error) => {
    if (error) {
      console.error("Error generating backup:", error);
      return res.status(500).send("Backup failed");
    }

    // Send the file to the client
    res.download(backupFile, `MBSalon_backup.sql`, (err) => {
      if (err) console.error("Error sending backup:", err);
    });
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByPhoneController,
  userById,
  backup,
  searchUserFullName,
};
