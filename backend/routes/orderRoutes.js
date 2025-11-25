import express from 'express';
import Order from '../models/order.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get orders for current user
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create an order
router.post('/', protect, async (req, res) => {
  try {
    const { items, total } = req.body;
    const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const order = new Order({ user: req.user._id, items, total, deliveryDate });
    await order.save();
    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
