import React, { useState, useEffect, useRef } from "react";
import Home from "./pages/Home";
import CodedProjects from "./pages/CodedProjects"; 
import FigmaDesigns from "./pages/FigmaDesigns";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import ChatBot from "./components/ChatBot";
import "./App.css";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(() => 
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  
  // NEW: We need to measure the actual height of your portfolio content
  // so the browser knows exactly how far to let you scroll!
  const [mainHeight, setMainHeight] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
    // This watches your main content. If it grows or shrinks, it updates the height automatically.
    if (!mainRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      setMainHeight(entries[0].contentRect.height);
    });
    resizeObserver.observe(mainRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isCoverVisible = scrollY <= windowHeight;

  return (
    // We explicitly set the height here to 100vh (for the cover) + the height of your content.
    // This forces the browser to give you a working scrollbar!
    <div style={{ position: "relative", width: "100%", height: `calc(100vh + ${mainHeight}px)`, fontFamily: "'DM Sans', sans-serif" }}>
      
      <style>{`
        @keyframes coverFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceArrow { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        .bounce-arrow { animation: bounceArrow 2s infinite; }
      `}</style>

      {/* =========================================
          PART 1: THE COVER PAGE (The Curtain)
          ========================================= */}
      {isCoverVisible && (
        <section style={{
          position: "fixed", // Keeps it locked to the camera...
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 10, // ON TOP of the main content
          backgroundColor: "#030712",
          color: "#ffffff",
          overflow: "hidden",
          // ...but manually slides it UP based exactly on how much you've scrolled!
          transform: `translateY(-${scrollY}px)` 
        }}>
          <div style={{ textAlign: "center", animation: "coverFadeIn 1.5s ease-out", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "800", margin: "0 0 10px 0", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em", color: "#fff" }}>
              Khen Joshua Verson
            </h1>
            <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: "600", margin: "0 0 20px 0", color: "#9ca3af" }}>
              <span style={{ color: "#3b82f6" }}>Web Developer</span>
              <span style={{ color: "#4b5563", fontWeight: "400" }}> & </span>
              <span style={{ color: "#3b82f6" }}>UI/UX Designer</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6b7280" }}>Building digital experiences that matter.</p>
          </div>

          <div style={{
  position: "absolute",
  bottom: "50px",
  left: 0,             // Add this!
  width: "100%",       // Add this!
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  color: "#6b7280",
  animation: "coverFadeIn 2s ease-out 1s both"
}}>
  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.25em", fontWeight: "700" }}>
    Scroll to uncover
  </span>
  <svg className="bounce-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
</div>
        </section>
      )}

      {/* =========================================
          PART 2: THE MAIN CONTENT (The Stage)
          ========================================= */}
      <main ref={mainRef} style={{
        // MAGIC TRICK: Stays perfectly fixed on screen while the cover is lifting.
        // Once the cover is gone, it instantly drops into the page exactly where the scroll is!
        position: isCoverVisible ? "fixed" : "absolute",
        top: isCoverVisible ? 0 : "100vh",
        left: 0,
        width: "100%",
        zIndex: 1, // UNDER the cover
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}>

        {/* --- NAVIGATION --- */}
        <nav style={{
          position: "sticky", 
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
            <a href="#home" style={{
              fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "1.25rem", color: "#111827", textDecoration: "none", letterSpacing: "-0.03em",
            }}>
              KV<span style={{ color: "#2563eb" }}>.</span>
            </a>
            <div style={{ display: "flex", gap: "4px" }}>
              {[
                { href: "#home",          label: "Home" },
                { href: "#projects",      label: "Work" },
                { href: "#certifications",label: "Certs" },
                { href: "#contact",       label: "Contact" },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="nav-link">{label}</a>
              ))}
            </div>
          </div>
        </nav>

        {/* --- PORTFOLIO CONTENT --- */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 40px", paddingTop: "80px" }}>
          
          <div id="home"><Home /></div>
          
          <hr className="section-divider" />
          
          <div id="projects">
            <CodedProjects />
            <FigmaDesigns />
          </div>
          
          <hr className="section-divider" />
          <div id="certifications"><Certifications /></div>
          
          <hr className="section-divider" />
          <div id="contact"><Contact /></div>
        
        </div>

        {/* --- FOOTER --- */}
        <footer style={{
          textAlign: "center", padding: "40px", color: "#9ca3af", borderTop: "1px solid #e5e7eb", background: "#f9fafb", fontSize: "0.875rem",
        }}>
          © {new Date().getFullYear()} Khen Joshua Verson — Built with React
        </footer>
      </main>

      {/* --- AI CHATBOT --- */}
      <ChatBot />
    </div>
  );
}