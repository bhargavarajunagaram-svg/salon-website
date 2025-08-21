import React, { useState, useEffect } from "react";

const Account = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("login"); // "login", "register", "account"
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "+1 (555) 123-4567",
    membership: "Standard",
    joinDate: "January 15, 2023"
  });

  // Login/Register form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  // Bookings and UI state
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [bookings] = useState([
    { id: 1, date: "2023-05-12", service: "Haircut", status: "Completed" },
    { id: 2, date: "2023-06-18", service: "Coloring", status: "Upcoming" }
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Load registered user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("registeredUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Login handler (now checks localStorage)
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
    // Check against demo user OR registered user
    if (
      (loginData.email === "user@example.com" && loginData.password === "password") ||
      (storedUser &&
        loginData.email === storedUser.email &&
        loginData.password === storedUser.password)
    ) {
      setIsAuthenticated(true);
      setUser(
        storedUser && loginData.email === storedUser.email
          ? storedUser
          : {
              name: "Chandu",
              email: "user@example.com",
              phone: "+91 98765 43210",
              membership: "Premium",
              joinDate: "March 10, 2022"
            }
      );
      setCurrentView("account");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  // Register handler (now saves to localStorage)
  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError("");
    if (!registerData.name || !registerData.email || !registerData.password) {
      setRegisterError("All fields are required.");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }
    // Save user to localStorage
    const newUser = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      phone: "+91 98765 43210",
      membership: "Standard",
      joinDate: new Date().toLocaleDateString()
    };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    setIsAuthenticated(true);
    setUser(newUser);
    setCurrentView("account");
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("login");
    setUser({
      name: "Guest User",
      email: "guest@example.com",
      phone: "+1 (555) 123-4567",
      membership: "Standard",
      joinDate: "January 15, 2023"
    });
    setLoginData({ email: "", password: "" });
    setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  // Profile edit handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // --- RENDER ---
  return (
    <div className="account-container">
      <div className="account-content">
        <h1 className="account-title">My Account</h1>

        {/* LOGIN FORM */}
        {currentView === "login" && !isAuthenticated && (
          <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="profile-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              {loginError && <div className="error-message">{loginError}</div>}
              <div className="form-actions">
                <button type="submit" className="btn-primary">Login</button>
                <button type="button" className="btn-secondary" onClick={() => setCurrentView("register")}>Create Account</button>
              </div>
            </form>
          </div>
        )}

        {/* REGISTER FORM */}
        {currentView === "register" && !isAuthenticated && (
          <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              {registerError && <div className="error-message">{registerError}</div>}
              <div className="form-actions">
                <button type="submit" className="btn-primary">Register</button>
                <button type="button" className="btn-secondary" onClick={() => setCurrentView("login")}>Back to Login</button>
              </div>
            </form>
          </div>
        )}

        {/* ACCOUNT DASHBOARD */}
        {isAuthenticated && currentView === "account" && (
          <div className={`account-layout ${windowWidth < 768 ? "vertical" : "horizontal"}`}>
            {/* Sidebar Navigation */}
            <div className="account-sidebar">
              <div className="profile-summary">
                <img
                  src="https://img.icons8.com/color/96/000000/user-male-circle--v2.png"
                  alt="Profile"
                  className="profile-image"
                />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <div className="membership-badge">
                  {user.membership} Member
                </div>
              </div>
              <div className="sidebar-nav">
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={activeTab === "profile" ? "nav-btn active" : "nav-btn"}
                >
                  Profile Information
                </button>
                <button 
                  onClick={() => setActiveTab("bookings")}
                  className={activeTab === "bookings" ? "nav-btn active" : "nav-btn"}
                >
                  My Bookings
                </button>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={activeTab === "settings" ? "nav-btn active" : "nav-btn"}
                >
                  Account Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="nav-btn"
                  style={{ color: "#c2185b", fontWeight: "bold" }}
                >
                  Logout
                </button>
              </div>
            </div>
            {/* Main Content Area */}
            <div className="account-main-content">
              {activeTab === "profile" && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2>Profile Information</h2>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="edit-btn"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-actions">
                        <button
                          type="submit"
                          className="btn-primary"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="profile-details">
                      <div className="detail-row">
                        <div className="detail-label">Full Name</div>
                        <div className="detail-value">{user.name}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Email Address</div>
                        <div className="detail-value">{user.email}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Phone Number</div>
                        <div className="detail-value">{user.phone}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Membership</div>
                        <div className="detail-value">{user.membership}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Member Since</div>
                        <div className="detail-value">{user.joinDate}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "bookings" && (
                <div className="bookings-section">
                  <h2>My Bookings</h2>
                  {bookings.length === 0 ? (
                    <p className="no-bookings">No bookings yet.</p>
                  ) : (
                    <div className="bookings-list">
                      {bookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                          <div className="booking-info">
                            <div className="booking-service">{booking.service}</div>
                            <div className="booking-date">{formatDate(booking.date)}</div>
                          </div>
                          <div className={`booking-status ${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === "settings" && (
                <div className="settings-section">
                  <h2>Account Settings</h2>
                  <div className="settings-content">
                    <div className="setting-card">
                      <h3>Change Password</h3>
                      <div className="password-form">
                        <input
                          type="password"
                          placeholder="Current Password"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                        />
                        <button className="btn-primary">
                          Update Password
                        </button>
                      </div>
                    </div>
                    <div className="setting-card">
                      <h3>Notification Preferences</h3>
                      <div className="notification-settings">
                        <label>
                          <input type="checkbox" defaultChecked />
                          Email Notifications
                        </label>
                        <label>
                          <input type="checkbox" defaultChecked />
                          SMS Notifications
                        </label>
                        <label>
                          <input type="checkbox" />
                          Promotional Offers
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .account-container {
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background: linear-gradient(135deg, #f7f7f7 0%, #e8e8e8 100%);
          width: 100vw;
          box-sizing: border-box;
          padding: 0; /* Remove padding */
          margin: 0;  /* Remove margin */
        }

        .account-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1200px;
          width: 100vw;
          margin: 0; /* Remove margin */
          padding: 0; /* Remove padding */
        }

        body, html {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          width: 100vw;
          overflow-x: hidden;
        }
        
        .account-title {
          color: #c2185b; 
          text-align: center; 
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        .account-layout {
          display: flex;
          gap: 2rem;
        }
        
        .account-layout.vertical {
          flex-direction: column;
        }
        
        .account-layout.horizontal {
          flex-direction: row;
        }
        
        .account-sidebar {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(194, 24, 91, 0.15);
          padding: 1.5rem;
          width: ${windowWidth < 768 ? "100%" : "250px"};
          flex-shrink: 0;
        }
        
        .profile-summary {
          display: flex; 
          flex-direction: column; 
          align-items: center;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .profile-image {
          width: 96px; 
          height: 96px; 
          border-radius: 50%; 
          margin-bottom: 1rem;
          border: 3px solid #c2185b;
        }
        
        .profile-summary h2 {
          margin: 0 0 0.25rem 0; 
          color: #18184a;
        }
        
        .profile-summary p {
          margin: 0; 
          color: #888; 
          font-size: 0.9rem;
        }
        
        .membership-badge {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .nav-btn {
          background: transparent;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-align: left;
          color: #555;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .nav-btn.active {
          background: #fce4ec;
          color: #c2185b;
          font-weight: 600;
        }
        
        .nav-btn:hover {
          background: #fce4ec;
          color: #c2185b;
        }
        
        .account-main-content {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(194, 24, 91, 0.15);
          padding: 2rem;
          flex-grow: 1;
        }
        
        .section-header {
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .section-header h2 {
          color: #c2185b;
          margin: 0;
        }
        
        .edit-btn {
          background: transparent;
          color: #c2185b;
          border: 1px solid #c2185b;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .edit-btn:hover {
          background: #c2185b;
          color: white;
        }
        
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          color: #555;
          font-weight: 500;
        }
        
        .form-group input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #c2185b;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .btn-primary {
          background: #c2185b;
          color: #fff;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        
        .btn-primary:hover {
          opacity: 0.9;
        }
        
        .btn-secondary {
          background: transparent;
          color: #666;
          padding: 0.75rem 1.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-secondary:hover {
          background: #f5f5f5;
        }
        
        .profile-details {
          display: flex;
          flex-direction: column;
        }
        
        .detail-row {
          display: flex;
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        }
        
        .detail-row:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          flex: 1;
          color: #777;
        }
        
        .detail-value {
          flex: 2;
        }
        
        .bookings-section h2 {
          color: #c2185b;
          margin: 0 0 1.5rem 0;
        }
        
        .no-bookings {
          color: #888;
          text-align: center;
          padding: 2rem;
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
          padding: 1.25rem;
          border: 1px solid #eee;
          border-radius: 12px;
          background: #fafafa;
          transition: transform 0.2s;
        }
        
        .booking-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .booking-info {
          flex: 1;
        }
        
        .booking-service {
          font-weight: 600;
          color: #333;
        }
        
        .booking-date {
          font-size: 0.9rem;
          color: #666;
        }
        
        .booking-status {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .booking-status.completed {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .booking-status.upcoming {
          background: #fff8e1;
          color: #f57c00;
        }
        
        .settings-section h2 {
          color: #c2185b;
          margin: 0 0 1.5rem 0;
        }
        
        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .setting-card {
          padding: 1.5rem;
          border: 1px solid #eee;
          border-radius: 12px;
        }
        
        .setting-card h3 {
          margin: 0 0 1rem 0;
          color: #333;
        }
        
        .password-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .password-form input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }
        
        .notification-settings {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .notification-settings label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .account-title {
            font-size: 2rem;
          }
          
          .detail-row {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .detail-label, .detail-value {
            flex: auto;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .booking-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Account;