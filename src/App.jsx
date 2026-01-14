import React from 'react';
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications"; // 1. IMPORT ADDED
import Contact from "./pages/Contact";

export default function App() {
  return (
    <main style={{ 
      backgroundColor: "#020617", 
      color: "#f8fafc", 
      minHeight: "100vh", 
      fontFamily: "'Inter', sans-serif" 
    }}>
      
      {/* 1. FIXED NAVIGATION */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        backgroundColor: "rgba(2, 6, 23, 0.8)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid #1e293b"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: "800", fontSize: "1.2rem" }}>KV.</span>
          <div style={{ display: "flex", gap: "25px", fontSize: "0.95rem", fontWeight: "500" }}>
            <a href="#home" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>Home</a>
            <a href="#projects" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>Work</a>
            <a href="#contact" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        
        <div id="home">
          <Home />
        </div>

        <div id="projects">
          <Projects />
        </div>

        {/* 2. CERTIFICATIONS SECTION ADDED HERE */}
        <div id="certifications">
          <Certifications />
        </div>

        <div id="contact">
          <Contact />
        </div>

      </div>

      {/* 3. FOOTER */}
      <footer style={{ textAlign: "center", padding: "60px", color: "#475569", borderTop: "1px solid #1e293b", background: "#0f172a" }}>
        &copy; {new Date().getFullYear()} Khen Joshua Verson. All rights reserved.
      </footer>
    </main>
  );
}