import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function MediaGallery({ mediaItems }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!mediaItems || mediaItems.length === 0) return null;

  const getUrl = (item) => (typeof item === "object" ? item.url : item);
  const getCaption = (item) => (typeof item === "object" ? item.caption : null);
  const isVideo = (url) => {
    if (!url) return false;
    return url.includes("drive.google.com") || url.includes("youtube") || url.includes("vimeo") || url.includes("figma") || url.endsWith(".mp4");
  };
  const isFigma = (url) => url && url.includes("figma");

  const currentItem = mediaItems[currentIndex];
  const currentUrl = getUrl(currentItem);
  const currentCaption = getCaption(currentItem);
  const itemIsVideo = isVideo(currentUrl);
  const itemIsFigma = isFigma(currentUrl);

  const nextSlide = (event) => {
    event.stopPropagation();
    setCurrentIndex((index) => (index + 1) % mediaItems.length);
  };

  const prevSlide = (event) => {
    event.stopPropagation();
    setCurrentIndex((index) => (index - 1 + mediaItems.length) % mediaItems.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const renderContent = (url, isModal = false) => {
    if (isVideo(url)) {
      if (url.endsWith(".mp4")) {
        return (
          <video src={url} className="gallery-media" preload="metadata" muted playsInline controls={isModal} />
        );
      }

      return (
        <iframe
          src={url}
          title="Interactive Preview"
          className="gallery-media"
          loading="lazy"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      );
    }

    return <img src={url} alt="Project preview" className="gallery-media" loading="lazy" decoding="async" />;
  };

  const modalContent = (
    <div className="gallery-modal-overlay" onClick={closeModal}>
      <div className="gallery-modal-wrapper" onClick={(event) => event.stopPropagation()}>
        <button className="gallery-close-btn" onClick={closeModal} aria-label="Close media preview" type="button">x</button>
        <div className="gallery-modal-media">
          {renderContent(currentUrl, true)}
        </div>
        {currentCaption && (
          <div className="gallery-info-panel">
            <span className="meta-label">Image Details</span>
            <p>{currentCaption}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="gallery-container">
        <div className={`gallery-frame ${itemIsFigma ? "figma-frame" : "default-frame"}`} onClick={!itemIsVideo ? openModal : undefined}>
          {renderContent(currentUrl)}
          <span className="preview-badge">{itemIsFigma ? "Figma" : itemIsVideo ? "Video" : "Preview"}</span>
          {!itemIsVideo && <span className="enlarge-hint">expand</span>}
          {mediaItems.length > 1 && (
            <>
              <button className="gallery-nav-btn" onClick={prevSlide} type="button" aria-label="Previous media" style={{ left: "10px" }}>{"<"}</button>
              <button className="gallery-nav-btn" onClick={nextSlide} type="button" aria-label="Next media" style={{ right: "10px" }}>{">"}</button>
            </>
          )}
        </div>
        <div className="gallery-counter">{currentIndex + 1} / {mediaItems.length}</div>
      </div>
      {isModalOpen && !itemIsVideo && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
}
