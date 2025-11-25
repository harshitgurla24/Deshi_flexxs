import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { products, categories } from '../data/products';
import '../pages/CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('popular');

  // Decode category name and find category details
  const decodedCategory = decodeURIComponent(categoryName);
  const categoryObj = categories.find(
    (cat) => cat.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  useEffect(() => {
    let filtered = products.filter(
      (product) => product.category.toLowerCase() === decodedCategory.toLowerCase()
    );

    // Apply sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(filtered);
  }, [decodedCategory, sortBy]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  if (!categoryObj) {
    return (
      <div className="category-page">
        <div className="not-found">
          <h2>Category Not Found</h2>
          <p>The category "{decodedCategory}" does not exist.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-banner">
        <div className="banner-content">
          <div className="category-icon">{categoryObj.icon}</div>
          <h1>{categoryObj.name}</h1>
          <p>{filteredProducts.length} products available</p>
        </div>
      </div>

      <div className="category-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Sort By</h3>
            <div className="sort-options">
              <label>
                <input
                  type="radio"
                  value="popular"
                  checked={sortBy === 'popular'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Most Popular
              </label>
              <label>
                <input
                  type="radio"
                  value="price-low"
                  checked={sortBy === 'price-low'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Price: Low to High
              </label>
              <label>
                <input
                  type="radio"
                  value="price-high"
                  checked={sortBy === 'price-high'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Price: High to Low
              </label>
              <label>
                <input
                  type="radio"
                  value="rating"
                  checked={sortBy === 'rating'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Highest Rated
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-section">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                    {product.discount && (
                      <div className="discount-badge">{product.discount}% OFF</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="rating">
                      <span className="stars">
                        {'⭐'.repeat(Math.floor(product.rating || 4))}
                      </span>
                      <span className="rating-number">
                        {(product.rating || 4).toFixed(1)}
                      </span>
                      <span className="review-count">
                        ({product.reviews || 0})
                      </span>
                    </div>

                    <div className="price-section">
                      <span className="price">₹{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="original-price">
                          ₹{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found in this category.</p>
              <button onClick={() => window.location.reload()} className="reset-btn">
                Go Back
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
