import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import API from '../../utils/api';
import './Products.css';

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const res = await API.get('/api/products');
        if (mounted) setProducts(res.data || []);
      } catch (err) {
        // fallback: keep products empty
        console.error('Failed to load products', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="products-section">
      <div className="container">
        <div className="results-info">
          <p>Showing {products.length} products</p>
        </div>

        <div className="products-grid">
          {loading ? (
            <div className="loading">Loading products…</div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <p>No products found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;