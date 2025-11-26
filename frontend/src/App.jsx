import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features/store';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Products from './components/home/Products';
import Cart from './components/Cart';
import SearchPage from './pages/SearchPage';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderConfirmation from './pages/OrderConfirmation';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/layout/Footer';
import Wishlist from './pages/Wishlist';
import './App.css';

const Home = () => (
  <>
    <Hero />
    <Products />
  </>
);

function App() {
  try {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  } catch (err) {
    console.error('App rendering error:', err);
    return (
      <div style={{ padding: '20px', color: 'red', fontSize: '16px' }}>
        <h2>Error Loading App</h2>
        <p>{err?.message}</p>
        <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>
          {err?.stack}
        </pre>
      </div>
    );
  }
}

// Error boundary to catch rendering errors
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: '20px' }}>Error: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

export default App;
