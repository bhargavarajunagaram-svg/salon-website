import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Salon-related images (using Unsplash)
const getSalonImages = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80",
  "https://www.janetbesthairdesign.co.uk/wp-content/uploads/2023/07/hair-colouring-Wakefield.jpg", // replaced 3rd image
  "https://thebeautyinstitute.edu/wp-content/uploads/2023/03/Woman-hand-on-manicure-treatme.jpg"
];

// Multi-item slider component with improved functionality
function MultiSlider({ slides, renderSlide, visible = 4, title }) {
  const [start, setStart] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  const end = start + visible;

  const prev = () => setStart(start === 0 ? slides.length - visible : start - visible);
  const next = () => setStart(end >= slides.length ? 0 : start + visible);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      next();
    } else if (touchStart - touchEnd < -75) {
      prev();
    }
  };

  const visibleSlides = slides.slice(start, end).concat(
    end > slides.length ? slides.slice(0, end - slides.length) : []
  );

  return (
    <div className="slider-section">
      <div className="slider-header">
        <h2 className="section-title">{title}</h2>
        <div className="slider-controls">
          <button className="slider-arrow left" onClick={prev} aria-label="Previous">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button className="slider-arrow right" onClick={next} aria-label="Next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </div>
      <div 
        className="slider-container"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider-track">
          {slides.map((slide, i) => (
            <div 
              key={i} 
              className={`slider-item ${i >= start && i < end ? 'active' : ''}`}
            >
              {renderSlide(slide, i)}
            </div>
          ))}
        </div>
      </div>
      <div className="slider-dots">
        {Array.from({ length: Math.ceil(slides.length / visible) }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === Math.floor(start / visible) ? 'active' : ''}`}
            onClick={() => setStart(i * visible)}
          />
        ))}
      </div>
    </div>
  );
}

// Enhanced Hero Section with modern design
function HeroSlider({ images }) {
  const [idx, setIdx] = useState(0);
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % images.length), 5000);

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setScrollY(-rect.top / 3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images.length]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-slides">
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`hero-slide ${i === idx ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})`, transform: `translateY(${scrollY}px)` }}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Elevate Your Style at Chandu Salon</h1>
          <p className="hero-subtitle">Where beauty meets perfection and style becomes statement</p>
          <div className="hero-buttons">
            <Link to="/book" className="btn btn-primary">Book Appointment</Link>
            <Link to="/services" className="btn btn-outline">Explore Services</Link>
          </div>
        </div>
        <div className="hero-features">
          <div className="hero-feature">
            <div className="feature-icon">✂️</div>
            <span>Expert Stylists</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">✨</div>
            <span>Premium Products</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">⭐</div>
            <span>Luxury Experience</span>
          </div>
        </div>
        <div className="hero-indicators">
          {images.map((_, i) => (
            <button 
              key={i} 
              className={`indicator ${i === idx ? 'active' : ''}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Discover More</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
}

