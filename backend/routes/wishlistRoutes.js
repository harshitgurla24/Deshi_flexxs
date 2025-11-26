import express from 'express';
import Wishlist from '../models/wishlist.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get wishlist for current user
router.get('/wishlist', protect, async (req, res) => {
  try {
    let list = await Wishlist.findOne({ user: req.user._id });
    if (!list) {
      list = await Wishlist.create({ user: req.user._id, items: [] });
    }
    res.json({ items: list.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add item to wishlist
router.post('/wishlist', protect, async (req, res) => {
  try {
    const { product } = req.body;
    if (!product || !product.productId) return res.status(400).json({ error: 'Invalid product' });
    const list = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { items: { productId: product.productId, name: product.name, image: product.image, price: product.price } } },
      { upsert: true, new: true }
    );
    res.status(201).json({ items: list.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove item from wishlist
router.delete('/wishlist/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const list = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { items: { productId } } },
      { new: true }
    );
    res.json({ items: list ? list.items : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
