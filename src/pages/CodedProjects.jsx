"use client";
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics.js";

import v1 from "../assets/v1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v3.mp4";
import v4 from "../assets/v4.mp4";

import envelopeVideo from "../assets/envelope.mp4";
import mainVideo from "../assets/main.mp4";
import rsvpVideo from "../assets/rsvp.mp4";
import adminVideo from "../assets/admin.mp4";

const projects = [
  {
    title: "CLIMBS Internship Monitoring System (CIMS)",
    category: "Private Internal Company System",
    role: "Developer / UI builder",
    availability: "Private internal system",
    description:
      "A web-based internship monitoring platform designed to replace paper DTR cards, repetitive guardhouse logging, and manual HR encoding with a centralized intern and HR/admin workflow.",
    impact: [
      "Designed and built mobile-responsive intern workflows and desktop-first HR/admin management screens.",
      "Planned attendance rules for geofenced clock-ins, selfie verification, DTR logs, forms, and hour computation.",
      "Structured the system around role-based access, intern records, reports, document status, and progress visibility.",
    ],
    tech: ["TypeScript", "Redux", "PHP", "Laravel", "MySQL"],
    link: "",
    linkText: "",
    media: [
      {
        url: v1,
        role: "HR Panel",
        title: "Time Tracker & Intern Profiles",
        details:
          "HR can review intern profiles, rendered hours, Daily Time Records, submitted documents, and progress details from one management view.",
      },
      {
        url: v2,
        role: "Admin Panel",
        title: "Role Management & Permissions",
        details:
          "Admin users can add HR personnel, assign permissions, and control access levels across the internship monitoring workflow.",
      },
      {
        url: v3,
        role: "Intern Portal",
        title: "Dashboard & Smart Attendance",
        details:
          "Interns can see their status and complete attendance steps designed around location checks, verification, and accurate time logging.",
      },
      {
        url: v4,
        role: "Intern Portal",
        title: "DTR Logs & Progress Profile",
        details:
          "Interns can review attendance logs, track required hours, and manage profile/document information without repeatedly asking HR for updates.",
      },
    ],
  },
  {
    title: "Wedding RSVP & Access Control",
    category: "Freelance Project",
    role: "Web developer",
    availability: "Client event system",
    description:
      "A custom event platform with a digital RSVP flow, guest list management, and check-in support for smoother venue entry. Media uses placeholder names and images for privacy.",
    impact: [
      "Created an elegant guest-facing RSVP experience with animated event entry screens.",
      "Built a lightweight admin workflow for viewing responses and managing the guest list.",
      "Connected event data to a simple backend workflow that was easy for the client to maintain.",
    ],
    tech: ["React", "JSX", "Tailwind CSS", "Google Sheets"],
    link: "https://angelolanie.vercel.app/",
    linkText: "View Live Project",
    media: [
      {
        url: envelopeVideo,
        role: "Guest Portal",
        title: "Envelope Transition",
        details:
          "A polished opening interaction that transitions guests from the digital envelope into the main event page.",
      },
      {
        url: mainVideo,
        role: "Guest Portal",
        title: "Main Experience",
        details:
          "The main event page presents the schedule, venue information, and important guest details in one guided flow.",
      },
      {
        url: rsvpVideo,
        role: "Guest Portal",
        title: "RSVP Submission",
        details:
          "Guests can submit attendance details through a focused form designed to reduce friction and errors.",
      },
      {
        url: adminVideo,
        role: "Admin Dashboard",
        title: "Respondent Management",
        details:
          "The client can monitor confirmed guests and manage response data from a central admin view.",
      },
    ],
  },
  {
    title: "Storage Management System",
    category: "Freelance Project",
    role: "Front-end developer",
    availability: "Public demo available",
    description:
      "A practical inventory tracker that uses Firebase authentication and Google Sheets as a manageable data source for stock monitoring, forms, and visual summaries.",
    impact: [
      "Created a secure login flow for staff access.",
      "Designed stock views with low-inventory alerts and clear item status information.",
      "Added charts and form flows to make updates easier without editing raw spreadsheet data.",
    ],
    tech: ["React", "Firebase Auth", "Google Sheets", "Chart.js"],
    link: "https://storage-management-gilt.vercel.app/",
    linkText: "View Live Project",
    media: [
      {
        url: "/management sample/1.png",
        role: "Authentication",
        title: "Secure Login Gateway",
        details:
          "Firebase authentication keeps inventory data available only to authorized staff members.",
      },
      {
        url: "/management sample/2.png",
        role: "Dashboard",
        title: "Real-Time Tracking",
        details:
          "Live stock levels and color-coded alerts help management spot low inventory quickly.",
      },
      {
        url: "/management sample/3.png",
        role: "Analytics",
        title: "Data Visualization",
        details:
          "Chart summaries make monthly consumption and supply movement easier to review.",
      },
      {
        url: "/management sample/4.png",
        role: "Data Entry",
        title: "Streamlined Forms",
        details:
          "Staff can add or update items through a guided interface instead of working directly in a spreadsheet.",
      },
    ],
  },
];

