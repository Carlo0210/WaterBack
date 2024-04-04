const Order = require('../models/Order.js');
const Purchase = require('../models/Purchase.js');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { withGallon, withOutGallon, quantity, SKU, ...rest } = req.body;

    // Find the corresponding purchase record
    const purchase = await Purchase.findOne({ SKU });

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase record not found' });
    }

    // Deduct the quantity from the purchase record only if withOutGallon is checked
    if (withOutGallon && purchase.quantity >= quantity) {
      purchase.quantity -= quantity;
    } else if (!withGallon && !withOutGallon && purchase.quantity >= quantity) {
      purchase.quantity -= quantity;
    } else if (withGallon && !withOutGallon) {
      // If withGallon is checked, do not deduct from the quantity
    } else {
      return res.status(400).json({ error: 'Insufficient quantity in stock' });
    }

    // Save the updated purchase record
    await purchase.save();

    // Create the order object
    const order = new Order({ ...rest, withGallon, withOutGallon, quantity });

    // Save the order
    await order.save();

    // Send the newly created order as a response
    res.status(201).json(order);
  } catch (error) {
    // Handle errors
    console.error('Error creating order:', error);
    res.status(400).json({ error: 'Failed to create order' });
  }
};





// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['quantity', 'price', 'total', 'remarks'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    // Only update the provided fields from req.body
    updates.forEach(update => {
      order[update] = req.body[update];
    });

    // Save the updated order
    await order.save();

    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).send();
    }

    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
