import React from "react";
import { trackEvent } from "../analytics.js";

const links = [
  {
    label: "Email",
    value: "versonkhenjoshua@gmail.com",
    href: "mailto:versonkhenjoshua@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    value: "@khen123321",
    href: "https://github.com/khen123321",
    external: true,
  },
  {
    label: "Facebook",
    value: "Social Profile",
    href: "https://www.facebook.com/khenjosh740/",
    external: true,
  },
];

export default function Contact() {
  const trackContact = (label) => {
    trackEvent("contact", {
      method: label.toLowerCase(),
    });
  };

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
          border-radius: 8px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          gap: 10px;
        }
        .social-link:hover {
          border-color: #2563eb;
          box-shadow: 0 4px 16px rgba(37,99,235,0.1);
          transform: translateY(-1px);
        }
      `}</style>

      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="animate-up" style={{ animationDelay: "0ms" }}>
              <p style={{ color: "#2563eb", fontWeight: "700", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                04. Contact
              </p>
              <h2 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: "800",
                letterSpacing: "0",
                lineHeight: "1",
                color: "#111827",
              }}>
                Build<br />
                <span style={{ color: "#2563eb" }}>Together?</span>
              </h2>
            </div>

            <div className="contact-right">
              <h3
                className="animate-up"
                style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.5rem", fontWeight: "700", color: "#111827", marginBottom: "16px", animationDelay: "150ms" }}
              >
                I am open to Web Developer, UI/UX Designer, and hybrid product roles.
              </h3>

              <p
                className="animate-up"
                style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#6b7280", marginBottom: "36px", maxWidth: "560px", animationDelay: "250ms" }}
              >
                If you need someone who can design clean interfaces in Figma and build them into responsive web tools, I would be happy to talk. I am especially interested in dashboards, internal systems, prototypes, and practical product work.
              </p>

              <div className="animate-up" style={{ marginBottom: "40px", animationDelay: "350ms" }}>
                <a href="mailto:versonkhenjoshua@gmail.com" className="btn-primary" onClick={() => trackContact("email_primary")}>
                  Send Email
                </a>
              </div>

              <div
                className="animate-up"
                style={{ borderTop: "1px solid #e5e7eb", paddingTop: "36px", width: "100%", animationDelay: "450ms" }}
              >
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
                  Connect
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="social-link"
                      onClick={() => trackContact(link.label)}
                    >
                      <span style={{ fontWeight: "600", color: "#111827" }}>{link.label}</span>
                      <span style={{ color: "#6b7280", fontSize: "0.85rem", wordBreak: "break-all" }}>
                        {link.value} - Open
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