const isVideoUrl = (url) => Boolean(url && url.endsWith(".mp4"));

function LazyProjectMedia({ item, onOpenText, onOpenMedia }) {
  const mediaRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(!isVideoUrl(item.url));

  useEffect(() => {
    if (shouldLoad || !isVideoUrl(item.url)) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px" },
    );

    if (mediaRef.current) observer.observe(mediaRef.current);

    return () => observer.disconnect();
  }, [item.url, shouldLoad]);

  const isVideo = isVideoUrl(item.url);

  return (
    <div>
      <button className="media-item-header" type="button" onClick={onOpenText}>
        <span className="role-label">{item.role}</span>
        <span className="feature-title">{item.title} <span className="click-icon">Open</span></span>
      </button>
      <button
        ref={mediaRef}
        className="media-box hover-lift"
        type="button"
        onClick={onOpenMedia}
        aria-label={`Open ${item.title} preview`}
      >
        <span className="enlarge-hint">Click to enlarge</span>
        {isVideo ? (
          shouldLoad ? (
            <video src={item.url} preload="metadata" autoPlay loop muted playsInline className="media-content" />
          ) : (
            <span className="media-placeholder">Video preview loads when nearby</span>
          )
        ) : (
          <img src={item.url} alt={`${item.title} preview`} loading="lazy" decoding="async" className="media-content" />
        )}
      </button>
    </div>
  );
}

