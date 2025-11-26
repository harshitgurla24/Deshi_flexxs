import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    }
  ]
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);
