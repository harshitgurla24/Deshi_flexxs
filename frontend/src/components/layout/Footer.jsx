import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About ABC Store</h3>
          <p>Your trusted neighborhood store offering quality products since 1995.</p>
          <div className="social-links">
            <a href="#" className="social-icon" title="Facebook">f</a>
            <a href="#" className="social-icon" title="Twitter">𝕏</a>
            <a href="#" className="social-icon" title="Instagram">📷</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📍 Dantewada, Jawanga, Education City</p>
          <p>📞 +91 8450008409</p>
          <p>📧 support@geniusesfactory.com</p>
          <p className="support-note">
            For testing payment: Please don't pay any rupees. <br/>
            If any issue, contact our support team.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} ABC General Store. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;