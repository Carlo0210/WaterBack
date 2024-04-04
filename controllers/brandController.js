// controllers/brandController.js
const Brand = require('../models/Brand');

exports.createBrand = async (req, res) => {
  try {
    const { brandName, unitSize } = req.body;

    // Check if a brand with the same name and unit size already exists
    const existingBrand = await Brand.findOne({ brandName, unitSize });
    if (existingBrand) {
      return res.status(400).json({ error: 'Brand with the same name and unit size already exists' });
    }

    // If no duplicate found, proceed with saving the brand
    const brand = new Brand({ brandName, unitSize, description: req.body.description });
    await brand.save();
    res.status(201).json({ message: 'Brand created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { brandName, unitSize } = req.body;

    // Check if a brand with the same name and unit size already exists
    const existingBrand = await Brand.findOne({ brandName, unitSize, _id: { $ne: id } });
    if (existingBrand) {
      return res.status(400).json({ error: 'Brand with the same name and unit size already exists' });
    }

    // If no duplicate found, proceed with updating the brand
    await Brand.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: 'Brand updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
