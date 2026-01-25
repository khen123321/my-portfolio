import React from "react";
import "../App.css";

export default function Contact() {
  return (
    <>
      {/* --- INTERNAL STYLES FOR ANIMATION & RESPONSIVENESS --- */}
      <style>{`
        /* LAYOUT GRID */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        /* DESKTOP (Min-width 900px) */
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 0.8fr 1.2fr; /* Title takes less space */
            gap: 5rem;
          }
          .text-align-responsive {
            text-align: left;
          }
        }

        /* MOBILE (Max-width 899px) */
        @media (max-width: 899px) {
          .contact-grid {
            grid-template-columns: 1fr; /* Stacked */
          }
          .text-align-responsive {
            text-align: center; /* Center text on mobile */
          }
          .contact-right-column {
            display: flex;
            flex-direction: column;
            align-items: center; /* Center buttons/links */
          }
          /* Stack the text inside social links on very small screens */
          .social-link-inner {
            flex-direction: column;
            gap: 5px;
            text-align: center;
          }
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

      <section className="section-padding" style={{ paddingBottom: "160px" }}>
        <div className="container">
          
          <div className="contact-grid">
            
            {/* LEFT COLUMN: TITLE */}
            <div className="text-align-responsive animate-up" style={{ animationDelay: "0ms" }}>
              <h2
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6rem)", // Made slightly bigger
                  fontWeight: "800",
                  margin: "0",
                  lineHeight: "1",
                  color: "#f8fafc",
                  letterSpacing: "-0.03em",
                }}
              >
                What's<br />
                <span style={{ color: "#3b82f6" }}>Next?</span>
              </h2>
            </div>

            {/* RIGHT COLUMN: CONTENT */}
            <div className="contact-right-column text-align-responsive">
              
              <h3
                className="animate-up"
                style={{
                  fontSize: "1.5rem",
                  color: "#f8fafc",
                  marginBottom: "20px",
                  fontWeight: "700",
                  animationDelay: "150ms"
                }}
              >
                Let's work together.
              </h3>

              <p
                className="animate-up"
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  color: "#94a3b8",
                  marginBottom: "40px",
                  maxWidth: "600px",
                  animationDelay: "300ms"
                }}
              >
                I am currently open to <strong style={{ color: "#cbd5e1" }}>full-time opportunities</strong> and <strong style={{ color: "#cbd5e1" }}>freelance projects</strong>.
                Whether you need help with a React Native app, an IT infrastructure setup, or just want to say hi—my inbox is always open.
              </p>

              {/* CTA BUTTON */}
              <div className="animate-up" style={{ width: "100%", animationDelay: "450ms" }}>
                <a href="mailto:khenjoshua.verson@1.ustp.edu.ph" style={primaryBtnStyle}>
                  Say Hello via Gmail
                </a>
              </div>

              {/* SOCIAL LINKS */}
              <div 
                className="animate-up" 
                style={{ 
                  borderTop: "1px solid #1e293b", 
                  paddingTop: "40px", 
                  width: "100%",
                  animationDelay: "600ms"
                }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    fontWeight: "700",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "30px",
                  }}
                >
                  Connect on Socials
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  
                  {/* --- ACADEMIC EMAIL --- */}
                  <a href="mailto:khenjoshua.verson@1.ustp.edu.ph" style={socialLinkStyle}>
                    <div className="social-link-inner" style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                      <span style={{ fontWeight: "600", color: "#f8fafc", whiteSpace: "nowrap" }}>
                        Academic Email
                      </span>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "0.9rem",
                          wordBreak: "break-all", // Ensures long email wraps on tiny phones
                        }}
                      >
                        khenjoshua.verson@1.ustp.edu.ph ↗
                      </span>
                    </div>
                  </a>

                  {/* --- GITHUB --- */}
                  <a href="https://github.com/khen123321" target="_blank" rel="noreferrer" style={socialLinkStyle}>
                    <div className="social-link-inner" style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <span style={{ fontWeight: "600", color: "#f8fafc" }}>GitHub</span>
                        <span style={{ color: "#64748b" }}>@khen123321 ↗</span>
                    </div>
                  </a>

                  {/* --- FACEBOOK --- */}
                  <a href="https://www.facebook.com/khenjosh740/" target="_blank" rel="noreferrer" style={socialLinkStyle}>
                    <div className="social-link-inner" style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <span style={{ fontWeight: "600", color: "#f8fafc" }}>Facebook</span>
                        <span style={{ color: "#64748b" }}>Social Profile ↗</span>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
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
  textAlign: "center",
  transition: "transform 0.2s ease"
};

const socialLinkStyle = {
  display: "flex",
  // We handle internal alignment via the inner div now for better mobile control
  textDecoration: "none",
  padding: "20px",
  backgroundColor: "rgba(30, 41, 59, 0.3)",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  transition: "background-color 0.2s ease, transform 0.2s ease",
};