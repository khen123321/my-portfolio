import React, { useState } from "react";
// import "../App.css"; 

// ==========================================
//  COMPONENT: MediaGallery
// ==========================================
const MediaGallery = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper: Checks if the URL is video or interactive embed
  const isVideo = (url) => {
    return (
      url.includes("drive.google.com") || 
      url.includes("youtube") || 
      url.includes("vimeo") || 
      url.includes("figma")
    );
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
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

  // Render content
  const renderContent = (url, isFullSize = false) => {
    if (isVideo(url)) {
      return (
        <iframe 
          src={url} 
          title="Interactive Preview" 
          style={isFullSize ? modalVideoStyle : galleryVideoStyle} 
          allow="autoplay; encrypted-media" 
          allowFullScreen
        ></iframe>
      );
    }
    return (
      <img 
        src={url} 
        alt="Project Preview" 
        style={isFullSize ? modalImage : galleryImage} 
      />
    );
  };

  return (
    <>
      {/* --- CAROUSEL --- */}
      <div style={carouselContainer}>
        <div style={imageWrapper} onClick={!itemIsVideo ? openModal : undefined}>
          
          {renderContent(currentItem)}

          {/* Hints */}
          {!itemIsVideo && <div style={overlayHint}>Click to expand ↗</div>}
          
          {/* Dynamic Label */}
          {itemIsVideo && (
            <div style={currentItem.includes("figma") ? figmaLabel : videoLabel}>
               {currentItem.includes("figma") ? "Interactive Prototype" : "Video Preview"}
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
          <>
            <button onClick={prevSlide} style={{ ...navButton, left: "10px" }}>&#10094;</button>
            <button onClick={nextSlide} style={{ ...navButton, right: "10px" }}>&#10095;</button>
          </>
        )}
         <div style={counterIndicator}>{currentIndex + 1} / {mediaItems.length}</div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && !itemIsVideo && (
        <div style={modalOverlay} onClick={closeModal}>
          <button style={modalCloseBtn} onClick={closeModal}>&times;</button>
           
           {mediaItems.length > 1 && (
             <>
               <button onClick={prevSlide} style={{ ...modalNavBtn, left: "20px" }}>&#10094;</button>
               <button onClick={nextSlide} style={{ ...modalNavBtn, right: "20px" }}>&#10095;</button>
             </>
           )}

          {renderContent(currentItem, true)}

          <div style={modalCounter}>{currentIndex + 1} / {mediaItems.length}</div>
        </div>
      )}
    </>
  );
};


// ==========================================
// 1. DATA: SELECTED WORKS
// ==========================================
const projects = [
  {
    title: "Storage Management System",
    category: "Web Application",
    description: "A professional inventory tracker using Google Sheets for data management, featuring automated statistics generation and secure user authentication.",
    tech: ["React", "Firebase Auth", "Google Sheets", "Chart.js"],
    link: "https://storage-management-gilt.vercel.app/",
    media: [
        "/management sample/sample.png",
        "/management sample/sample1.png",
        "/management sample/sample2.png",
        "/management sample/sample3.png"
    ]
  },
];

