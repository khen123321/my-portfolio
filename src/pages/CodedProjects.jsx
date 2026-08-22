"use client";
import React, { useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics.js";

import v1 from "../assets/v1.mp4";
import v2 from "../assets/v2.mp4";
import v3 from "../assets/v3.mp4";
import v4 from "../assets/v4.mp4";

const projects = [
  {
    title: "TapTapTap \u2014 NFC Business Platform",
    shortTitle: "TapTapTap \u2014 NFC Business Platform",
    category: "Full-Stack Business Platform",
    role: "Full-Stack Developer / Project Developer",
    availability: "Public production website",
    description:
      "A full-stack NFC storefront for businesses, combining customizable NFC products, secure product management, analytics, and dynamic publishing.",
    impact: [
      "Dynamic Supabase-powered product management and publishing.",
      "Custom NFC artwork upload and product preview.",
      "Secure admin authentication with role-based access and RLS.",
      "Supabase Storage image management.",
      "First-party product and visitor analytics.",
      "Production deployment with dynamic storefront revalidation.",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    link: "https://www.taptaptap.shop/",
    linkText: "View Live",
    linkSuffix: "external",
    screenshot: "/images/projects/taptaptap.png",
    screenshotAlt: "TapTapTap NFC business platform homepage",
  },
  {
    title: "CLIMBS Internship Monitoring System",
    shortTitle: "CLIMBS Internship Monitoring System (CIMS)",
    category: "Internal System",
    role: "Developer / UI Builder",
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
    shortTitle: "Wedding RSVP & Access Control",
    category: "Client Project",
    role: "Web Developer",
    availability: "Client event system",
    description:
      "A custom event platform with RSVP, guest management, and event-access workflows. Media uses placeholder names and images for privacy.",
    tech: ["React", "JSX", "Tailwind CSS", "Google Sheets"],
    link: "https://angelolanie.vercel.app/",
    linkText: "View Live",
    linkSuffix: "external",
    screenshot: "/images/projects/wedding-rsvp.png",
    screenshotAlt: "Wedding RSVP live website opening screen",
  },
  {
    title: "Storage Management System",
    shortTitle: "Storage Management System",
    category: "Web Application",
    role: "Front-End Developer",
    availability: "Public demo available",
    description:
      "A practical inventory tracker that uses Firebase authentication and Google Sheets as a manageable data source for stock monitoring, forms, and visual summaries.",
    tech: ["React", "Firebase", "Google Sheets", "Chart.js"],
    link: "https://storage-management-gilt.vercel.app/",
    linkText: "View Live",
    linkSuffix: "external",
    screenshot: "/images/projects/storage-management.png",
    screenshotAlt: "Storage Management System dashboard",
  },
];

const isVideoUrl = (url) => Boolean(url && url.endsWith(".mp4"));

function useIsMasonryLayout() {
  const [isMasonryLayout, setIsMasonryLayout] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 761px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(min-width: 761px)");
    const handleChange = () => setIsMasonryLayout(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMasonryLayout;
}

function distributeMediaColumns(media) {
  if (media.length <= 1) return [media, []];
  if (media.length === 2) return [[media[0]], [media[1]]];
  if (media.length === 3) return [[media[0]], [media[1], media[2]]];
  if (media.length === 4) return [[media[0], media[3]], [media[1], media[2]]];

  return media.reduce(
    (columns, item, index) => {
      columns[index % 2].push(item);
      return columns;
    },
    [[], []],
  );
}

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
      { rootMargin: "360px" },
    );

    if (mediaRef.current) observer.observe(mediaRef.current);

    return () => observer.disconnect();
  }, [item.url, shouldLoad]);

  const isVideo = isVideoUrl(item.url);

  return (
    <div className="media-card">
      <button className="media-item-header" type="button" onClick={onOpenText}>
        <span>
          <span className="role-label">{item.role}</span><br />
          <span className="media-title">{item.title}</span>
        </span>
        <span className="click-icon">details</span>
      </button>
      <button
        ref={mediaRef}
        className="media-box"
        type="button"
        onClick={onOpenMedia}
        aria-label={`Open ${item.title} preview`}
      >
        <span className="enlarge-hint">expand</span>
        {isVideo ? (
          shouldLoad ? (
            <video src={item.url} preload="metadata" muted playsInline controls className="media-content" />
          ) : (
            <span className="media-placeholder">video preview loads when nearby</span>
          )
        ) : (
          <img src={item.url} alt={`${item.title} preview`} loading="lazy" decoding="async" className="media-content" />
        )}
      </button>
    </div>
  );
}

