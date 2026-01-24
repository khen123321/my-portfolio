import React from "react";
import "../App.css"; // Uses your shared styles

const certs = [
  {
    title: "IT Support Specialist",
    issuer: "Cisco",
    date: "2025", 
    image: "/cisco-badge.png", 
    link: "https://www.credly.com/badges/d3f73794-d8db-4548-ab4f-cf0e58a31e67",
  },
  // You can add more badges here later!
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
        }

        /* CARD STYLING & HOVER */
        .cert-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px;
          background-color: rgba(30, 41, 59, 0.3);
          border: 1px solid #334155;
          border-radius: 16px;
          transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }

        .cert-card:hover {
          transform: translateY(-8px); /* Moves up on hover */
          background-color: rgba(30, 41, 59, 0.6);
          border-color: #3b82f6; /* Blue border on hover */
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

        /* MOBILE ADJUSTMENTS */
        @media (max-width: 600px) {
          .cert-grid {
            gap: 20px;
            grid-template-columns: 1fr; /* Force single column on tiny screens */
          }
          .cert-card {
            padding: 30px 20px; /* Slightly less padding on mobile */
          }
        }
      `}</style>

      {/* FIXED ALIGNMENT: 
         Added maxWidth: "1200px" and margin: "0 auto" to match Projects.js 
      */}
      <section 
        className="section-padding" 
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          paddingBottom: "80px" 
        }}
      >
        
        {/* SECTION TITLE */}
        {/* Updated marginBottom to 60px to match Projects headers exactly */}
        <h2 
          className="animate-up"
          style={{ 
            fontSize: "clamp(2rem, 4vw, 2.5rem)", 
            fontWeight: "800", 
            marginBottom: "60px", 
            color: "#f8fafc", 
            letterSpacing: "-0.03em",
            animationDelay: "0ms"
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
              // Dynamic delay: 1st card waits 150ms, 2nd waits 300ms, etc.
              style={{ animationDelay: `${index * 150 + 150}ms` }}
            >
              {/* BADGE IMAGE */}
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

              {/* TEXT DETAILS */}
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