import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About ABC General Store</h1>
        <p>Your trusted neighborhood store since 1995</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            ABC General Store started as a small family business with a simple mission: 
            to provide quality products and exceptional service to our community. Over 
            the years, we've grown and evolved, but our core values remain the same.
          </p>
          <p>
            Today, we're proud to serve thousands of customers, offering a wide range 
            of products while maintaining the personal touch that made us special from 
            day one.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              To provide high-quality products at fair prices while delivering 
              exceptional customer service and contributing to our community's 
              well-being.
            </p>
          </div>

          <div className="about-card">
            <h3>Our Vision</h3>
            <p>
              To be the most trusted and preferred general store, known for our 
              quality, service, and community engagement.
            </p>
          </div>

          <div className="about-card">
            <h3>Our Values</h3>
            <ul>
              <li>Quality First</li>
              <li>Customer Satisfaction</li>
              <li>Community Focus</li>
              <li>Integrity & Trust</li>
            </ul>
          </div>
        </div>

        <div className="about-section achievements">
          <h2>Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement">
              <span className="number">25+</span>
              <span className="label">Years of Service</span>
            </div>
            <div className="achievement">
              <span className="number">50K+</span>
              <span className="label">Happy Customers</span>
            </div>
            <div className="achievement">
              <span className="number">5000+</span>
              <span className="label">Products</span>
            </div>
            <div className="achievement">
              <span className="number">100%</span>
              <span className="label">Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;