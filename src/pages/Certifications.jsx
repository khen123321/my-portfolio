import React from "react";
import "../App.css";

const certs = [
  {
    title: "IT Support Specialist",
    issuer: "Cisco",
    date: "2025", 
    image: "/cisco-badge.png", 
    link: "https://www.credly.com/badges/d3f73794-d8db-4548-ab4f-cf0e58a31e67",
  },
];

export default function Certifications() {
  return (
    <>
      <style>{`
        /* RESPONSIVE GRID */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 40px;
          position: relative;
          z-index: 2;
        }

        /* CARD STYLING */
        .cert-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px;
          
          /* Keep the glass look so the GLOBAL light shines through */
          background-color: rgba(30, 41, 59, 0.4); 
          backdrop-filter: blur(5px);
          
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .cert-card:hover {
          transform: translateY(-5px);
          border-color: rgba(96, 165, 250, 0.8); /* Brighter border on hover */
          background-color: rgba(30, 41, 59, 0.6);
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-up {
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* REMOVED: onMouseMove and background gradient */}
      <section 
        className="section-padding" 
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          paddingBottom: "80px",
          position: "relative",
        }}
      >
        
        {/* SECTION TITLE */}
        <h2 
          className="animate-up"
          style={{ 
            fontSize: "clamp(2rem, 4vw, 2.5rem)", 
            fontWeight: "800", 
            marginBottom: "60px", 
            color: "#f8fafc", 
            letterSpacing: "-0.03em",
            animationDelay: "0ms",
            position: "relative",
            zIndex: 2
          }}
        >
          <span style={{ color: "#3b82f6", marginRight: "10px" }}>03.</span> 
          Certifications
        </h2>

        {/* GRID LAYOUT */}
        <div className="cert-grid">
          
          {certs.map((cert, index) => (
            <a 
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card animate-up"
              style={{ animationDelay: `${index * 150 + 150}ms` }}
            >
              <div style={{ 
                width: "120px", 
                height: "120px", 
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center" 
              }}>
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  style={{ width: "100%", height: "auto", objectFit: "contain" }} 
                />
              </div>

              <h3 style={{ fontSize: "1.2rem", color: "#f8fafc", margin: "0 0 5px 0" }}>
                {cert.title}
              </h3>
              <span style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: "600" }}>
                {cert.issuer}
              </span>
              <span style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "10px" }}>
                Issued {cert.date}
              </span>
            </a>
          ))}
          
        </div>
      </section>
    </>
  );
}