// Stats Component
function StatsSection() {
  const stats = [
    { number: "5000+", label: "Happy Clients" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Expert Stylists" },
    { number: "12+", label: "Awards Won" }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="stat-number" data-count={stat.number}>{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service, index }) {
  return (
    <div className="service-card" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="service-image">
        <img src={service.img} alt={service.title} />
        <div className="service-overlay">
          <Link to="/services" className="service-link">View Details</Link>
        </div>
      </div>
      <div className="service-content">
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
        <div className="service-footer">
          <span className="service-price">{service.price}</span>
          <Link to="/book" className="service-cta">Book Now →</Link>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ feature, index }) {
  return (
    <div className="feature-card" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="feature-icon">
        <img src={feature.img} alt={feature.title} />
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
    </div>
  );
}

// Review Card Component
function ReviewCard({ review, index }) {
  return (
    <div className="review-card" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="review-header">
        <img src={review.img} alt={review.name} className="review-avatar" />
        <div className="reviewer-info">
          <h4>{review.name}</h4>
          <span className="review-date">{review.date}</span>
          <div className="stars">{'★'.repeat(review.rating)}{review.rating < 5 ? '☆'.repeat(5 - review.rating) : ''}</div>
        </div>
      </div>
      <p className="review-text">"{review.review}"</p>
    </div>
  );
}

// Team Member Component
function TeamCard({ member, index }) {
  return (
    <div className="team-card" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="team-image">
        <img src={member.img} alt={member.name} />
        <div className="team-socials">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
      <div className="team-content">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
        <span className="team-exp">{member.experience}</span>
      </div>
    </div>
  );
}

// Blog Card Component
function BlogCard({ post, index }) {
  return (
    <div className="blog-card" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="blog-image">
        <img src={post.img} alt={post.title} />
        <div className="blog-date">{post.date}</div>
      </div>
      <div className="blog-content">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link to={`/blog/${post.id}`} className="blog-link">Read More →</Link>
      </div>
    </div>
  );
}

// Service data with 11 services
const topServicesSlides = [
  { img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80", title: "Keratin Treatment", desc: "Smooth and shiny hair.", price: "$120" },
  { img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80", title: "Spa Therapy", desc: "Relax and rejuvenate.", price: "$85" },
  { img: "https://www.janetbesthairdesign.co.uk/wp-content/uploads/2023/07/hair-colouring-Wakefield.jpg", title: "Coloring", desc: "Trendy hair colors.", price: "$75+" },
  { img: "https://thebeautyinstitute.edu/wp-content/uploads/2023/03/Woman-hand-on-manicure-treatme.jpg", title: "Nail Art", desc: "Creative nail designs.", price: "$45+" },
  { img: "https://img.freepik.com/premium-photo/shot-beautiful-young-woman-getting-facial-mask-treatment-beauty-salon_360066-24940.jpg", title: "Facial Treatment", desc: "Rejuvenating facials.", price: "$90" },
  { img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80", title: "Bridal Package", desc: "Complete bridal makeover.", price: "$350" },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", title: "Men's Grooming", desc: "Exclusive grooming for men.", price: "$60" },
  { img: "https://lifebeinggirly.com/wp-content/uploads/2019/03/How-to-start-a-mobile-beautician-business-640x390.jpg", title: "Makeup Artistry", desc: "Professional makeup for all occasions.", price: "$110+" },
  { img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80", title: "Beard Styling", desc: "Trendy beard styles and care.", price: "$40" },
  { img: "https://envi.in/wp-content/uploads/2022/10/hair-spa.jpg", title: "Hair Spa", desc: "Deep nourishment for your hair.", price: "$70" },
  { img: "https://hairportbeautysalonandspa.com/wp-content/uploads/2015/04/large.jpg", title: "Skin Polishing", desc: "Get glowing, radiant skin.", price: "$95" }
];

const featuresSlides = [
  { img: "https://img.icons8.com/ios-filled/100/18184a/near-me.png", title: "Convenient Locations", desc: "Find our salons in prime locations across the city." },
  { img: "https://img.icons8.com/ios-filled/100/18184a/discount.png", title: "Loyalty Rewards", desc: "Earn points with every visit and redeem exciting rewards." },
  { img: "https://img.icons8.com/ios-filled/100/18184a/calendar.png", title: "Easy Booking", desc: "Book appointments online with our easy-to-use system." },
  { img: "https://img.icons8.com/ios-filled/100/18184a/barber-scissors.png", title: "Expert Stylists", desc: "Our professionals are trained in the latest techniques." }
];

const clientReviews = [
  { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", name: "Akasa09", review: "Very professional atmosphere and people have knowledge about their field. Would definitely recommend.", rating: 5, date: "2 weeks ago" },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", name: "Rahul", review: "Great service and friendly staff! My haircut was exactly what I wanted. Will visit again.", rating: 5, date: "3 days ago" },
  { img: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=100&q=80", name: "Sneha", review: "Loved my new hairstyle! The stylist understood exactly what I wanted. Amazing experience!", rating: 4, date: "1 month ago" },
  { img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80", name: "Priya", review: "The facial was amazing! My skin feels so refreshed and glowing. Highly recommend their spa services.", rating: 5, date: "2 weeks ago" }
];

const teamMembers = [
  { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80", name: "Emma Wilson", role: "Senior Stylist", experience: "12 years experience" },
  { img: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?auto=format&fit=crop&w=400&q=80", name: "Sophia Martinez", role: "Color Specialist", experience: "8 years experience" },
  { img: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=400&q=80", name: "David Chen", role: "Beard Specialist", experience: "6 years experience" },
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80", name: "Jessica Brown", role: "Makeup Artist", experience: "10 years experience" }
];

const blogPosts = [
  { id: 1, img: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d1a51?auto=format&fit=crop&w=600&q=80", title: "Summer Hair Trends 2023", excerpt: "Discover the hottest hair trends for this summer season.", date: "Jun 15, 2023" },
  { id: 2, img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80", title: "5 Benefits of Regular Facials", excerpt: "Learn why regular facials are essential for your skin health.", date: "May 28, 2023" },
  { id: 3, img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=600&q=80", title: "How to Maintain Your Hair Color", excerpt: "Expert tips to make your hair color last longer between salon visits.", date: "Apr 12, 2023" }
];

const offersSlides = [
  { img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80", title: "Summer Offer", desc: "Get 25% off on all services!", code: "SUMMER25" },
  { img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80", title: "Combo Pack", desc: "Haircut + Facial at best price.", code: "COMBO30" },
  { img: "https://www.shutterstock.com/image-vector/navratri-festive-sale-logo-design-600nw-2203395271.jpg", title: "Festival Special", desc: "Exclusive festival discounts.", code: "FESTIVE20" },
  { img: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=600&q=80", title: "Referral Bonus", desc: "Refer & earn rewards.", code: "REFER50" }
];

const Home = () => {
  useEffect(() => {
    // Initialize animations on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <HeroSlider images={getSalonImages} />
      <StatsSection />

      {/* Premium Services Section */}
      <section className="section top-services">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Our Premium Services</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Experience the best beauty treatments from our expert stylists
          </p>
          
          <div className="services-grid">
            {topServicesSlides.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
          
          <div className="text-center" data-aos="fade-up">
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Why Choose Us</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Discover what makes Chandu Salon the preferred choice
          </p>
          <div className="features-grid">
            {featuresSlides.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Meet Our Experts</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Our talented team of beauty professionals
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="section offers">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Special Offers</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Limited time deals you don't want to miss
          </p>
          <div className="offers-grid">
            {offersSlides.map((offer, index) => (
              <div key={index} className="offer-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="offer-image">
                  <img src={offer.img} alt={offer.title} />
                  <div className="offer-badge">Limited Time</div>
                </div>
                <div className="offer-content">
                  <h3>{offer.title}</h3>
                  <p>{offer.desc}</p>
                  <div className="offer-code">Use code: <span>{offer.code}</span></div>
                  <Link to="/book" className="btn btn-outline">Avail Offer</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">What Our Clients Say</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Hear from our satisfied customers
          </p>
          <div className="reviews-grid">
            {clientReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section blog">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">From Our Blog</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Beauty tips, trends and expert advice
          </p>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} post={post} index={index} />
            ))}
          </div>
          <div className="text-center" data-aos="fade-up">
            <Link to="/blog" className="btn btn-outline">Read More Articles</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2>Ready for a Transformation?</h2>
            <p>Book your appointment today and experience the Chandu Salon difference</p>
            <Link to="/book" className="btn btn-light">Book Now</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Global Styles */
        :root {
          --primary: #18184a;
          --secondary: #c2185b;
          --accent: #ffd700;
          --light: #f8f9fa;
          --dark: #212529;
          --gray: #6c757d;
          --light-gray: #e9ecef;
          --transition: all 0.3s ease;
          --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          --shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.15);
          --radius: 12px;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          color: var(--dark);
          overflow-x: hidden;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .section {
          padding: 100px 0;
        }
        
        .section-title {
          font-size: 2.8rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 20px;
          color: var(--primary);
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: var(--secondary);
          border-radius: 2px;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          text-align: center;
          margin-bottom: 60px;
          color: var(--gray);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .text-center {
          text-align: center;
          margin-top: 40px;
        }
        
        .btn {
          display: inline-block;
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .btn-primary {
          background: var(--secondary);
          color: white;
          box-shadow: 0 4px 14px rgba(194, 24, 91, 0.4);
        }
        
        .btn-primary:hover {
          background: #a4134c;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(194, 24, 91, 0.5);
        }
        
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn-secondary:hover {
          background: white;
          color: var(--primary);
          transform: translateY(-3px);
        }
        
        .btn-outline {
          background: transparent;
          color: var(--secondary);
          border: 2px solid var(--secondary);
        }
        
        .btn-outline:hover {
          background: var(--secondary);
          color: white;
          transform: translateY(-3px);
          box-shadow: var(--shadow-hover);
        }
        
        .btn-light {
          background: white;
          color: var(--primary);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
        }
        
        .btn-light:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        /* Hero Styles */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 800px;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-slides {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1s ease, transform 0.3s ease;
        }
        
        .hero-slide.active {
          opacity: 1;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(24, 24, 74, 0.8) 0%, rgba(24, 24, 74, 0.6) 100%);
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          padding: 0 20px;
          max-width: 900px;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
          animation: fadeInUp 1s ease;
        }
        
        .hero-subtitle {
          font-size: 1.4rem;
          margin-bottom: 40px;
          animation: fadeInUp 1s ease 0.2s forwards;
          opacity: 0;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
          animation: fadeInUp 1s ease 0.4s forwards;
          opacity: 0;
        }
        
        .hero-features {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 40px;
          animation: fadeInUp 1s ease 0.6s forwards;
          opacity: 0;
        }
        
        .hero-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        
        .feature-icon {
          font-size: 1.8rem;
        }
        
        .hero-feature span {
          font-weight: 500;
        }
        
        .hero-indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 2;
        }
        
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .indicator.active {
          background: white;
          transform: scale(1.2);
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          text-align: center;
          z-index: 2;
          animation: bounce 2s infinite;
        }
        
        .scroll-indicator span {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 10px;
          opacity: 0.8;
        }
        
        .mouse {
          width: 26px;
          height: 44px;
          border: 2px solid white;
          border-radius: 14px;
          margin: 0 auto;
          position: relative;
        }
        
        .wheel {
          width: 4px;
          height: 8px;
          background: white;
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 2s infinite;
        }
        
        /* Stats Section */
        .stats-section {
          background: var(--primary);
          color: white;
          padding: 80px 0;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }
        
        .stat-item {
          text-align: center;
          padding: 20px;
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: var(--accent);
        }
        
        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }
        
        /* Service Card */
        .service-card {
          background: white;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-hover);
        }
        
        .service-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        
        .service-card:hover .service-image img {
          transform: scale(1.1);
        }
        
        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(24, 24, 74, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }
        
        .service-card:hover .service-overlay {
          opacity: 1;
        }
        
        .service-link {
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border: 2px solid white;
          border-radius: 50px;
          font-weight: 600;
          transition: var(--transition);
        }
        
        .service-link:hover {
          background: white;
          color: var(--primary);
        }
        
        .service-content {
          padding: 25px;
        }
        
        .service-content h3 {
          font-size: 1.4rem;
          margin-bottom: 12px;
          color: var(--primary);
        }
        
        .service-content p {
          color: var(--gray);
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .service-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .service-price {
          font-weight: 700;
          color: var(--secondary);
          font-size: 1.2rem;
        }
        
        .service-cta {
          color: var(--secondary);
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
        }
        
        .service-cta:hover {
          color: #a4134c;
        }
        
        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }
        
        .feature-card {
          text-align: center;
          padding: 40px 30px;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          transition: var(--transition);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .feature-icon {
          width: 90px;
          height: 90px;
          margin: 0 auto 25px;
          background: var(--light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        
        .feature-card:hover .feature-icon {
          background: var(--primary);
          transform: rotateY(180deg);
        }
        
        .feature-icon img {
          width: 40px;
          height: 40px;
        }
        
        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: var(--primary);
        }
        
        .feature-card p {
          color: var(--gray);
          line-height: 1.6;
        }
        
        /* Team Grid */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .team-card {
          background: white;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
          text-align: center;
        }
        
        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .team-image {
          position: relative;
          height: 280px;
          overflow: hidden;
        }
        
        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        
        .team-card:hover .team-image img {
          transform: scale(1.1);
        }
        
        .team-socials {
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 15px;
          padding: 15px;
          background: rgba(24, 24, 74, 0.8);
          transition: var(--transition);
        }
        
        .team-card:hover .team-socials {
          bottom: 0;
        }
        
        .team-socials a {
          color: white;
          font-size: 1.2rem;
          transition: var(--transition);
        }
        
        .team-socials a:hover {
          color: var(--accent);
        }
        
        .team-content {
          padding: 25px 20px;
        }
        
        .team-content h3 {
          font-size: 1.3rem;
          margin-bottom: 8px;
          color: var(--primary);
        }
        
        .team-content p {
          color: var(--secondary);
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .team-exp {
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        /* Offers Grid */
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .offer-card {
          background: white;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }
        
        .offer-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .offer-image {
          position: relative;
          height: 200px;
        }
        
        .offer-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .offer-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--secondary);
          color: white;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .offer-content {
          padding: 25px;
          text-align: center;
        }
        
        .offer-content h3 {
          font-size: 1.4rem;
          margin-bottom: 12px;
          color: var(--primary);
        }
        
        .offer-content p {
          color: var(--gray);
          margin-bottom: 15px;
        }
        
        .offer-code {
          margin-bottom: 20px;
          font-size: 0.9rem;
        }
        
        .offer-code span {
          font-weight: 700;
          color: var(--secondary);
        }
        
        /* Reviews Grid */
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        
        .review-card {
          background: white;
          padding: 30px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          transition: var(--transition);
        }
        
        .review-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .review-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .review-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        }
        
        .reviewer-info h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: var(--primary);
        }
        
        .review-date {
          font-size: 0.8rem;
          color: var(--gray);
          margin-bottom: 5px;
          display: block;
        }
        
        .stars {
          color: var(--accent);
        }
        
        .review-text {
          color: var(--gray);
          font-style: italic;
          line-height: 1.7;
        }
        
        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }
        
        .blog-card {
          background: white;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: var(--transition);
        }
        
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .blog-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        
        .blog-card:hover .blog-image img {
          transform: scale(1.1);
        }
        
        .blog-date {
          position: absolute;
          top: 15px;
          left: 15px;
          background: var(--secondary);
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .blog-content {
          padding: 25px;
        }
        
        .blog-content h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: var(--primary);
        }
        
        .blog-content p {
          color: var(--gray);
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .blog-link {
          color: var(--secondary);
          text-decoration: none;
          font-weight: 600;
          transition: var(--transition);
        }
        
        .blog-link:hover {
          color: #a4134c;
        }
        
        /* CTA Section */
        .cta {
          background: linear-gradient(135deg, var(--primary) 0%, #2d2d80 100%);
          color: white;
          text-align: center;
          padding: 120px 0;
        }
        
        .cta-content h2 {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        
        .cta-content p {
          font-size: 1.3rem;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }
        
        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
        
        @keyframes scroll {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(-50%);
          }
          10% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(15px) translateX(-50%);
          }
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
          .section-title {
            font-size: 2.5rem;
          }
          
          .hero-title {
            font-size: 3.2rem;
          }
        }
        
        @media (max-width: 992px) {
          .section {
            padding: 80px 0;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .hero-title {
            font-size: 2.8rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
          
          .hero-features {
            gap: 30px;
          }
          
          .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }
        
        @media (max-width: 768px) {
          .section {
            padding: 70px 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .hero {
            min-height: 700px;
          }
          
          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .hero-features {
            flex-wrap: wrap;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .services-grid,
          .features-grid,
          .team-grid,
          .offers-grid,
          .reviews-grid,
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 576px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .section-subtitle {
            font-size: 1rem;
          }
          
          .hero-title {
            font-size: 1.8rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-content h2 {
            font-size: 2.2rem;
          }
          
          .cta-content p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;