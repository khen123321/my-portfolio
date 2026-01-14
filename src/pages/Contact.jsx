import React from "react";

export default function Contact() {
  return (
    <section style={{ padding: "120px 0 160px 0" }}>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px" }}>
        
        {/* =======================
            LEFT: THE "ASK"
           ======================= */}
        <div>
          <h2 style={{ 
            fontSize: "clamp(3rem, 5vw, 4rem)", 
            fontWeight: "800", 
            margin: "0", 
            lineHeight: "1", 
            color: "#f8fafc",
            letterSpacing: "-0.03em"
          }}>
            What's<br />
            <span style={{ color: "#3b82f6" }}>Next?</span>
          </h2>
        </div>

        {/* =======================
            RIGHT: THE DETAILS
           ======================= */}
        <div>
          <h3 style={{ fontSize: "1.5rem", color: "#f8fafc", marginBottom: "20px", fontWeight: "700" }}>
            Let's work together.
          </h3>
          
          <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "#94a3b8", marginBottom: "40px", maxWidth: "600px" }}>
            I am currently open to <strong style={{ color: "#cbd5e1" }}>full-time opportunities</strong> and <strong style={{ color: "#cbd5e1" }}>freelance projects</strong>. 
            Whether you need help with a React Native app, an IT infrastructure setup, or just want to say hi—my inbox is always open.
          </p>

          {/* MAIN CTA BUTTON (Keep Gmail here for general inquiries) */}
          <a 
            href="mailto:khenjoshuaverson@gmail.com" 
            style={{
              display: "inline-block",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "20px 40px",
              borderRadius: "12px",
              fontWeight: "700",
              fontSize: "1.1rem",
              textDecoration: "none",
              marginBottom: "80px",
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
              border: "1px solid #3b82f6"
            }}
          >
            Say Hello via Gmail
          </a>

          {/* SOCIAL LINKS LIST */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "40px" }}>
            <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "30px" }}>
              Connect on Socials
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* 1. ACADEMIC EMAIL (Replaced LinkedIn) */}
              <a href="mailto:khenjoshua.verson@1.ustp.edu.ph" style={socialLinkStyle}>
                <span style={{ fontWeight: "600", color: "#f8fafc" }}>Academic Email</span>
                {/* Displaying the email address clearly */}
                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>khenjoshua.verson@1.ustp.edu.ph ↗</span>
              </a>

              {/* 2. GITHUB (Updated to your profile) */}
              <a href="https://github.com/khen123321" target="_blank" rel="noreferrer" style={socialLinkStyle}>
                <span style={{ fontWeight: "600", color: "#f8fafc" }}>GitHub</span>
                <span style={{ color: "#64748b" }}>@khen123321 ↗</span>
              </a>

              {/* 3. FACEBOOK (Replaced Instagram) */}
              <a href="https://www.facebook.com/khenjosh740/" target="_blank" rel="noreferrer" style={socialLinkStyle}>
                <span style={{ fontWeight: "600", color: "#f8fafc" }}>Facebook</span>
                <span style={{ color: "#64748b" }}>Social Profile ↗</span>
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// =======================
// STYLES
// =======================

const socialLinkStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textDecoration: "none",
  padding: "20px",
  backgroundColor: "rgba(30, 41, 59, 0.3)", // Very subtle dark background
  border: "1px solid #1e293b",
  borderRadius: "12px",
  transition: "all 0.2s ease"
};