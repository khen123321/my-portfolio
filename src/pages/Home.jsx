import React from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics.js";

const actions = [
  { label: "View work", to: "/work", id: "view_work" },
  { label: "Contact", to: "/contact", id: "contact" },
  { label: "Resume", href: "/resume.pdf", id: "resume", external: true },
];

const portfolioStats = [
  { value: "06+", label: "Projects Built" },
  { value: "₱25K+", label: "Commission Earned" },
  { value: "03", label: "UI/UX Projects" },
  { value: "01", label: "Industry Experience" },
];

export default function Home() {
  const trackCta = (label) => {
    trackEvent("select_content", {
      content_type: "home_cta",
      item_id: label,
    });
  };

  return (
    <section id="home" className="hero section-large">
      <span className="halftone-field hero-halftone" aria-hidden="true" />
      <div className="site-container hero-grid">
        <div className="reading-width reveal-on-load">
          <div className="hero-kicker-row">
            <span className="identity-label">Khen Joshua Verson</span>
            <span className="availability"><span className="status-dot" />Available for work</span>
          </div>

          <p className="hero-role">web developer /<br />ui & product designer</p>

          <h1 className="hero-title">
            I build useful digital products<span className="cursor-mark">_</span>
          </h1>

          <p className="hero-copy">
            Web apps, internal systems, and interfaces.
          </p>

          <div className="hero-actions" aria-label="Primary actions">
            {actions.map((action) => (
              action.to ? (
                <Link
                  key={action.id}
                  to={action.to}
                  className="text-link"
                  onClick={() => trackCta(action.id)}
                >
                  {action.label} -&gt;
                </Link>
              ) : (
                <a
                  key={action.id}
                  href={action.href}
                  className="text-link"
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  onClick={() => trackCta(action.id)}
                >
                  {action.label} -&gt;
                </a>
              )
            ))}
          </div>
        </div>

        <aside className="portrait-wrap reveal-on-load" style={{ animationDelay: "80ms" }} aria-label="Portrait metadata">
          <div className="portrait-frame">
            <img src="/profile.png" alt="Khen Joshua Verson" loading="eager" decoding="async" />
            <span className="halftone-field portrait-halftone" aria-hidden="true" />
          </div>
          <div className="portrait-meta">
            <span>Khen Joshua Verson</span>
            <span>Web / Product</span>
          </div>
        </aside>
      </div>
      <div className="site-container hero-stats reveal-on-load" aria-label="Portfolio statistics">
        {portfolioStats.map((stat) => (
          <article className="hero-stat" key={stat.label}>
            <strong className="hero-stat-value">{stat.value}</strong>
            <span className="hero-stat-label">{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
