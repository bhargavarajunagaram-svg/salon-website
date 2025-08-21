import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const services = [
  {
    id: "1",
    name: "Haircut & Styling",
    desc: "Trendy styles for all ages, tailored to your face shape and personality.",
    price: "₹400",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    details: "Our haircut service includes consultation, shampoo, and styling. We use advanced techniques for men, women, and kids. Enjoy a relaxing experience and leave with a fresh look.",
    features: ["Professional Consultation", "Shampoo & Conditioning", "Precision Cutting", "Expert Styling", "Modern Tools & Techniques"],
    duration: "45 mins",
    category: "Hair Services",
    benefits: ["Enhanced appearance", "Professional styling advice", "Quality products used", "Personalized service"]
  },
  {
    id: "2",
    name: "Premium Facial",
    desc: "Glow with our signature facials using premium products and expert techniques.",
    price: "₹700",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80",
    details: "Our facials are customized for your skin type. We use organic and dermatologically tested products. Includes cleansing, exfoliation, massage, mask, and hydration for radiant skin.",
    features: ["Skin Analysis", "Deep Cleansing", "Exfoliation", "Relaxing Massage", "Hydrating Mask", "Moisturizing"],
    duration: "60 mins",
    category: "Skincare",
    benefits: ["Deep cleansing", "Improved skin texture", "Hydration boost", "Relaxation experience"]
  },
  {
    id: "3",
    name: "Luxury Spa Treatment",
    desc: "Relax and rejuvenate with our soothing spa therapies.",
    price: "₹1200",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80",
    details: "Our spa treatments include aromatherapy, deep tissue massage, and stress relief therapies. Enjoy a tranquil ambiance and professional care that revitalizes both body and mind.",
    features: ["Aromatherapy", "Deep Tissue Massage", "Stress Relief Techniques", "Tranquil Ambiance", "Professional Therapists"],
    duration: "90 mins",
    category: "Wellness",
    benefits: ["Stress reduction", "Muscle relaxation", "Improved circulation", "Mental rejuvenation"]
  },
  {
    id: "4",
    name: "Bridal Makeover Package",
    desc: "Look stunning on your big day with our expert bridal makeover.",
    price: "₹5000",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
    details: "Our comprehensive bridal package includes makeup, hair styling, saree draping, and skin preparation. We create custom looks for every bride, ensuring long-lasting beauty and confidence throughout your special day.",
    features: ["Bridal Consultation", "Makeup Application", "Hairstyling", "Saree Draping", "Skin Preparation", "Touch-up Kit"],
    duration: "3 hours",
    category: "Special Occasion",
    benefits: ["Professional bridal look", "Long-lasting makeup", "Personalized style", "Stress-free experience"]
  },
  {
    id: "5",
    name: "Hair Coloring",
    desc: "Vibrant and lasting hair colors tailored to your style.",
    price: "₹1500",
    img: "https://images.unsplash.com/photo-1522338242990-f8d6016249b9?auto=format&fit=crop&w=1600&q=80",
    details: "Our coloring experts use premium products for safe, beautiful results. Includes consultation, color selection, and aftercare advice.",
    features: ["Personalized Consultation", "Ammonia-Free Colors", "Aftercare Guidance", "Latest Techniques"],
    duration: "90 mins",
    category: "Hair Services",
    benefits: ["Long-lasting color", "Shiny hair", "Safe for all hair types"]
  },
  {
    id: "6",
    name: "Manicure & Pedicure",
    desc: "Pamper your hands and feet with our relaxing treatments.",
    price: "₹900",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
    details: "Includes nail shaping, cuticle care, massage, and polish. Enjoy a spa-like experience for soft, beautiful hands and feet.",
    features: ["Nail Shaping", "Cuticle Care", "Massage", "Polish Application"],
    duration: "60 mins",
    category: "Nail Care",
    benefits: ["Soft skin", "Healthy nails", "Relaxation"]
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);
  const [booking, setBooking] = useState({ name: "", email: "", date: "", time: "" });
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  if (!service) {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <h2>Service Not Found</h2>
          <p>The service you're looking for doesn't exist.</p>
          <Link to="/services" className="back-button">Back to Services</Link>
        </div>
      </div>
    );
  }

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setBooking({ name: "", email: "", date: "", time: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="breadcrumb">
            <Link to="/services">Services</Link> / <span>{service.name}</span>
          </div>
          <h1>{service.name}</h1>
          <p>{service.desc}</p>
          <div className="hero-meta">
            <span className="price">{service.price}</span>
            <span className="duration">{service.duration}</span>
            <span className="category">{service.category}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="service-content">
        {/* Service Overview */}
        <section className="service-overview">
          <div className="service-image">
            <img src={service.img} alt={service.name} />
          </div>
          
          <div className="service-highlights">
            <div className="highlight-card">
              <div className="highlight-icon">⏱</div>
              <h4>Duration</h4>
              <p>{service.duration}</p>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">💰</div>
              <h4>Price</h4>
              <p>{service.price}</p>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">⭐</div>
              <h4>Category</h4>
              <p>{service.category}</p>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">👥</div>
              <h4>Expert Staff</h4>
              <p>Certified Professionals</p>
            </div>
          </div>
        </section>

        {/* Service Details Tabs */}
        <section className="service-tabs">
          <div className="tab-buttons">
            <button 
              className={activeTab === "details" ? "active" : ""} 
              onClick={() => setActiveTab("details")}
            >
              Service Details
            </button>
            <button 
              className={activeTab === "features" ? "active" : ""} 
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button 
              className={activeTab === "benefits" ? "active" : ""} 
              onClick={() => setActiveTab("benefits")}
            >
              Benefits
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === "details" && (
              <div className="tab-panel">
                <h3>About This Service</h3>
                <p>{service.details}</p>
                <p>Our experienced professionals will ensure you receive the highest quality service tailored to your specific needs and preferences.</p>
              </div>
            )}
            
            {activeTab === "features" && (
              <div className="tab-panel">
                <h3>What's Included</h3>
                <ul className="features-list">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === "benefits" && (
              <div className="tab-panel">
                <h3>Why Choose This Service</h3>
                <div className="benefits-grid">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                      <h4>{benefit}</h4>
                      <p>Experience the transformative effects of our professional approach.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Booking Section */}
        <section className="booking-section">
          <div className="booking-container">
            <div className="booking-content">
              <h2>Book Your Appointment</h2>
              <p>Reserve your slot for this premium service experience</p>
              
              <form className="booking-form" onSubmit={handleBookingSubmit}>
                <div className="form-row">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Full Name" 
                    required 
                    value={booking.name} 
                    onChange={handleBookingChange} 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    required 
                    value={booking.email} 
                    onChange={handleBookingChange} 
                  />
                </div>
                
                <div className="form-row">
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={booking.date} 
                    onChange={handleBookingChange} 
                  />
                  <input 
                    type="time" 
                    name="time" 
                    required 
                    value={booking.time} 
                    onChange={handleBookingChange} 
                  />
                </div>
                
                <button type="submit" className="submit-btn">Reserve Now</button>
              </form>
              
              {success && (
                <div className="booking-success">
                  <span className="success-icon">✓</span>
                  Appointment booked successfully! We'll confirm your booking shortly.
                </div>
              )}
            </div>
            
            <div className="booking-summary">
              <h3>Service Summary</h3>
              <div className="summary-item">
                <span>Service:</span>
                <span>{service.name}</span>
              </div>
              <div className="summary-item">
                <span>Duration:</span>
                <span>{service.duration}</span>
              </div>
              <div className="summary-item">
                <span>Price:</span>
                <span className="price">{service.price}</span>
              </div>
              <div className="summary-item">
                <span>Category:</span>
                <span>{service.category}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="related-services">
          <h2>You Might Also Like</h2>
          <div className="related-grid">
            {services.filter(s => s.id !== id).slice(0, 3).map(relatedService => (
              <div key={relatedService.id} className="related-card">
                <img src={relatedService.img} alt={relatedService.name} />
                <div className="related-content">
                  <h4>{relatedService.name}</h4>
                  <p>{relatedService.desc}</p>
                  <div className="related-meta">
                    <span className="price">{relatedService.price}</span>
                    <span className="duration">{relatedService.duration}</span>
                  </div>
                  <Link to={`/services/${relatedService.id}`} className="view-service-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .service-detail-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .service-hero {
          position: relative;
          width: 100vw;
          height: 60vh;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${service.img});
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(24, 24, 74, 0.8) 0%, rgba(194, 24, 91, 0.6) 100%);
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: 0 2rem;
        }
        
        .breadcrumb {
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .breadcrumb a {
          color: #ffd700;
          text-decoration: none;
        }
        
        .breadcrumb span {
          color: white;
        }
        
        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .hero-meta {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .hero-meta span {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
        }
        
        .hero-meta .price {
          background: #ffd700;
          color: #18184a;
        }
        
        /* Main Content */
        .service-content {
          width: 100%;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        /* Service Overview */
        .service-overview {
          display: flex;
          gap: 3rem;
          margin-bottom: 4rem;
          align-items: flex-start;
          width: 100%;
          max-width: 1200px;
        }
        
        .service-image {
          flex: 1;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .service-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        
        .service-highlights {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .highlight-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        
        .highlight-card:hover {
          transform: translateY(-5px);
        }
        
        .highlight-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .highlight-card h4 {
          color: #18184a;
          margin-bottom: 0.5rem;
        }
        
        .highlight-card p {
          color: #555;
          font-weight: 600;
        }
        
        /* Service Tabs */
        .service-tabs {
          margin-bottom: 4rem;
          width: 100%;
          max-width: 1200px;
        }
        
        .tab-buttons {
          display: flex;
          border-bottom: 2px solid #e9ecef;
          margin-bottom: 2rem;
        }
        
        .tab-buttons button {
          padding: 1rem 2rem;
          background: none;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .tab-buttons button.active {
          color: #18184a;
        }
        
        .tab-buttons button.active:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #ffd700;
        }
        
        .tab-buttons button:hover {
          color: #18184a;
        }
        
        .tab-panel h3 {
          font-size: 1.8rem;
          color: #18184a;
          margin-bottom: 1.5rem;
        }
        
        .tab-panel p {
          line-height: 1.7;
          color: #444;
          margin-bottom: 1.5rem;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
        }
        
        .features-list li {
          padding: 0.8rem 0;
          border-bottom: 1px solid #f1f1f1;
          display: flex;
          align-items: center;
          font-size: 1.1rem;
        }
        
        .checkmark {
          color: #28a745;
          font-weight: bold;
          margin-right: 1rem;
          font-size: 1.2rem;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .benefit-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .benefit-card h4 {
          color: #18184a;
          margin-bottom: 0.8rem;
        }
        
        .benefit-card p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }
        
        /* Booking Section */
        .booking-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 4rem;
          width: 100%;
          max-width: 1200px;
        }
        
        .booking-container {
          display: flex;
          gap: 3rem;
        }
        
        .booking-content {
          flex: 2;
        }
        
        .booking-content h2 {
          font-size: 2.2rem;
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .booking-content p {
          color: 555;
          margin-bottom: 2rem;
        }
        
        .booking-form {
          width: 100%;
        }
        
        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .booking-form input {
          flex: 1;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .booking-form input:focus {
          outline: none;
          border-color: #ffd700;
        }
        
        .submit-btn {
          width: 100%;
          background: #c2185b;
          color: white;
          border: none;
          padding: 1.2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .submit-btn:hover {
          background: #ad1457;
        }
        
        .booking-success {
          background: #d4edda;
          color: #155724;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }
        
        .booking-summary {
          flex: 1;
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          align-self: flex-start;
        }
        
        .booking-summary h3 {
          color: #18184a;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f1f1;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.8rem 0;
          border-bottom: 1px solid #f1f1f1;
        }
        
        .summary-item span:first-child {
          color: #666;
        }
        
        .summary-item .price {
          color: #c2185b;
          font-weight: bold;
        }
        
        /* Related Services */
        .related-services {
          margin-bottom: 4rem;
          width: 100%;
          max-width: 1200px;
        }
        
        .related-services h2 {
          font-size: 2.2rem;
          color: #18184a;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .related-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        
        .related-card:hover {
          transform: translateY(-5px);
        }
        
        .related-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .related-content {
          padding: 1.5rem;
        }
        
        .related-content h4 {
          color: #18184a;
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
        }
        
        .related-content p {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .related-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        
        .related-meta span {
          font-weight: 600;
        }
        
        .related-meta .price {
          color: #c2185b;
        }
        
        .view-service-btn {
          display: block;
          text-align: center;
          background: #ffd700;
          color: #18184a;
          padding: 0.8rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s ease;
        }
        
        .view-service-btn:hover {
          background: #e6b800;
        }
        
        /* Not Found */
        .not-found {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
          text-align: center;
          width: 100%;
        }
        
        .not-found-content {
          max-width: 600px;
          padding: 2rem;
        }
        
        .not-found h2 {
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .back-button {
          display: inline-block;
          background: #ffd700;
          color: #18184a;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 1.5rem;
        }
        
        /* Responsive Design */
        @media (max-width: 968px) {
          .service-overview,
          .booking-container {
            flex-direction: column;
          }
          
          .service-highlights {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            width: 100%;
            margin-top: 2rem;
          }
          
          .tab-buttons {
            flex-wrap: wrap;
          }
          
          .tab-buttons button {
            flex: 1;
            min-width: 120px;
            text-align: center;
          }
          
          .form-row {
            flex-direction: column;
          }
        }
        
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }
          
          .service-content {
            padding: 0 1.5rem;
          }
          
          .service-highlights {
            grid-template-columns: 1fr;
          }
          
          .booking-section {
            padding: 2rem;
          }
          
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .service-hero {
            height: 50vh;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .hero-meta {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .service-image img {
            height: 300px;
          }
          
          .booking-summary {
            padding: 1.5rem;
          }
          
          .tab-buttons button {
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;