import React, { useState } from 'react';
// 1. IMPORT ICONS
import { FaHome, FaBriefcase, FaCertificate, FaEnvelope } from "react-icons/fa";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications"; 
import Contact from "./pages/Contact";
import "./App.css"; 

export default function App() {
  // --- MOUSE TRACKING FOR FLASHLIGHT EFFECT ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  return (
    <main 
      onMouseMove={handleMouseMove}
      style={{ 
        minHeight: "100vh", 
        color: "#f8fafc", 
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        // The Dark Flashlight Background
        background: `
          radial-gradient(
            600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(29, 78, 216, 0.15), 
            transparent 80%
          ),
          #020617` 
      }}
    >
      
      {/* GLOBAL STYLES (Smooth Scroll) */}
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
      `}</style>

      {/* --- FIXED NAVIGATION --- */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        backgroundColor: "rgba(2, 6, 23, 0.7)", 
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div className="nav-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "15px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Logo */}
          <a href="#home" style={{ fontWeight: "800", fontSize: "1.2rem", color: "#f8fafc", textDecoration: "none" }}>KV.</a>
          
          {/* ICON LINKS CONTAINER */}
          <div style={{ display: "flex", gap: "25px" }}>
            <NavIcon href="#home" icon={<FaHome size={20} />} label="Home" />
            <NavIcon href="#projects" icon={<FaBriefcase size={20} />} label="Work" />
            <NavIcon href="#certifications" icon={<FaCertificate size={20} />} label="Certificates" />
            <NavIcon href="#contact" icon={<FaEnvelope size={20} />} label="Contact" />
          </div>

        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <div id="home"><Home /></div>
        <div id="projects"><Projects /></div>
        <div id="certifications"><Certifications /></div>
        <div id="contact"><Contact /></div>
      </div>

      {/* --- FOOTER --- */}
      <footer style={{ textAlign: "center", padding: "60px", color: "#475569", borderTop: "1px solid #1e293b", background: "rgba(15, 23, 42, 0.8)" }}>
        &copy; {new Date().getFullYear()} Khen Joshua Verson. All rights reserved.
      </footer>
    </main>
  );
}

// --- HELPER COMPONENT: ICON WITH TOOLTIP ---
function NavIcon({ href, icon, label }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        color: isHovered ? "#3b82f6" : "#94a3b8", // Blue on hover, Grey default
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition: "color 0.2s ease",
        padding: "10px", // Clickable area
      }}
    >
      {/* 1. The Icon */}
      {icon}

      {/* 2. The Tooltip (Label) - Shows only on Hover */}
      {isHovered && (
        <span style={{
          position: "absolute",
          top: "100%", // Pushes it below the icon
          marginTop: "10px", 
          left: "50%",
          transform: "translateX(-50%)", // Centers it
          background: "rgba(15, 23, 42, 0.9)", // Dark background matching theme
          border: "1px solid #1e293b",
          color: "#f8fafc",
          padding: "5px 10px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
        }}>
          {label}
        </span>
      )}
    </a>
  );
}