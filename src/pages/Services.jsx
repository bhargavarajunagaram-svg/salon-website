import React, { useState } from "react";
import { Link } from "react-router-dom";

const heroBg = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80";

const services = [
  {
    id: 1,
    name: "Haircut & Styling",
    desc: "Trendy styles for all ages, tailored to your face shape and personality.",
    price: "₹400",
    img: "https://static.wixstatic.com/media/cd9302_0d0b61a2cfa7498dbf3d620c77785b6e~mv2.jpg/v1/fill/w_917,h_611,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cd9302_0d0b61a2cfa7498dbf3d620c77785b6e~mv2.jpg",
    details: "Our haircut service includes consultation, shampoo, and styling. We use advanced techniques for men, women, and kids. Enjoy a relaxing experience and leave with a fresh look.",
    duration: "45 mins",
    category: "Hair"
  },
  {
    id: 2,
    name: "Premium Facial",
    desc: "Glow with our signature facials using premium products and expert techniques.",
    price: "₹700",
    img: "https://amospa.com/wp-content/uploads/2024/05/Premium-Facial-min.jpg",
    details: "Our facials are customized for your skin type. We use organic and dermatologically tested products. Includes cleansing, exfoliation, massage, mask, and hydration.",
    duration: "60 mins",
    category: "Skincare"
  },
  {
    id: 3,
    name: "Luxury Spa",
    desc: "Relax and rejuvenate with our soothing spa therapies.",
    price: "₹1200",
    img: "https://i.pinimg.com/originals/00/01/b7/0001b78e170ebcdb347f8f25a721ef6f.jpg",
    details: "Our spa treatments include aromatherapy, deep tissue massage, and stress relief therapies. Enjoy a tranquil ambiance and professional care.",
    duration: "90 mins",
    category: "Wellness"
  },
  {
    id: 4,
    name: "Bridal Makeover",
    desc: "Look stunning on your big day with our expert bridal makeover.",
    price: "₹5000",
    img: "https://cdn0.weddingwire.in/vendor/8254/3_2/960/jpg/18519837-774504649390758-7488955179691571368-n.jpeg",
    details: "Our bridal package includes makeup, hair styling, saree draping, and skin prep. We create custom looks for every bride, ensuring long-lasting beauty and confidence.",
    duration: "3 hours",
    category: "Special Occasion"
  },
  {
    id: 5,
    name: "Hair Coloring",
    desc: "Transform your look with our professional hair coloring services.",
    price: "₹1500",
    img: "https://thumbs.dreamstime.com/z/female-hair-coloring-salon-4745833.jpg",
    details: "From subtle highlights to bold fashion colors, our color experts use premium products to achieve your desired look while maintaining hair health.",
    duration: "2 hours",
    category: "Hair"
  },
  {
    id: 6,
    name: "Manicure & Pedicure",
    desc: "Pamper your hands and feet with our luxury nail care services.",
    price: "₹900",
    img: "https://daireds.com/wp-content/uploads/2021/02/By-Pixel-Shot-pedicure-1-scaled.jpg",
    details: "Our nail services include shaping, cuticle care, massage, and polish application using high-quality products for long-lasting results.",
    duration: "75 mins",
    category: "Nails"
  }
];

