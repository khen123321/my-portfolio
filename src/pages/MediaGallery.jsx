import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function MediaGallery({ mediaItems }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState("next");
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const getUrl = (item) => (typeof item === "object" ? item.url : item);
  const getCaption = (item) => (typeof item === "object" ? item.caption : null);

  const isVideo = (url) => {
    if (!url) return false;
    return url.includes("drive.google.com") || url.includes("youtube") || url.includes("vimeo") || url.includes("figma") || url.endsWith(".mp4");
  };

  const isFigma = (url) => url && url.includes("figma");

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
  const itemIsFigma = isFigma(currentUrl);

  const wrapperStyle = itemIsFigma
    ? { ...imageWrapper, aspectRatio: "9/16", maxWidth: "320px", margin: "0 auto" }
    : imageWrapper;

  const renderContent = (url, isModal = false) => {
    let animationClass = "";
    if (isModal) animationClass = isFirstOpen ? "slow-zoom-anim" : direction === "next" ? "slide-in-right" : "slide-in-left";
    
    if (isVideo(url)) {
      if (url.endsWith(".mp4")) {
        return (
          <video src={url} className={animationClass} style={isModal ? modalVideoStyle : galleryVideoStyle} autoPlay loop muted playsInline controls={isModal} />
        );
      }
      return <iframe src={url} title="Interactive Preview" className={animationClass} style={isModal ? modalVideoStyle : galleryVideoStyle} allow="autoplay; encrypted-media" allowFullScreen></iframe>;
    }
    
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
        <div style={wrapperStyle} onClick={!itemIsVideo ? openModal : undefined}>
          {renderContent(currentUrl)}
          {!itemIsVideo && <div className="overlay-hint" style={overlayHint}>Click to expand ↗</div>}
          {itemIsVideo && (
            <div style={itemIsFigma ? figmaLabel : videoLabel}>
              {itemIsFigma ? "Interactive Prototype" : "Video Preview"}
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
}

// STYLES FOR THE GALLERY
const carouselContainer = { position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" };
const imageWrapper = { width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb", backgroundColor: "#f3f4f6", position: "relative", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" };
const galleryImage = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const galleryVideoStyle = { width: "100%", height: "100%", border: "none", display: "block", objectFit: "cover" };
const modalVideoStyle = { width: "100%", height: "100%", border: "none", objectFit: "contain", backgroundColor: "#000" };
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