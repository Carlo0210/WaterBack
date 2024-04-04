// models/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true
  },
  supplierLeadTime: {
    type: Number,
    required: true
  },
  supplierContact: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Supplier', supplierSchema);
