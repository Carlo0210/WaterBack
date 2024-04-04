// routes/purchaseRoutes.js

const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.get('/', purchaseController.getAllPurchases);
router.post('/', purchaseController.createPurchase);
router.get('/:id', purchaseController.getPurchase);
router.put('/:id', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.deletePurchase);

module.exports = router;
