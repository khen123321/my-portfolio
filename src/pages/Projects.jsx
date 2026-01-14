import React from "react";
import "../App.css";

// 1. DATA: specific project details
const projects = [
  {
    title: "Storage Management System",
    category: "Web Application",
    description: "A professional inventory tracker using Google Sheets for data management, featuring automated statistics generation and secure user authentication.",
    // UPDATED TECH LIST:
    tech: ["React", "Firebase Auth", "Google Sheets", "Chart.js"], 
    link: "https://storage-management-gilt.vercel.app/", 
  },
];

export default function Projects() {
  return (
    <div className="section-padding">
      
      {/* =======================
          PART 1: CODING PROJECTS
         ======================= */}
      <section style={{ borderBottom: "1px solid #1e293b", paddingBottom: "60px", marginBottom: "60px" }}>
        <h2 style={headerStyle}>
          <span style={{ color: "#3b82f6", marginRight: "10px" }}>01.</span> 
          Selected Works
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {projects.map((project, index) => (
            // UPDATED: Used 'responsive-grid' class instead of inline style
            <div key={index} className="responsive-grid">
              
              {/* LEFT: Identity */}
              <div>
                <span style={categoryBadge}>
                  {project.category}
                </span>
                <h3 style={projectTitle}>
                  {project.title}
                </h3>
              </div>

              {/* RIGHT: Details */}
              <div>
                <p style={descriptionText}>
                  {project.description}
                </p>
                
                {/* Tech Stack Pills */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px", marginBottom: "30px" }}>
                  {project.tech.map((t) => (
                    <span key={t} style={techPill}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={viewProjectBtn}
                  >
                    View Live Project <span style={{ marginLeft: "5px" }}>↗</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* =======================
          PART 2: INTERACTIVE DEMOS
         ======================= */}
      <section>
        <h2 style={headerStyle}>
          <span style={{ color: "#3b82f6", marginRight: "10px" }}>02.</span> 
          Technical Demos
        </h2>

        {/* DEMO 1: VIDEO WALKTHROUGH */}
        {/* UPDATED: Added 'responsive-grid' class */}
        <div className="responsive-grid" style={{ marginBottom: "100px" }}>
          <div>
            <h3 style={demoTitle}>3D Model with Animation</h3>
            <p style={descriptionText}>
              A technical 3D visualization for P-Lament, a thesis capstone project. This animation demonstrates the mechanical design and operational workflow of an IoT-enabled recycling system capable of converting PET bottles into 3D printing filament.
            </p>
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
               <span style={{ width: "8px", height: "8px", background: "#ef4444", borderRadius: "50%" }}></span>
               <span style={{ fontSize: "0.85rem", color: "#f8fafc", fontWeight: "600" }}>Live Preview</span>
            </div>
          </div>
          
          <div style={embedContainer}>
            <iframe
              src="https://drive.google.com/file/d/1CC-P6WGFh7mcy01TVxTH8pHDzwgS2sn_/preview"
              title="Project Demo"
              style={iframeStyle}
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* DEMO 2: FIGMA PROTOTYPE */}
        {/* UPDATED: Added 'responsive-grid' class */}
        <div className="responsive-grid">
          <div>
            <h3 style={demoTitle}>Customizable Food App Concept</h3>
            <p style={descriptionText}>
              A high-fidelity prototype for a fast-food ordering application. 
              The key feature is a <strong style={{ color: "#cbd5e1" }}>granular customization system</strong>, allowing users to modify specific ingredients before checkout. Currently in the pre-development phase.
            </p>
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
               <span style={{ width: "8px", height: "8px", background: "#a855f7", borderRadius: "50%" }}></span>
               <span style={{ fontSize: "0.85rem", color: "#f8fafc", fontWeight: "600" }}>Figma Prototype</span>
            </div>
          </div>

          <div style={embedContainer}>
            <iframe
              src="https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share"
              title="Figma Design"
              style={iframeStyle}
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </section>
    </div>
  );
}

// =======================
// STYLES
// =======================

// Note: 'gridLayout' was removed because we use the CSS class 'responsive-grid' now.

const headerStyle = {
  fontSize: "clamp(2rem, 4vw, 2.5rem)",
  fontWeight: "800",
  marginBottom: "80px",
  color: "#f8fafc",
  letterSpacing: "-0.03em"
};

const categoryBadge = {
  color: "#60a5fa",
  fontSize: "0.75rem",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  marginBottom: "10px",
  display: "inline-block"
};

const projectTitle = {
  fontSize: "1.75rem",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "10px 0 0 0",
  lineHeight: "1.2"
};

const demoTitle = {
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#f8fafc",
  marginBottom: "15px"
};

const descriptionText = {
  fontSize: "1.1rem",
  lineHeight: "1.7",
  color: "#94a3b8",
  margin: 0
};

const techPill = {
  fontSize: "0.8rem",
  fontWeight: "600",
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: "rgba(30, 41, 59, 0.5)",
  color: "#cbd5e1",
  border: "1px solid #334155"
};

const viewProjectBtn = {
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  color: "#60a5fa", 
  fontWeight: "600",
  fontSize: "1rem",
  borderBottom: "2px solid rgba(96, 165, 250, 0.3)",
  paddingBottom: "2px",
  transition: "all 0.2s ease"
};

const embedContainer = {
  position: "relative",
  paddingBottom: "56.25%", 
  height: 0,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  border: "1px solid #334155",
  backgroundColor: "#000"
};

const iframeStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  border: "none",
};