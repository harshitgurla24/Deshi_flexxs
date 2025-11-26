import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// GET /api/products - list products with optional category/filter query params
router.get('/products', async (req, res) => {
  try {
    const { category, q } = req.query;
    let filter = {};
    if (category) filter.category = new RegExp(`^${category}$`, 'i');
    if (q) filter.$or = [ { name: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') } ];
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:id - single product
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ $or: [ { _id: id }, { productId: id } ] });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
