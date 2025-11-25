import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';
import './SearchResults.css';

const SearchResults = ({ searchQuery }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate a small delay to show loading state
    setTimeout(() => {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredProducts);
      setLoading(false);
    }, 500);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="search-results-container">
        <div className="loading">Searching...</div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      {searchQuery && (
        <h2 className="search-title">
          Search Results for "{searchQuery}"
        </h2>
      )}
      
      {results.length > 0 ? (
        <div className="search-results-grid">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="no-results-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>No Products Found</h3>
            <p>We couldn't find any products matching "{searchQuery}"</p>
            <p>Try checking your spelling or using different keywords</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;