import React, { useState } from "react";
import ReactDOM from "react-dom";

// ==========================================
//  COMPONENT: MediaGallery
// ==========================================
const MediaGallery = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState('next'); 
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  // --- HELPER: Handle both String URLs and Object items ---
  const getUrl = (item) => typeof item === 'object' ? item.url : item;
  const getCaption = (item) => typeof item === 'object' ? item.caption : null;

  const isVideo = (url) => {
    if (!url) return false;
    return (
      url.includes("drive.google.com") || 
      url.includes("youtube") || 
      url.includes("vimeo") || 
      url.includes("figma")
    );
  };

  // Navigating "Next" (Right Button) -> Slide in from Right
  const nextSlide = (e) => {
    e.stopPropagation();
    setDirection('next'); 
    setIsFirstOpen(false); 
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  // Navigating "Prev" (Left Button) -> Slide in from Left
  const prevSlide = (e) => {
    e.stopPropagation();
    setDirection('prev');
    setIsFirstOpen(false); 
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const openModal = () => {
    setIsFirstOpen(true); 
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget || e.target.getAttribute('aria-label') === 'close') {
      setIsModalOpen(false);
      document.body.style.overflow = 'unset'; 
    }
  };

  if (!mediaItems || mediaItems.length === 0) return null;

  const currentItem = mediaItems[currentIndex];
  const currentUrl = getUrl(currentItem);
  const currentCaption = getCaption(currentItem);
  const itemIsVideo = isVideo(currentUrl);

  const renderContent = (url, isModal = false) => {
    let animationClass = '';
    
    if (isModal) {
        // 1. First Open = Slow Zoom
        // 2. Next Button = Slide Left
        // 3. Prev Button = Slide Right
        animationClass = isFirstOpen 
            ? 'slow-zoom-anim' 
            : (direction === 'next' ? 'slide-in-right' : 'slide-in-left');
    } else {
        animationClass = ''; // No animation for thumbnails to keep it clean
    }
    
    const imgClass = animationClass;

    if (isVideo(url)) {
      return (
        <iframe 
          src={url} 
          title="Interactive Preview" 
          className={imgClass}
          style={isModal ? modalVideoStyle : galleryVideoStyle} 
          allow="autoplay; encrypted-media" 
          allowFullScreen
        ></iframe>
      );
    }
    return (
      <img 
        src={url} 
        alt="Project Preview" 
        className={imgClass}
        style={isModal ? modalImage : galleryImage} 
      />
    );
  };

  // --- MODAL CONTENT ---
  const modalContent = (
    <div style={modalOverlay} onClick={closeModal}>
      
      {/* Main Content Container */}
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        
        {/* CLOSE BUTTON */}
        <button style={modalCloseBtn} onClick={closeModal} aria-label="close">&times;</button>

        {/* LEFT SIDE: IMAGE/VIDEO AREA */}
        <div className="modal-media-area">
            
            {/* Wrapper for overflow handling */}
            <div key={currentIndex} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                 {renderContent(currentUrl, true)}
            </div>

            {/* HORIZONTAL NAV BUTTONS */}
            {mediaItems.length > 1 && (
              <>
                <button onClick={prevSlide} style={{ ...navButton, left: "20px" }}>&#10094;</button>
                <button onClick={nextSlide} style={{ ...navButton, right: "20px" }}>&#10095;</button>
              </>
            )}

            <div style={modalCounter}>
              {currentIndex + 1} / {mediaItems.length}
            </div>
        </div>

        {/* RIGHT SIDE: DESCRIPTION PANEL */}
        {!itemIsVideo && (
        <div className="modal-info-panel">
            <div key={currentIndex} className="info-content-animate">
                <h4 style={infoTitle}>Image Details</h4>
                <div style={infoDivider}></div>
                <p style={infoText}>
                  {currentCaption || "No description available for this image."}
                </p>
            </div>
        </div>
        )}

      </div>
    </div>
  );

  return (
    <>
      {/* THUMBNAIL/CAROUSEL */}
      <div style={carouselContainer}>
        <div style={imageWrapper} onClick={!itemIsVideo ? openModal : undefined}>
          
          {renderContent(currentUrl)}

          {!itemIsVideo && <div className="overlay-hint" style={overlayHint}>Click to expand ↗</div>}
          
          {itemIsVideo && (
            <div style={currentUrl.includes("figma") ? figmaLabel : videoLabel}>
               {currentUrl.includes("figma") ? "Interactive Prototype" : "Video Preview"}
            </div>
          )}

          {/* Buttons on Thumbnail (Optional, can remove if you only want modal nav) */}
          {mediaItems.length > 1 && (
          <>
            <button onClick={prevSlide} style={{ ...navButton, left: "10px" }}>&#10094;</button>
            <button onClick={nextSlide} style={{ ...navButton, right: "10px" }}>&#10095;</button>
          </>
        )}
        </div>
         
         <div style={counterIndicator}>{currentIndex + 1} / {mediaItems.length}</div>
      </div>

      {isModalOpen && !itemIsVideo && ReactDOM.createPortal(
        modalContent,
        document.body
      )}
    </>
  );
};


