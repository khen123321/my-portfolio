import React from "react";
// import "../App.css";

export default function Home() {
  return (
    <>
      {/* --- INTERNAL STYLES --- */}
      <style>{`
        /* GRID LAYOUT */
        .home-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          padding-top: 2rem;
          padding-bottom: 2rem;
          
          /* Container duties */
          width: 100%;
          max-width: 1280px; 
          margin: 0 auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        @media (min-width: 900px) {
          .home-grid {
            grid-template-columns: 40% 55%;
            gap: 4rem;
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .home-text-content {
            text-align: left;
            align-items: flex-start;
          }
          .button-group {
            justify-content: flex-start;
          }
        }

        @media (max-width: 899px) {
          .home-grid {
            grid-template-columns: 1fr; 
          }
          .profile-wrapper {
            max-width: 320px;
            margin: 0 auto;
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
            width: 100%;
          }
          h1 { font-size: 2.5rem !important; }
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

        /* --- SVG LINE TRACING ANIMATION --- */
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>

      <section
        className="section-padding"
        style={{
          borderBottom: "1px solid #1e293b",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          // background: "#020617", // Uncomment if you need the dark background back
        }}
      >
        {/* BACKGROUND GLOW */}
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
        <div className="home-grid" style={{ position: "relative", zIndex: 1 }}>
          
          {/* LEFT: PROFILE IMAGE */}
          <div className="profile-wrapper animate-up" style={{ animationDelay: "0ms" }}>
            
            {/* Image Container */}
            <div 
              className="profile-image-box" 
              style={{ 
                position: "relative", 
                width: "fit-content", 
                margin: "0 auto", 
                padding: "6px"
              }}
            >
              
              {/* --- SVG ANIMATED BORDER --- */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                  pointerEvents: "none",
                  overflow: "visible"
                }}
              >
                <defs>
                  <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  
                  <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect
                  x="2" y="2"
                  width="calc(100% - 4px)" 
                  height="calc(100% - 4px)" 
                  rx="24" ry="24"
                  fill="none"
                  stroke="url(#borderGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#neon-glow)"
                  pathLength="100" 
                  strokeDasharray="30 20 30 20" 
                  style={{
                    // UPDATED: Changed from 3s to 6s to slow it down
                    animation: "dash 6s linear infinite"
                  }}
                />
              </svg>

              {/* Actual Image */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(30, 41, 59, 0.5)", 
                  background: "#0f172a",
                  zIndex: 1,
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6)"
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
                    display: "block",
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                    position: "relative",
                    zIndex: 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="home-text-content">
            
            <div 
              className="status-badge animate-up" 
              style={{ 
                animationDelay: "100ms", 
                marginBottom: "1.5rem",
                display: "inline-flex",
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
                  boxShadow: "0 0 8px #10b981"
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
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
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
      </section>
    </>
  );
}

// INLINE STYLES
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
  boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)"
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