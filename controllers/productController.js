const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await Product.getAllproducts();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.getProductById(id);
    res.status(200).json({ product: product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el producto", error: error.message });
  }
};

const insertProduct = async (req, res) => {
  try {
    console.log("llega");
    const product = req.body;
    const newProduct = await Product.createProduct(product);
    res.status(201).json({ product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.deleteProduct(id);
    res
      .status(200)
      .json({ message: `Usuario eliminado con ID: ${id} correctamente` });
  } catch {
    res.status(500).json({
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    product.product_id = parseInt(req.params.id);
    console.log(product);
    const updatedProduct = await Product.updateProduct(product);
    if (!updatedProduct) {
      return res
        .status(404)
        .json({
          message: `Producto con ID ${product.product_id} no encontrado`,
        });
    }
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

const reporteProductoMasVendido = async (req, res) => {
  try {
    const products = await Product.reportProductBestSeller();
    //Producto name, cantidad de veces que se ha vendido
    res.status(200).json({ bestSellers: products });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos más vendidos",
      error: error.message,
    });
  }
};

const reporteInventario = async (req, res) => {
  try {
    //item_name, tipo, cantidad, precio, total
    const products = await Product.reportInventory();
    const total = await Product.reportTotalInventory();
    res.status(200).json({ inventory: products, total: total });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el inventario",
      error: error.message,
    });
  }
};

const reporteTopEmpleado = async (req, res) => {
  try {
    //item_name, contador
    const products = await Product.reportTopEmployee();
    res.status(200).json({ bestSellers: products });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el reporte top empleado",
      error: error.message,
    });
  }
};

const reporteTopServicio = async (req, res) => {
  try {
    //item_name, contador
    const products = await Product.reportTopService();
    res.status(200).json({ bestSellers: products });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el reporte top servicio",
      error: error.message,
    });
  }
};

const reporteListaPrecios = async (req, res) => {
  try {
    //item_name, tipo, precio
    const products = await Product.reportPriceList();
    res.status(200).json({ priceList: products });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el reporte lista de precios",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  insertProduct,
  reporteProductoMasVendido,
  reporteInventario,
  reporteTopEmpleado,
  reporteTopServicio,
  reporteListaPrecios,
  getProduct,
  deleteProduct,
  updateProduct,
};
