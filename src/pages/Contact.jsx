import React from "react";

export default function Contact() {
  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 0.85fr 1.15fr; gap: 5rem; }
          .contact-right { text-align: left; align-items: flex-start; }
        }
        @media (max-width: 899px) {
          .contact-right { display: flex; flex-direction: column; align-items: center; text-align: center; }
        }
        .social-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          padding: 18px 22px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          gap: 10px;
        }
        .social-link:hover {
          border-color: #2563eb;
          box-shadow: 0 4px 16px rgba(37,99,235,0.1);
          transform: translateY(-1px);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }
      `}</style>

      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">

            {/* LEFT: TITLE */}
            <div className="animate-up" style={{ animationDelay: "0ms" }}>
              <p style={{ color: "#2563eb", fontWeight: "700", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                04. Contact
              </p>
              <h2 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: "800",
                letterSpacing: "-0.04em",
                lineHeight: "1",
                color: "#111827",
              }}>
                What's<br />
                <span style={{ color: "#2563eb" }}>Next?</span>
              </h2>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="contact-right">
              <h3
                className="animate-up"
                style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.5rem", fontWeight: "700", color: "#111827", marginBottom: "16px", animationDelay: "150ms" }}
              >
                Let's work together.
              </h3>

              <p
                className="animate-up"
                style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#6b7280", marginBottom: "36px", maxWidth: "520px", animationDelay: "250ms" }}
              >
                I'm open to <strong style={{ color: "#374151" }}>full-time opportunities</strong> and{" "}
                <strong style={{ color: "#374151" }}>freelance projects</strong>. Whether you need
                a React Native app, IT infrastructure help, or just want to say hi — my inbox is always open.
              </p>

              {/* CTA */}
              <div className="animate-up" style={{ marginBottom: "40px", animationDelay: "350ms" }}>
                <a href="mailto:khenjoshua.verson@1.ustp.edu.ph" className="btn-primary">
                  Say Hello via Email ✉️
                </a>
              </div>

              {/* SOCIALS */}
              <div
                className="animate-up"
                style={{ borderTop: "1px solid #e5e7eb", paddingTop: "36px", width: "100%", animationDelay: "450ms" }}
              >
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
                  Connect on Socials
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <a href="mailto:khenjoshua.verson@1.ustp.edu.ph" className="social-link">
                    <span style={{ fontWeight: "600", color: "#111827" }}>Academic Email</span>
                    <span style={{ color: "#6b7280", fontSize: "0.85rem", wordBreak: "break-all" }}>
                      khenjoshua.verson@1.ustp.edu.ph ↗
                    </span>
                  </a>
                  <a href="https://github.com/khen123321" target="_blank" rel="noreferrer" className="social-link">
                    <span style={{ fontWeight: "600", color: "#111827" }}>GitHub</span>
                    <span style={{ color: "#6b7280" }}>@khen123321 ↗</span>
                  </a>
                  <a href="https://www.facebook.com/khenjosh740/" target="_blank" rel="noreferrer" className="social-link">
                    <span style={{ fontWeight: "600", color: "#111827" }}>Facebook</span>
                    <span style={{ color: "#6b7280" }}>Social Profile ↗</span>
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