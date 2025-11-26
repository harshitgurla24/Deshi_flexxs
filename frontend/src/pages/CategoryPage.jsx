import { useState, useEffect } from 'react';
import QuickView from '../components/home/QuickView';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { toggleWishlist } from '../features/wishlistSlice';
import { categories } from '../data/products';
import API from '../utils/api';
import '../pages/CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const [quickProduct, setQuickProduct] = useState(null);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  // Filters
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Decode category name and find category details
  const decodedCategory = decodeURIComponent(categoryName);
  const categoryObj = categories.find(
    (cat) => cat.name.toLowerCase() === decodedCategory.toLowerCase()
  );
  const compactCategories = ['men', 'women', 'kids'];
  const isCompact = compactCategories.includes(categoryObj?.name?.toLowerCase());

  // Fetch products for this category from backend
  useEffect(() => {
    let mounted = true;
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/products?category=${encodeURIComponent(decodedCategory)}`);
        if (mounted) {
          const list = res.data || [];
          setFetchedProducts(list);
        }
      } catch (err) {
        console.error('Failed to fetch category products', err);
        if (mounted) setFetchedProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCategoryProducts();
    return () => { mounted = false; };
  }, [decodedCategory]);
  
  // Re-run filtering when filters change
  useEffect(() => {
    // Recompute filteredProducts from fetchedProducts when any filter changes
    let filtered = fetchedProducts.slice();

    if (query && query.trim().length) {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter(p => (p.name || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    }

    filtered = filtered.filter(p => (p.price || 0) >= minPrice && (p.price || 0) <= maxPrice);

    if (minRating > 0) filtered = filtered.filter(p => (p.rating || 0) >= minRating);
    if (onlyDiscounted) filtered = filtered.filter(p => p.discount && p.discount > 0);
    if (onlyInStock) filtered = filtered.filter(p => p.inStock !== false);

    // Apply sorting after filters
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(filtered);
  }, [fetchedProducts, decodedCategory, query, minPrice, maxPrice, minRating, onlyDiscounted, onlyInStock, sortBy]);

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

      <div className={`category-container ${isCompact ? 'no-sidebar' : ''}`}>
        {/* Sidebar Filters (hidden for compact categories like Men/Women/Kids) */}
        {!isCompact && (
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Search</h3>
              <input type="search" placeholder="Search within category..." value={query} onChange={(e) => setQuery(e.target.value)} style={{width:'100%',padding:'8px',borderRadius:6,border:'1px solid #e5e7eb'}} />
            </div>

            <div className="filter-section">
              <h3>Price</h3>
              <div style={{display:'flex',gap:8}}>
                <input type="number" min="0" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value || 0))} style={{width:'48%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}} />
                <input type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value || 0))} style={{width:'48%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}} />
              </div>
            </div>

            <div className="filter-section">
              <h3>Rating</h3>
              <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}}>
                <option value={0}>Any rating</option>
                <option value={4}>4★ & up</option>
                <option value={4.5}>4.5★ & up</option>
                <option value={4.8}>4.8★ & up</option>
              </select>
            </div>

            <div className="filter-section">
              <h3>Other</h3>
              <label style={{display:'flex',alignItems:'center',gap:8}}>
                <input type="checkbox" checked={onlyDiscounted} onChange={(e) => setOnlyDiscounted(e.target.checked)} />
                <span>On sale</span>
              </label>
              <label style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>
                <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} />
                <span>In stock</span>
              </label>
            </div>

            <div className="filter-section">
              <h3>Sort</h3>
              <div className={`sort-options ${isCompact ? 'compact' : ''}`}>
                <label style={{display:'block',marginBottom:8}}>
                  <input type="radio" name="sort" value="popular" checked={sortBy === 'popular'} onChange={(e) => setSortBy(e.target.value)} /> Popular
                </label>
                <label style={{display:'block',marginBottom:8}}>
                  <input type="radio" name="sort" value="price-low" checked={sortBy === 'price-low'} onChange={(e) => setSortBy(e.target.value)} /> Price: Low to High
                </label>
                <label style={{display:'block',marginBottom:8}}>
                  <input type="radio" name="sort" value="price-high" checked={sortBy === 'price-high'} onChange={(e) => setSortBy(e.target.value)} /> Price: High to Low
                </label>
                <label style={{display:'block'}}>
                  <input type="radio" name="sort" value="rating" checked={sortBy === 'rating'} onChange={(e) => setSortBy(e.target.value)} /> Top Rated
                </label>
              </div>
            </div>

            <div className="filter-section">
              <button onClick={() => { setQuery(''); setMinPrice(0); setMaxPrice(5000); setMinRating(0); setOnlyDiscounted(false); setOnlyInStock(false); }} style={{background:'#2563eb',color:'white',padding:'8px 10px',borderRadius:6,border:'none',cursor:'pointer'}}>Clear filters</button>
            </div>
          </aside>
        )}

        {/* Products Grid */}
        <main className="products-section">
          {/* Compact top sort for compact categories (Men/Women/Kids) */}
          {isCompact && (
            <div className="top-sort">
              <label>Sort:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          )}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const isWished = wishlistItems.some(i => i.id === product.id);
                return (
                  <div
                    key={product.id}
                    className="product-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => setQuickProduct(product)}
                    onKeyPress={(e) => { if (e.key === 'Enter') setQuickProduct(product); }}
                  >
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} />
                      <button
                        className={`category-wishlist-button ${isWished ? 'wished' : ''}`}
                        onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(product)); }}
                        title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                        aria-label="Toggle wishlist"
                      >
                        {isWished ? '♥' : '♡'}
                      </button>
                      <button className="category-quickview-button" onClick={(e) => { e.stopPropagation(); setQuickProduct(product); }}>Quick view</button>
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
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
              {quickProduct && (
                <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />
              )}
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
