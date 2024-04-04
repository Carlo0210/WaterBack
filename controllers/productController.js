// controllers/productController.js
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (req.body.productName != null) {
      product.productName = req.body.productName;
    }
    if (req.body.brandName != null) {
      product.brandName = req.body.brandName;
    }
    if (req.body.unitSize != null) {
      product.unitSize = req.body.unitSize;
    }
    if (req.body.minimumStock != null) {
      product.minimumStock = req.body.minimumStock;
    }
    if (req.body.maximumStock != null) {
      product.maximumStock = req.body.maximumStock;
    }
    if (req.body.reorder != null) {
      product.reorder = req.body.reorder;
    }
    await product.save();
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a product
// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log('Deleting product with ID:', productId);

    // Delete the product from the database
    const result = await Product.deleteOne({ _id: productId });
    console.log('Delete result:', result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Product deleted successfully');
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ message: err.message });
  }
};

