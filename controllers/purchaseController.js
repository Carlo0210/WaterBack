// controllers/purchaseController.js

const Purchase = require('../models/Purchase');

// Controller actions for CRUD operations
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPurchase = async (req, res) => {
  const purchase = new Purchase(req.body);
  try {
    const newPurchase = await purchase.save();
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (purchase === null) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const updatePurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatePurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Purchase deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
