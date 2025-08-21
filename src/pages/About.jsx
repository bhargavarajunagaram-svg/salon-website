import React, { useState, useEffect } from "react";

const About = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    clients: 0,
    stylists: 0,
    experience: 0,
    awards: 0
  });

  const [expandedSections, setExpandedSections] = useState({});

  // AI-generated images for blocks
  const aboutImages = [
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
  ];

  // Expanded content for each section
  const expandedContent = {
    story: [
      "Chandu Salon was founded with a simple vision: to create a space where everyone could feel beautiful and confident.",
      "Starting as a small neighborhood salon, we've grown into one of Hyderabad's most trusted beauty destinations.",
      "Our journey has been guided by our commitment to quality, innovation, and customer satisfaction.",
      "We've continuously evolved our services to incorporate the latest trends and techniques in the beauty industry."
    ],
    mission: [
      "We're committed to using only the highest quality products that are safe for our clients and the environment.",
      "Our team undergoes regular training to stay updated with the latest techniques and trends in the beauty industry.",
      "We maintain the highest standards of hygiene and cleanliness in all our facilities.",
      "Customer feedback is at the heart of everything we do, helping us improve our services continuously."
    ],
    team: [
      "Our team includes award-winning stylists with international training and experience.",
      "We regularly host workshops and training sessions to keep our skills sharp and up-to-date.",
      "Each team member specializes in specific areas, ensuring expert service in every department.",
      "We believe in continuous learning and encourage our staff to participate in industry events globally."
    ],
    values: [
      "We treat every client with the utmost respect and provide personalized attention to all.",
      "Honesty and transparency are the foundation of our client relationships.",
      "We're passionate about our craft and dedicated to delivering exceptional results.",
      "Sustainability is important to us - we use eco-friendly products wherever possible."
    ],
    why: [
      "Our state-of-the-art facilities are equipped with the latest beauty technology.",
      "We offer a comprehensive range of services from traditional to contemporary treatments.",
      "Our convenient location and flexible hours make it easy to schedule appointments.",
      "We provide complimentary consultations to understand your needs and recommend the best services."
    ]
  };

  const blocks = [
    {
      id: "story",
      img: aboutImages[0],
      title: "Our Story",
      desc: "Founded in 2010, Chandu Salon has grown from a small family business to Hyderabad's leading beauty destination. We believe in empowering confidence and celebrating individuality through expert care and modern style. Our team is passionate about delivering the best experience to every client, every time.",
      reverse: false
    },
    {
      id: "mission",
      img: aboutImages[1],
      title: "Our Mission",
      desc: "To provide top-notch salon services with a focus on customer satisfaction, innovation, and hygiene. We constantly upgrade our skills and technology to stay ahead in the beauty industry. Our mission is to make every visit memorable and delightful.",
      reverse: true
    },
    {
      id: "team",
      img: aboutImages[2],
      title: "Our Team",
      desc: "Our stylists and professionals are highly trained and experienced. We foster a culture of creativity, learning, and excellence. Every member of our team is dedicated to making you look and feel your best.",
      reverse: false
    },
    {
      id: "values",
      img: aboutImages[3],
      title: "Our Values",
      desc: "Integrity, respect, and passion drive everything we do. We value our clients and strive to build lasting relationships based on trust and transparency.",
      reverse: true
    },
    {
      id: "why",
      img: aboutImages[4],
      title: "Why Choose Us?",
      desc: "We offer a wide range of services, state-of-the-art facilities, and a warm, welcoming atmosphere. Our commitment to quality and customer care sets us apart.",
      reverse: false
    }
  ];

  const counts = [
    { label: "Happy Clients", value: "10,000+", icon: "😊" },
    { label: "Expert Stylists", value: "50+", icon: "✂️" },
    { label: "Years Experience", value: "15+", icon: "⭐" },
    { label: "Awards Won", value: "12+", icon: "🏆" }
  ];

  const teamMembers = [
    {
      name: "Chandu Kumar",
      role: "Founder & Master Stylist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "With over 15 years of experience in the beauty industry, Chandu specializes in precision haircuts and color techniques."
    },
    {
      name: "Priya Sharma",
      role: "Senior Hair Artist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      bio: "Priya is known for her creative hair coloring and styling techniques that transform looks completely."
    },
    {
      name: "Rahul Mehta",
      role: "Beauty Specialist",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80",
      bio: "Rahul excels in skincare treatments and therapeutic massages that rejuvenate both body and mind."
    },
    {
      name: "Sneha Patel",
      role: "Makeup Artist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Sneha creates stunning makeup looks for weddings, special events, and editorial shoots."
    }
  ];

  useEffect(() => {
    // Animation for counter values
    const animateCounts = () => {
      const duration = 2000;
      const steps = 100;
      const increment = (target, current, steps) => {
        return current + (target - current) / steps;
      };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        setAnimatedCounts(prev => ({
          clients: Math.round(increment(10000, prev.clients, steps - step)),
          stylists: Math.round(increment(50, prev.stylists, steps - step)),
          experience: Math.round(increment(15, prev.experience, steps - step)),
          awards: Math.round(increment(12, prev.awards, steps - step))
        }));

        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    };

    animateCounts();
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>About Chandu Salon</h1>
          <p>Where beauty meets perfection and style becomes statement</p>
          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-content">
          <h2>Welcome to Excellence</h2>
          <p>
            At Chandu Salon, we believe that beauty is not just about looking good, 
            but feeling confident and empowered. Since our establishment in 2010, 
            we have been dedicated to providing exceptional beauty services that 
            enhance your natural features and reflect your unique personality.
          </p>
          <div className="signature">
            <div className="signature-image">C.K.</div>
            <span>Chandu Kumar, Founder</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {counts.map((count, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{count.icon}</div>
              <div className="stat-number">
                {index === 0 && animatedCounts.clients.toLocaleString()}
                {index === 1 && animatedCounts.stylists}
                {index === 2 && animatedCounts.experience}
                {index === 3 && animatedCounts.awards}
                {index === 0 && '+'}
              </div>
              <div className="stat-label">{count.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Blocks */}
      <section className="story-section">
        {blocks.map((block, index) => (
          <div key={index} className={`story-block ${block.reverse ? 'reverse' : ''}`}>
            <div className="block-image">
              <img src={block.img} alt={block.title} />
              <div className="image-overlay"></div>
            </div>
            <div className="block-content">
              <div className="content-inner">
                <h3>{block.title}</h3>
                <p>{block.desc}</p>
                
                {/* Expanded content */}
                {expandedSections[block.id] && (
                  <div className="expanded-content">
                    {expandedContent[block.id].map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}
                
                <button 
                  className="read-more"
                  onClick={() => toggleSection(block.id)}
                >
                  {expandedSections[block.id] ? 'Read Less' : 'Read More'}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    className={expandedSections[block.id] ? 'rotated' : ''}
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Meet Our Expert Team</h2>
          <p>Our talented professionals are dedicated to making you look and feel your best</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
                <div className="social-links">
                  <a href="#"><span>FB</span></a>
                  <a href="#"><span>IG</span></a>
                  <a href="#"><span>TW</span></a>
                </div>
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Experience the Chandu Difference</h2>
          <p>Book your appointment today and discover why we're Hyderabad's preferred salon</p>
          <div className="cta-buttons">
            <button className="btn-primary">Book Now</button>
            <button className="btn-secondary">View Services</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .about-page {
          width: 100%;
          overflow-x: hidden;
        }

        /* Hero Section */
        .about-hero {
          width: 100vw;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: 
            linear-gradient(120deg, rgba(24,24,74,0.7), rgba(194,24,91,0.7)),
            url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80') center center/cover no-repeat;
          color: #fff;
          text-align: center;
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
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }

        .hero-content p {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .hero-scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          animation: bounce 2s infinite;
        }

        .scroll-arrow {
          width: 2px;
          height: 30px;
          background: white;
          position: relative;
        }

        .scroll-arrow::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: -5px;
          width: 12px;
          height: 12px;
          border-right: 2px solid white;
          border-bottom: 2px solid white;
          transform: rotate(45deg);
        }

        /* Intro Section */
        .intro-section {
          padding: 6rem 2rem;
          background: #f8f9fa;
          display: flex;
          justify-content: center;
        }

        .intro-content {
          max-width: 800px;
          text-align: center;
        }

        .intro-content h2 {
          font-size: 2.5rem;
          color: #18184a;
          margin-bottom: 2rem;
        }

        .intro-content p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #666;
          margin-bottom: 3rem;
        }

        .signature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .signature-image {
          height: 60px;
          width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-family: cursive;
          color: #c2185b;
          border: 2px solid #c2185b;
          border-radius: 4px;
          opacity: 0.8;
        }

        .signature span {
          font-style: italic;
          color: #c2185b;
        }

        /* Stats Section */
        .stats-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #18184a 0%, #2d2d80 100%);
          color: white;
          display: flex;
          justify-content: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          width: 100%;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #ffd700;
        }

        .stat-label {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        /* Story Blocks */
        .story-section {
          padding: 0;
        }

        .story-block {
          display: flex;
          min-height: 500px;
          width: 100vw;
        }

        .story-block.reverse {
          flex-direction: row-reverse;
        }

        .block-image {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .block-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .story-block:hover .block-image img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(24, 24, 74, 0.7) 0%, rgba(194, 24, 91, 0.5) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .story-block:hover .image-overlay {
          opacity: 1;
        }

        .block-content {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 4rem;
          background: #fff;
        }

        .content-inner {
          max-width: 500px;
        }

        .content-inner h3 {
          font-size: 2.2rem;
          color: #18184a;
          margin-bottom: 1.5rem;
        }

        .content-inner p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #666;
          margin-bottom: 1.5rem;
        }

        .expanded-content {
          margin-bottom: 2rem;
          animation: fadeIn 0.5s ease;
        }

        .expanded-content p {
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .read-more {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: transparent;
          border: 2px solid #c2185b;
          color: #c2185b;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .read-more:hover {
          background: #c2185b;
          color: white;
          transform: translateY(-2px);
        }

        .read-more svg {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .read-more .rotated {
          transform: rotate(180deg);
        }

        /* Team Section */
        .team-section {
          padding: 6rem 2rem;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 800px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          color: #18184a;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.2rem;
          color: #666;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
        }

        .team-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-10px);
        }

        .member-image {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .team-card:hover .member-image img {
          transform: scale(1.1);
        }

        .social-links {
          position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(24, 24, 74, 0.8);
          transition: bottom 0.3s ease;
        }

        .team-card:hover .social-links {
          bottom: 0;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #c2185b;
          color: white;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: white;
          color: #c2185b;
          transform: translateY(-3px);
        }

        .member-info {
          padding: 2rem;
          text-align: center;
        }

        .member-info h4 {
          font-size: 1.5rem;
          color: #18184a;
          margin-bottom: 0.5rem;
        }

        .member-info .role {
          color: #c2185b;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .member-info .bio {
          color: #666;
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #c2185b 0%, #ad1457 100%);
          color: white;
          text-align: center;
          display: flex;
          justify-content: center;
        }

        .cta-content {
          max-width: 800px;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-primary, .btn-secondary {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: white;
          color: #c2185b;
        }

        .btn-primary:hover {
          background: #f8f9fa;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: #c2185b;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        /* Animations */
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .story-block, .story-block.reverse {
            flex-direction: column;
            min-height: auto;
          }

          .block-content {
            padding: 2rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 576px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 1.1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default About;