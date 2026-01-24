'use client'; 

import { useState } from "react";
// Ensure you have installed: npm install react-icons
import { FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      background: "#ffffff",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      zIndex: 1000
    }}>
      <strong>Khen Verson</strong>

      <div style={{ display: "flex", gap: "25px" }}>
        {/* Pass the icon component and the text label */}
        <NavIcon href="#home" icon={<FaHome size={22} />} label="Home" />
        <NavIcon href="#projects" icon={<FaProjectDiagram size={22} />} label="Projects" />
        <NavIcon href="#contact" icon={<FaEnvelope size={22} />} label="Contact" />
      </div>
    </nav>
  );
}

// --- Helper Component: Icon with Floating Tooltip ---
function NavIcon({ href, icon, label }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative", // Needed for the tooltip to float relative to this icon
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isHovered ? "#007bff" : "#333", // Blue on hover, Dark Grey default
        transition: "color 0.2s ease",
        textDecoration: "none",
        padding: "5px"
      }}
    >
      {/* 1. The Icon (Always Visible) */}
      {icon}

      {/* 2. The Label (Only visible on Hover, floats below) */}
      {isHovered && (
        <span style={{
          position: "absolute",
          top: "100%", // Pushes it right below the icon
          marginTop: "8px", 
          background: "black",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          pointerEvents: "none", // Prevents the tooltip from blocking clicks
          zIndex: 10,
        }}>
          {label}
        </span>
      )}
    </a>
  );
}