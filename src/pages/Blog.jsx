import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: "summer-haircare",
    title: "How to Care for Your Hair This Summer",
    summary: "Tips and tricks for healthy summer hair. Learn how to protect your hair from sun damage and maintain its health during the hot months.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    date: "August 15, 2025",
    author: "Priya Sharma",
    category: "Hair Care"
  },
  {
    id: "bridal-looks-2025",
    title: "Top 5 Bridal Looks of 2025",
    summary: "Explore the trending bridal styles for 2025. From traditional to contemporary, discover the looks that will dominate wedding seasons.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    date: "August 10, 2025",
    author: "Sneha Patel",
    category: "Bridal"
  },
  {
    id: "men-grooming-tips",
    title: "Men's Grooming Tips for a Sharp Look",
    summary: "Essential grooming tips every man should know. From skincare to hairstyling, master the art of looking sharp and professional.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80",
    date: "August 5, 2025",
    author: "Rahul Mehta",
    category: "Grooming"
  },
  {
    id: "hair-color-trends",
    title: "Hair Color Trends You Must Try",
    summary: "The hottest hair color trends this year. Discover the shades and techniques that are making waves in the fashion world.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    date: "July 28, 2025",
    author: "Chandu Kumar",
    category: "Hair Color"
  },
  {
    id: "skin-care-basics",
    title: "Skin Care Basics for All Ages",
    summary: "Simple skin care routines for healthy skin. Learn the fundamental steps to maintain radiant skin at any age.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    date: "July 20, 2025",
    author: "Rahul Mehta",
    category: "Skincare"
  },
  {
    id: "bridal-makeup-tips",
    title: "Bridal Makeup Tips for a Flawless Look",
    summary: "Get the perfect bridal makeup with these tips. Learn professional techniques for long-lasting, photogenic wedding makeup.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    date: "July 15, 2025",
    author: "Sneha Patel",
    category: "Makeup"
  }
];

const categories = ["All", "Hair Care", "Bridal", "Grooming", "Hair Color", "Skincare", "Makeup"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Chandu Salon Blog</h1>
          <p>Discover the latest beauty tips, trends, and expert advice</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="blog-content">
        {/* Category Filter */}
        <section className="category-filter">
          <h2 className="section-title">Browse Categories</h2>
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

        {/* Blog Grid */}
        <section className="blog-grid-section">
          <h2 className="section-title">Latest Articles</h2>
          <div className="blog-grid">
            {filteredBlogs.map(blog => (
              <article key={blog.id} className="blog-card">
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <div className="blog-category">{blog.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{blog.date}</span>
                    <span className="blog-author">By {blog.author}</span>
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-summary">{blog.summary}</p>
                  <Link to={`/blog/${blog.id}`} className="blog-link">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated with Our Beauty Tips</h2>
            <p>Subscribe to our newsletter for the latest trends and exclusive offers</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="popular-topics">
          <h2 className="section-title">Popular Topics</h2>
          <div className="topics-grid">
            <div className="topic-card">
              <div className="topic-icon">💇‍♀️</div>
              <h3>Hair Care</h3>
              <p>Essential tips for maintaining healthy, beautiful hair</p>
            </div>
            <div className="topic-card">
              <div className="topic-icon">💄</div>
              <h3>Makeup Trends</h3>
              <p>Latest makeup styles and techniques</p>
            </div>
            <div className="topic-card">
              <div className="topic-icon">👰</div>
              <h3>Bridal Beauty</h3>
              <p>Complete bridal beauty guides and tips</p>
            </div>
            <div className="topic-card">
              <div className="topic-icon">🧴</div>
              <h3>Skincare</h3>
              <p>Daily routines and professional treatments</p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .blog-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .blog-hero {
          position: relative;
          width: 100vw;
          height: 50vh;
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80');
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
        
        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        /* Main Content */
        .blog-content {
          width: 100%;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
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
          width: 100%;
          max-width: 1200px;
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
        
        /* Blog Grid */
        .blog-grid-section {
          width: 100%;
          max-width: 1200px;
          margin-bottom: 4rem;
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .blog-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .blog-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        
        .blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .blog-card:hover .blog-image img {
          transform: scale(1.1);
        }
        
        .blog-category {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #ffd700;
          color: #18184a;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.8rem;
        }
        
        .blog-content {
          padding: 1.5rem;
        }
        
        .blog-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #666;
        }
        
        .blog-title {
          font-size: 1.4rem;
          color: #18184a;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        
        .blog-summary {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .blog-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #c2185b;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        
        .blog-link:hover {
          color: #ad1457;
        }
        
        /* Newsletter Section */
        .newsletter-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 4rem;
          width: 100%;
          max-width: 1200px;
          text-align: center;
        }
        
        .newsletter-content h2 {
          font-size: 2.2rem;
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .newsletter-content p {
          color: #555;
          margin-bottom: 2rem;
        }
        
        .newsletter-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .newsletter-form input:focus {
          outline: none;
          border-color: #ffd700;
        }
        
        .newsletter-form button {
          background: #c2185b;
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .newsletter-form button:hover {
          background: #ad1457;
        }
        
        /* Popular Topics */
        .popular-topics {
          width: 100%;
          max-width: 1200px;
          margin-bottom: 4rem;
        }
        
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .topic-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }
        
        .topic-card:hover {
          transform: translateY(-5px);
        }
        
        .topic-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .topic-card h3 {
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .topic-card p {
          color: #666;
          line-height: 1.6;
        }
        
        /* Responsive Design */
        @media (max-width: 968px) {
          .blog-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .topics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }
          
          .blog-content {
            padding: 0 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .category-buttons {
            flex-wrap: wrap;
          }
          
          .newsletter-section {
            padding: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .blog-hero {
            height: 40vh;
          }
          
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .blog-grid {
            grid-template-columns: 1fr;
          }
          
          .topics-grid {
            grid-template-columns: 1fr;
          }
          
          .category-buttons button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;