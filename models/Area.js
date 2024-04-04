const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  areaName: {
    type: String,
    required: true
  },
  streetScope: {
    type: String,
    required: true
  }
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
