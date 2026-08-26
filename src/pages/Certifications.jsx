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
  {
    title: "CIVIL SERVICE PASSER",
    subtitle: "Civil Service Eligibility",
    issuer: "Civil Service Commission",
    image: "/images/credentials/csc-logo.svg",
    metadata: "Result March 8, 2026",
    link: "",
  },
];

function CredentialRow({ cert, onTrack }) {
  const content = (
    <>
      <div className="credential-main">
        {cert.image ? (
          <img className="credential-badge" src={cert.image} alt={cert.title} loading="lazy" decoding="async" />
        ) : (
          <span className="credential-badge credential-fallback" aria-hidden="true">
            {cert.thumbnailText}
          </span>
        )}
        <div>
          <h3 className="credential-title">{cert.title}</h3>
          {cert.subtitle && <div className="credential-issuer">{cert.subtitle}</div>}
          <div className="credential-issuer">{cert.issuer}</div>
        </div>
      </div>
      <span className="credential-date">
        {cert.link ? `Issued ${cert.date} / View ->` : cert.metadata}
      </span>
    </>
  );

  if (!cert.link) {
    return <div className="credential-row reveal-on-load">{content}</div>;
  }

  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="credential-row credential-link reveal-on-load"
      onClick={() => onTrack(cert)}
    >
      {content}
    </a>
  );
}

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
            <p className="section-copy">Credential and verification.</p>
          </div>
        </header>

        <div className="credentials-list">
          {certs.map((cert) => (
            <CredentialRow key={cert.title} cert={cert} onTrack={trackCredential} />
          ))}
        </div>
      </div>
    </section>
  );
}
