import React from "react";
import MediaGallery from "./MediaGallery"; 

const designs = [
  {
    title: "P-Lament Mobile App (Thesis)",
    category: "Mobile Design System",
    description: "The dedicated mobile interface for the P-Lament IoT recycling system. Demonstrates the user journey for tracking recycling statistics, managing reward points, and locating smart bins.",
    tech: ["Figma", "Prototyping", "UI/UX Design"], 
    link: "https://embed.figma.com/design/p7cT9YchEoq97VaiCfDmwZ/OJT-Practice-File?node-id=0-1&embed-host=share",
    linkText: "View Interactive Prototype",
    media: [{ url: "https://embed.figma.com/design/p7cT9YchEoq97VaiCfDmwZ/OJT-Practice-File?node-id=0-1&embed-host=share", caption: "Interactive Figma Design" }],
  },
  {
    title: "Intern Tracker Interface",
    category: "Dashboard UI",
    description: "The initial wireframes and high-fidelity mockups for the Intern Tracker dashboard, focusing on data visualization and an intuitive user flow for both students and supervisors.",
    tech: ["Figma", "Wireframing", "Dashboard Design"],
    // --- UPDATED INTERN TRACKER LINKS ---
    link: "https://embed.figma.com/design/oCEs4vr6eAyLEnjUIdJRUs/Intern-Tracker?node-id=0-1&embed-host=share", 
    linkText: "View Design File",
    media: [{ url: "https://embed.figma.com/design/oCEs4vr6eAyLEnjUIdJRUs/Intern-Tracker?node-id=0-1&embed-host=share", caption: "Dashboard Wireframes" }],
  },
  {
    title: "Customizable Food App Concept",
    category: "Mobile Prototype",
    description: "A high-fidelity prototype for a fast-food ordering application with a granular customization system, allowing users to modify specific ingredients before checkout.",
    tech: ["Figma", "Component Architecture"],
    link: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share",
    linkText: "View Prototype",
    media: [{ url: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share", caption: "Prototype Interface" }],
  },
];

export default function FigmaDesigns() {
  return (
    <div className="section-padding" style={{ maxWidth: "1160px", margin: "0 auto", marginBottom: "80px" }}>
      <style>{globalStyles}</style>
      <span style={sectionLabel}>02. UI/UX Design</span>
      <h2 style={sectionTitle}>Prototypes & Interfaces</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
        {designs.map((design, index) => (
          <div key={index} className="project-grid">
            <div>
              <span style={categoryBadge}>{design.category}</span>
              <h3 style={projectTitle}>{design.title}</h3>
              <p style={descriptionText}>{design.description}</p>
              {design.link && (
                <a href={design.link} target="_blank" rel="noopener noreferrer" style={viewProjectBtn}>
                  {design.linkText} <span style={{ fontSize: "1.1em" }}>↗</span>
                </a>
              )}
            </div>
            <div>
              <div className="media-hover-trigger"><MediaGallery mediaItems={design.media} /></div>
              <div style={{ marginTop: "24px" }}>
                <p style={techLabel}>Design Tools & Focus</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                  {design.tech.map((t) => (<span key={t} className="pill" style={techPill}>{t}</span>))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Layout Styles
const globalStyles = `
  .project-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: start; margin-bottom: 4rem; }
  @media (min-width: 900px) { .project-grid { grid-template-columns: 1fr 1.2fr; gap: 4rem; } }
`;
const sectionLabel = { color: "#2563eb", fontWeight: "700", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px", display: "block" };
const sectionTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: "800", color: "#111827", marginBottom: "48px" };
const categoryBadge = { color: "#2563eb", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: "700", color: "#111827", margin: "10px 0 16px 0", lineHeight: "1.2" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.75", color: "#6b7280", margin: 0, maxWidth: "540px" };
const viewProjectBtn = { display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "#2563eb", fontWeight: "700", fontSize: "0.95rem", marginTop: "24px", borderBottom: "2px solid #bfdbfe", paddingBottom: "3px" };
const techLabel = { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", fontWeight: "700", marginBottom: "4px" };
const techPill = { background: "#f3f4f6", color: "#374151", padding: "4px 10px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "600", border: "1px solid #e5e7eb" };