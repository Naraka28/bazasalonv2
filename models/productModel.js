// models/ProductsModel.js
const pool = require("../config/db");

// Obtener todos los usuarios
const getAllproducts = async () => {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY product_id ASC"
  );
  return result.rows;
};

// Obtener un usuario por ID
const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE product_id = $1",
    [id]
  );
  return result.rows[0];
};

const getProductByName = async (product) => {
  const name = "%"+product.name + "%";
  const result = await pool.query(
    "SELECT * FROM products WHERE name ILIKE $1 ORDER BY name ASC",
    [name]
  );
  return result.rows;
};

// Crear un nuevo usuario
const createProduct = async (product) => {
  const result = await pool.query(
    "INSERT INTO products (name, quantity, price) VALUES ($1, $2, $3) RETURNING *",
    [product.name, product.quantity, product.price]
  );
  return result.rows[0];
};

const updateProduct = async (product) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, price = $2, quantity = $3 WHERE product_id = $4 RETURNING *",
    [product.name, product.price, product.quantity, product.product_id]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE product_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
const reportProductBestSeller = async () => {
  const result =
    await pool.query(`SELECT products.product_id as id,products.name, COUNT(sales_tickets.product_id) as contador
  FROM sales_tickets
  JOIN products ON sales_tickets.product_id = products.product_id
  GROUP BY products.product_id
  ORDER BY contador desc;`);
  return result.rows;
};

const reportInventory = async () => {
  const result =
    await pool.query(`SELECT m.name AS item_name,  'Material' as tipo, m.quantity as cantidad, m.price as price, (quantity * price) AS total
  FROM materials m
  UNION ALL
  SELECT p.name AS item_name, 'Producto' AS tipo, p.quantity as cantidad, p.price, (quantity * price) AS total
  FROM products p
  ORDER BY tipo, price, item_name;`);
  return result.rows;
};

const reportTopEmployee = async () => {
  const result =
    await pool.query(`SELECT employees.employee_id as id, employees.name, COUNT(appointments.employee_id) as contador
    FROM appointments
    JOIN employees ON  appointments.employee_id = employees.employee_id
    GROUP BY employees.employee_id
    ORDER BY contador desc;`);
  return result.rows;
};

const reportTopService = async () => {
  const result =
    await pool.query(`SELECT services.service_id as id, services.name, COUNT(appointments.service_id) as contador
    FROM appointments
    JOIN services ON  appointments.service_id = services.service_id
    GROUP BY services.service_id
    ORDER BY contador desc;`);
  return result.rows;
};

const reportTotalInventory = async () => {
  const result = await pool.query(`SELECT SUM(total) as total_inventario
  FROM
  (SELECT (quantity * price) AS total
  FROM materials m
  UNION ALL
  SELECT (quantity * price) AS total
  FROM products p)
  `);
  return result.rows;
};

const reportPriceList = async () => {
  const result =
    await pool.query(`SELECT products.name AS item_name, 'Producto' AS tipo, products.price as Precio
  FROM products
  UNION ALL
  SELECT services.name AS item_name, 'Servicio' AS tipo, services.price as Precios
  FROM services
  ORDER BY tipo, item_name;`);
  return result.rows;
};

module.exports = {
  getAllproducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reportProductBestSeller,
  reportInventory,
  reportTopEmployee,
  reportTopService,
  reportTotalInventory,
  reportPriceList,
  getProductByName,
};
