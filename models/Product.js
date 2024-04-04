// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  unitSize: {
    type: String,
    required: true
  },
  minimumStock: {
    type: Number,
    required: true
  },
  maximumStock: {
    type: Number,
    required: true
  },
  reorder: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
