import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';
import './Products.css';

const ProductsSection = () => {
  const filteredProducts = products;

  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Our Products</h2>

        <div className="results-info">
          <p>Showing {filteredProducts.length} products</p>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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