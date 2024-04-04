const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  SKU: { type: String, required: true },
  productName: { type: String, required: true },
  minimumStock: { type: Number, required: true }, 
  maximumStock: { type: Number, required: true }, 
  brandName: { type: String, required: true },
  unitSize: { type: String, required: true },
  supplierName: { type: String, required: true },
  quantity: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  markUpPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true }, 
  picture: {  type: String, required: true}
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
