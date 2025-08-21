import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section - Fixed for full width */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>We're here to help you look and feel your absolute best</p>
          <div className="hero-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you shortly</p>
            </div>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
                <p>Sorry, there was an error sending your message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-header">
                <h2>Contact Information</h2>
                <p>Reach out to us through any of these channels</p>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  {/* Location Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="method-details">
                  <h3>Visit Us</h3>
                  <p>123 Main Street, Hyderabad, Telangana 500001</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  {/* Phone Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="method-details">
                  <h3>Call Us</h3>
                  <p>+91 98765 43210</p>
                  <p>+91 91234 56789</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  {/* Email Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <div className="method-details">
                  <h3>Email Us</h3>
                  <p>info@chandusalon.com</p>
                  <p>bookings@chandusalon.com</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  {/* Clock Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="method-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="map-container">
                <iframe
                  title="Chandu Salon Location"
                  src="https://maps.google.com/maps?q=Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .contact-page {
          width: 100%;
          min-height: 100vh;
          background: #f8f9fa;
        }

        /* Hero Section - Fixed for full width */
        .contact-hero {
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: 60vh;
          background: linear-gradient(rgba(24, 24, 74, 0.7), rgba(194, 24, 91, 0.7)), url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80);
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          overflow: hidden;
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

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-content p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-decoration {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .decoration-circle {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          opacity: 0.6;
          animation: pulse 2s infinite;
        }

        .decoration-circle:nth-child(2) {
          animation-delay: 0.3s;
        }

        .decoration-circle:nth-child(3) {
          animation-delay: 0.6s;
        }

        .contact-main {
          padding: 5rem 2rem;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-form-section {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 2.2rem;
          color: #18184a;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #18184a;
        }

        .form-group input,
        .form-group textarea {
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #c2185b;
          box-shadow: 0 0 0 3px rgba(194, 24, 91, 0.1);
        }

        .submit-btn {
          padding: 1.2rem 2rem;
          background: linear-gradient(135deg, #c2185b 0%, #ad1457 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(194, 24, 91, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .contact-info-section {
          position: relative;
        }

        .info-card {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 2rem;
        }

        .info-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .info-header h2 {
          font-size: 2.2rem;
          color: #18184a;
          margin-bottom: 0.5rem;
        }

        .info-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .contact-method:hover {
          transform: translateX(5px);
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .method-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #c2185b 0%, #ad1457 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .method-icon svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .method-details h3 {
          font-size: 1.2rem;
          color: #18184a;
          margin-bottom: 0.5rem;
        }

        .method-details p {
          color: #666;
          margin-bottom: 0.25rem;
          font-size: 0.95rem;
        }

        .map-container {
          margin-top: 2rem;
        }

        .success-message,
        .error-message {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          animation: slideIn 0.5s ease;
        }

        .success-message {
          background: #d4edda;
          color: #155724;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
        }

        .success-message svg,
        .error-message svg {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 968px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .contact-main {
            padding: 3rem 1rem;
          }

          .contact-form-section,
          .info-card {
            padding: 2rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }
          
          .hero-content p {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 576px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .contact-method {
            flex-direction: column;
            text-align: center;
          }
          
          .method-icon {
            align-self: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;