// ==========================================
// DATA SECTIONS
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
        { url: "/management sample/5.png", caption: "Settings Panel: User profile management and system configurations." }
    ]
  },
];

const demos = [
  {
    title: "P-Lament Mobile App (Thesis)",
    description: "The dedicated mobile interface for the P-Lament IoT recycling system. This interactive prototype demonstrates the user journey for tracking recycling statistics, managing reward points, and locating smart bins.",
    link: "https://embed.figma.com/design/f6x3IY0cz0sv6Tu6RruQt3/Untitled?embed-host=share",
    linkText: "Interact with Prototype",
    media: [
      { url: "https://embed.figma.com/design/f6x3IY0cz0sv6Tu6RruQt3/Untitled?embed-host=share", caption: "Figma Prototype" }
    ]
  },
  {
    title: "3D Model with Animation",
    description: "A technical 3D visualization for P-Lament. This animation demonstrates the mechanical design and operational workflow of the IoT-enabled recycling system.",
    link: "https://drive.google.com/file/d/1CC-P6WGFh7mcy01TVxTH8pHDzwgS2sn_/preview",
    linkText: "Watch Full Video",
    media: [
      { url: "https://drive.google.com/file/d/1CC-P6WGFh7mcy01TVxTH8pHDzwgS2sn_/preview", caption: "Full Video Walkthrough" }, 
      { url: "/3d model/s2.jpg", caption: "Side View of the mechanical arm." },
      { url: "/3d model/s3.jpg", caption: "Top-down view of the sorting mechanism." },
      { url: "/3d model/s5.jpg", caption: "Internal gears and motor placement." }, 
      { url: "/3d model/s6.jpg", caption: "Structural frame analysis." },
      { url: "/3d model/s7.png", caption: "Rendered lighting test." }, 
      { url: "/3d model/s8.png", caption: "Final assembly render." }  
    ]
  },
  {
    title: "Customizable Food App Concept",
    description: "A high-fidelity prototype for a fast-food ordering application. The key feature is a granular customization system, allowing users to modify specific ingredients before checkout.",
    link: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share",
    linkText: "View Prototype",
    media: [
        { url: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share", caption: "Prototype Interface" }
    ] 
  }
]; 


// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Projects() {
  return (
    <>
    <style>{`
      /* PROJECT GRID LAYOUT */
      .project-grid {
        display: grid;
        grid-template-columns: 1fr; /* Default mobile: 1 column */
        gap: 2.5rem;
        align-items: start;
        margin-bottom: 5rem;
      }

      @media (min-width: 900px) {
        .project-grid {
          grid-template-columns: 1fr 1.2fr; /* Desktop: Text left, Media right */
          gap: 4rem;
        }
      }

      /* PAGE LOAD ANIMATIONS */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .animate-up {
        opacity: 0;
        animation: fadeUp 0.8s ease-out forwards;
      }

      /* =========================================
         GALLERY ANIMATIONS
      ========================================= */
      
      /* 1. Slow Motion Zoom (Entrance) */
      @keyframes slowZoomKeyframe {
        0% { opacity: 0; transform: scale(0.6); filter: blur(4px); }
        100% { opacity: 1; transform: scale(1); filter: blur(0px); }
      }
      .slow-zoom-anim {
        animation: slowZoomKeyframe 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
        transform-origin: center center;
      }

      /* 2. Slide Left (Next Image) */
      @keyframes slideInRightKeyframe {
        0% { opacity: 0; transform: translateX(50px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      .slide-in-right {
        animation: slideInRightKeyframe 0.5s ease-out forwards;
      }

      /* 3. Slide Right (Prev Image) */
      @keyframes slideInLeftKeyframe {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      .slide-in-left {
        animation: slideInLeftKeyframe 0.5s ease-out forwards;
      }
      
      /* 4. Text Fade In */
      @keyframes textSlide {
        0% { opacity: 0; transform: translateX(20px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      .info-content-animate {
        animation: textSlide 0.6s ease-out forwards;
        animation-delay: 0.2s; /* Wait for image */
        opacity: 0; 
      }

      .media-hover-trigger:hover .overlay-hint {
        opacity: 1 !important;
      }

      /* =========================================
         MODAL LAYOUT STYLES
      ========================================= */
      .modal-content-wrapper {
         display: flex;
         width: 90vw;
         height: 85vh;
         background: #0f172a;
         border: 1px solid #334155;
         border-radius: 12px;
         overflow: hidden;
         box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8);
         position: relative;
      }

      .modal-media-area {
        flex: 1;
        background: #000;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .modal-info-panel {
        width: 320px;
        background: #1e293b;
        padding: 40px 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-left: 1px solid #334155;
        z-index: 10;
      }

      /* Mobile Responsive Modal */
      @media (max-width: 900px) {
        .modal-content-wrapper {
          flex-direction: column;
          height: 90vh;
        }
        .modal-info-panel {
          width: 100%;
          height: 150px;
          padding: 20px;
          justify-content: flex-start;
          border-left: none;
          border-top: 1px solid #334155;
          overflow-y: auto;
        }
        .modal-media-area {
            height: calc(100% - 150px);
        }
      }

    `}</style>

    <div className="section-padding" style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "100px" }}>
      
      {/* PART 1: SELECTED WORKS */}
       <section style={{ borderBottom: "1px solid #1e293b", paddingBottom: "20px", marginBottom: "60px", marginTop: "60px" }}>
        <h2 className="animate-up" style={{ ...headerStyle, animationDelay: "0ms" }}>
          <span style={{ color: "#3b82f6", marginRight: "10px" }}>01.</span> 
          Selected Works
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((project, index) => (
            <div key={index} className="project-grid animate-up" style={{ animationDelay: "150ms" }}>
              
              {/* LEFT: Text Info */}
              <div> 
                <span style={categoryBadge}>{project.category}</span>
                <h3 style={projectTitle}>{project.title}</h3>
                <p style={descriptionText}>{project.description}</p>
                
                 {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={viewProjectBtn}>
                      View Live Project <span style={{ marginLeft: "5px", fontSize: "1.2em" }}>↗</span>
                    </a>
                  )}
              </div>

              {/* RIGHT: Media & Tech */}
              <div>
                  <div className="media-hover-trigger">
                    <MediaGallery mediaItems={project.media} />
                  </div>

                  <div style={{ marginTop: "25px" }}>
                    <p style={techLabel}>Technologies Used:</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                      {project.tech.map((t) => (
                        <span key={t} style={techPill}>{t}</span>
                      ))}
                    </div>
                  </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* PART 2: TECHNICAL DEMOS */}
      <section>
        <h2 className="animate-up" style={{ ...headerStyle, animationDelay: "300ms" }}>
          <span style={{ color: "#3b82f6", marginRight: "10px" }}>02.</span> 
          Technical Demos
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {demos.map((demo, index) => (
            <div key={index} className="project-grid animate-up" style={{ animationDelay: `${450 + (index * 150)}ms` }}>
              
              {/* LEFT: Text Info */}
              <div>
                <h3 style={demoTitle}>{demo.title}</h3>
                <p style={descriptionText}>{demo.description}</p>
                
                {demo.link && (
                    <a href={demo.link} target="_blank" rel="noopener noreferrer" style={viewProjectBtn}>
                      {demo.linkText} <span style={{ marginLeft: "5px", fontSize: "1.2em" }}>↗</span>
                    </a>
                )}
              </div>

              {/* RIGHT: Media Gallery */}
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

const headerStyle = { fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: "800", marginBottom: "60px", color: "#f8fafc", letterSpacing: "-0.03em" };
const categoryBadge = { color: "#60a5fa", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontSize: "clamp(1.8rem, 3vw, 2rem)", fontWeight: "700", color: "#f8fafc", margin: "10px 0 20px 0", lineHeight: "1.2" };
const demoTitle = { fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc", marginBottom: "15px" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.7", color: "#94a3b8", margin: 0, maxWidth: '600px' };

const viewProjectBtn = { 
  display: "inline-flex", 
  alignItems: "center", 
  textDecoration: "none", 
  color: "#60a5fa", 
  fontWeight: "700", 
  fontSize: "1.1rem", 
  marginTop: "30px",    
  borderBottom: "2px solid rgba(96, 165, 250, 0.3)", 
  paddingBottom: "4px", 
  transition: "all 0.2s ease",
  cursor: "pointer"
};

// Tech & Labels
const techLabel = { fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: "700", marginBottom: "5px" };
const techPill = { fontSize: "0.8rem", fontWeight: "600", padding: "6px 12px", borderRadius: "8px", backgroundColor: "rgba(30, 41, 59, 0.5)", color: "#cbd5e1", border: "1px solid #334155" };

// Gallery
const carouselContainer = { position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" };
const imageWrapper = { width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", border: "1px solid #334155", backgroundColor: "#0f172a", position: "relative", cursor: "pointer", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" };
const galleryImage = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const galleryVideoStyle = { width: "100%", height: "100%", border: "none", display: "block" };
const modalVideoStyle = { width: "100%", height: "100%", border: "none" };

// Badges
const videoLabel = { position: 'absolute', top: '10px', right: '10px', background: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', pointerEvents: 'none', zIndex: 10 };
const figmaLabel = { position: 'absolute', top: '10px', right: '10px', background: '#a855f7', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', pointerEvents: 'none', zIndex: 10 };

const overlayHint = { position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', pointerEvents: 'none', opacity: 0, transition: "opacity 0.2s ease" };

// Buttons for Horizontal Navigation
const navButton = { 
    position: "absolute", 
    top: "50%",
    transform: "translateY(-50%)", 
    background: "rgba(15, 23, 42, 0.8)", 
    color: "#f8fafc", 
    border: "1px solid #334155", 
    borderRadius: "50%", 
    width: "40px", 
    height: "40px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    cursor: "pointer", 
    zIndex: 2, 
    fontSize: "1rem", 
    transition: "all 0.2s ease",
    backdropFilter: "blur(4px)"
};

const counterIndicator = { position: "absolute", bottom: "-25px", right: "0", color: "#94a3b8", fontSize: "0.85rem", fontWeight: "600" };

// Modal
const modalOverlay = { 
  position: "fixed", 
  top: 0, 
  left: 0, 
  right: 0, 
  bottom: 0, 
  backgroundColor: "rgba(0, 0, 0, 0.95)", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  zIndex: 100000, 
  padding: "20px", 
  backdropFilter: "blur(10px)" 
};

const modalImage = { maxWidth: "100%", maxHeight: "100%", objectFit: "contain", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" };

// Close button
const modalCloseBtn = { position: "absolute", top: "15px", right: "15px", background: "rgba(255, 255, 255, 0.1)", color: "#fff", border: "none", borderRadius: "50%", width: "35px", height: "35px", fontSize: "1.5rem", lineHeight: "1", cursor: "pointer", zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' };

const modalCounter = { position: "absolute", bottom: "20px", left: "20px", color: "#94a3b8", background: "rgba(0,0,0,0.6)", padding: "4px 12px", borderRadius: "20px", fontWeight: "600", fontSize: "0.85rem" };

// Info Panel text styles
const infoTitle = { margin: "0 0 15px 0", color: "#f8fafc", fontSize: "1.1rem", fontWeight: "700" };
const infoDivider = { width: "40px", height: "3px", backgroundColor: "#3b82f6", marginBottom: "20px", borderRadius: "2px" };
const infoText = { margin: 0, color: "#cbd5e1", lineHeight: "1.7", fontSize: "0.95rem" };