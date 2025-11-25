import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import { addOrder } from '../features/ordersSlice';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [orderData] = useState(location.state?.orderData || null);
  const [orderNumber, setOrderNumber] = useState('');
  const hasOrderedRef = useRef(false);

  useEffect(() => {
    if (orderData && !hasOrderedRef.current) {
      hasOrderedRef.current = true;
      const newOrderNumber = `ORD-${Date.now()}`;
      setOrderNumber(newOrderNumber);
      // Save order to Redux only once
      dispatch(addOrder({
        items: orderData.items,
        total: orderData.total,
      }));
    }
  }, [orderData, dispatch]);

  const handleBackHome = () => {
    dispatch(clearCart());
    navigate('/');
  };

  if (!orderData) {
    return (
      <div className="order-error">
        <h2>No Order Found</h2>
        <p>Please complete your purchase to view order confirmation.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>
        </div>

        <div className="order-details">
          <div className="detail-card">
            <h3>Order Number</h3>
            <p className="order-number">{orderNumber}</p>
          </div>

          <div className="detail-card">
            <h3>Expected Delivery</h3>
            <p>{deliveryDate}</p>
          </div>

          <div className="detail-card">
            <h3>Total Amount</h3>
            <p className="amount">₹{orderData.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="order-items">
          <h2>Order Items</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{orderData.total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{orderData.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="confirmation-message">
          <h3>What's Next?</h3>
          <ul>
            <li>You will receive a confirmation email shortly</li>
            <li>Track your order using order number: <strong>{orderNumber}</strong></li>
            <li>Estimated delivery: <strong>{deliveryDate}</strong></li>
            <li>For any queries, contact: <strong>support@geniusesfactory.com</strong></li>
          </ul>
        </div>

        <div className="confirmation-actions">
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
          <button className="btn btn-secondary" onClick={handleBackHome}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;