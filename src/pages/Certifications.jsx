import React from "react";
import { trackEvent } from "../analytics.js";

const certs = [
  {
    title: "IT Support Specialist",
    issuer: "Cisco",
    date: "2025",
    image: "/cisco-badge.png",
    link: "https://www.credly.com/badges/d3f73794-d8db-4548-ab4f-cf0e58a31e67",
  },
];

export default function Certifications() {
  const trackCredential = (cert) => {
    trackEvent("select_content", {
      content_type: "credential",
      item_id: cert.title,
    });
  };

  return (
    <div style={{ marginBottom: "80px", position: "relative" }}>
      <style>{`
        @media (max-width: 480px) {
          .sticky-spacer { min-width: 40px !important; }
          .sticky-number { font-size: 0.95rem !important; }
          .sticky-header-title { font-size: clamp(0.85rem, 4.2vw, 1.1rem) !important; }
        }
        @media (max-width: 360px) {
          .sticky-spacer { min-width: 30px !important; }
          .sticky-number { font-size: 0.85rem !important; }
          .sticky-header-title { font-size: clamp(0.72rem, 4.5vw, 0.95rem) !important; }
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }
        .cert-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 36px 28px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .cert-card:hover {
          border-color: #2563eb;
          box-shadow: 0 8px 30px rgba(37,99,235,0.1);
          transform: translateY(-4px);
        }
      `}</style>

      <div style={{
        position: "sticky",
        top: "64px",
        zIndex: 38,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        padding: "16px 0",
        borderBottom: "1px solid #e5e7eb",
        marginBottom: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "6px",
      }}>
        <div className="sticky-spacer" style={{ minWidth: "40px", transition: "min-width 0.2s ease" }}>
          <span className="sticky-number" style={{
            fontFamily: "'DM Sans', monospace",
            fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
            fontWeight: "700",
            color: "#6b7280",
            whiteSpace: "nowrap",
          }}>
            ( 03 )
          </span>
        </div>

        <h2 className="sticky-header-title" style={{
          margin: 0,
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(0.85rem, 3.5vw, 1.5rem)",
          fontWeight: "700",
          color: "#111827",
          flex: 1,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          Credentials & Awards
        </h2>

        <div className="sticky-spacer" style={{ minWidth: "40px", transition: "min-width 0.2s ease" }} />
      </div>

      <div className="cert-grid">
        {certs.map((cert, index) => (
          <a
            key={cert.title}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card animate-up"
            style={{ animationDelay: `${index * 120 + 200}ms` }}
            onClick={() => trackCredential(cert)}
          >
            <div style={{ width: "100px", height: "100px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={cert.image} alt={cert.title} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
            </div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", fontWeight: "700", color: "#111827", margin: "0 0 6px" }}>
              {cert.title}
            </h3>
            <span style={{ color: "#2563eb", fontSize: "0.875rem", fontWeight: "600" }}>{cert.issuer}</span>
            <span style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "8px" }}>Issued {cert.date}</span>

            <div style={{ marginTop: "16px", padding: "6px 14px", background: "#eff6ff", borderRadius: "99px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: "600" }}>View Credential</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
