import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import './Cart.css';

const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe publishable key

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleCheckout = () => {
    // Mock Razorpay payment
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    // Redirect to Checkout page where user can confirm details and place order
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <Link to="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Shopping Cart</h1>
      
      <div className="cart-wrapper">
        <div className="cart-items-grid">
          {items.map((item) => (
            <div key={item.id} className="cart-card">
              <div className="card-image-wrapper">
                <img src={item.image} alt={item.name} className="card-image" />
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-price">₹{item.price.toFixed(2)}</p>
                
                <div className="card-qty-section">
                  <div className="qty-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    > 
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="card-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-box">
          <h2>Order Summary</h2>
          <div className="summary-items">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
          <Link to="/products" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;