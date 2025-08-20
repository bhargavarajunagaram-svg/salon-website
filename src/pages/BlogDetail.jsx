import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const blogData = {
  "summer-haircare": {
    title: "How to Care for Your Hair This Summer",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    content: "Summer can be harsh on your hair. The combination of sun exposure, chlorine, salt water, and humidity can leave your locks dry, brittle, and frizzy. But with the right care, you can keep your hair healthy and beautiful all season long.",
    extendedContent: [
      "Use a wide-tooth comb instead of a brush to detangle wet hair to prevent breakage.",
      "Avoid heat styling tools whenever possible. If you must use them, apply a heat protectant spray first.",
      "Always use a conditioner after shampooing to restore moisture. Consider a deep conditioning treatment once a week.",
      "Protect your hair from sun exposure by wearing a hat or using a UV-protection spray specifically designed for hair.",
      "Rinse your hair with fresh water before swimming to minimize chlorine or saltwater absorption.",
      "Trim your ends regularly to prevent split ends from traveling up the hair shaft."
    ],
    author: "Emma Wilson",
    date: "June 15, 2023",
    readTime: "5 min read",
    category: "Hair Care"
  },
  "bridal-looks-2025": {
    title: "Top 5 Bridal Looks of 2025",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    content: "2025 is all about natural beauty and elegance. Brides are moving away from heavy, overly structured styles toward looks that enhance their natural features while still feeling special and celebratory.",
    extendedContent: [
      "Soft, romantic curls with face-framing tendrils and delicate floral accessories.",
      "The modern chignon: sleek but not severe, with subtle texture and wisps of hair around the face.",
      "Braided crowns that incorporate pearls or delicate metallic threads for a touch of glamour.",
      "Half-up, half-down styles with volume at the crown for a regal yet approachable look.",
      "Short hair isn't being left out! Creative pixie cuts with decorative clips or delicate headpieces."
    ],
    author: "Sophia Martinez",
    date: "May 28, 2023",
    readTime: "7 min read",
    category: "Bridal"
  },
  "men-grooming-tips": {
    title: "Men's Grooming Tips for a Sharp Look",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80",
    content: "A well-groomed appearance can boost confidence and make a great impression. These essential tips will help any man look his best with minimal effort.",
    extendedContent: [
      "Keep your beard neatly trimmed and shaped to complement your face structure.",
      "Moisturize daily to maintain healthy skin. Don't forget sunscreen for outdoor activities.",
      "Use a good quality hair product that works with your hair type, not against it.",
      "Regular salon visits help maintain your style and keep split ends at bay.",
      "Pay attention to eyebrow grooming - a neat brow frame enhances your entire face.",
      "Don't neglect nail care - clean, trimmed nails are an essential part of grooming."
    ],
    author: "David Chen",
    date: "April 12, 2023",
    readTime: "6 min read",
    category: "Grooming"
  },
  "hair-color-trends": {
    title: "Hair Color Trends You Must Try This Year",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    content: "This year's hair color trends are all about self-expression and creativity. From subtle enhancements to bold statements, there's something for everyone looking to refresh their look.",
    extendedContent: [
      "Pastel pinks and lavenders for a soft, romantic look that's surprisingly wearable.",
      "Deep blues and emerald greens for those wanting to make a bold statement.",
      "Sun-kissed balayage that looks natural and grows out gracefully.",
      "Rich chocolate browns with caramel or honey highlights for dimension.",
      "Copper and auburn tones that bring warmth to any complexion.",
      "Consult with our stylists to find your perfect shade based on skin tone and lifestyle."
    ],
    author: "Jessica Brown",
    date: "March 20, 2023",
    readTime: "8 min read",
    category: "Hair Color"
  },
  "skin-care-basics": {
    title: "Skin Care Basics for All Ages",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    content: "Healthy, glowing skin is achievable at any age with a consistent routine tailored to your skin's needs. These fundamental practices will help you maintain your skin's health and vitality.",
    extendedContent: [
      "Cleanse twice daily to remove impurities without stripping natural oils.",
      "Tone to balance pH levels and prepare skin for better product absorption.",
      "Moisturize daily to maintain hydration and strengthen your skin barrier.",
      "Use sunscreen every day, regardless of weather, to prevent premature aging.",
      "Exfoliate weekly to remove dead skin cells and promote cell turnover.",
      "Consider professional facials quarterly to address specific concerns deeply."
    ],
    author: "Priya Sharma",
    date: "February 8, 2023",
    readTime: "5 min read",
    category: "Skincare"
  },
  "bridal-makeup-tips": {
    title: "Bridal Makeup Tips for a Flawless Look",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    content: "Your wedding day makeup should enhance your natural beauty while lasting through tears, hugs, and hours of celebration. These professional tips will help you achieve a radiant, long-lasting look.",
    extendedContent: [
      "Start with a good primer to create a smooth canvas and help makeup adhere better.",
      "Choose long-lasting, waterproof formulas for foundation, eyeliner, and mascara.",
      "Do a makeup trial before your big day to ensure you love the look and it photographs well.",
      "Consider your venue lighting - outdoor weddings call for different techniques than indoor ceremonies.",
      "Our makeup artists can help you achieve your dream look while considering your skin type and preferences.",
      "Don't forget touch-up essentials for throughout the day: lip color, powder, and blotting papers."
    ],
    author: "Lisa Johnson",
    date: "January 15, 2023",
    readTime: "7 min read",
    category: "Bridal"
  }
};

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData[id];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (!blog) {
    return (
      <div className="blog-detail-container">
        <div className="blog-not-found">
          <h2>Blog Not Found</h2>
          <p>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="back-button">
            {/* <ArrowBack /> */} ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="blog-detail-container">
        <div className="blog-loading">
          <div className="loading-spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  // Get related posts (excluding current post)
  const relatedPosts = Object.entries(blogData)
    .filter(([key]) => key !== id)
    .slice(0, 3);

  return (
    <div className="blog-detail-container">
      <article className="blog-article">
        <div className="blog-hero">
          <div className="blog-hero-image">
            <img src={blog.image} alt={blog.title} />
            <div className="image-overlay"></div>
          </div>
          
          <div className="blog-header-content">
            <Link to="/blog" className="back-button">
              {/* <ArrowBack /> */} ← Back to All Articles
            </Link>
            
            <div className="blog-meta">
              <span className="blog-category">{blog.category}</span>
              <span className="blog-date">{blog.date}</span>
              <span className="blog-read-time">{blog.readTime}</span>
            </div>
            
            <h1 className="blog-title">{blog.title}</h1>
            
            <div className="author-info">
              <div className="author-avatar">
                {blog.author.split(' ').map(name => name[0]).join('')}
              </div>
              <div className="author-details">
                <span className="author-name">{blog.author}</span>
                <span className="author-role">Senior Stylist</span>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-content-container">
          <div className="blog-content">
            <div className="content-main">
              <p className="blog-intro">{blog.content}</p>
              
              <div className="blog-extended-content">
                {blog.extendedContent.map((point, index) => (
                  <div key={index} className="content-point">
                    <div className="point-number">{index + 1}</div>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="content-sidebar">
              <div className="share-widget">
                <h3>Share this article</h3>
                <div className="share-buttons">
                  <button className="share-btn facebook">
                    {/* <Facebook /> */} 👍 Facebook
                  </button>
                  <button className="share-btn twitter">
                    {/* <Twitter /> */} 🐦 Twitter
                  </button>
                  <button className="share-btn linkedin">
                    {/* <LinkedIn /> */} 💼 LinkedIn
                  </button>
                </div>
              </div>
              
              <div className="author-widget">
                <h3>About the author</h3>
                <div className="author-card">
                  <div className="author-avatar large">
                    {blog.author.split(' ').map(name => name[0]).join('')}
                  </div>
                  <h4>{blog.author}</h4>
                  <p>Senior Stylist with 8+ years of experience specializing in {blog.category.toLowerCase()}.</p>
                  <div className="author-social">
                    <a href="#"> {/* <Instagram /> */} 📸 </a>
<a href="#"> {/* <Twitter /> */} 🐦 </a>
<a href="#"> {/* <Facebook /> */} 👍 </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="related-posts">
        <div className="container">
          <h2>You might also like</h2>
          <div className="related-posts-grid">
            {relatedPosts.map(([key, post]) => (
              <article key={key} className="related-post-card">
                <img src={post.image} alt={post.title} />
                <div className="related-post-content">
                  <span className="post-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.content.substring(0, 100)}...</p>
                  <Link to={`/blog/${key}`} className="read-more">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-cta">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated with Beauty Tips</h2>
            <p>Subscribe to our newsletter for the latest trends and exclusive offers</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-detail-container {
          width: 100%;
          min-height: 100vh;
        }
        
        /* Loading State */
        .blog-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          padding: 2rem;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #c2185b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Not Found State */
        .blog-not-found {
          text-align: center;
          padding: 4rem 2rem;
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .blog-not-found h2 {
          color: #18184a;
          margin-bottom: 1rem;
        }
        
        .blog-not-found p {
          color: #636e72;
          margin-bottom: 2rem;
        }
        
        /* Blog Hero Section */
        .blog-hero {
          position: relative;
          margin-bottom: 3rem;
        }
        
        .blog-hero-image {
          position: relative;
          height: 70vh;
          overflow: hidden;
        }
        
        .blog-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
        }
        
        .blog-header-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          color: white;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          color: white;
          text-decoration: none;
          margin-bottom: 1.5rem;
          font-weight: 500;
          transition: opacity 0.3s;
        }
        
        .back-button:hover {
          opacity: 0.8;
        }
        
        .blog-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        
        .blog-category {
          background: #c2185b;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .blog-date, .blog-read-time {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        
        .blog-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #c2185b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
        }
        
        .author-avatar.large {
          width: 80px;
          height: 80px;
          font-size: 1.8rem;
        }
        
        .author-name {
          font-weight: 600;
          display: block;
        }
        
        .author-role {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        /* Blog Content */
        .blog-content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .blog-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        
        .content-main {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #2d3436;
        }
        
        .blog-intro {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #2d3436;
          line-height: 1.7;
        }
        
        .blog-extended-content {
          margin-top: 2rem;
        }
        
        .content-point {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }
        
        .point-number {
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #18184a;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }
        
        /* Sidebar */
        .content-sidebar {
          position: relative;
        }
        
        .share-widget, .author-widget {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .share-widget h3, .author-widget h3 {
          margin-bottom: 1rem;
          color: #18184a;
          font-size: 1.2rem;
        }
        
        .share-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .share-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .share-btn.facebook {
          background: #3b5998;
          color: white;
        }
        
        .share-btn.twitter {
          background: #1da1f2;
          color: white;
        }
        
        .share-btn.linkedin {
          background: #0077b5;
          color: white;
        }
        
        .share-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        
        .author-card {
          text-align: center;
        }
        
        .author-card h4 {
          margin: 1rem 0 0.5rem;
          color: #18184a;
        }
        
        .author-card p {
          font-size: 0.9rem;
          color: #636e72;
          margin-bottom: 1rem;
        }
        
        .author-social {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .author-social a {
          color: #c2185b;
          transition: color 0.3s;
        }
        
        .author-social a:hover {
          color: #18184a;
        }
        
        /* Related Posts */
        .related-posts {
          background: #f8f9fa;
          padding: 4rem 0;
        }
        
        .related-posts .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .related-posts h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #18184a;
        }
        
        .related-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .related-post-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .related-post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .related-post-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .related-post-content {
          padding: 1.5rem;
        }
        
        .post-category {
          display: inline-block;
          background: #c2185b;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .related-post-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          color: #18184a;
        }
        
        .related-post-content p {
          color: #636e72;
          margin-bottom: 1.2rem;
          font-size: 0.9rem;
        }
        
        .read-more {
          color: #c2185b;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          transition: color 0.3s;
        }
        
        .read-more:hover {
          color: #18184a;
        }
        
        /* Newsletter CTA */
        .newsletter-cta {
          background: #18184a;
          color: white;
          padding: 4rem 0;
          text-align: center;
        }
        
        .newsletter-content h2 {
          margin-bottom: 1rem;
        }
        
        .newsletter-content p {
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .newsletter-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 0.8rem 1.2rem;
          border: none;
          border-radius: 50px 0 0 50px;
          font-size: 1rem;
        }
        
        .newsletter-form button {
          background: #c2185b;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 0 50px 50px 0;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .newsletter-form button:hover {
          background: #a4134c;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .blog-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .content-sidebar {
            order: -1;
          }
          
          .blog-title {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .blog-hero-image {
            height: 50vh;
          }
          
          .blog-header-content {
            padding: 1.5rem;
          }
          
          .blog-content-container {
            padding: 0 1.5rem;
          }
          
          .blog-title {
            font-size: 1.8rem;
          }
          
          .newsletter-form {
            flex-direction: column;
            gap: 1rem;
          }
          
          .newsletter-form input,
          .newsletter-form button {
            border-radius: 50px;
            width: 100%;
          }
        }
        
        @media (max-width: 576px) {
          .blog-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .blog-title {
            font-size: 1.5rem;
          }
          
          .related-posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;