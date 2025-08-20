import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  
  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "", rememberMe: false });
  const [registerData, setRegisterData] = useState({ 
    name: "", email: "", password: "", confirmPassword: "", phone: "" 
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });
  const [profileData, setProfileData] = useState({ name: "", email: "", phone: "", address: "" });

  // Sample bookings data
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("profile"); // For profile section tabs

  // Check authentication status on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('salonUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      setCurrentView("profile");
      setProfileData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || "",
        address: userData.address || ""
      });
      
      // Load sample bookings
      loadBookings();
    }
    
    // Create demo account if it doesn't exist
    initializeDemoAccount();
  }, []);

  // Initialize demo account
  const initializeDemoAccount = () => {
    const users = JSON.parse(localStorage.getItem('salonUsers') || '[]');
    const demoAccount = {
      id: 999,
      name: "Demo User",
      email: "demo@example.com",
      // In a real app, this would be a hashed password
      password: "demo123",
      phone: "+1234567890",
      joinDate: new Date().toISOString(),
      address: "123 Beauty Street, Salon City"
    };
    
    if (!users.find(u => u.email === demoAccount.email)) {
      users.push(demoAccount);
      localStorage.setItem('salonUsers', JSON.stringify(users));
    }
  };

  // Load sample bookings
  const loadBookings = () => {
    setBookings([
      {
        id: 1,
        service: "Haircut & Styling",
        date: "2024-01-15",
        time: "10:00 AM",
        status: "Completed",
        price: "₹400",
        stylist: "Emma Wilson"
      },
      {
        id: 2,
        service: "Premium Facial",
        date: "2024-01-20",
        time: "02:30 PM",
        status: "Upcoming",
        price: "₹700",
        stylist: "James Miller"
      },
      {
        id: 3,
        service: "Manicure & Pedicure",
        date: "2024-01-25",
        time: "11:15 AM",
        status: "Cancelled",
        price: "₹900",
        stylist: "Sophia Chen"
      }
    ]);
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate form data
  const validateForm = (formData, formType) => {
    const newErrors = {};
    
    switch(formType) {
      case 'login':
        if (!formData.email) newErrors.email = "Email is required";
        else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password) newErrors.password = "Password is required";
        break;
        
      case 'register':
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
        break;
        
      case 'forgotPassword':
        if (!formData.email) newErrors.email = "Email is required";
        else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
        break;
        
      case 'profile':
        if (!formData.name) newErrors.name = "Name is required";
        if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = "Invalid phone number";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!validateForm(loginData, 'login')) return;

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('salonUsers') || '[]');
    const foundUser = users.find(u => u.email === loginData.email && u.password === loginData.password);
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setCurrentView("profile");
      
      setProfileData({
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone || "",
        address: foundUser.address || ""
      });
      
      if (loginData.rememberMe) {
        localStorage.setItem('salonUser', JSON.stringify(foundUser));
      }
      
      loadBookings();
      alert("Login successful!");
    } else {
      setErrors({ general: "Invalid email or password" });
    }
  };

  // Handle registration form submission
  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!validateForm(registerData, 'register')) return;

    const users = JSON.parse(localStorage.getItem('salonUsers') || '[]');
    if (users.find(u => u.email === registerData.email)) {
      setErrors({ email: "User with this email already exists!" });
      return;
    }

    const newUser = {
      id: Date.now(),
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      phone: registerData.phone,
      joinDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('salonUsers', JSON.stringify(users));
    
    setUser(newUser);
    setIsAuthenticated(true);
    setCurrentView("profile");
    setProfileData({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: ""
    });
    
    localStorage.setItem('salonUser', JSON.stringify(newUser));
    loadBookings();
    
    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    });

    alert("Registration successful! Welcome to our salon.");
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView("login");
    localStorage.removeItem('salonUser');
    setBookings([]);
    setErrors({});
    alert("You have been logged out successfully.");
  };

  // Handle password reset request
  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    if (!validateForm(forgotPasswordData, 'forgotPassword')) return;
    
    const users = JSON.parse(localStorage.getItem('salonUsers') || '[]');
    if (users.find(u => u.email === forgotPasswordData.email)) {
      alert("Password reset instructions have been sent to your email.");
      setCurrentView("login");
    } else {
      setErrors({ email: "No account found with this email address." });
    }
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    if (!validateForm(profileData, 'profile')) return;
    
    const updatedUser = {
      ...user,
      name: profileData.name,
      phone: profileData.phone,
      address: profileData.address
    };
    
    setUser(updatedUser);
    localStorage.setItem('salonUser', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('salonUsers') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('salonUsers', JSON.stringify(updatedUsers));
    
    alert("Profile updated successfully!");
  };

  // Handle input changes for all forms
  const handleInputChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (errors.general) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.general;
        return newErrors;
      });
    }
    
    switch (formType) {
      case 'login':
        setLoginData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
        break;
      case 'register':
        setRegisterData(prev => ({
          ...prev,
          [name]: value
        }));
        break;
      case 'forgotPassword':
        setForgotPasswordData(prev => ({
          ...prev,
          [name]: value
        }));
        break;
      case 'profile':
        setProfileData(prev => ({
          ...prev,
          [name]: value
        }));
        break;
      default:
        break;
    }
  };

  // Auto-fill demo credentials
  const fillDemoCredentials = () => {
    setLoginData({
      email: "demo@example.com",
      password: "demo123",
      rememberMe: false
    });
  };

  return (
    <div className="account-page">
      {/* Hero Section */}
      <section className="account-hero">
        <div className="hero-content">
          <h1>My Account</h1>
          <p>{isAuthenticated ? "Manage your beauty journey" : "Login or create an account"}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="account-container">
        <div className="account-content">
          {/* Account Forms */}
          <div className="account-forms">
            {!isAuthenticated ? (
              <>
                {currentView === "login" && (
                  <div className="auth-form">
                    <div className="form-header">
                      <h2>Welcome Back</h2>
                      <p>Sign in to your account</p>
                    </div>
                    
                    {errors.general && <div className="error-message">{errors.general}</div>}
                    
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => handleInputChange(e, 'login')}
                          className={errors.email ? 'error' : ''}
                          required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => handleInputChange(e, 'login')}
                          className={errors.password ? 'error' : ''}
                          required
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                      </div>
                      
                      <div className="form-options">
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            name="rememberMe"
                            checked={loginData.rememberMe}
                            onChange={(e) => handleInputChange(e, 'login')}
                          />
                          <span className="checkmark"></span>
                          Remember me
                        </label>
                        
                        <span 
                          className="link" 
                          onClick={() => setCurrentView("forgotPassword")}
                        >
                          Forgot password?
                        </span>
                      </div>
                      
                      <button type="submit" className="submit-btn">
                        Sign In
                      </button>
                      
                      <div className="form-footer">
                        <p>New to our salon?{" "}
                          <span 
                            className="link" 
                            onClick={() => setCurrentView("register")}
                          >
                            Create an account
                          </span>
                        </p>
                      </div>

                      {/* Demo Credentials */}
                      <div className="demo-credentials">
                        <p className="demo-title">Demo credentials:</p>
                        <p>Email: demo@example.com</p>
                        <p>Password: demo123</p>
                        <button 
                          type="button" 
                          className="demo-btn"
                          onClick={fillDemoCredentials}
                        >
                          Auto-fill Demo Credentials
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {currentView === "register" && (
                  <div className="auth-form">
                    <div className="form-header">
                      <h2>Create Account</h2>
                      <p>Join our beauty community</p>
                    </div>
                    
                    <form onSubmit={handleRegister}>
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={registerData.name}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={errors.name ? 'error' : ''}
                          required
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="reg-email">Email Address</label>
                        <input
                          type="email"
                          id="reg-email"
                          name="email"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={errors.email ? 'error' : ''}
                          required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="reg-password">Password</label>
                        <input
                          type="password"
                          id="reg-password"
                          name="password"
                          placeholder="Create a password (min. 6 characters)"
                          value={registerData.password}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={errors.password ? 'error' : ''}
                          required
                          minLength={6}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={(e) => handleInputChange(e, 'register')}
                          className={errors.confirmPassword ? 'error' : ''}
                          required
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number (optional)</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={registerData.phone}
                          onChange={(e) => handleInputChange(e, 'register')}
                        />
                      </div>
                      
                      <button type="submit" className="submit-btn">
                        Create Account
                      </button>
                      
                      <div className="form-footer">
                        <p>Already have an account?{" "}
                          <span 
                            className="link" 
                            onClick={() => setCurrentView("login")}
                          >
                            Sign In
                          </span>
                        </p>
                      </div>
                    </form>
                  </div>
                )}

                {currentView === "forgotPassword" && (
                  <div className="auth-form">
                    <div className="form-header">
                      <h2>Reset Your Password</h2>
                      <p>Enter your email to receive reset instructions</p>
                    </div>
                    
                    <form onSubmit={handleForgotPassword}>
                      <div className="form-group">
                        <label htmlFor="reset-email">Email Address</label>
                        <input
                          type="email"
                          id="reset-email"
                          name="email"
                          placeholder="Enter your email"
                          value={forgotPasswordData.email}
                          onChange={(e) => handleInputChange(e, 'forgotPassword')}
                          className={errors.email ? 'error' : ''}
                          required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                      
                      <button type="submit" className="submit-btn">
                        Send Reset Instructions
                      </button>
                      
                      <div className="form-footer">
                        <span 
                          className="link" 
                          onClick={() => setCurrentView("login")}
                        >
                          Back to Login
                        </span>
                      </div>
                    </form>
                  </div>
                )}
              </>
            ) : (
              /* User Profile */
              <div className="profile-section">
                <div className="profile-header">
                  <div className="user-info">
                    <div className="avatar">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <h2>Welcome, {user?.name}!</h2>
                      <p>Member since {new Date(user?.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>

                <div className="profile-tabs">
                  <button 
                    className={activeTab === "profile" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("profile")}
                  >
                    Profile
                  </button>
                  <button 
                    className={activeTab === "bookings" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("bookings")}
                  >
                    My Bookings
                  </button>
                </div>

                <div className="profile-content">
                  {activeTab === "profile" ? (
                    <div className="profile-details">
                      <h3>Personal Information</h3>
                      <form onSubmit={handleProfileUpdate}>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              type="text"
                              name="name"
                              value={profileData.name}
                              onChange={(e) => handleInputChange(e, 'profile')}
                              className={errors.name ? 'error' : ''}
                              required
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                          </div>
                          
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              type="email"
                              value={profileData.email}
                              disabled
                            />
                            <small>Email cannot be changed</small>
                          </div>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={profileData.phone}
                              onChange={(e) => handleInputChange(e, 'profile')}
                              placeholder="Add your phone number"
                              className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label>Address</label>
                          <textarea
                            name="address"
                            value={profileData.address}
                            onChange={(e) => handleInputChange(e, 'profile')}
                            placeholder="Enter your address"
                            rows="3"
                          />
                        </div>
                        
                        <button type="submit" className="submit-btn">
                          Update Profile
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="bookings-section">
                      <h3>Your Bookings</h3>
                      {bookings.length > 0 ? (
                        <div className="bookings-list">
                          {bookings.map(booking => (
                            <div key={booking.id} className="booking-card">
                              <div className="booking-info">
                                <h4>{booking.service}</h4>
                                <p className="booking-meta">
                                  <span className="booking-date">{booking.date} at {booking.time}</span>
                                  <span className="booking-stylist">with {booking.stylist}</span>
                                </p>
                                <span className={`status ${booking.status.toLowerCase()}`}>
                                  {booking.status}
                                </span>
                              </div>
                              <div className="booking-actions">
                                <div className="booking-price">
                                  {booking.price}
                                </div>
                                {booking.status === "Upcoming" && (
                                  <button className="reschedule-btn">Reschedule</button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-bookings">
                          <p>You haven't made any bookings yet.</p>
                          <Link to="/booking" className="cta-button">
                            Book Your First Service
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .account-page {
          width: 100%;
          min-height: 100vh;
          background: #fafafa;
        }
        
        /* Hero Section */
        .account-hero {
          width: 100%;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }
        
        .hero-content h1 {
          font-size: 2.8rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        /* Main Container */
        .account-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }
        
        .account-content {
          display: flex;
          justify-content: center;
        }
        
        /* Account Forms */
        .account-forms {
          width: 100%;
          max-width: 500px;
        }
        
        .auth-form {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          width: 100%;
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .form-header h2 {
          font-size: 1.8rem;
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        
        .form-header p {
          color: #718096;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2d3748;
          font-size: 0.9rem;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: #fafafa;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: white;
        }
        
        .form-group input.error,
        .form-group textarea.error {
          border-color: #e53e3e;
        }
        
        .form-group input:disabled {
          background-color: #edf2f7;
          cursor: not-allowed;
        }
        
        .form-group small {
          color: #718096;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
        }
        
        .error-text {
          color: #e53e3e;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
        }
        
        .error-message {
          background: #fed7d7;
          color: #742a2a;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        
        .checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          position: relative;
        }
        
        .checkbox input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        
        .checkmark {
          height: 18px;
          width: 18px;
          background-color: #f7fafc;
          border: 1px solid #cbd5e0;
          border-radius: 4px;
          display: inline-block;
          position: relative;
          transition: all 0.2s ease;
        }
        
        .checkbox input:checked ~ .checkmark {
          background-color: #667eea;
          border-color: #667eea;
        }
        
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        
        .checkbox input:checked ~ .checkmark:after {
          display: block;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .link {
          color: #667eea;
          cursor: pointer;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        
        .link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }
        
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(102, 126, 234, 0.3);
        }
        
        .form-footer {
          text-align: center;
          color: #718096;
          font-size: 0.9rem;
        }
        
        .demo-credentials {
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #718096;
          border: 1px dashed #cbd5e0;
          text-align: center;
        }
        
        .demo-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #4a5568;
        }
        
        .demo-btn {
          margin-top: 0.75rem;
          background: transparent;
          color: #667eea;
          border: 1px solid #667eea;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .demo-btn:hover {
          background: #667eea;
          color: white;
        }
        
        /* Profile Section */
        .profile-section {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          width: 100%;
          overflow: hidden;
        }
        
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 2.5rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .avatar {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .user-details h2 {
          color: #2d3748;
          margin-bottom: 0.25rem;
          font-size: 1.5rem;
        }
        
        .user-details p {
          color: #718096;
          font-size: 0.9rem;
        }
        
        .logout-btn {
          background: transparent;
          color: #718096;
          border: 1px solid #cbd5e0;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .logout-btn:hover {
          background: #fff;
          color: #e53e3e;
          border-color: #e53e3e;
        }
        
        .profile-tabs {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 2.5rem;
        }
        
        .tab {
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 600;
          color: #718096;
          position: relative;
          transition: all 0.2s ease;
        }
        
        .tab:hover {
          color: #667eea;
        }
        
        .tab.active {
          color: #667eea;
        }
        
        .tab.active:after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #667eea;
        }
        
        .profile-content {
          padding: 2rem 2.5rem;
        }
        
        .profile-details h3 {
          color: #2d3748;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .bookings-section {
          margin-top: 1rem;
        }
        
        .bookings-section h3 {
          color: #2d3748;
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .booking-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: #f7fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }
        
        .booking-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        
        .booking-info h4 {
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .booking-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #718096;
        }
        
        .booking-stylist {
          font-style: italic;
        }
        
        .status {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .status.completed {
          background: #c6f6d5;
          color: #22543d;
        }
        
        .status.upcoming {
          background: #bee3f8;
          color: #1a365d;
        }
        
        .status.cancelled {
          background: #fed7d7;
          color: #742a2a;
        }
        
        .booking-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }
        
        .booking-price {
          font-weight: bold;
          color: #667eea;
          font-size: 1.1rem;
        }
        
        .reschedule-btn {
          background: transparent;
          color: #667eea;
          border: 1px solid #667eea;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
          reschedule-btn:hover {
          background: #667eea;
          color: white;
        }
        
        .no-bookings {
          text-align: center;
          padding: 3rem 1rem;
          color: #718096;
        }
        
        .no-bookings p {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(102, 126, 234, 0.3);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .account-hero {
            padding: 3rem 1rem;
          }
          
          .hero-content h1 {
            font-size: 2.2rem;
          }
          
          .account-container {
            padding: 0 1rem 2rem;
          }
          
          .auth-form {
            padding: 2rem 1.5rem;
          }
          
          .profile-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
            padding: 1.5rem;
          }
          
          .user-info {
            flex-direction: column;
            text-align: center;
          }
          
          .profile-tabs {
            padding: 0 1rem;
            justify-content: center;
          }
          
          .profile-content {
            padding: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .booking-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .booking-actions {
            flex-direction: row;
            align-items: center;
            width: 100%;
            justify-content: space-between;
          }
          
          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 1.8rem;
          }
          
          .auth-form {
            padding: 1.5rem 1rem;
          }
          
          .tab {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Account;