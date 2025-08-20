import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: "summer-haircare",
    title: "How to Care for Your Hair This Summer",
    summary: "Tips and tricks for healthy summer hair.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "bridal-looks-2025",
    title: "Top 5 Bridal Looks of 2025",
    summary: "Explore the trending bridal styles for 2025.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "men-grooming-tips",
    title: "Men's Grooming Tips for a Sharp Look",
    summary: "Essential grooming tips every man should know.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "hair-color-trends",
    title: "Hair Color Trends You Must Try",
    summary: "The hottest hair color trends this year.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "skin-care-basics",
    title: "Skin Care Basics for All Ages",
    summary: "Simple skin care routines for healthy skin.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "bridal-makeup-tips",
    title: "Bridal Makeup Tips for a Flawless Look",
    summary: "Get the perfect bridal makeup with these tips.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  }
];

const Blog = () => (
  <div style={{padding: "3vw"}}>
    <h1 style={{color: "#c2185b"}}>Salon Blog</h1>
    <ul style={{listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "2rem"}}>
      {blogs.map(blog => (
        <li key={blog.id} style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px #c2185b22",
          padding: "1.5rem",
          width: "340px",
          minHeight: "420px",
          display: "flex",
          flexDirection: "column"
        }}>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "1rem"
            }}
          />
          <h2 style={{color: "#18184a"}}>{blog.title}</h2>
          <p>{blog.summary}</p>
          <div style={{flexGrow: 1}} />
          <Link to={`/blog/${blog.id}`} className="blog-link">Read More</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Blog;