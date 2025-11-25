import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { clearCart } from '../features/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '', address: user.address || '' });
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    if (items.length === 0) return alert('Your cart is empty');
    setLoading(true);
    try {
      const payload = { items: items.map(it => ({ productId: it.id, name: it.name, image: it.image, price: it.price, quantity: it.quantity })), total };
      const res = await API.post('/api/orders', payload);
      const order = res.data.order;
      // navigate to confirmation with order data
      navigate('/order-confirmation', { state: { orderData: { items, total, orderId: order._id } } });
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-grid">
          <div className="checkout-form">
            <h2>Shipping Details</h2>
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
            <label>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={4} />
            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>{loading ? 'Placing...' : 'Place Order'}</button>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {items.map(it => (
                <div key={it.id} className="summary-item">
                  <img src={it.image} alt={it.name} />
                  <div className="meta">
                    <div className="name">{it.name}</div>
                    <div className="qty">Qty: {it.quantity}</div>
                  </div>
                  <div className="price">₹{(it.price * it.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <div>Subtotal</div>
              <div>₹{total.toFixed(2)}</div>
            </div>
            <div className="summary-total">
              <div>Shipping</div>
              <div>Free</div>
            </div>
            <div className="summary-total total-row">
              <div>Total</div>
              <div>₹{total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
