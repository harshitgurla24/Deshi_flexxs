import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import '../pages/Categories.css';

const Categories = () => {
  const getCategoryProductCount = (categoryName) => {
    return products.filter((p) => p.category === categoryName).length;
  };

  return (
    <div className="categories-page">
      <div className="categories-banner">
        <h1>Shop by Category</h1>
        <p>Explore our wide range of products</p>
      </div>

      <div className="categories-container">
        <div className="categories-grid">
          {categories.map((category) => {
            const productCount = getCategoryProductCount(category.name);
            const categoryImage = {
              'Vegetables': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
              'Fruits': 'https://images.unsplash.com/photo-1557804506-669714d2e9d8?w=500&h=300&fit=crop',
              'Dairy': 'https://images.unsplash.com/photo-1550583724-b2692b25a968?w=500&h=300&fit=crop',
              'Bakery': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop',
              'Oils & Condiments': 'https://images.unsplash.com/photo-1585707572336-073bdd9b3291?w=500&h=300&fit=crop',
              'Beverages': 'https://images.unsplash.com/photo-1556742764-25ea00991c37?w=500&h=300&fit=crop',
            };

            return (
              <Link
                key={category.id}
                to={`/category/${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <div className="card-image">
                  <img
                    src={categoryImage[category.name] || 'https://via.placeholder.com/500x300'}
                    alt={category.name}
                  />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-content">
                  <div className="card-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{productCount} products</p>
                  <div className="explore-btn">
                    Explore →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="categories-features">
        <div className="feature-item">
          <div className="feature-icon">🚚</div>
          <h4>Fast Delivery</h4>
          <p>Get your products delivered within 24 hours</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">✅</div>
          <h4>Quality Assured</h4>
          <p>100% fresh and authentic products</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💯</div>
          <h4>Best Prices</h4>
          <p>Competitive prices with regular discounts</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🛡️</div>
          <h4>Secure Shopping</h4>
          <p>Safe and secure payment options</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
