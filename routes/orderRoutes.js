const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById); // New route added

// Update an order
router.put('/:id', orderController.updateOrder);


// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
