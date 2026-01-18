import React from "react";
import "../App.css"; 

export default function Home() {
  return (
    <section 
      className="section-padding" 
      style={{ 
        borderBottom: "1px solid #1e293b",
        position: "relative",
        overflow: "hidden" 
      }}
    >
      
      {/* --- BACKGROUND GLOW --- */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "0",
        right: "0",
        transform: "translateY(-50%)",
        width: "100%",
        height: "100%",
        // Using an ellipse ensures it stretches nicely on both wide monitors and tall phones
        background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, rgba(2, 6, 23, 0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* --- MAIN CONTENT --- */}
      <div className="container">
        
        {/* Added 'home-grid' class for specific mobile stacking behavior */}
        <div className="responsive-grid home-grid" style={{ position: "relative", zIndex: 1 }}>
          
          {/* LEFT: PROFILE IMAGE */}
          <div className="profile-wrapper">
            <div className="profile-image-container">
              {/* Border Decoration */}
              <div style={{
                position: "absolute", top: "20px", left: "-20px", width: "100%", height: "100%",
                border: "2px solid #1e293b", borderRadius: "24px", zIndex: 0
              }} />
              
              {/* Image Box */}
              <div style={{
                position: "relative", borderRadius: "24px", overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", border: "1px solid #334155"
              }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2, 6, 23, 0.4), transparent)", zIndex: 1 }} />
                <img
                  src="/profile.png" 
                  alt="Khen Joshua Verson"
                  style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 0 }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT & ACTIONS */}
          <div className="home-text-content">
            
            {/* Status Badge */}
            <div className="status-badge">
              <span style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%" }}></span>
              <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "0.05em" }}>
                AVAILABLE FOR WORK
              </span>
            </div>

            {/* Adjusted Clamp: Min size 2.5rem is safer for mobile */}
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 5rem)", 
              fontWeight: "800", 
              margin: "0 0 15px 0", 
              letterSpacing: "-0.04em", 
              lineHeight: "1.1", 
              color: "#f8fafc" 
            }}>
              Khen Joshua Verson
            </h1>

            <p style={{ 
              fontSize: "1.2rem", 
              color: "#60a5fa", 
              fontWeight: "600", 
              marginBottom: "30px", 
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}>
              IT Support &bull; UI/UX Design &bull; App Developer
            </p>

            <p style={{ 
              fontSize: "1.15rem", 
              lineHeight: "1.8", 
              color: "#94a3b8", 
              maxWidth: "650px", 
              marginBottom: "40px" 
            }}>
              I am a motivated and adaptable <strong style={{ color: "#cbd5e1" }}>BS Information Technology student</strong> at the University of Science and Technology of Southern Philippines. 
              I possess a solid foundation in <strong style={{ color: "#cbd5e1" }}>IT Troubleshooting</strong> and <strong style={{ color: "#cbd5e1" }}>Application Development</strong>.
            </p>

            <div className="button-group">
              <a href="#projects" style={primaryButtonStyle}>View My Work</a>
              <a href="#contact" style={secondaryButtonStyle}>Contact Me</a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// =======================
// INLINE STYLES (Buttons)
// =======================
const primaryButtonStyle = {
  display: "inline-block", backgroundColor: "#3b82f6", color: "white", padding: "16px 32px",
  borderRadius: "12px", fontWeight: "600", textDecoration: "none", transition: "transform 0.2s, background-color 0.2s",
  border: "1px solid #3b82f6", textAlign: "center"
};

const secondaryButtonStyle = {
  display: "inline-block", backgroundColor: "transparent", color: "#cbd5e1", padding: "16px 32px",
  borderRadius: "12px", fontWeight: "600", textDecoration: "none", border: "1px solid #334155",
  transition: "border-color 0.2s, color 0.2s", textAlign: "center"
};