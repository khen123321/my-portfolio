import React from "react";
import { trackEvent } from "../analytics.js";

const skills = [
  "UI/UX Design",
  "Figma",
  "Wireframing",
  "Prototyping",
  "React",
  "TypeScript",
  "Laravel",
  "MySQL",
];

export default function Home() {
  const trackCta = (label) => {
    trackEvent("select_content", {
      content_type: "home_cta",
      item_id: label,
    });
  };

  return (
    <>
      <style>{`
        .home-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          min-height: 100vh;
          padding: 80px 0 2rem;
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
            width: 100%;
            overflow: hidden;
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
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          z-index: 0;
        }
        .profile-img-inner {
          position: relative;
          z-index: 1;
          border-radius: 24px;
          overflow: hidden;
          background: var(--bg-soft);
          border: 3px solid var(--bg);
        }
        .skill-tag {
          display: inline-block;
          background: var(--bg-soft);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          max-width: 560px;
          position: relative;
          margin-bottom: 30px;
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
          background: linear-gradient(to right, var(--bg), transparent);
        }
        .marquee-container::after {
          right: 0;
          background: linear-gradient(to left, var(--bg), transparent);
        }
        .marquee-content {
          display: inline-flex;
          gap: 12px;
          animation: marquee 18s linear infinite;
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section style={{ position: "relative" }}>
        <div className="home-grid">
          <div className="animate-up" style={{ animationDelay: "0ms" }}>
            <div className="profile-img-ring">
              <div className="profile-img-inner">
                <img
                  src="/profile.png"
                  alt="Khen Joshua Verson"
                  loading="eager"
                  decoding="async"
                  style={{ display: "block", width: "100%", maxWidth: "380px", height: "auto" }}
                />
              </div>
            </div>
          </div>

          <div className="home-text">
            <div
              className="animate-up"
              style={{
                animationDelay: "100ms",
                marginBottom: "1.5rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--success-bg)",
                border: "1px solid var(--success-ring)",
                padding: "6px 14px",
                borderRadius: "99px",
              }}
            >
              <span style={{
                width: "8px",
                height: "8px",
                background: "var(--success)",
                borderRadius: "50%",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
                display: "inline-block",
              }} />
              <span style={{ color: "var(--success)", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.06em" }}>
                AVAILABLE FOR UI/UX AND WEB ROLES
              </span>
            </div>

            <h1
              className="animate-up"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                fontFamily: "'Sora', sans-serif",
                fontWeight: "800",
                letterSpacing: "0",
                lineHeight: "1.08",
                color: "var(--text)",
                marginBottom: "18px",
                animationDelay: "200ms",
                width: "100%",
              }}
            >
              Khen Joshua Verson
            </h1>

            <p
              className="animate-up"
              style={{
                fontSize: "1rem",
                color: "var(--primary)",
                fontWeight: "800",
                marginBottom: "20px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                animationDelay: "300ms",
                width: "100%",
              }}
            >
              Web Developer | UI/UX Designer
            </p>

            <p
              className="animate-up"
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "var(--text-muted)",
                maxWidth: "590px",
                width: "100%",
                margin: "0 auto 26px auto",
                animationDelay: "400ms",
              }}
            >
              BS Information Technology graduate from <strong style={{ color: "var(--text)", fontWeight: "700" }}>USTP</strong>. I work across wireframes, prototypes, responsive interfaces, and web app logic so designs feel polished and work reliably.
            </p>

            <div className="animate-up marquee-container" style={{ animationDelay: "450ms" }}>
              <div className="marquee-content">
                {[...skills, ...skills].map((skill, idx) => (
                  <span key={`${skill}-${idx}`} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div
              className="button-row animate-up"
              style={{ display: "flex", gap: "14px", animationDelay: "500ms" }}
            >
              <a href="#projects" className="btn-primary" onClick={() => trackCta("view_work")}>
                View My Work
              </a>
              <a href="#contact" className="btn-secondary" onClick={() => trackCta("contact_me")}>
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
