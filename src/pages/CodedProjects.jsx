import React, { useState, useEffect } from "react"; 

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
      { 
        url: v1, 
        role: "HR Panel",
        title: "Time Tracker & Intern Profiles",
        details: "Displays the comprehensive time tracker page, allowing HR to monitor intern time progress and Daily Time Records (DTR). It also provides full access to individual intern profiles, details, and their attached submission documents."
      },
      { 
        url: v2, 
        role: "Pending Video Update",
        title: "Feature Placeholder",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a placeholder text block that will be updated with detailed information once the final video for this specific feature is finished editing."
      },
      { 
        url: v3, 
        role: "Intern Panel",
        title: "Dashboard & Smart Attendance",
        details: "Features the main intern dashboard and an advanced attendance logging flow that integrates geolocation tagging and basic facial recognition models to ensure secure and accurate time-ins."
      },
      { 
        url: v4, 
        role: "HR Panel",
        title: "HR Management Dashboard",
        details: "Shows the central HR dashboard, providing supervisors and human resources with a high-level overview of system metrics, active interns, and overall department analytics."
      },
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
      { url: "/management sample/1.png" },
      { url: "/management sample/2.png" },
      { url: "/management sample/3.png" },
      { url: "/management sample/4.png" },
    ],
  },
];

export default function CodedProjects() {
  const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });

  useEffect(() => {
    if (modalState.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalState.isOpen]);

  const isVideo = (url) => url && url.endsWith(".mp4");

  const openTextModal = (title, role, details) => setModalState({ isOpen: true, type: "text", data: { title, role, details } });
  const openMediaModal = (url) => setModalState({ isOpen: true, type: "media", data: { url } });
  const closeModal = () => setModalState({ isOpen: false, type: null, data: null });

  return (
    <div style={{ marginBottom: "80px" }}>
      <style>{globalStyles}</style>
      
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <span style={sectionLabel}>01. Full-Stack Development</span>
      </div>
      <h2 style={{ ...sectionTitle, textAlign: "center", marginBottom: "60px" }}>Things I've Built</h2>

      {projects.map((project, index) => (
        <div key={index} style={{ marginBottom: "90px" }}>
          
          <div style={{ marginBottom: "32px", maxWidth: "800px" }}>
            <span style={categoryBadge}>{project.category}</span>
            
            {/* Flexbox wrapper for Title + Link side-by-side */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", margin: "10px 0 16px 0" }}>
              <h3 style={{ ...projectTitle, margin: 0 }}>{project.title}</h3>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="title-link-btn">
                  {project.linkText} ↗
                </a>
              )}
            </div>

            <p style={descriptionText}>{project.description}</p>
          </div>

          <div className="media-grid-2x2">
            {project.media.map((item, i) => (
              <div key={i}>
                {item.title && (
                  <div className="media-item-header" onClick={() => openTextModal(item.title, item.role, item.details)}>
                    <span className="role-label">{item.role}</span>
                    <h4 className="feature-title">{item.title} <span className="click-icon">↗</span></h4>
                  </div>
                )}
                <div className="media-box" onClick={() => openMediaModal(item.url)}>
                  <div className="enlarge-hint">Click to enlarge</div>
                  {isVideo(item.url) ? (
                    <video src={item.url} autoPlay loop muted playsInline className="media-content" />
                  ) : (
                    <img src={item.url} alt={`Preview ${i + 1}`} className="media-content" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <p style={techLabel}>Technologies Used</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                {project.tech.map((t) => (<span key={t} className="pill" style={techPill}>{t}</span>))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {modalState.isOpen && (
        <div className="custom-modal-overlay" onClick={closeModal}>
          {modalState.type === "text" && (
            <div className="custom-modal-text-box" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
              <span className="modal-role">{modalState.data.role}</span>
              <h3 className="modal-title">{modalState.data.title}</h3>
              <div style={{ width: "40px", height: "3px", background: "#2563eb", marginBottom: "20px", borderRadius: "2px" }}></div>
              <p className="modal-details">{modalState.data.details}</p>
            </div>
          )}
          {modalState.type === "media" && (
            <div className="custom-modal-media-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn media-close-btn" onClick={closeModal}>&times;</button>
              {isVideo(modalState.data.url) ? (
                <video src={modalState.data.url} controls autoPlay className="enlarged-media" />
              ) : (
                <img src={modalState.data.url} alt="Enlarged view" className="enlarged-media" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const globalStyles = `
  /* Link Button Style */
  .title-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: #2563eb;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 6px 14px;
    background: #eff6ff;
    border-radius: 100px;
    transition: all 0.2s ease;
    border: 1px solid #bfdbfe;
  }
  .title-link-btn:hover {
    background: #2563eb;
    color: #fff;
    transform: translateY(-2px);
  }

  .media-grid-2x2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px 30px; }
  @media (max-width: 768px) { .media-grid-2x2 { grid-template-columns: 1fr; gap: 40px; } }
  .media-item-header { cursor: pointer; margin-bottom: 12px; padding: 8px 12px; margin-left: -12px; border-radius: 8px; transition: background-color 0.2s ease; }
  .media-item-header:hover { background-color: #f3f4f6; }
  .role-label { color: #6b7280; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px; }
  .feature-title { font-family: 'Sora', sans-serif; font-size: 1.1rem; color: #111827; margin: 0; display: flex; align-items: center; gap: 6px; }
  .click-icon { color: #2563eb; font-size: 0.9em; transition: transform 0.2s; }
  .media-item-header:hover .click-icon { transform: translate(2px, -2px); }
  .media-box { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.06); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; position: relative; }
  .media-box:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
  .enlarge-hint { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; opacity: 0; transition: opacity 0.2s; z-index: 10; pointer-events: none; backdrop-filter: blur(4px); }
  .media-box:hover .enlarge-hint { opacity: 1; }
  .media-content { width: 100%; height: 100%; object-fit: cover; display: block; }
  .custom-modal-overlay { position: fixed; inset: 0; background: rgba(17, 24, 39, 0.85); z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); }
  .custom-modal-text-box { background: #fff; border-radius: 16px; padding: 40px; max-width: 500px; width: 100%; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.25); }
  .modal-role { color: #6b7280; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
  .modal-title { font-family: 'Sora', sans-serif; font-size: 1.5rem; color: #111827; margin: 0 0 16px 0; }
  .modal-details { color: #4b5563; font-size: 1rem; margin: 0; line-height: 1.7;}
  .custom-modal-media-wrapper { max-width: 1100px; width: 100%; position: relative; display: flex; justify-content: center; }
  .enlarged-media { width: 100%; max-height: 85vh; object-fit: contain; border-radius: 12px; background: #000; box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
  .modal-close-btn { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; border: none; background: #f3f4f6; color: #374151; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; }
  .media-close-btn { top: -40px; right: 0; background: rgba(255,255,255,0.2); color: white; }
`;
const sectionLabel = { color: "#2563eb", fontWeight: "700", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", display: "block" };
const sectionTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: "800", color: "#111827" };
const categoryBadge = { color: "#2563eb", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: "700", color: "#111827", margin: "10px 0 16px 0", lineHeight: "1.2" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.75", color: "#6b7280", margin: 0, maxWidth: "100%" };
const techLabel = { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", fontWeight: "700", marginBottom: "4px" };
const techPill = { background: "#f3f4f6", color: "#374151", padding: "4px 10px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "600", border: "1px solid #e5e7eb" };