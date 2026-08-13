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
    <section id="certifications" className="section compact-section">
      <div className="site-container">
        <header className="section-header reveal-on-load">
          <span className="section-kicker">04 / Credentials</span>
          <div>
            <h2 className="section-title">Proof of fundamentals.</h2>
            <p className="section-copy">Current credential and award content preserved from the existing portfolio.</p>
          </div>
        </header>

        <div className="credentials-list">
          {certs.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="credential-row credential-link reveal-on-load"
              onClick={() => trackCredential(cert)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <img className="credential-badge" src={cert.image} alt={cert.title} loading="lazy" decoding="async" />
                <div>
                  <h3 className="credential-title">{cert.title}</h3>
                  <div className="credential-issuer">{cert.issuer}</div>
                </div>
              </div>
              <span className="credential-date">Issued {cert.date} / View -&gt;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
