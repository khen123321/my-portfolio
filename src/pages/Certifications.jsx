import React from "react";
import "../App.css"; // Uses your shared styles

const certs = [
  {
    title: "IT Support Specialist",
    issuer: "Cisco",
    date: "2025", // Update with your actual year
    image: "/cisco-badge.png", // Make sure this matches your file name in 'public' folder
    link: "https://www.credly.com/badges/d3f73794-d8db-4548-ab4f-cf0e58a31e67", // PASTE YOUR VERIFICATION LINK HERE
  },
  // You can add more badges here later!
];

export default function Certifications() {
  return (
    <section className="section-padding" style={{ paddingBottom: "80px" }}>
      
      {/* SECTION TITLE */}
      <h2 style={{ 
        fontSize: "clamp(2rem, 4vw, 2.5rem)", 
        fontWeight: "800", 
        marginBottom: "60px", 
        color: "#f8fafc", 
        letterSpacing: "-0.03em" 
      }}>
        <span style={{ color: "#3b82f6", marginRight: "10px" }}>03.</span> 
        Certifications
      </h2>

      {/* GRID LAYOUT */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "40px" 
      }}>
        
        {certs.map((cert, index) => (
          <a 
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              textDecoration: "none", 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "40px",
              backgroundColor: "rgba(30, 41, 59, 0.3)", // Subtle dark card
              border: "1px solid #334155",
              borderRadius: "16px",
              transition: "transform 0.2s, background-color 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.3)";
            }}
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
  );
}