function ProjectScreenshot({ project, onClick }) {
  return (
    <a
      className="project-screenshot-link"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={`Open ${project.shortTitle} live project`}
    >
      <img
        src={project.screenshot}
        alt={project.screenshotAlt}
        className="project-screenshot"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

export default function CodedProjects() {
  const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
  const isMasonryLayout = useIsMasonryLayout();

  useEffect(() => {
    if (!modalState.isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
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
      item_id: project.shortTitle,
    });
  };

  return (
    <section id="projects" className="section">
      <div className="site-container">
        <header className="section-header reveal-on-load">
          <span className="section-kicker">01 / Selected Work</span>
          <div>
            <h2 className="section-title">Web projects with real workflows.</h2>
            <p className="section-copy">
              Large project showcases for internal systems, client event tools, and practical dashboard work.
            </p>
          </div>
        </header>

        <div className="project-list">
          {projects.map((project, index) => (
            <article key={project.shortTitle} className="project-case reveal-on-load">
              <div className="project-copy">
                <div className="project-meta">
                  <span>{String(index + 1).padStart(2, "0")} - {project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-description">{project.description}</p>

                <div className="project-actions">
                  {project.link ? (
                    <a className="btn-secondary" href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => trackProjectLink(project)}>
                      {project.linkText || "View Project"} {project.linkSuffix === "external" ? "\u2197" : "->"}
                    </a>
                  ) : (
                    <span className="private-badge">{project.availability}</span>
                  )}
                </div>

                <div className="tech-list" aria-label={`${project.shortTitle} technologies`}>
                  {project.tech.map((tech) => (
                    <span className="tech-pill" key={tech}>{tech}</span>
                  ))}
                </div>

                {project.impact && !project.screenshot && (
                  <ul className="feature-list">
                    {project.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {project.screenshot ? (
                <ProjectScreenshot project={project} onClick={() => trackProjectLink(project)} />
              ) : (
                <div className={`media-grid ${isMasonryLayout ? "media-grid-masonry" : "media-grid-sequential"}`}>
                  {isMasonryLayout
                    ? distributeMediaColumns(project.media).map((column, columnIndex) => (
                      <div className="media-column" key={`${project.shortTitle}-column-${columnIndex}`}>
                        {column.map((item) => (
                          <LazyProjectMedia
                            key={`${project.shortTitle}-${item.title}`}
                            item={item}
                            onOpenText={() => openTextModal(project.shortTitle, item.title, item.role, item.details)}
                            onOpenMedia={() => openMediaModal(project.shortTitle, item.url)}
                          />
                        ))}
                      </div>
                    ))
                    : project.media.map((item) => (
                      <LazyProjectMedia
                        key={`${project.shortTitle}-${item.title}`}
                        item={item}
                        onOpenText={() => openTextModal(project.shortTitle, item.title, item.role, item.details)}
                        onOpenMedia={() => openMediaModal(project.shortTitle, item.url)}
                      />
                    ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {modalState.isOpen && (
        <div className="custom-modal-overlay modal-fade" onClick={closeModal}>
          {modalState.type === "text" && (
            <div className="custom-modal-text-box modal-content" onClick={(event) => event.stopPropagation()}>
              <button className="modal-close-btn" type="button" onClick={closeModal} aria-label="Close modal">x</button>
              <span className="modal-role">{modalState.data.role}</span>
              <h3 className="modal-title">{modalState.data.title}</h3>
              <div className="modal-rule" />
              <p className="modal-details">{modalState.data.details}</p>
            </div>
          )}
          {modalState.type === "media" && (
            <div className="custom-modal-media-wrapper modal-content" onClick={(event) => event.stopPropagation()}>
              <button className="modal-close-btn media-close-btn" type="button" onClick={closeModal} aria-label="Close media preview">x</button>
              {isVideoUrl(modalState.data.url) ? (
                <video src={modalState.data.url} controls autoPlay muted className="enlarged-media" />
              ) : (
                <img src={modalState.data.url} alt="Enlarged project preview" className="enlarged-media" />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
