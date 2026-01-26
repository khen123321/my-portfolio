import React, { useState } from "react";
import ReactDOM from "react-dom";

// ==========================================
//  COMPONENT: MediaGallery
// ==========================================
const MediaGallery = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' (slide up) or 'prev' (slide down)

  const isVideo = (url) => {
    return (
      url.includes("drive.google.com") || 
      url.includes("youtube") || 
      url.includes("vimeo") || 
      url.includes("figma")
    );
  };

  // Navigating "Next" means moving down the list (Image slides UP from bottom)
  const nextSlide = (e) => {
    e.stopPropagation();
    setDirection('next'); 
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  // Navigating "Prev" means moving up the list (Image slides DOWN from top)
  const prevSlide = (e) => {
    e.stopPropagation();
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget || e.target.tagName === 'BUTTON') {
      setIsModalOpen(false);
      document.body.style.overflow = 'unset'; 
    }
  };

  if (!mediaItems || mediaItems.length === 0) return null;

  const currentItem = mediaItems[currentIndex];
  const itemIsVideo = isVideo(currentItem);

  // Helper to render image/video content
  const renderContent = (url, isFullSize = false) => {
    // Determine animation class based on direction
    const animationClass = direction === 'next' ? 'dramatic-slide-up' : 'dramatic-slide-down';
    
    const content = isVideo(url) ? (
      <iframe 
        src={url} 
        title="Interactive Preview" 
        // Apply animation class directly to iframe or img styles won't catch it right
        className={!isFullSize ? animationClass : ''}
        style={isFullSize ? modalVideoStyle : galleryVideoStyle} 
        allow="autoplay; encrypted-media" 
        allowFullScreen
      ></iframe>
    ) : (
      <img 
        src={url} 
        alt="Project Preview" 
        className={!isFullSize ? animationClass : ''}
        style={isFullSize ? modalImage : galleryImage} 
      />
    );

    // We wrap it in a perspective container and use the key to force re-render on change
    return (
        <div key={currentIndex} className="perspective-wrapper" style={{ width: '100%', height: '100%' }}>
            {content}
        </div>
    );
  };

  // --- MODAL CONTENT ---
  const modalContent = (
    <div style={modalOverlay} onClick={closeModal}>
      <button style={modalCloseBtn} onClick={closeModal}>&times;</button>
        
       {mediaItems.length > 1 && (
         <>
           {/* Vertical Buttons for Modal */}
           <button onClick={prevSlide} style={{ ...navButton, ...navButtonUp, left: "50%", transform: "translateX(-50%)", top: "20px" }}>&#9650;</button>
           <button onClick={nextSlide} style={{ ...navButton, ...navButtonDown, left: "50%", transform: "translateX(-50%)", bottom: "20px", top: "auto" }}>&#9660;</button>
         </>
       )}
       
      {/* For the modal, we also need the perspective wrapper and animation classes.
          We reuse the logic but apply styles manually since we aren't using className props for modal items in the original CSS.
      */}
       <div key={currentIndex + "_modal"} className="perspective-wrapper" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <div className={direction === 'next' ? 'dramatic-slide-up' : 'dramatic-slide-down'} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {renderContent(currentItem, true)}
         </div>
       </div>
      
      <div style={modalCounter}>
        {currentIndex + 1} / {mediaItems.length}
      </div>
    </div>
  );

  return (
    <>
      {/* THUMBNAIL/CAROUSEL */}
      <div style={carouselContainer}>
        <div style={imageWrapper} onClick={!itemIsVideo ? openModal : undefined}>
          
          {renderContent(currentItem)}

          {!itemIsVideo && <div className="overlay-hint" style={overlayHint}>Click to expand ↗</div>}
          
          {itemIsVideo && (
            <div style={currentItem.includes("figma") ? figmaLabel : videoLabel}>
               {currentItem.includes("figma") ? "Interactive Prototype" : "Video Preview"}
            </div>
          )}

          {/* VERTICAL BUTTONS */}
          {mediaItems.length > 1 && (
          <>
            <button onClick={prevSlide} style={{ ...navButton, ...navButtonUp }}>&#9650;</button>
            <button onClick={nextSlide} style={{ ...navButton, ...navButtonDown }}>&#9660;</button>
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
// DATA SECTIONS (Unchanged)
// ==========================================
const projects = [
  {
    title: "Storage Management System",
    category: "Web Application",
    description: "A professional inventory tracker using Google Sheets for data management, featuring automated statistics generation and secure user authentication.",
    tech: ["React", "Firebase Auth", "Google Sheets", "Chart.js"],
    link: "https://storage-management-gilt.vercel.app/",
    media: [
        "/management sample/1.png",
        "/management sample/2.png",
        "/management sample/3.png",
        "/management sample/4.png",
        "/management sample/5.png"
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
      "https://embed.figma.com/design/f6x3IY0cz0sv6Tu6RruQt3/Untitled?embed-host=share"
    ]
  },
  {
    title: "3D Model with Animation",
    description: "A technical 3D visualization for P-Lament. This animation demonstrates the mechanical design and operational workflow of the IoT-enabled recycling system.",
    link: "https://drive.google.com/file/d/1CC-P6WGFh7mcy01TVxTH8pHDzwgS2sn_/preview",
    linkText: "Watch Full Video",
    media: [
      "https://drive.google.com/file/d/1CC-P6WGFh7mcy01TVxTH8pHDzwgS2sn_/preview", 
      "/3d model/s2.jpg",
      "/3d model/s3.jpg",
      "/3d model/s5.jpg", 
      "/3d model/s6.jpg",
      "/3d model/s7.png", 
      "/3d model/s8.png"  
    ]
  },
  {
    title: "Customizable Food App Concept",
    description: "A high-fidelity prototype for a fast-food ordering application. The key feature is a granular customization system, allowing users to modify specific ingredients before checkout.",
    link: "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share",
    linkText: "View Prototype",
    media: [
        "https://embed.figma.com/design/Mh8QHB04L0qPeM2Ti6Ajwq/Untitled?node-id=0-1&embed-host=share"
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
         ENHANCED VERTICAL TRANSITIONS
      ========================================= */
      
      /* Essential for 3D tilt effect */
      .perspective-wrapper {
        perspective: 1200px;
        overflow: hidden;
      }

      /* Slide UP (Clicking Down Arrow) */
      @keyframes dramaticSlideUpKeyframe {
        0% {
          opacity: 0;
          /* Start below, scaled down, tilted back */
          transform: translateY(100%) scale(0.85) rotateX(-20deg);
        }
        100% {
           opacity: 1;
           /* End flat and full size */
           transform: translateY(0) scale(1) rotateX(0deg);
        }
      }

      /* Slide DOWN (Clicking Up Arrow) */
      @keyframes dramaticSlideDownKeyframe {
        0% {
          opacity: 0;
          /* Start above, scaled down, tilted forward */
          transform: translateY(-100%) scale(0.85) rotateX(20deg);
        }
        100% {
           opacity: 1;
           transform: translateY(0) scale(1) rotateX(0deg);
        }
      }

      .dramatic-slide-up {
        /* Using a spring-like bezier curve for snappy movement */
        animation: dramaticSlideUpKeyframe 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        transform-origin: center bottom; /* Pivot from bottom */
      }

      .dramatic-slide-down {
        animation: dramaticSlideDownKeyframe 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        transform-origin: center top; /* Pivot from top */
      }


      .media-hover-trigger:hover .overlay-hint {
        opacity: 1 !important;
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
const modalVideoStyle = { width: "100%", height: "100%", aspectRatio: "16/9", border: "none", maxWidth: "1200px" };

// Badges
const videoLabel = { position: 'absolute', top: '10px', right: '10px', background: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', pointerEvents: 'none', zIndex: 10 };
const figmaLabel = { position: 'absolute', top: '10px', right: '10px', background: '#a855f7', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', pointerEvents: 'none', zIndex: 10 };

const overlayHint = { position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', pointerEvents: 'none', opacity: 0, transition: "opacity 0.2s ease" };

// Buttons for Vertical Navigation
const navButton = { 
    position: "absolute", 
    left: "50%",
    transform: "translateX(-50%)", 
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

// Specific Positioning
const navButtonUp = { top: "15px" };
const navButtonDown = { bottom: "15px" };

const counterIndicator = { position: "absolute", bottom: "-25px", right: "0", color: "#94a3b8", fontSize: "0.85rem", fontWeight: "600" };

// Modal - HIGH Z-INDEX + DARKER BG
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
  backdropFilter: "blur(5px)" 
};

const modalImage = { maxWidth: "100%", maxHeight: "90vh", objectFit: "contain", borderRadius: "4px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", zIndex: 100001 };
const modalCloseBtn = { position: "absolute", top: "20px", right: "20px", background: "rgba(255, 255, 255, 0.1)", color: "#fff", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "2rem", lineHeight: "1", cursor: "pointer", zIndex: 100002, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const modalCounter = { position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", color: "#f8fafc", background: "rgba(0,0,0,0.5)", padding: "4px 12px", borderRadius: "20px", fontWeight: "600", zIndex: 100002 };