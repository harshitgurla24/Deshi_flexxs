import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Hero.css';

const Hero = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=600&fit=crop&q=80',
      title: 'Summer Collection 2024',
      subtitle: 'Up to 50% Off',
      code: 'SUMMER50',
    },
    {
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=600&fit=crop&q=80',
      title: 'Trending Now',
      subtitle: 'Casual Wear Sale',
      code: 'CASUAL30',
    },
    {
      image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=600&fit=crop&q=80',
      title: 'New Arrivals',
      subtitle: 'Latest Fashion',
      code: 'NEW20',
    },
  ];

  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide">
              <img src={slide.image} alt={slide.title} className="hero-image" />
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <div className="promo-code">Code: <strong>{slide.code}</strong></div>
                <button className="hero-button">Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;