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
    <div className="section-padding" style={{ maxWidth: "1160px", margin: "0 auto", marginBottom: "80px", position: "relative" }}>
      <style>{globalStyles}</style>
      
      {/* =========================================
          MOBILE-RESPONSIVE STICKY HEADER (02)
          ========================================= */}
      <div style={{
        position: "sticky",
        top: "64px", 
        zIndex: 40,  
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        backdropFilter: "blur(12px)",
        padding: "20px 0",
        borderBottom: "1px solid #e5e7eb",
        marginBottom: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px" 
      }}>
        {/* Number block (Left) */}
        <div className="sticky-spacer" style={{ minWidth: "60px", transition: "min-width 0.2s ease" }}>
          <span className="sticky-number" style={{ 
            fontFamily: "'DM Sans', monospace", 
            fontSize: "1.2rem", 
            fontWeight: "700", 
            color: "#6b7280",
            whiteSpace: "nowrap"
          }}>
            ( 02 )
          </span>
        </div>
        
        {/* Title block (Center) */}
        <h2 className="sticky-header-title" style={{ 
          margin: 0, 
          fontFamily: "'Sora', sans-serif", 
          fontSize: "clamp(1.1rem, 4vw, 1.5rem)", 
          fontWeight: "700", 
          color: "#111827",
          flex: 1, 
          textAlign: "center",
          whiteSpace: "nowrap" 
        }}>
          UI/UX Design
        </h2>

        {/* Empty block (Right) to maintain centering balance */}
        <div className="sticky-spacer" style={{ minWidth: "60px", transition: "min-width 0.2s ease" }}></div>
      </div>
      {/* ========================================= */}

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
  /* Mobile Fluid Constraints for Sticky Header */
  @media (max-width: 480px) {
    .sticky-spacer {
      min-width: 40px !important;
    }
    .sticky-number {
      font-size: 0.95rem !important;
    }
    .sticky-header-title {
      font-size: clamp(0.85rem, 4.2vw, 1.1rem) !important;
    }
  }

  @media (max-width: 360px) {
    .sticky-spacer {
      min-width: 30px !important;
    }
    .sticky-number {
      font-size: 0.85rem !important;
    }
    .sticky-header-title {
      font-size: clamp(0.72rem, 4.5vw, 0.95rem) !important;
    }
  }

  .project-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: start; margin-bottom: 4rem; }
  @media (min-width: 900px) { .project-grid { grid-template-columns: 1fr 1.2fr; gap: 4rem; } }
`;

const categoryBadge = { color: "#2563eb", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: "700", color: "#111827", margin: "10px 0 16px 0", lineHeight: "1.2" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.75", color: "#6b7280", margin: 0, maxWidth: "540px" };
const viewProjectBtn = { display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "#2563eb", fontWeight: "700", fontSize: "0.95rem", marginTop: "24px", borderBottom: "2px solid #bfdbfe", paddingBottom: "3px" };
const techLabel = { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", fontWeight: "700", marginBottom: "4px" };
const techPill = { background: "#f3f4f6", color: "#374151", padding: "4px 10px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "600", border: "1px solid #e5e7eb" };