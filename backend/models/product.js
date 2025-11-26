import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productId: { type: String },
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  image: String,
  category: String,
  rating: Number,
  reviews: Number,
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
