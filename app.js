// app.js
const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const cors = require("cors");
const morgan = require("morgan");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

require("dotenv").config();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

// Rutas
app.use("/api/employees", employeeRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/inventory", inventoryRoutes);

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de BazaSalon!");
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.post;

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
