import React from "react";
import "../App.css";

export default function Home() {
  return (
    <>
      {/* --- INTERNAL STYLES FOR ANIMATION & RESPONSIVENESS --- 
        (You can move this to your App.css later if you prefer)
      */}
      <style>{`
        /* GRID LAYOUT */
        .home-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        /* DESKTOP VIEW (Min-width 900px) */
        @media (min-width: 900px) {
          .home-grid {
            grid-template-columns: 40% 55%; /* Image left, Text right */
            gap: 4rem;
          }
          /* On desktop, keep text aligned left */
          .home-text-content {
            text-align: left;
            align-items: flex-start;
          }
          .button-group {
            justify-content: flex-start;
          }
        }

        /* MOBILE VIEW (Default or Max-width 900px) */
        @media (max-width: 899px) {
          .home-grid {
            /* Reverse order: Text on top, or keep standard. Let's stack Image Top for identity. */
            grid-template-columns: 1fr; 
          }
          .profile-wrapper {
            max-width: 320px;
            margin: 0 auto; /* Center image */
          }
          .home-text-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .button-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }
          .button-group a {
            width: 100%; /* Full width buttons on mobile */
          }
          /* Adjust font sizes for mobile */
          h1 { font-size: 2.5rem !important; }
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-up {
          opacity: 0; /* Hidden initially */
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>

      <section
        className="section-padding"
        style={{
          borderBottom: "1px solid #1e293b",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh", // Ensures it fills screen
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* --- BACKGROUND GLOW --- */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            right: "0",
            transform: "translateY(-50%)",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(2, 6, 23, 0) 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* --- MAIN CONTENT --- */}
        <div className="container">
          <div className="home-grid" style={{ position: "relative", zIndex: 1 }}>
            
            {/* LEFT: PROFILE IMAGE */}
            {/* Added animation class */}
            <div className="profile-wrapper animate-up" style={{ animationDelay: "0ms" }}>
              <div className="profile-image-container" style={{ position: "relative" }}>
                {/* Border Decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "-20px",
                    width: "100%",
                    height: "100%",
                    border: "2px solid #1e293b",
                    borderRadius: "24px",
                    zIndex: 0,
                    transition: "all 0.3s ease"
                  }}
                />

                {/* Image Box */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    border: "1px solid #334155",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(2, 6, 23, 0.4), transparent)",
                      zIndex: 1,
                    }}
                  />
                  <img
                    src="/profile.png"
                    alt="Khen Joshua Verson"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      position: "relative",
                      zIndex: 0,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: TEXT & ACTIONS */}
            <div className="home-text-content">
              
              {/* Status Badge */}
              <div 
                className="status-badge animate-up" 
                style={{ 
                  animationDelay: "100ms", 
                  marginBottom: "1.5rem",
                  display: "inline-flex", // changed to inline-flex for alignment
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(16, 185, 129, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "99px",
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px #10b981" // Added glow
                  }}
                ></span>
                <span
                  style={{
                    color: "#10b981",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    letterSpacing: "0.05em",
                  }}
                >
                  AVAILABLE FOR WORK
                </span>
              </div>

              <h1
                className="animate-up"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)", // Adjusted max size
                  fontWeight: "800",
                  margin: "0 0 15px 0",
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                  color: "#f8fafc",
                  animationDelay: "200ms"
                }}
              >
                Khen Joshua Verson
              </h1>

              <p
                className="animate-up"
                style={{
                  fontSize: "1.2rem",
                  color: "#60a5fa",
                  fontWeight: "600",
                  marginBottom: "25px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  animationDelay: "300ms"
                }}
              >
                Web Developer &bull; UI/UX Design &bull; App Developer
              </p>

              <p
                className="animate-up"
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  color: "#94a3b8",
                  maxWidth: "600px",
                  marginBottom: "40px",
                  animationDelay: "400ms"
                }}
              >
                I am a motivated and adaptable{" "}
                <strong style={{ color: "#cbd5e1" }}>
                  BS Information Technology student
                </strong>{" "}
                at the University of Science and Technology of Southern Philippines. I
                possess a solid foundation in{" "}
                <strong style={{ color: "#cbd5e1" }}>building responsive web applications</strong> and{" "}
                <strong style={{ color: "#cbd5e1" }}>designing interactive mobile interfaces</strong>.
              </p>

              <div className="button-group animate-up" style={{ gap: "1rem", display: "flex", flexWrap: "wrap", animationDelay: "500ms" }}>
                <a href="#projects" style={primaryButtonStyle}>
                  View My Work
                </a>
                <a href="#contact" style={secondaryButtonStyle}>
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// =======================
// INLINE STYLES (Buttons)
// =======================
const primaryButtonStyle = {
  display: "inline-block",
  backgroundColor: "#3b82f6",
  color: "white",
  padding: "16px 32px",
  borderRadius: "12px",
  fontWeight: "600",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",
  border: "1px solid #3b82f6",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)" // Added shadow
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
  transition: "all 0.2s ease-in-out",
  textAlign: "center",
  cursor: "pointer"
};