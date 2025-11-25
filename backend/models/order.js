import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'Confirmed' },
  deliveryDate: { type: Date },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
