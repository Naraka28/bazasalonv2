const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    try {
        const products = await Product.getAllproducts();
        res.status(200).json({products:products});
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.getProductById(id);
        res.status(200).json({product:product});
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const { product } = req.body;
        const newProduct = await Product.createProduct({ product});
        res.status(201).json({product:newProduct});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
}

module.exports = {
    getProducts,
    createProduct,
}