const Services = () => {
  const [booking, setBooking] = useState({ name: "", email: "", service: "", date: "", time: "" });
  const [success, setSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setBooking({ name: "", email: "", service: "", date: "", time: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  const categories = ["All", ...new Set(services.map(service => service.category))];
  const filteredServices = selectedCategory === "All" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Premium Salon Services</h1>
          <p>Indulge in our luxurious treatments designed to enhance your natural beauty</p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="services-container">
        
        {/* Category Filter */}
        <section className="category-filter">
          <h2 className="section-title">Our Service Categories</h2>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* All Services Grid */}
        <section className="services-section all-services">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image">
                  <img src={service.img} alt={service.name} />
                  <div className="service-overlay">
                    <span className="service-price">{service.price}</span>
                    <span className="service-duration">{service.duration}</span>
                  </div>
                </div>
                <div className="service-content">
                  <div className="service-category">{service.category}</div>
                  <h3>{service.name}</h3>
                  <p>{service.desc}</p>
                  <div className="service-actions">
                    <Link to={`/services/${service.id}`} className="service-details-btn">View Details</Link>
                    <button
                      style={{
                        background: "#1976d2",
                        color: "#fff",
                        padding: "0.6rem 1.2rem",
                        borderRadius: "6px",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                      onClick={() => window.location.href = "/book"}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Services Highlight */}
        <section className="services-section premium-services">
          <h2 className="section-title">Signature Treatments</h2>
          <div className="premium-grid">
            {services.filter(s => s.price > "₹1000").map(service => (
              <div key={service.id} className="premium-card">
                <div className="premium-content">
                  <h3>{service.name}</h3>
                  <p>{service.details}</p>
                  <div className="premium-features">
                    <span className="price">{service.price}</span>
                    <span className="duration">{service.duration}</span>
                  </div>
                  <Link to={`/services/${service.id}`} className="premium-btn">Learn More</Link>
                </div>
                <div className="premium-image">
                  <img src={service.img} alt={service.name} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Appointment Booking Section */}
        <section className="booking-section">
          <div className="booking-container">
            <div className="booking-content">
              <h2 className="section-title">Book Your Appointment</h2>
              <p>Reserve your slot for a transformative beauty experience</p>
              
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
                  <select name="service" required value={booking.service} onChange={handleBookingChange}>
                    <option value="">Select Service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
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
                
                <button type="submit" className="submit-btn">Reserve My Appointment</button>
              </form>
              
              {success && (
                <div className="booking-success">
                  <span>✓</span>
                  Appointment booked successfully! We'll confirm shortly.
                </div>
              )}
            </div>
            
            <div className="booking-image">
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80" alt="Salon Appointment" />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready for Your Transformation?</h2>
            <p>Experience the difference of our premium salon services</p>
            <Link to="/booking" className="cta-button">Book Your Visit Now</Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .services-page {
          width: 100%;
          min-height: 100vh;
        }
        
        /* Hero Section */
        .services-hero {
          position: relative;
          width: 100%;
          height: 60vh;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBg});
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }
        
        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Main Container */
        .services-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        /* Section Titles */
        .section-title {
          font-size: 2.5rem;
          color: #18184a;
          margin-bottom: 2.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 3px solid #ffd700;
          display: inline-block;
        }
        
        /* Category Filter */
        .category-filter {
          margin-bottom: 3rem;
          text-align: center;
        }
        
        .category-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .category-buttons button {
          padding: 0.8rem 1.5rem;
          border: 2px solid #ffd700;
          background: white;
          color: #18184a;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .category-buttons button.active,
        .category-buttons button:hover {
          background: #ffd700;
          color: #18184a;
        }
        
        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .service-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .service-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        
        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .service-card:hover .service-image img {
          transform: scale(1.1);
        }
        
        .service-overlay {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .service-price {
          background: #ffd700;
          color: #18184a;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .service-duration {
          background: rgba(255, 255, 255, 0.9);
          color: #18184a;
          padding: 0.4rem 0.8rem;
          border-radius: 15px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .service-content {
          padding: 1.5rem;
        }
        
        .service-category {
          color: #c2185b;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .service-content h3 {
          font-size: 1.4rem;
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .service-content p {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .service-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .service-details-btn {
          color: #1976d2;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        
        .service-details-btn:hover {
          color: #c2185b;
        }
        
        .book-now-btn {
          background: #c2185b;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .book-now-btn:hover {
          background: #ad1457;
        }
        
        /* Premium Services */
        .premium-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .premium-card {
          display: flex;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .premium-card:nth-child(even) {
          flex-direction: row-reverse;
        }
        
        .premium-content {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .premium-content h3 {
          font-size: 1.8rem;
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .premium-content p {
          color: #555;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        
        .premium-features {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .premium-features span {
          background: #f8f9fa;
          padding: 0.5rem 1rem;
          border-radius: 15px;
          font-weight: 600;
        }
        
        .premium-features .price {
          color: #c2185b;
        }
        
        .premium-btn {
          align-self: flex-start;
          background: #ffd700;
          color: #18184a;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .premium-btn:hover {
          background: #e6b800;
          transform: translateY(-2px);
        }
        
        .premium-image {
          flex: 1;
          min-height: 300px;
        }
        
        .premium-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Booking Section */
        .booking-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 4rem;
        }
        
        .booking-container {
          display: flex;
          gap: 3rem;
          align-items: center;
        }
        
        .booking-content {
          flex: 1;
        }
        
        .booking-content p {
          color: #555;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .booking-form {
          width: 100%;
        }
        
        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .booking-form input,
        .booking-form select {
          flex: 1;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .booking-form input:focus,
        .booking-form select:focus {
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
        
        .booking-image {
          flex: 1;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .booking-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #18184a 0%, #2c2c80 100%);
          color: white;
          text-align: center;
          padding: 4rem 2rem;
          border-radius: 20px;
          margin-bottom: 3rem;
        }
        
        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .cta-button {
          background: #ffd700;
          color: #18184a;
          padding: 1rem 2.5rem;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          background: #e6b800;
          transform: translateY(-2px);
        }
        
        /* Responsive Design */
        @media (max-width: 968px) {
          .premium-card,
          .premium-card:nth-child(even),
          .booking-container {
            flex-direction: column;
          }
          
          .premium-image {
            min-height: 250px;
          }
          
          .booking-image {
            order: -1;
          }
          
          .form-row {
            flex-direction: column;
          }
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .services-container {
            padding: 0 1.5rem;
          }
          
          .hero-content h1 {
            font-size: 2.2rem;
          }
          
          .booking-section {
            padding: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .services-hero {
            height: 50vh;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .category-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .service-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .cta-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;