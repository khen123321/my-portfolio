import React from "react";

export default function Home() {
  return (
    <>
      <style>{`
        .home-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          padding-top: 2rem;
          padding-bottom: 2rem;
          min-height: 100vh;
          padding-top: 80px;
        }
        @media (min-width: 900px) {
          .home-grid {
            grid-template-columns: 42% 1fr;
            gap: 5rem;
          }
          .home-text { text-align: left; align-items: flex-start; }
          .button-row { justify-content: flex-start; }
        }
        @media (max-width: 899px) {
          .home-text { 
            text-align: center; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            width: 100%; /* Ensures the container doesn't overflow */
            overflow: hidden; /* Prevents horizontal scroll */
          }
          .button-row { justify-content: center; flex-wrap: wrap; }
        }
        .profile-img-ring {
          position: relative;
          width: fit-content;
          margin: 0 auto;
          padding: 5px;
        }
        .profile-img-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
          z-index: 0;
        }
        .profile-img-inner {
          position: relative;
          z-index: 1;
          border-radius: 24px;
          overflow: hidden;
          background: #f3f4f6;
          border: 3px solid #fff;
        }
        .skill-tag {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap; 
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }
        
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          max-width: 540px; 
          position: relative;
          margin-bottom: 36px;
        }
        .marquee-container::before,
        .marquee-container::after {
          content: '';
          position: absolute;
          top: 0;
          width: 40px;
          height: 100%;
          z-index: 2;
        }
        .marquee-container::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .marquee-container::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .marquee-content {
          display: inline-flex;
          gap: 12px;
          animation: marquee 15s linear infinite;
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #2563eb;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .btn-primary:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          color: #374151;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          border: 1px solid #d1d5db;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          background-color: #f9fafb;
          color: #111827;
          border-color: #9ca3af;
          transform: translateY(-2px);
        }
      `}</style>

      <section style={{ position: "relative" }}>
        <div className="home-grid">

          {/* LEFT: PROFILE IMAGE */}
          <div className="animate-up" style={{ animationDelay: "0ms" }}>
            <div className="profile-img-ring">
              <div className="profile-img-inner">
                <img
                  src="/profile.png"
                  alt="Khen Joshua Verson"
                  style={{ display: "block", width: "100%", maxWidth: "380px", height: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div className="home-text">

            {/* AVAILABLE BADGE */}
            <div
              className="animate-up"
              style={{
                animationDelay: "100ms",
                marginBottom: "1.5rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                padding: "6px 14px",
                borderRadius: "99px",
              }}
            >
              <span style={{
                width: "8px", height: "8px",
                background: "#22c55e", borderRadius: "50%",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
                display: "inline-block",
              }}></span>
              <span style={{ color: "#16a34a", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.06em" }}>
                AVAILABLE FOR WORK
              </span>
            </div>

            <h1
              className="animate-up"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                fontFamily: "'Sora', sans-serif",
                fontWeight: "800",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
                color: "#111827",
                marginBottom: "16px",
                animationDelay: "200ms",
                width: "100%", /* FIX: Forces it to stay inside the screen */
              }}
            >
              Khen Joshua<br />
              <span style={{ color: "#2563eb" }}>Verson</span>
            </h1>

            <p
              className="animate-up"
              style={{
                fontSize: "1rem",
                color: "#2563eb",
                fontWeight: "700",
                marginBottom: "22px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                animationDelay: "300ms",
                width: "100%", /* FIX: Forces it to stay inside the screen */
              }}
            >
              Web Developer &bull; UI/UX &bull;
            </p>

            <p
              className="animate-up"
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "#6b7280",
                maxWidth: "540px",
                width: "100%", /* FIX: Shrinks to fit mobile screen */
                margin: "0 auto 36px auto", /* FIX: Centers the paragraph box itself */
                animationDelay: "400ms",
              }}
            >
              BS Information Technology graduate from{" "}
              <strong style={{ color: "#374151", fontWeight: "600" }}>USTP</strong>.
              University of Science and Technology of Southern Philippines focused on front-end development and UI/UX design, building responsive web applications with clean code and user-friendly experiences.
            </p>

            {/* SKILL TAGS (Marquee) */}
            <div className="animate-up marquee-container" style={{ animationDelay: "450ms" }}>
              <div className="marquee-content">
                {["UI/UX Design", "Wordpress", "JavaScript", "TypeScript", "Redux", "Laravel PHP", "MySQL"].map((s, idx) => (
                  <span key={`set1-${idx}`} className="skill-tag">{s}</span>
                ))}
                {["UI/UX Design", "Wordpress", "JavaScript", "TypeScript", "Redux", "Laravel PHP", "MySQL"].map((s, idx) => (
                  <span key={`set2-${idx}`} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div
              className="button-row animate-up"
              style={{ display: "flex", gap: "14px", animationDelay: "500ms" }}
            >
              <a href="#projects" className="btn-primary">
                View My Work →
              </a>
              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}