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
    <section id="design" className="section">
      <div className="site-container">
        <header className="section-header reveal-on-load">
          <span className="section-kicker">02 / Design Work</span>
          <div>
            <h2 className="section-title">Interfaces before implementation.</h2>
            <p className="section-copy">
              UI/UX projects focused on product flow, dashboard clarity, and mobile interaction design.
            </p>
          </div>
        </header>

        <div className="design-list">
          {designs.map((design, index) => (
            <article key={design.title} className="design-entry reveal-on-load">
              <div className="design-copy">
                <div>
                  <div className="project-meta">
                    <span>{String(index + 1).padStart(2, "0")} - {design.category}</span>
                  </div>
                  <h3 className="design-title">{design.title}</h3>
                  <p className="design-description">{design.description}</p>
                </div>

                <div className="tech-list" aria-label={`${design.title} tools`}>
                  {design.tech.map((tech) => (
                    <span key={tech} className="tech-pill">{tech}</span>
                  ))}
                </div>

                <a
                  href={design.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  onClick={() => trackDesignLink(design)}
                >
                  {design.linkText} -&gt;
                </a>
              </div>

              <div className="design-media-wrap">
                <MediaGallery mediaItems={design.media} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