export default function CodedProjects() {
  const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });

  useEffect(() => {
    document.body.style.overflow = modalState.isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalState.isOpen]);

  const openTextModal = (projectTitle, title, role, details) => {
    trackEvent("select_content", {
      content_type: "project_feature",
      item_id: `${projectTitle}: ${title}`,
    });
    setModalState({ isOpen: true, type: "text", data: { title, role, details } });
  };

  const openMediaModal = (projectTitle, url) => {
    trackEvent("select_content", {
      content_type: "project_media",
      item_id: projectTitle,
    });
    setModalState({ isOpen: true, type: "media", data: { url } });
  };

  const closeModal = () => setModalState({ isOpen: false, type: null, data: null });

  const trackProjectLink = (project) => {
    trackEvent("select_content", {
      content_type: "project_link",
      item_id: project.title,
    });
  };

  return (
    <div style={{ marginBottom: "80px", position: "relative" }}>
      <style>{globalStyles}</style>

      <div className="sticky-section-header">
        <div className="sticky-spacer">
          <span className="sticky-number">( 01 )</span>
        </div>
        <h2 className="sticky-header-title">Web & Product Projects</h2>
        <div className="sticky-spacer" />
      </div>

      {projects.map((project, index) => (
        <article key={project.title} className="project-case-study" style={{ marginBottom: index === projects.length - 1 ? "40px" : "96px" }}>
          <div className="project-intro">
            <span style={categoryBadge}>{project.category}</span>
            <div className="project-title-row">
              <h3 style={projectTitle}>{project.title}</h3>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="title-link-btn"
                  onClick={() => trackProjectLink(project)}
                >
                  {project.linkText}
                </a>
              ) : (
                <span className="private-badge">{project.availability}</span>
              )}
            </div>
            <p style={descriptionText}>{project.description}</p>
          </div>

          <div className="case-meta-grid">
            <div className="case-meta-item">
              <span className="case-meta-label">My Role</span>
              <strong>{project.role}</strong>
            </div>
            <div className="case-meta-item case-meta-wide">
              <span className="case-meta-label">What I Built</span>
              <ul className="impact-list">
                {project.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="media-grid-2x2">
            {project.media.map((item) => (
              <LazyProjectMedia
                key={`${project.title}-${item.title}`}
                item={item}
                onOpenText={() => openTextModal(project.title, item.title, item.role, item.details)}
                onOpenMedia={() => openMediaModal(project.title, item.url)}
              />
            ))}
          </div>

          <div style={{ marginTop: "32px" }}>
            <p style={techLabel}>Technologies Used</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
              {project.tech.map((tech) => (
                <span key={tech} className="pill" style={techPill}>{tech}</span>
              ))}
            </div>
          </div>
        </article>
      ))}

      {modalState.isOpen && (
        <div className="custom-modal-overlay modal-fade" onClick={closeModal}>
          {modalState.type === "text" && (
            <div className="custom-modal-text-box modal-content" onClick={(event) => event.stopPropagation()}>
              <button className="modal-close-btn" type="button" onClick={closeModal} aria-label="Close modal">x</button>
              <span className="modal-role">{modalState.data.role}</span>
              <h3 className="modal-title">{modalState.data.title}</h3>
              <div style={{ width: "40px", height: "3px", background: "#2563eb", marginBottom: "20px", borderRadius: "2px" }} />
              <p className="modal-details">{modalState.data.details}</p>
            </div>
          )}
          {modalState.type === "media" && (
            <div className="custom-modal-media-wrapper modal-content" onClick={(event) => event.stopPropagation()}>
              <button className="modal-close-btn media-close-btn" type="button" onClick={closeModal} aria-label="Close media preview">x</button>
              {isVideoUrl(modalState.data.url) ? (
                <video src={modalState.data.url} controls autoPlay className="enlarged-media" />
              ) : (
                <img src={modalState.data.url} alt="Enlarged project preview" className="enlarged-media" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const globalStyles = `
  .sticky-section-header {
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
  .project-intro { margin-bottom: 28px; max-width: 840px; }
  .project-title-row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin: 10px 0 16px;
  }
  .title-link-btn,
  .private-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 7px 14px;
    border-radius: 999px;
    transition: all 0.2s ease;
    border: 1px solid #bfdbfe;
  }
  .title-link-btn { color: #2563eb; background: #eff6ff; }
  .title-link-btn:hover { background: #2563eb; color: #fff; transform: translateY(-2px); }
  .private-badge { color: #374151; background: #f9fafb; border-color: #e5e7eb; }
  .case-meta-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
    gap: 14px;
    margin: 0 0 30px;
  }
  .case-meta-item {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
    padding: 16px;
  }
  .case-meta-label {
    color: #2563eb;
    display: block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  .impact-list {
    margin: 0;
    padding-left: 18px;
    color: #4b5563;
    line-height: 1.7;
  }
  .impact-list li + li { margin-top: 6px; }
  .media-grid-2x2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px 30px; }
  @media (max-width: 768px) {
    .case-meta-grid { grid-template-columns: 1fr; }
    .media-grid-2x2 { grid-template-columns: 1fr; gap: 40px; }
  }
  .media-item-header {
    cursor: pointer;
    margin-bottom: 12px;
    padding: 8px 12px;
    margin-left: -12px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    display: block;
    width: calc(100% + 12px);
    text-align: left;
    background: transparent;
    border: 0;
    font: inherit;
  }
  .media-item-header:hover { background-color: #f3f4f6; }
  .role-label { color: #6b7280; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px; }
  .feature-title { font-family: 'Sora', sans-serif; font-size: 1.1rem; color: #111827; margin: 0; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .click-icon { color: #2563eb; font-size: 0.75rem; font-family: 'DM Sans', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
  .media-box {
    width: 100%;
    aspect-ratio: 16/9;
    background: #050505;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    position: relative;
    padding: 0;
    display: block;
  }
  .media-box:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
  .enlarge-hint { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; opacity: 0; transition: opacity 0.2s; z-index: 10; pointer-events: none; backdrop-filter: blur(4px); }
  .media-box:hover .enlarge-hint { opacity: 1; }
  .media-content { width: 100%; height: 100%; object-fit: cover; display: block; }
  .media-placeholder { color: #d1d5db; display: flex; align-items: center; justify-content: center; height: 100%; padding: 20px; font-size: 0.9rem; }
  .custom-modal-overlay { position: fixed; inset: 0; background: rgba(17, 24, 39, 0.85); z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); }
  .custom-modal-text-box { background: #fff; border-radius: 8px; padding: 40px; max-width: 500px; width: 100%; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.25); }
  .modal-role { color: #6b7280; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 8px; }
  .modal-title { font-family: 'Sora', sans-serif; font-size: 1.5rem; color: #111827; margin: 0 0 16px; }
  .modal-details { color: #4b5563; font-size: 1rem; margin: 0; line-height: 1.7; }
  .custom-modal-media-wrapper { max-width: 1100px; width: 100%; position: relative; display: flex; justify-content: center; }
  .enlarged-media { width: 100%; max-height: 85vh; object-fit: contain; border-radius: 8px; background: #000; box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
  .modal-close-btn { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; border: none; background: #f3f4f6; color: #374151; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; }
  .media-close-btn { top: -40px; right: 0; background: rgba(255,255,255,0.2); color: white; }
`;

const categoryBadge = { color: "#2563eb", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: "700", color: "#111827", margin: 0, lineHeight: "1.2" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.75", color: "#6b7280", margin: 0, maxWidth: "100%" };
const techLabel = { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", fontWeight: "700", marginBottom: "4px" };
const techPill = { background: "#f3f4f6", color: "#374151", padding: "4px 10px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "600", border: "1px solid #e5e7eb" };
