import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../features/wishlistSlice';
import { addToCart } from '../../features/cartSlice';
import { useState } from 'react';
import QuickView from './QuickView';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, description, price, originalPrice, discount, image, rating, reviews } = product;

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isWished = wishlistItems.some(i => i.id === id);
  const [quickProduct, setQuickProduct] = useState(null);

  const openDetails = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  return (
    <div className="product-card" onClick={openDetails} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') openDetails(); }}>
      <div className="product-image">
        <img src={image} alt={name} />
        <button
          className={`wishlist-button ${isWished ? 'wished' : ''}`}
          onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(product)); }}
          title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Toggle wishlist"
        >
          {isWished ? '♥' : '♡'}
        </button>
        <button className="quickview-button" onClick={(e) => { e.stopPropagation(); setQuickProduct(product); }}>Quick view</button>
        {discount && <div className="discount-badge">{discount}% OFF</div>}
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <div className="product-price">
          <span className="current">₹{price.toFixed(0)}</span>
          {originalPrice && <span className="original">₹{originalPrice.toFixed(0)}</span>}
        </div>
        {rating && (
          <div className="product-rating">
            <span className="stars">★ {rating.toFixed(1)}</span>
            <span className="review-count">({reviews} reviews)</span>
          </div>
        )}
        <div className="product-actions">
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
      {quickProduct && (
        <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />
      )}
    </div>
  );
};

export default ProductCard;