// ==========================================
// 2. DATA: TECHNICAL DEMOS
// ==========================================
const demos = [
  {
    title: "3D Model with Animation",
    description: "A technical 3D visualization for P-Lament, a thesis capstone project. This animation demonstrates the mechanical design and operational workflow of an IoT-enabled recycling system.",
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
    <div className="section-padding" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* ---------------------------
          PART 1: SELECTED WORKS
         --------------------------- */}
       <section style={{ borderBottom: "1px solid #1e293b", paddingBottom: "60px", marginBottom: "60px", marginTop: "60px" }}>
        <h2 style={headerStyle}>
          <span style={{ color: "#3b82f6", marginRight: "10px" }}>01.</span> 
          Selected Works
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {projects.map((project, index) => (
            /* --- UPDATED: Uses 'responsive-grid' class instead of inline grid style --- */
            <div key={index} className="responsive-grid" style={{ alignItems: "start" }}>
              
              {/* LEFT: Info */}
              <div style={{position: 'sticky', top: '20px'}}>
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
                 <MediaGallery mediaItems={project.media} />

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

      {/* ---------------------------
          PART 2: TECHNICAL DEMOS
         --------------------------- */}
      <section>
        <h2 style={headerStyle}>
          <span style={{ color: "#3b82f6", marginRight: "10px" }}>02.</span> 
          Technical Demos
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
          {demos.map((demo, index) => (
             /* --- UPDATED: Uses 'responsive-grid' class --- */
            <div key={index} className="responsive-grid" style={{ alignItems: "start" }}>
              
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
              <div>
                <MediaGallery mediaItems={demo.media} />
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// =======================
// STYLES
// =======================

const headerStyle = { fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: "800", marginBottom: "80px", color: "#f8fafc", letterSpacing: "-0.03em" };
const categoryBadge = { color: "#60a5fa", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", display: "inline-block" };
const projectTitle = { fontSize: "2rem", fontWeight: "700", color: "#f8fafc", margin: "10px 0 20px 0", lineHeight: "1.2" };
const demoTitle = { fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc", marginBottom: "15px" };
const descriptionText = { fontSize: "1rem", lineHeight: "1.7", color: "#94a3b8", margin: 0, maxWidth: '600px' };

const viewProjectBtn = { 
  display: "inline-flex", 
  alignItems: "center", 
  textDecoration: "none", 
  color: "#60a5fa", 
  fontWeight: "700", 
  fontSize: "1.25rem", 
  marginTop: "40px",    
  borderBottom: "2px solid rgba(96, 165, 250, 0.3)", 
  paddingBottom: "4px", 
  transition: "all 0.2s ease" 
};

// Tech & Labels
const techLabel = { fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", fontWeight: "700", marginBottom: "5px" };
const techPill = { fontSize: "0.8rem", fontWeight: "600", padding: "8px 16px", borderRadius: "8px", backgroundColor: "rgba(30, 41, 59, 0.5)", color: "#cbd5e1", border: "1px solid #334155" };

// Gallery
const carouselContainer = { position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" };
const imageWrapper = { width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", border: "1px solid #334155", backgroundColor: "#0f172a", position: "relative", cursor: "pointer", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" };
const galleryImage = { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" };
const galleryVideoStyle = { width: "100%", height: "100%", border: "none", display: "block" };
const modalVideoStyle = { width: "80vw", height: "80vh", border: "none" };

// Badges
const videoLabel = { position: 'absolute', top: '10px', right: '10px', background: '#ef4444', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', pointerEvents: 'none' };
const figmaLabel = { position: 'absolute', top: '10px', right: '10px', background: '#a855f7', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', pointerEvents: 'none' };

const overlayHint = { position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', pointerEvents: 'none' };
const navButton = { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(15, 23, 42, 0.8)", color: "#f8fafc", border: "1px solid #334155", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, fontSize: "1.2rem", transition: "all 0.2s ease" };
const counterIndicator = { position: "absolute", bottom: "-25px", right: "0", color: "#94a3b8", fontSize: "0.85rem", fontWeight: "600" };

// Modal
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px", backdropFilter: "blur(5px)" };
const modalImage = { maxWidth: "95%", maxHeight: "95vh", objectFit: "contain", borderRadius: "4px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" };
const modalCloseBtn = { position: "absolute", top: "20px", right: "20px", background: "rgba(255, 255, 255, 0.1)", color: "#fff", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "2rem", lineHeight: "1", cursor: "pointer", zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const modalNavBtn = { ...navButton, background: "rgba(255, 255, 255, 0.1)", border: "none", width: "50px", height: "50px", fontSize: "1.5rem" };
const modalCounter = { position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", color: "#f8fafc", background: "rgba(0,0,0,0.5)", padding: "4px 12px", borderRadius: "20px", fontWeight: "600" };