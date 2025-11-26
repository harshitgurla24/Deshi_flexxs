import express from 'express';
import Review from '../models/review.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get reviews for a product
router.get('/products/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ productId: id }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Post a review (protected)
router.post('/products/:id/reviews', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, body } = req.body;
    const review = new Review({ productId: id, user: req.user._id, name: req.user.name, rating, title, body });
    await review.save();
    res.status(201).json({ review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
