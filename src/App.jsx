import React, { useState } from 'react';
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications"; 
import Contact from "./pages/Contact";
import "./App.css"; 

export default function App() {
  // 1. TRACK MOUSE COORDINATES
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // pageX/Y includes scrolling, which is what we want for a full page
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
        
        // --- THE GLOBAL FLASHLIGHT EFFECT ---
        // This gradient moves wherever your mouse is (mousePosition.x/y)
        background: `
          radial-gradient(
            600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(29, 78, 216, 0.15), 
            transparent 80%
          ),
          #020617` // This #020617 is the dark background behind the light
      }}
    >
      
      {/* GLOBAL SCROLL & NAV STYLES */}
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        .nav-link { color: #94a3b8; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #3b82f6 !important; }
        @media (max-width: 600px) {
          .nav-content { padding: 15px 20px !important; }
          .nav-links-group { gap: 15px !important; font-size: 0.8rem !important; }
        }
      `}</style>

      {/* 1. FIXED NAVIGATION */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        backgroundColor: "rgba(2, 6, 23, 0.7)", 
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div className="nav-content" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#home" style={{ fontWeight: "800", fontSize: "1.2rem", color: "#f8fafc", textDecoration: "none" }}>KV.</a>
          <div className="nav-links-group" style={{ display: "flex", gap: "25px", fontSize: "0.95rem", fontWeight: "500" }}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#projects" className="nav-link">Work</a>
            <a href="#certifications" className="nav-link">Certs</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <div id="home"><Home /></div>
        <div id="projects"><Projects /></div>
        
        {/* IMPORTANT: If Certifications.js still has its own onMouseMove, remove it! 
            The global one in App.js will now cover it. */}
        <div id="certifications"><Certifications /></div>
        
        <div id="contact"><Contact /></div>
      </div>

      {/* 3. FOOTER */}
      <footer style={{ textAlign: "center", padding: "60px", color: "#475569", borderTop: "1px solid #1e293b", background: "rgba(15, 23, 42, 0.8)" }}>
        &copy; {new Date().getFullYear()} Khen Joshua Verson. All rights reserved.
      </footer>
    </main>
  );
}