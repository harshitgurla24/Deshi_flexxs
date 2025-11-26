import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  rating: Number,
  title: String,
  body: String,
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
