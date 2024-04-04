const mongoose = require('mongoose');

const stockAdjustmentSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    remarks: String
});

module.exports = mongoose.model('StockAdjustment', stockAdjustmentSchema);
