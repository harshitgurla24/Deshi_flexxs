import express from 'express';
import Cart from '../models/cart.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get cart for user
router.get('/cart', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.json({ items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add/update item in cart
router.post('/cart', protect, async (req, res) => {
  try {
    const { product } = req.body;
    if (!product || !product.productId) return res.status(400).json({ error: 'Invalid product' });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      const newCart = await Cart.create({ user: req.user._id, items: [{ productId: product.productId, name: product.name, image: product.image, price: product.price, quantity: product.quantity || 1 }] });
      return res.status(201).json({ items: newCart.items });
    }

    const idx = cart.items.findIndex(i => i.productId === product.productId);
    if (idx >= 0) {
      cart.items[idx].quantity = (product.quantity != null) ? product.quantity : (cart.items[idx].quantity + (product.quantity || 1));
    } else {
      cart.items.push({ productId: product.productId, name: product.name, image: product.image, price: product.price, quantity: product.quantity || 1 });
    }
    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove from cart
router.delete('/cart/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOneAndUpdate({ user: req.user._id }, { $pull: { items: { productId } } }, { new: true });
    res.json({ items: cart ? cart.items : [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear cart
router.delete('/cart', protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } }, { new: true });
    res.json({ items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
