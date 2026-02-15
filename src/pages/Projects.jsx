import React, { useState } from "react";
import ReactDOM from "react-dom";

// ==========================================
//  COMPONENT: MediaGallery (kept functional, restyled)
// ==========================================
const MediaGallery = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("next");
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const getUrl = (item) => (typeof item === "object" ? item.url : item);
  const getCaption = (item) => (typeof item === "object" ? item.caption : null);

  const isVideo = (url) => {
    if (!url) return false;
    return url.includes("drive.google.com") || url.includes("youtube") || url.includes("vimeo") || url.includes("figma");
  };

  const nextSlide = (e) => { e.stopPropagation(); setDirection("next"); setIsFirstOpen(false); setCurrentIndex((p) => (p + 1) % mediaItems.length); };
  const prevSlide = (e) => { e.stopPropagation(); setDirection("prev"); setIsFirstOpen(false); setCurrentIndex((p) => (p - 1 + mediaItems.length) % mediaItems.length); };

  const openModal = () => { setIsFirstOpen(true); setIsModalOpen(true); document.body.style.overflow = "hidden"; };
  const closeModal = (e) => {
    if (e.target === e.currentTarget || e.target.getAttribute("aria-label") === "close") {
      setIsModalOpen(false);
      document.body.style.overflow = "unset";
    }
  };

  if (!mediaItems || mediaItems.length === 0) return null;

  const currentItem = mediaItems[currentIndex];
  const currentUrl = getUrl(currentItem);
  const currentCaption = getCaption(currentItem);
  const itemIsVideo = isVideo(currentUrl);

  const renderContent = (url, isModal = false) => {
    let animationClass = "";
    if (isModal) animationClass = isFirstOpen ? "slow-zoom-anim" : direction === "next" ? "slide-in-right" : "slide-in-left";
    if (isVideo(url)) return <iframe src={url} title="Interactive Preview" className={animationClass} style={isModal ? modalVideoStyle : galleryVideoStyle} allow="autoplay; encrypted-media" allowFullScreen></iframe>;
    return <img src={url} alt="Project Preview" className={animationClass} style={isModal ? modalImage : galleryImage} />;
  };

  const modalContent = (
    <div style={modalOverlay} onClick={closeModal}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <button style={modalCloseBtn} onClick={closeModal} aria-label="close">&times;</button>
        <div className="modal-media-area">
          <div key={currentIndex} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {renderContent(currentUrl, true)}
          </div>
          {mediaItems.length > 1 && (
            <>
              <button onClick={prevSlide} style={{ ...navButton, left: "20px" }}>&#10094;</button>
              <button onClick={nextSlide} style={{ ...navButton, right: "20px" }}>&#10095;</button>
            </>
          )}
          <div style={modalCounter}>{currentIndex + 1} / {mediaItems.length}</div>
        </div>
        {!itemIsVideo && (
          <div className="modal-info-panel">
            <div key={currentIndex} className="info-content-animate">
              <h4 style={infoTitle}>Image Details</h4>
              <div style={infoDivider}></div>
              <p style={infoText}>{currentCaption || "No description available for this image."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div style={carouselContainer}>
        <div style={imageWrapper} onClick={!itemIsVideo ? openModal : undefined}>
          {renderContent(currentUrl)}
          {!itemIsVideo && <div className="overlay-hint" style={overlayHint}>Click to expand ↗</div>}
          {itemIsVideo && (
            <div style={currentUrl.includes("figma") ? figmaLabel : videoLabel}>
              {currentUrl.includes("figma") ? "Interactive Prototype" : "Video Preview"}
            </div>
          )}
          {mediaItems.length > 1 && (
            <>
              <button onClick={prevSlide} style={{ ...navButton, left: "10px" }}>&#10094;</button>
              <button onClick={nextSlide} style={{ ...navButton, right: "10px" }}>&#10095;</button>
            </>
          )}
        </div>
        <div style={counterIndicator}>{currentIndex + 1} / {mediaItems.length}</div>
      </div>
      {isModalOpen && !itemIsVideo && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
};

// ==========================================
// DATA
// ==========================================
const projects = [
  {
    title: "Storage Management System",
    category: "Web Application",
    description: "A professional inventory tracker using Google Sheets for data management, featuring automated statistics generation and secure user authentication.",
    tech: ["React", "Firebase Auth", "Google Sheets", "Chart.js"],
    link: "https://storage-management-gilt.vercel.app/",
    media: [
      { url: "/management sample/1.png", caption: "Login Dashboard: Secure user authentication with Firebase." },
      { url: "/management sample/2.png", caption: "Inventory List: Real-time tracking of stock levels with color-coded alerts." },
      { url: "/management sample/3.png", caption: "Analytics: Visual breakdown of monthly consumption and costs." },
      { url: "/management sample/4.png", caption: "Add Item Interface: Streamlined form for entering new stock data." },
      { url: "/management sample/5.png", caption: "Settings Panel: User profile management and system configurations." },
    ],
  },
];

const demos = [
  {
    title: "P-Lament Mobile App (Thesis)",
    description: "The dedicated mobile interface for the P-Lament IoT recycling system. Demonstrates the user journey for tracking recycling statistics, managing reward points, and locating smart bins.",
    link: "https://embed.figma.com/design/f6x3IY0cz0sv6Tu6RruQt3/Untitled?embed-host=share",
    linkText: "Interact with Prototype",
    media: [{ url: "https://embed.figma.com/design/f6x3IY0cz0sv6Tu6RruQt3/Untitled?embed-host=share", caption: "Figma Prototype" }],
  },
  {
    title: "3D Model with Animation",
    description: "A technical 3D visualization for P-Lament. Demonstrates the mechanical design and operational workflow of the IoT-enabled recycling system.",
    link: "https://drive.google.com/file/d/1CC-P6WGFh7mcy01TVxTH8pHDzwgS2sn_/preview",
    linkText: "Watch Full Video",
    media: [
      { url: "https://drive.google.com/file/d/1CC-P6WGFh7mcy01TVxTH8pHDzwgS2sn_/preview", caption: "Full Video Walkthrough" },
      { url: "/3d model/s2.jpg", caption: "Side View of the mechanical arm." },
      { url: "/3d model/s3.jpg", caption: "Top-down view of the sorting mechanism." },
      { url: "/3d model/s5.jpg", caption: "Internal gears and motor placement." },
      { url: "/3d model/s6.jpg", caption: "Structural frame analysis." },
      { url: "/3d model/s7.png", caption: "Rendered lighting test." },
      { url: "/3d model/s8.png", caption: "Final assembly render." },
    ],
  },
  {
    title: "Customizable Food App Concept",
    description: "A high-fidelity prototype for a fast-food ordering application with a granular customization system, allowing users to modify specific ingredients before checkout.",
    link: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share",
    linkText: "View Prototype",
    media: [{ url: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share", caption: "Prototype Interface" }],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Projects() {
  return (
    <>
      <style>{`
        .project-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
          margin-bottom: 4rem;
        }
        @media (min-width: 900px) {
          .project-grid { grid-template-columns: 1fr 1.2fr; gap: 4rem; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }

        /* GALLERY ANIMATIONS */
        @keyframes slowZoomKeyframe {
          0%   { opacity: 0; transform: scale(0.6); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1);   filter: blur(0px); }
        }
        .slow-zoom-anim { animation: slowZoomKeyframe 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        @keyframes slideInRightKeyframe {
          0%   { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right { animation: slideInRightKeyframe 0.45s ease-out forwards; }
        @keyframes slideInLeftKeyframe {
          0%   { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left { animation: slideInLeftKeyframe 0.45s ease-out forwards; }
        @keyframes textSlide {
          0%   { opacity: 0; transform: translateX(15px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .info-content-animate {
          animation: textSlide 0.5s ease-out forwards;
          animation-delay: 0.15s;
          opacity: 0;
        }
        .media-hover-trigger:hover .overlay-hint { opacity: 1 !important; }

        /* MODAL */
        .modal-content-wrapper {
          display: flex;
          width: 90vw;
          height: 85vh;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.25);
          position: relative;
        }
        .modal-media-area {
          flex: 1;
          background: #f3f4f6;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .modal-info-panel {
          width: 300px;
          background: #f9fafb;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid #e5e7eb;
          z-index: 10;
        }
        @media (max-width: 900px) {
          .modal-content-wrapper { flex-direction: column; height: 90vh; }
          .modal-info-panel { width: 100%; height: 140px; padding: 18px; justify-content: flex-start; border-left: none; border-top: 1px solid #e5e7eb; overflow-y: auto; }
          .modal-media-area { height: calc(100% - 140px); }
        }
        .section-label {
          color: #2563eb;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: block;
        }
      `}</style>

      <div className="section-padding" style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* SELECTED WORKS */}
        <section style={{ marginBottom: "80px" }}>
          <span className="section-label animate-up" style={{ animationDelay: "0ms" }}>01. Selected Works</span>
          <h2
            className="animate-up"
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: "800", letterSpacing: "-0.03em", color: "#111827", marginBottom: "48px", animationDelay: "100ms" }}
          >
            Things I've Built
          </h2>

          {projects.map((project, index) => (
            <div key={index} className="project-grid animate-up" style={{ animationDelay: "200ms" }}>
              <div>
                <span style={categoryBadge}>{project.category}</span>
                <h3 style={projectTitle}>{project.title}</h3>
                <p style={descriptionText}>{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={viewProjectBtn}>
                    View Live Project <span style={{ fontSize: "1.1em" }}>↗</span>
                  </a>
                )}
              </div>
              <div>
                <div className="media-hover-trigger">
                  <MediaGallery mediaItems={project.media} />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p style={techLabel}>Technologies Used</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                    {project.tech.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* TECHNICAL DEMOS */}
        <section>
          <span className="section-label animate-up" style={{ animationDelay: "300ms" }}>02. Technical Demos</span>
          <h2
            className="animate-up"
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: "800", letterSpacing: "-0.03em", color: "#111827", marginBottom: "48px", animationDelay: "400ms" }}
          >
            Prototypes & Demos
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
            {demos.map((demo, index) => (
              <div key={index} className="project-grid animate-up" style={{ animationDelay: `${500 + index * 120}ms` }}>
                <div>
                  <h3 style={demoTitle}>{demo.title}</h3>
                  <p style={descriptionText}>{demo.description}</p>
                  {demo.link && (
                    <a href={demo.link} target="_blank" rel="noopener noreferrer" style={viewProjectBtn}>
                      {demo.linkText} <span style={{ fontSize: "1.1em" }}>↗</span>
                    </a>
                  )}
                </div>
                <div className="media-hover-trigger">
                  <MediaGallery mediaItems={demo.media} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

// =======================
// STYLES
// =======================
const categoryBadge = { color: "#2563eb", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: "700", color: "#111827", margin: "10px 0 16px 0", lineHeight: "1.2" };
const demoTitle = { fontFamily: "'Sora', sans-serif", fontSize: "1.4rem", fontWeight: "700", color: "#111827", marginBottom: "12px" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.75", color: "#6b7280", margin: 0, maxWidth: "540px" };
const viewProjectBtn = { display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "#2563eb", fontWeight: "700", fontSize: "0.95rem", marginTop: "24px", borderBottom: "2px solid #bfdbfe", paddingBottom: "3px", transition: "border-color 0.2s" };
const techLabel = { fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", fontWeight: "700", marginBottom: "4px" };

const carouselContainer = { position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" };
const imageWrapper = { width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb", backgroundColor: "#f3f4f6", position: "relative", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" };
const galleryImage = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const galleryVideoStyle = { width: "100%", height: "100%", border: "none", display: "block" };
const modalVideoStyle = { width: "100%", height: "100%", border: "none" };

const videoLabel = { position: "absolute", top: "10px", right: "10px", background: "#ef4444", color: "#fff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "700", pointerEvents: "none", zIndex: 10 };
const figmaLabel = { position: "absolute", top: "10px", right: "10px", background: "#7c3aed", color: "#fff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: "700", pointerEvents: "none", zIndex: 10 };
const overlayHint = { position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.55)", color: "#fff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.72rem", pointerEvents: "none", opacity: 0, transition: "opacity 0.2s ease" };

const navButton = { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "50%", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, fontSize: "0.9rem", transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" };
const counterIndicator = { position: "absolute", bottom: "-24px", right: "0", color: "#9ca3af", fontSize: "0.8rem", fontWeight: "600" };

const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100000, padding: "20px", backdropFilter: "blur(8px)" };
const modalImage = { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" };
const modalCloseBtn = { position: "absolute", top: "14px", right: "14px", background: "rgba(0,0,0,0.08)", color: "#374151", border: "none", borderRadius: "50%", width: "34px", height: "34px", fontSize: "1.4rem", lineHeight: "1", cursor: "pointer", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" };
const modalCounter = { position: "absolute", bottom: "16px", left: "16px", color: "#6b7280", background: "rgba(255,255,255,0.85)", padding: "3px 12px", borderRadius: "20px", fontWeight: "600", fontSize: "0.8rem", border: "1px solid #e5e7eb" };

const infoTitle = { margin: "0 0 12px 0", color: "#111827", fontSize: "1rem", fontWeight: "700", fontFamily: "'Sora', sans-serif" };
const infoDivider = { width: "36px", height: "3px", backgroundColor: "#2563eb", marginBottom: "16px", borderRadius: "2px" };
const infoText = { margin: 0, color: "#6b7280", lineHeight: "1.7", fontSize: "0.9rem" };