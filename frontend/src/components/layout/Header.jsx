import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { categories, products } from '../../data/products';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const authRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  useEffect(() => {
    if (!search || search.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const q = search.trim().toLowerCase();
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    }, 220);

    return () => clearTimeout(handler);
  }, [search]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  // Close auth dropdown when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) {
        setIsAuthOpen(false);
      }
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const handleCategoryClick = () => {
    setIsCategoriesOpen(false);
    setIsMoreOpen(false);
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
    setIsMoreOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo" onClick={handleNavLinkClick} aria-label="Go to home">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:46,height:46,background:'linear-gradient(135deg,#1d4ed8,#7c3aed)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800}}>DF</div>
              <div style={{display:'flex',flexDirection:'column',lineHeight:1}}>
                <span className="logo-text">देसी Flexxs</span>
                <small style={{color:'#6b7280',fontSize:12,marginTop:2}}>Contemporary ethnic & casual wear</small>
              </div>
            </div>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="search-container desktop-search">
          <div className="search-box" ref={searchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
              className="search-input"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    className="suggestion-item"
                    onClick={() => { navigate(`/product/${s.id}`); setShowSuggestions(false); }}
                  >
                    <img src={s.image} alt={s.name} />
                    <div className="suggestion-meta">
                      <div className="s-name">{s.name}</div>
                      <div className="s-price">₹{s.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
                <div className="suggestion-footer">
                  <Link to={`/search?q=${encodeURIComponent(search)}`} onClick={() => setShowSuggestions(false)}>View all results</Link>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        <button 
          className="mobile-search-button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {isSearchOpen && (
          <div className="mobile-search-modal">
            <form onSubmit={handleSearch} className="search-container mobile-search">
              <div className="search-box" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
                  className="search-input"
                  autoFocus
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="search-suggestions">
                    {suggestions.map((s) => (
                      <div
                        key={s.id}
                        className="suggestion-item"
                        onClick={() => { navigate(`/product/${s.id}`); setShowSuggestions(false); handleNavLinkClick(); }}
                      >
                        <img src={s.image} alt={s.name} />
                        <div className="suggestion-meta">
                          <div className="s-name">{s.name}</div>
                          <div className="s-price">₹{s.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                    <div className="suggestion-footer">
                      <Link to={`/search?q=${encodeURIComponent(search)}`} onClick={() => { setShowSuggestions(false); handleNavLinkClick(); }}>View all results</Link>
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            <button 
              className="close-search-modal"
              onClick={() => setIsSearchOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
            
            <li className="categories-menu">
              <button 
                className="categories-button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                Categories
                <span className="dropdown-icon">▼</span>
              </button>
              {isCategoriesOpen && (
                <div className="categories-dropdown">
                  <div className="dropdown-header">All Categories</div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${encodeURIComponent(cat.name)}`}
                      className="dropdown-item"
                      onClick={handleCategoryClick}
                    >
                      <span className="cat-icon">{cat.icon}</span>
                      <span className="cat-name">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
            
            <li><Link to="/products" onClick={handleNavLinkClick}>Products</Link></li>
            <li><Link to="/services" onClick={handleNavLinkClick}>Services</Link></li>
            
            <li className="categories-menu">
              <button 
                className="categories-button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                More
                <span className="dropdown-icon">▼</span>
              </button>
              {isMoreOpen && (
                <div className="categories-dropdown">
                  <div className="dropdown-header">Menu</div>
                  {!currentUser ? (
                    <>
                      <Link
                        to="/signin"
                        className="dropdown-item"
                        onClick={handleCategoryClick}
                      >
                        <span style={{fontSize:'1.1rem'}}>🔐</span>
                        <span className="cat-name">Login</span>
                      </Link>
                      <Link
                        to="/signup"
                        className="dropdown-item"
                        onClick={handleCategoryClick}
                      >
                        <span style={{fontSize:'1.1rem'}}>✍️</span>
                        <span className="cat-name">Sign Up</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={handleCategoryClick}
                    >
                      <span style={{fontSize:'1.1rem'}}>👤</span>
                      <span className="cat-name">My Account</span>
                    </Link>
                  )}
                  <Link
                    to="/about"
                    className="dropdown-item"
                    onClick={handleCategoryClick}
                  >
                    <span style={{fontSize:'1.1rem'}}>ℹ️</span>
                    <span className="cat-name">About</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="dropdown-item"
                    onClick={handleCategoryClick}
                  >
                    <span style={{fontSize:'1.1rem'}}>📞</span>
                    <span className="cat-name">Contact</span>
                  </Link>
                </div>
              )}
            </li>
            
            {currentUser && (
              <li>
                <button
                  className="logout-button"
                  onClick={() => { dispatch(logout()); navigate('/'); handleNavLinkClick(); }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-icon" onClick={handleNavLinkClick}>
            <ShoppingCartIcon className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
          <Link to="/profile" className="account-icon" onClick={handleNavLinkClick}>
            <UserIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
