import React from "react";
import MediaGallery from "./MediaGallery"; // Adjust path if needed

import v1 from "../assets/v1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v3.mp4";
import v4 from "../assets/v4.mp4";

const projects = [
  {
    title: "Intern Tracker System",
    category: "Full-Stack Application",
    description: "A comprehensive management dashboard designed for tracking OJT hours, managing daily tasks, and evaluating intern performance metrics.",
    tech: ["TypeScript", "Redux", "PHP", "Laravel", "MySQL"],
    link: "", 
    linkText: "View Source Code",
    media: [
      { url: v1, caption: "Dashboard overview and tracking features." },
      { url: v2, caption: "Task management and intern evaluation." },
      { url: v3, caption: "Hours logging and automated calculation." },
      { url: v4, caption: "System settings and report generation." },
    ],
  },
  {
    title: "Storage Management System",
    category: "Web Application",
    description: "A professional inventory tracker using Google Sheets for data management, featuring automated statistics generation and secure user authentication.",
    tech: ["React", "Firebase Auth", "Google Sheets", "Chart.js"],
    link: "https://storage-management-gilt.vercel.app/",
    linkText: "View Live Project",
    media: [
      { url: "/management sample/1.png", caption: "Login Dashboard: Secure user authentication with Firebase." },
      { url: "/management sample/2.png", caption: "Inventory List: Real-time tracking of stock levels." },
      { url: "/management sample/3.png", caption: "Analytics: Visual breakdown of monthly consumption." },
      { url: "/management sample/4.png", caption: "Add Item Interface: Streamlined form for new data." },
    ],
  },
];

export default function CodedProjects() {
  return (
    <div className="section-padding" style={{ maxWidth: "1160px", margin: "0 auto", marginBottom: "80px" }}>
      <style>{globalStyles}</style>
      <span style={sectionLabel}>01. Front-end Development</span>
      <h2 style={sectionTitle}>Things I've Built</h2>

      {projects.map((project, index) => (
        <div key={index} className="project-grid">
          <div>
            <span style={categoryBadge}>{project.category}</span>
            <h3 style={projectTitle}>{project.title}</h3>
            <p style={descriptionText}>{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={viewProjectBtn}>
                {project.linkText} <span style={{ fontSize: "1.1em" }}>↗</span>
              </a>
            )}
          </div>
          <div>
            <div className="media-hover-trigger"><MediaGallery mediaItems={project.media} /></div>
            <div style={{ marginTop: "24px" }}>
              <p style={techLabel}>Technologies Used</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                {project.tech.map((t) => (<span key={t} className="pill" style={techPill}>{t}</span>))}
              </div>
            </div>
          </div>
        </div>
      ))}
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