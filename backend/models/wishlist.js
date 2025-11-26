import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
    }
  ]
}, { timestamps: true });

export default mongoose.model('Wishlist', WishlistSchema);
