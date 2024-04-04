const StockAdjustment = require('../models/StockAdjustment');

// CRUD operations

exports.createAdjustment = async (req, res) => {
    try {
        const { productName, quantity, remarks } = req.body;
        const adjustment = await StockAdjustment.create({ productName, quantity, remarks });
        res.status(201).json(adjustment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAdjustments = async (req, res) => {
    try {
        const adjustments = await StockAdjustment.find();
        res.status(200).json(adjustments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAdjustmentById = async (req, res) => {
    try {
        const adjustment = await StockAdjustment.findById(req.params.id);
        if (!adjustment) {
            return res.status(404).json({ error: 'Adjustment not found' });
        }
        res.status(200).json(adjustment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAdjustment = async (req, res) => {
    try {
        const { productName, quantity, remarks } = req.body;
        const adjustment = await StockAdjustment.findByIdAndUpdate(req.params.id, { productName, quantity, remarks }, { new: true });
        if (!adjustment) {
            return res.status(404).json({ error: 'Adjustment not found' });
        }
        res.status(200).json(adjustment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAdjustment = async (req, res) => {
    try {
        const adjustment = await StockAdjustment.findByIdAndDelete(req.params.id);
        if (!adjustment) {
            return res.status(404).json({ error: 'Adjustment not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
