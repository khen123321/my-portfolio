import React from "react";
import { trackEvent } from "../analytics.js";

// Keep client work data-driven so additional TapTapTap projects can be added here.
const taptaptapProjects = [
  {
    title: "Prime Burger",
    category: "Client Website / NFC Digital Experience",
    developer: "TapTapTap",
    description:
      "A responsive digital experience created for Prime Burger, connecting customers to the business through a convenient, mobile-friendly website.",
    liveUrl: "https://prime-burger-umber.vercel.app/prime-burger",
    image: "/images/projects/prime-burger-mobile.jpg",
    imageAlt: "Prime Burger mobile website showing the branded hero and customer quick actions",
    previewMode: "mobile",
  },
];

function ProjectPreview({ project, onClick }) {
  return (
    <a
      className={`project-screenshot-link${project.previewMode === "mobile" ? " project-screenshot-link-mobile" : ""}`}
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={`Open ${project.title} live project`}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        className={`project-screenshot${project.previewMode === "mobile" ? " project-screenshot-mobile" : ""}`}
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

export default function TapTapTapProjects() {
  const trackProjectLink = (project) => {
    trackEvent("select_content", {
      content_type: "taptaptap_project_link",
      item_id: project.title,
    });
  };

  return (
    <section id="taptaptap-projects" className="section">
      <div className="site-container">
        <header className="section-header reveal-on-load">
          <span className="section-kicker">01 / WORK</span>
          <div>
            <h2 className="section-title">taptaptap projects_</h2>
            <p className="section-copy">Websites and digital solutions developed for TapTapTap clients.</p>
          </div>
        </header>

        <div className="project-list">
          {taptaptapProjects.map((project, index) => (
            <article key={project.title} className="project-case reveal-on-load">
              <div className="project-copy">
                <div className="project-meta">
                  <span>{String(index + 1).padStart(2, "0")} - {project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-role">Developer: {project.developer}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-actions">
                  <a className="btn-secondary" href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackProjectLink(project)}>
                    VIEW LIVE PROJECT ↗
                  </a>
                </div>
              </div>
              <ProjectPreview project={project} onClick={() => trackProjectLink(project)} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
