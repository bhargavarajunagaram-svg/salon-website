import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const heroBg = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80";

const services = [
  {
    id: 1,
    name: "Haircut & Styling",
    price: "₹400",
    duration: "45 mins"
  },
  {
    id: 2,
    name: "Premium Facial",
    price: "₹700",
    duration: "60 mins"
  },
  {
    id: 3,
    name: "Luxury Spa",
    price: "₹1200",
    duration: "90 mins"
  },
  {
    id: 4,
    name: "Bridal Makeover",
    price: "₹5000",
    duration: "3 hours"
  },
  {
    id: 5,
    name: "Hair Coloring",
    price: "₹1500",
    duration: "2 hours"
  },
  {
    id: 6,
    name: "Manicure & Pedicure",
    price: "₹900",
    duration: "75 mins"
  }
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM"
];

const Booking = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: location.state?.selectedService || "",
    date: "",
    time: "",
    message: ""
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(timeSlots);

  useEffect(() => {
    // Simulate checking available time slots based on selected date
    if (formData.date) {
      // In a real app, you would fetch available slots from an API
      const filteredSlots = timeSlots.filter(slot => 
        !["10:00 AM", "02:30 PM", "05:00 PM"].includes(slot) // Simulate booked slots
      );
      setAvailableSlots(filteredSlots);
    }
  }, [formData.date]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData({
      ...formData,
      time: time
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, you would send the form data to your backend
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Book Your Appointment</h1>
          <p>Reserve your slot for a premium beauty experience</p>
        </div>
      </section>

      {/* Booking Content */}
      <div className="booking-container">
        <div className="booking-content">
          {/* Booking Form */}
          <section className="booking-form-section">
            <h2 className="section-title">Schedule Your Visit</h2>
            
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 1234567890"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Select Service *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>
                        {service.name} - {service.price} ({service.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {formData.date && isWeekend(formData.date) && (
                    <div className="weekend-notice">
                      ⚠️ Weekend appointments have 20% premium charge
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Preferred Time *</label>
                  <div className="time-slots">
                    {availableSlots.length > 0 ? (
                      availableSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                          onClick={() => handleTimeSelect(slot)}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <div className="no-slots">
                        No available slots for selected date
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Special Requests (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or notes for our staff..."
                    rows="4"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Confirm Booking
              </button>
            </form>

            {isSubmitted && (
              <div className="booking-success">
                <div className="success-icon">✓</div>
                <h3>Appointment Booked Successfully!</h3>
                <p>We've sent a confirmation to your email. We'll see you soon!</p>
              </div>
            )}
          </section>

          {/* Booking Summary */}
          <section className="booking-summary">
            <div className="summary-card">
              <h3>Appointment Summary</h3>
              
              {formData.service && (
                <div className="summary-item">
                  <span>Service:</span>
                  <span>{formData.service}</span>
                </div>
              )}
              
              {formData.date && (
                <div className="summary-item">
                  <span>Date:</span>
                  <span>{new Date(formData.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
              
              {formData.time && (
                <div className="summary-item">
                  <span>Time:</span>
                  <span>{formData.time}</span>
                </div>
              )}
              
              <div className="price-breakdown">
                <h4>Price Breakdown</h4>
                <div className="price-item">
                  <span>Service Cost</span>
                  <span>₹{services.find(s => s.name === formData.service)?.price.replace('₹', '') || '0'}</span>
                </div>
                {formData.date && isWeekend(formData.date) && (
                  <div className="price-item">
                    <span>Weekend Premium (20%)</span>
                    <span>+₹{Math.round(parseInt(services.find(s => s.name === formData.service)?.price.replace('₹', '') || '0') * 0.2)}</span>
                  </div>
                )}
                <div className="price-total">
                  <span>Total Amount</span>
                  <span>₹{
                    formData.service ? 
                    (parseInt(services.find(s => s.name === formData.service)?.price.replace('₹', '') || '0') * 
                    (formData.date && isWeekend(formData.date) ? 1.2 : 1)).toFixed(0)
                    : '0'
                  }</span>
                </div>
              </div>

              <div className="benefits-list">
                <h4>What's Included</h4>
                <ul>
                  <li>✓ Professional consultation</li>
                  <li>✓ Premium quality products</li>
                  <li>✓ Expert stylists</li>
                  <li>✓ Relaxing ambiance</li>
                  <li>✓ Refreshments</li>
                </ul>
              </div>

              <div className="cta-buttons">
                <Link to="/services" className="browse-services-btn">
                  Browse More Services
                </Link>
                <Link to="/contact" className="contact-btn">
                  Need Help?
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .booking-page {
          width: 100%;
          min-height: 100vh;
        }
        
        /* Hero Section */
        .booking-hero {
          position: relative;
          width: 100%;
          height: 50vh;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroBg});
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
          opacity: 0.9;
        }
        
        /* Main Container */
        .booking-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .booking-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        
        /* Section Titles */
        .section-title {
          font-size: 2.5rem;
          color: #18184a;
          margin-bottom: 2rem;
          padding-bottom: 0.5rem;
          border-bottom: 3px solid #ffd700;
          display: inline-block;
        }
        
        /* Booking Form */
        .booking-form-section {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-group label {
          font-weight: 600;
          color: #18184a;
          margin-bottom: 0.5rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ffd700;
        }
        
        .weekend-notice {
          background: #fff3cd;
          color: #856404;
          padding: 0.5rem;
          border-radius: 5px;
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }
        
        .time-slots {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .time-slot {
          padding: 0.5rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .time-slot:hover {
          border-color: #ffd700;
        }
        
        .time-slot.selected {
          background: #ffd700;
          border-color: #ffd700;
          color: #18184a;
          font-weight: 600;
        }
        
        .no-slots {
          grid-column: 1 / -1;
          text-align: center;
          color: #6c757d;
          padding: 1rem;
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
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          margin-top: 2rem;
        }
        
        .success-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .booking-success h3 {
          margin-bottom: 0.5rem;
        }
        
        /* Booking Summary */
        .booking-summary {
          position: sticky;
          top: 2rem;
          align-self: start;
        }
        
        .summary-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .summary-card h3 {
          color: #18184a;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f1f1f1;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f1f1;
        }
        
        .summary-item span:first-child {
          color: #666;
        }
        
        .summary-item span:last-child {
          font-weight: 600;
          color: #18184a;
        }
        
        .price-breakdown {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 10px;
        }
        
        .price-breakdown h4 {
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .price-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: #666;
        }
        
        .price-total {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid #dee2e6;
          font-weight: bold;
          color: #18184a;
          font-size: 1.1rem;
        }
        
        .benefits-list {
          margin: 2rem 0;
        }
        
        .benefits-list h4 {
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .benefits-list ul {
          list-style: none;
          padding: 0;
        }
        
        .benefits-list li {
          padding: 0.5rem 0;
          color: #555;
        }
        
        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .browse-services-btn,
        .contact-btn {
          text-align: center;
          padding: 1rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .browse-services-btn {
          background: #ffd700;
          color: #18184a;
        }
        
        .browse-services-btn:hover {
          background: #e6b800;
        }
        
        .contact-btn {
          background: transparent;
          color: #18184a;
          border: 2px solid #18184a;
        }
        
        .contact-btn:hover {
          background: #18184a;
          color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 968px) {
          .booking-content {
            grid-template-columns: 1fr;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .time-slots {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .booking-summary {
            position: static;
          }
        }
        
        @media (max-width: 768px) {
          .booking-container {
            padding: 0 1.5rem;
          }
          
          .booking-form-section,
          .summary-card {
            padding: 1.5rem;
          }
          
          .hero-content h1 {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .booking-hero {
            height: 40vh;
          }
          
          .time-slots {
            grid-template-columns: 1fr;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Booking;