import React from "react";

export default function Home() {
  return (
    <section style={{ 
      padding: "160px 0 120px 0", 
      borderBottom: "1px solid #1e293b",
      position: "relative",
      overflow: "hidden" // Keeps the glow effect contained
    }}>
      
      {/* Background Glow Effect (Subtle Blue Spot) */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(2, 6, 23, 0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 2fr", // Left-to-Right Ratio
        gap: "80px", 
        alignItems: "center",
        position: "relative",
        zIndex: 1
      }}>
        
        {/* =======================
            LEFT: PROFILE IMAGE
           ======================= */}
        <div style={{ position: "relative" }}>
          {/* Decorative Offset Border */}
          <div style={{
            position: "absolute",
            top: "20px",
            left: "-20px",
            width: "100%",
            height: "100%",
            border: "2px solid #1e293b",
            borderRadius: "24px",
            zIndex: 0
          }} />
          
          {/* Main Image */}
          <div style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid #334155"
          }}>
             {/* Gradient Overlay for cool effect */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(2, 6, 23, 0.4), transparent)",
              zIndex: 1
            }} />
            <img
              src="/profile.png"
              alt="Khen Joshua Verson"
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "auto",
                objectFit: "cover",
                display: "block",
                position: "relative",
                zIndex: 0
              }}
            />
          </div>
        </div>

        {/* =======================
            RIGHT: TEXT & ACTIONS
           ======================= */}
        <div>
          {/* Status Badge */}
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            backgroundColor: "rgba(16, 185, 129, 0.1)", 
            padding: "8px 16px", 
            borderRadius: "30px", 
            marginBottom: "24px",
            border: "1px solid rgba(16, 185, 129, 0.2)"
          }}>
            <span style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%" }}></span>
            <span style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "0.05em" }}>
              AVAILABLE FOR WORK
            </span>
          </div>

          <h1 style={{ 
            fontSize: "clamp(3rem, 5vw, 5rem)", 
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

          {/* ✅ FIXED DESCRIPTION (Citation Removed) */}
          <p style={{ 
            fontSize: "1.15rem", 
            lineHeight: "1.8", 
            color: "#94a3b8", 
            maxWidth: "650px", 
            marginBottom: "40px" 
          }}>
            I am a motivated and adaptable <strong style={{ color: "#cbd5e1" }}>BS Information Technology student</strong> at the University of Science and Technology of Southern Philippines. 
            I possess a solid foundation in <strong style={{ color: "#cbd5e1" }}>IT Troubleshooting</strong> and <strong style={{ color: "#cbd5e1" }}>Application Development</strong>, combining technical skills with a passion for creative design.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#projects" style={primaryButtonStyle}>
              View My Work
            </a>
            <a href="#contact" style={secondaryButtonStyle}>
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// =======================
// STYLES
// =======================

const primaryButtonStyle = {
  display: "inline-block",
  backgroundColor: "#3b82f6",
  color: "white",
  padding: "16px 32px",
  borderRadius: "12px",
  fontWeight: "600",
  textDecoration: "none",
  transition: "transform 0.2s, background-color 0.2s",
  border: "1px solid #3b82f6"
};

const secondaryButtonStyle = {
  display: "inline-block",
  backgroundColor: "transparent",
  color: "#cbd5e1",
  padding: "16px 32px",
  borderRadius: "12px",
  fontWeight: "600",
  textDecoration: "none",
  border: "1px solid #334155",
  transition: "border-color 0.2s, color 0.2s"
};