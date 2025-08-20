import React from "react";

const Account = () => (
  <div style={{padding: "3vw"}}>
    <h1 style={{color: "#c2185b"}}>My Account</h1>
    <p>Manage your profile, view your bookings, and update your preferences here.</p>
    <div style={{marginTop: "2rem"}}>
      <h2>Profile Details</h2>
      <p>Name: <b>Guest User</b></p>
      <p>Email: guest@example.com</p>
      <button style={{
        background: "#c2185b",
        color: "#fff",
        padding: "0.7rem 1.5rem",
        border: "none",
        borderRadius: "8px"
      }}>Edit Profile</button>
    </div>
  </div>
);

export default Account;