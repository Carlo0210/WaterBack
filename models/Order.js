const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  areaName: { 
    type: String,
    required: true
  },
  streetScope:{
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  withGallon: Boolean,
  withOutGallon: Boolean,
  quantity: {
    type: Number,
    required: function() {
      return !(this.withGallon || this.withOutGallon);
    }
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  remarks: String,
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
