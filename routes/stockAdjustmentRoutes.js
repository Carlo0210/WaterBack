const express = require('express');
const router = express.Router();
const stockAdjustmentController = require('../controllers/stockAdjustmentController');

router.post('/', stockAdjustmentController.createAdjustment);
router.get('/', stockAdjustmentController.getAdjustments);
router.get('/:id', stockAdjustmentController.getAdjustmentById);
router.put('/:id', stockAdjustmentController.updateAdjustment);
router.delete('/:id', stockAdjustmentController.deleteAdjustment);

module.exports = router;
