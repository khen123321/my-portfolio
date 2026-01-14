import React from "react";
import "../App.css"; 

export default function Contact() {
  return (
    <section className="section-padding" style={{ paddingBottom: "160px" }}>
      
      <div className="responsive-grid">
        
        {/* LEFT COLUMN */}
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

        {/* RIGHT COLUMN */}
        <div>
          <h3 style={{ fontSize: "1.5rem", color: "#f8fafc", marginBottom: "20px", fontWeight: "700" }}>
            Let's work together.
          </h3>
          
          <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: "#94a3b8", marginBottom: "40px", maxWidth: "600px" }}>
            I am currently open to <strong style={{ color: "#cbd5e1" }}>full-time opportunities</strong> and <strong style={{ color: "#cbd5e1" }}>freelance projects</strong>. 
            Whether you need help with a React Native app, an IT infrastructure setup, or just want to say hi—my inbox is always open.
          </p>

          {/* CTA BUTTON */}
          <a href="mailto:khenjoshuaverson@gmail.com" style={primaryBtnStyle}>
            Say Hello via Gmail
          </a>

          {/* SOCIAL LINKS */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "40px" }}>
            <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "30px" }}>
              Connect on Socials
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* --- ACADEMIC EMAIL (FIXED) --- */}
              <a href="mailto:khenjoshua.verson@1.ustp.edu.ph" style={socialLinkStyle}>
                <span style={{ fontWeight: "600", color: "#f8fafc", whiteSpace: "nowrap" }}>
                  Academic Email
                </span>
                <span style={{ 
                    color: "#64748b", 
                    fontSize: "0.9rem", 
                    // This forces the long email to break to the next line if needed
                    wordBreak: "break-all", 
                    textAlign: "right"
                  }}>
                  khenjoshua.verson@1.ustp.edu.ph ↗
                </span>
              </a>

              {/* --- GITHUB --- */}
              <a href="https://github.com/khen123321" target="_blank" rel="noreferrer" style={socialLinkStyle}>
                <span style={{ fontWeight: "600", color: "#f8fafc" }}>GitHub</span>
                <span style={{ color: "#64748b" }}>@khen123321 ↗</span>
              </a>

              {/* --- FACEBOOK --- */}
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

// --- UPDATED STYLES ---

const primaryBtnStyle = {
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
  border: "1px solid #3b82f6",
};

// FIXED: Added flexWrap and gap to handle mobile screens
const socialLinkStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textDecoration: "none",
  padding: "20px",
  backgroundColor: "rgba(30, 41, 59, 0.3)", 
  border: "1px solid #1e293b",
  borderRadius: "12px",
  transition: "all 0.2s ease",
  
  // NEW PROPERTIES FOR RESPONSIVENESS
  flexWrap: "wrap",  // Allows items to stack if space is tight
  gap: "10px"        // Adds space between items when they stack
};