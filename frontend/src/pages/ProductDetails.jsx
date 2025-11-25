import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { products } from '../data/products';
import '../pages/ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const id = parseInt(productId, 10);
  const product = products.find((p) => p.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-details not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity }));
    navigate('/cart');
  };

  const handleBuyNow = () => {
    const orderData = {
      items: [{ id: product.id, name: product.name, price: product.price, image: product.image, quantity }],
      total: product.price * quantity,
      paymentId: 'DEMO_BUY_' + Date.now(),
    };
    // add item to cart for consistency
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity }));
    navigate('/order-confirmation', { state: { orderData } });
  };

  return (
    <div className="product-details">
      <div className="details-container">
        <div className="photo-col">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="info-col">
          <h1>{product.name}</h1>
          <div className="rating-row">
            <div className="stars">{'⭐'.repeat(Math.round(product.rating || 4))}</div>
            <div className="rating-number">{(product.rating || 4).toFixed(1)} ({product.reviews || 0} reviews)</div>
          </div>
          <p className="long-description">{product.description}</p>
          <div className="price-row">
            <div className="price">₹{product.price.toFixed(2)}</div>
            {product.originalPrice && <div className="original">₹{product.originalPrice.toFixed(2)}</div>}
            {product.discount && <div className="discount">{product.discount}% off</div>}
          </div>

          <div className="subtotal-row">
            <span>Quantity:</span>
            <span className="subtotal">₹{(product.price * quantity).toFixed(2)}</span>
          </div>

          <div className="purchase-row">
            <div className="quantity">
              <label>Quantity</label>
              <div className="qty-controls">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || '1', 10)))} />
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="actions">
              <button className="btn add" onClick={handleAddToCart}>Add to Cart</button>
              <button className="btn buy" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>

          <div className="more-info">
            <h3>More from this category</h3>
            <div className="related-grid">
              {related.map((r) => (
                <div key={r.id} className="related-card" onClick={() => navigate(`/product/${r.id}`)}>
                  <img src={r.image} alt={r.name} />
                  <div className="related-name">{r.name}</div>
                  <div className="related-price">₹{r.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
