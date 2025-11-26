import React from 'react';
import './QuickView.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { toggleWishlist } from '../../features/wishlistSlice';

const QuickView = ({ product, onClose }) => {
  const dispatch = useDispatch();
  if (!product) return null;

  const wishlistItems = useSelector((s) => s.wishlist?.items || []);
  const isWished = wishlistItems.some(i => i.id === product.id);

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div className="quickview-card" onClick={(e) => e.stopPropagation()}>
        <button className="qv-close" onClick={onClose}>✕</button>
        <div className="qv-grid">
          <div className="qv-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="qv-meta">
            <h3>{product.name}</h3>
            <p className="qv-desc">{product.description}</p>
            <div className="qv-price">₹{product.price.toFixed(0)}</div>
            <div className="qv-actions">
              <button className="qv-cart" onClick={() => { dispatch(addToCart(product)); alert('Added to cart'); }}>
                Add to cart
              </button>
              <button className={`qv-wish ${isWished ? 'wished' : ''}`} onClick={() => dispatch(toggleWishlist(product))}>
                {isWished ? 'Remove' : 'Wishlist'}
              </button>
            </div>
            <div className="qv-extra">
              <span>Rating: {(product.rating || 4).toFixed(1)}</span>
              <span>{product.reviews || 0} reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
