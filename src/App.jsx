import React from "react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import ChatBot from "./components/ChatBot";
import "./App.css";

export default function App() {
  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>

      {/* --- FIXED NAVIGATION --- */}
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <div style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "0 40px",
          height: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          {/* Logo */}
          <a href="#home" style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: "800",
            fontSize: "1.25rem",
            color: "#111827",
            textDecoration: "none",
            letterSpacing: "-0.03em",
          }}>
            KV<span style={{ color: "#2563eb" }}>.</span>
          </a>

          {/* Nav Links */}
          <div style={{ display: "flex", gap: "4px" }}>
            {[
              { href: "#home",           label: "Home" },
              { href: "#projects",       label: "Work" },
              { href: "#certifications", label: "Certs" },
              { href: "#contact",        label: "Contact" },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 40px" }}>
        <div id="home"><Home /></div>
        <hr className="section-divider" />
        <div id="projects"><Projects /></div>
        <hr className="section-divider" />
        <div id="certifications"><Certifications /></div>
        <hr className="section-divider" />
        <div id="contact"><Contact /></div>
      </div>

      {/* --- FOOTER --- */}
      <footer style={{
        textAlign: "center",
        padding: "40px",
        color: "#9ca3af",
        borderTop: "1px solid #e5e7eb",
        background: "#f9fafb",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.875rem",
      }}>
        © {new Date().getFullYear()} Khen Joshua Verson — Built with React
      </footer>

      {/* --- AI CHATBOT --- */}
      <ChatBot />
    </main>
  );
}