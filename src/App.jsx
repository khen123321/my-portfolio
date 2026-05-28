import React, { useState, useEffect, useRef, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

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
  
  const [mainHeight, setMainHeight] = useState(0);
  const mainRef = useRef(null);

  // --- FLIPPING TEXT STATE ---
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Web Developer", "UI/UX Designer", "Full-Stack Dev"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2500); 
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);
  // --------------------------------

  useEffect(() => {
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
  
  // =========================================
  // TEXT TRANSITION MATH
  // =========================================
  const scrollProgress = windowHeight > 0 ? scrollY / windowHeight : 0;
  const textTranslateY = scrollY * 1.5; 
  const textScale = Math.max(0.6, 1 - scrollProgress * 0.5);
  const textOpacity = Math.max(0, 1 - scrollProgress * 1.2);
  const arrowOpacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <div style={{ position: "relative", width: "100%", height: `calc(100vh + ${mainHeight}px)`, fontFamily: "'DM Sans', sans-serif" }}>
      
      <style>{`
        @keyframes coverFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceArrow { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        .bounce-arrow { animation: bounceArrow 2s infinite; }
      `}</style>

      {/* =========================================
          PART 1: THE COVER PAGE
          ========================================= */}
      {isCoverVisible && (
        <section style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 10, 
          backgroundColor: "#030712",
          color: "#ffffff",
          overflow: "hidden",
          transform: `translateY(-${scrollY}px)` 
        }}>
          
          <div style={{ 
            height: "100%", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            padding: "0 24px", // ADDED: Safe padding for mobile screens
            transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            opacity: textOpacity, 
            transformOrigin: "center center"
          }}>
            <div style={{ textAlign: "center", width: "100%", maxWidth: "800px", animation: "coverFadeIn 1.5s ease-out" }}>
              
              {/* RESPONSIVE H1 */}
              <h1 style={{ 
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)", // TWEAKED: Scales better on narrow phones
                fontWeight: "800", 
                margin: "0 0 10px 0", 
                fontFamily: "'Sora', sans-serif", 
                letterSpacing: "-0.02em", 
                color: "#fff",
                lineHeight: "1.1" 
              }}>
                Khen Joshua Verson
              </h1>
              
              {/* --- PERFECTLY CENTERED, MOBILE-SAFE FLIPPING TEXT --- */}
              <h2 style={{ 
                fontSize: "clamp(1.2rem, 5vw, 2rem)", // TWEAKED: Slightly larger base for mobile readability
                fontWeight: "600", 
                margin: "0 auto 20px auto", 
                color: "#3b82f6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "3rem", // ADDED: Locked height ensures the paragraph below doesn't bounce on mobile
              }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={titleNumber}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    style={{ textAlign: "center" }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </h2>
              {/* ------------------------------------------ */}

              <p style={{ fontSize: "clamp(1rem, 4vw, 1.1rem)", color: "#6b7280" }}>
                Building digital experiences that matter.
              </p>
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: "40px", left: 0, width: "100%", display: "flex",
            flexDirection: "column", alignItems: "center", gap: "10px", color: "#6b7280",
            animation: "coverFadeIn 2s ease-out 1s both", opacity: arrowOpacity
          }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.25em", fontWeight: "700" }}>Scroll to uncover</span>
            <svg className="bounce-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
        </section>
      )}

      {/* =========================================
          PART 2: THE MAIN CONTENT
          ========================================= */}
      <main ref={mainRef} style={{
        position: isCoverVisible ? "fixed" : "absolute",
        top: isCoverVisible ? 0 : "100vh",
        left: 0, width: "100%", zIndex: 1, backgroundColor: "#ffffff", minHeight: "100vh",
      }}>

        <nav style={{
          position: "sticky", top: 0, width: "100%", zIndex: 50,
          backgroundColor: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb",
        }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <a href="#home" style={{ fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "1.25rem", color: "#111827", textDecoration: "none", letterSpacing: "-0.03em" }}>
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

        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", paddingTop: "80px" }}>
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

        <footer style={{ textAlign: "center", padding: "40px 24px", color: "#9ca3af", borderTop: "1px solid #e5e7eb", background: "#f9fafb", fontSize: "0.875rem" }}>
          © {new Date().getFullYear()} Khen Joshua Verson — Built with React
        </footer>
      </main>

      <ChatBot />
    </div>
  );
}