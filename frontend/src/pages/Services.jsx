import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Home Delivery',
      description: 'Fast and reliable home delivery service for all your purchases.',
      icon: '🚚'
    },
    {
      id: 2,
      title: 'Bulk Orders',
      description: 'Special handling and discounts for bulk orders.',
      icon: '📦'
    },
    {
      id: 3,
      title: 'Product Customization',
      description: 'Customize your orders according to your needs.',
      icon: '✨'
    },
    {
      id: 4,
      title: '24/7 Customer Support',
      description: 'Round-the-clock customer service to assist you.',
      icon: '💬'
    },
    {
      id: 5,
      title: 'Gift Wrapping',
      description: 'Professional gift wrapping service for special occasions.',
      icon: '🎁'
    },
    {
      id: 6,
      title: 'Membership Benefits',
      description: 'Exclusive deals and offers for our members.',
      icon: '⭐'
    }
  ];

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>We offer a wide range of services to meet your needs</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="services-cta">
        <h2>Need Special Assistance?</h2>
        <p>Contact our customer service team for personalized support</p>
        <button onClick={() => window.location.href = '/contact'}>
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Services;