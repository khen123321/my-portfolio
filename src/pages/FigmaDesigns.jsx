import React from "react";
import { trackEvent } from "../analytics.js";
import MediaGallery from "./MediaGallery";

const designs = [
  {
    title: "P-Lament Mobile App (Thesis)",
    category: "Mobile Design System",
    description:
      "A mobile interface for an IoT recycling concept, covering reward points, recycling stats, smart-bin discovery, and a cleaner app flow for student users.",
    tech: ["Figma", "Prototyping", "UI/UX Design"],
    link: "https://embed.figma.com/design/p7cT9YchEoq97VaiCfDmwZ/OJT-Practice-File?node-id=0-1&embed-host=share",
    linkText: "View Interactive Prototype",
    media: [{ url: "https://embed.figma.com/design/p7cT9YchEoq97VaiCfDmwZ/OJT-Practice-File?node-id=0-1&embed-host=share", caption: "Interactive Figma Design" }],
  },
  {
    title: "Intern Tracker Interface",
    category: "Dashboard UI",
    description:
      "Dashboard and portal design work for CIMS, focused on intern progress visibility, HR review flows, and clear attendance-management states.",
    tech: ["Figma", "Wireframing", "Dashboard Design"],
    link: "https://embed.figma.com/design/oCEs4vr6eAyLEnjUIdJRUs/Intern-Tracker?node-id=0-1&embed-host=share",
    linkText: "View Design Prototype",
    media: [{ url: "https://embed.figma.com/design/oCEs4vr6eAyLEnjUIdJRUs/Intern-Tracker?node-id=0-1&embed-host=share", caption: "Dashboard Wireframes" }],
  },
  {
    title: "Customizable Food App Concept",
    category: "Mobile Prototype",
    description:
      "A high-fidelity ordering concept with a granular customization flow, showing how users can adjust ingredients before checkout.",
    tech: ["Figma", "Component Architecture"],
    link: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share",
    linkText: "View Prototype",
    media: [{ url: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share", caption: "Prototype Interface" }],
  },
];

export default function FigmaDesigns() {
  const trackDesignLink = (design) => {
    trackEvent("select_content", {
      content_type: "figma_design",
      item_id: design.title,
    });
  };

  return (
    <div className="section-padding" style={{ maxWidth: "1160px", margin: "0 auto", marginBottom: "80px", position: "relative" }}>
      <style>{globalStyles}</style>

      <div className="sticky-design-header">
        <div className="sticky-spacer"><span className="sticky-number">( 02 )</span></div>
        <h2 className="sticky-header-title">UI/UX Design</h2>
        <div className="sticky-spacer" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
        {designs.map((design) => (
          <article key={design.title} className="project-grid">
            <div>
              <span style={categoryBadge}>{design.category}</span>
              <h3 style={projectTitle}>{design.title}</h3>
              <p style={descriptionText}>{design.description}</p>
              {design.link && (
                <a
                  href={design.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={viewProjectBtn}
                  onClick={() => trackDesignLink(design)}
                >
                  {design.linkText}
                </a>
              )}
            </div>
            <div>
              <div className="media-hover-trigger"><MediaGallery mediaItems={design.media} /></div>
              <div style={{ marginTop: "24px" }}>
                <p style={techLabel}>Design Tools & Focus</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                  {design.tech.map((tech) => (<span key={tech} className="pill" style={techPill}>{tech}</span>))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const globalStyles = `
  .sticky-design-header {
    position: sticky;
    top: 64px;
    z-index: 40;
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    padding: 20px 0;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .sticky-spacer { min-width: 60px; transition: min-width 0.2s ease; }
  .sticky-number {
    font-family: 'DM Sans', monospace;
    font-size: 1.2rem;
    font-weight: 700;
    color: #6b7280;
    white-space: nowrap;
  }
  .sticky-header-title {
    margin: 0;
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.1rem, 4vw, 1.5rem);
    font-weight: 700;
    color: #111827;
    flex: 1;
    text-align: center;
    white-space: nowrap;
  }
  @media (max-width: 480px) {
    .sticky-spacer { min-width: 40px; }
    .sticky-number { font-size: 0.95rem; }
    .sticky-header-title { font-size: clamp(0.85rem, 4.2vw, 1.1rem); }
  }
  @media (max-width: 360px) {
    .sticky-spacer { min-width: 30px; }
    .sticky-number { font-size: 0.85rem; }
    .sticky-header-title { font-size: clamp(0.72rem, 4.5vw, 0.95rem); }
  }
  .project-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: start; margin-bottom: 4rem; }
  @media (min-width: 900px) { .project-grid { grid-template-columns: 1fr 1.2fr; gap: 4rem; } }
`;

const categoryBadge = { color: "#2563eb", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: "700", color: "#111827", margin: "10px 0 16px", lineHeight: "1.2" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.75", color: "#6b7280", margin: 0, maxWidth: "540px" };
const viewProjectBtn = { display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "#2563eb", fontWeight: "700", fontSize: "0.95rem", marginTop: "24px", borderBottom: "2px solid #bfdbfe", paddingBottom: "3px" };
const techLabel = { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", fontWeight: "700", marginBottom: "4px" };
const techPill = { background: "#f3f4f6", color: "#374151", padding: "4px 10px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "600", border: "1px solid #e5e7eb" };
