import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import Home from "./pages/Home";
import CodedProjects from "./pages/CodedProjects";
import FigmaDesigns from "./pages/FigmaDesigns";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import ChatBot from "./components/ChatBot";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

const navItems = [
  { href: "#projects", number: "01", label: "work" },
  { href: "#profile", number: "02", label: "about" },
  { href: "#stack", number: "03", label: "stack" },
  { href: "#certifications", number: "04", label: "credentials" },
  { href: "#contact", number: "05", label: "contact" },
];

const sidebarLinks = [
  { label: "github", href: "https://github.com/khen123321" },
  { label: "email", href: "mailto:versonkhenjoshua@gmail.com" },
  { label: "resume", href: "/resume.pdf" },
];

const profileFacts = [
  { label: "ROLE", value: "Web Developer / UI Designer" },
  { label: "EDUCATION", value: "BS Information Technology, USTP" },
  { label: "FOCUS", value: "Interfaces, dashboards and practical web systems" },
];

const experience = [
  {
    title: "IT Intern / Programmer",
    org: "CLIMBS Life and General Insurance Cooperative",
    date: "2026",
    description:
      "Developed and supported CIMS, including intern workflows, HR/admin screens, DTR processes, reports, and role-based access.",
  },
  {
    title: "Web Developer / UI Designer",
    org: "Freelance",
    date: "Project-based",
    description:
      "Built client-facing web experiences and practical interfaces, including the Wedding RSVP & Access Control project and dashboard-oriented workflows.",
  },
];

const stackGroups = [
  { title: "Frontend", items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"] },
  { title: "Backend", items: ["Laravel", "PHP", "Supabase"] },
  { title: "Data", items: ["MySQL", "PostgreSQL", "Firebase", "Google Sheets"] },
  { title: "Deployment", items: ["Vercel"] },
  { title: "Design", items: ["Figma", "Wireframing", "Prototyping", "UI/UX Design"] },
];

function resolveThemePreference(mode) {
  if (mode === "light" || mode === "dark") return mode;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialThemeMode() {
  if (typeof window === "undefined") return "system";
  const saved = window.localStorage.getItem("theme-mode");
  if (saved === "system" || saved === "light" || saved === "dark") return saved;
  return "system";
}

function getRevealRadius(x, y) {
  const distances = [
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y),
  ];
  return `${Math.ceil(Math.max(...distances))}px`;
}

function themeBackground(theme) {
  return theme === "dark" ? "#0c0c0f" : "#ffffff";
}

function setDocumentTheme(mode) {
  const resolved = resolveThemePreference(mode);
  document.documentElement.dataset.themeMode = mode;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  window.localStorage.setItem("theme-mode", mode);
}

function LayoutChrome({ themeMode, onThemeChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <aside className="desktop-sidebar" aria-label="Primary navigation">
        <div className="sidebar-top">
          <a className="wordmark" href="#home" aria-label="Khen Joshua Verson home">KV<span className="wordmark-cursor">_</span></a>
          <nav className="sidebar-group">
            {navItems.map((item) => (
              <a className="sidebar-link" href={item.href} key={item.href}>{item.label}</a>
            ))}
            <ChatBot />
          </nav>
        </div>

        <div className="sidebar-bottom">
          <hr className="sidebar-rule" />
          <div className="sidebar-group">
            {sidebarLinks.map((link) => (
              <a
                className="sidebar-external"
                href={link.href}
                target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                key={link.label}
              >
                {link.label} -&gt;
              </a>
            ))}
          </div>
          <ThemeToggle themeMode={themeMode} onThemeChange={onThemeChange} />
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <div className="site-container mobile-nav-inner">
          <a className="wordmark" href="#home" onClick={closeMenu}>KV<span className="wordmark-cursor">_</span></a>
          <button className="menu-button" type="button" onClick={() => setIsMenuOpen(true)} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
            Menu
          </button>
        </div>
      </nav>

      <div className="mobile-menu" id="mobile-menu" hidden={!isMenuOpen}>
        <div>
          <div className="mobile-menu-top">
            <a className="wordmark" href="#home" onClick={closeMenu}>KV<span className="wordmark-cursor">_</span></a>
            <button className="menu-button" type="button" onClick={closeMenu}>Close</button>
          </div>
          <div className="mobile-menu-links">
            {navItems.map((item) => (
              <a className="mobile-menu-link" href={item.href} key={item.href} onClick={closeMenu}>
                <span>{item.number}</span>{item.label}
              </a>
            ))}
            <ChatBot />
          </div>
        </div>
        <div className="mobile-menu-actions">
          {sidebarLinks.map((link) => (
            <a
              className="sidebar-external"
              href={link.href}
              target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
              rel={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              key={link.label}
              onClick={closeMenu}
            >
              {link.label} -&gt;
            </a>
          ))}
          <ThemeToggle themeMode={themeMode} onThemeChange={onThemeChange} />
        </div>
      </div>
    </>
  );
}

function Profile() {
  return (
    <section id="profile" className="section">
      <div className="site-container profile-grid">
        <div>
          <span className="section-label">02 - Profile</span>
          <h2 className="profile-title">Design-minded developer building useful products.</h2>
          <p className="profile-copy">
            I work across UI/UX and web development, turning ideas and prototypes into usable web interfaces and functional systems.
          </p>
        </div>

        <div className="profile-facts" aria-label="Profile facts">
          {profileFacts.map((fact) => (
            <div className="fact-row" key={fact.label}>
              <span className="meta-label">{fact.label}</span>
              <span className="meta-value">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="site-container experience-grid">
        <div>
          <span className="section-label">Experience</span>
          <h2 className="profile-title">Relevant work, plainly stated.</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={`${item.title}-${item.org}`}>
              <div className="timeline-top">
                <span className="timeline-date">{item.date}</span>
                <div>
                  <h3 className="timeline-title">{item.org}</h3>
                  <div className="timeline-org">{item.title}</div>
                </div>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="section">
      <div className="site-container stack-layout">
        <div>
          <span className="section-label">03 - Stack</span>
          <h2 className="stack-title-main">Tools I use to design and build.</h2>
        </div>
        <div className="stack-grid">
          {stackGroups.map((group) => (
            <div className="stack-group" key={group.title}>
              <h3 className="stack-group-title">{group.title}</h3>
              <div className="stack-list">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-content">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} Khen Joshua Verson</span>
          <span>Built with React</span>
        </div>
        <div className="footer-credit">
          <span>Design inspiration — </span>
          <a className="footer-link" href="https://800k.dev/" target="_blank" rel="noopener noreferrer">
            800k.dev ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);

  useEffect(() => {
    setDocumentTheme(themeMode);

    if (themeMode !== "system") return undefined;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => setDocumentTheme("system");
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [themeMode]);

  const changeThemeMode = (nextMode, buttonElement) => {
    const nextTheme = resolveThemePreference(nextMode);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = buttonElement?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const radius = getRevealRadius(x, y);

    document.documentElement.style.setProperty("--reveal-x", `${x}px`);
    document.documentElement.style.setProperty("--reveal-y", `${y}px`);
    document.documentElement.style.setProperty("--reveal-radius", radius);

    const apply = () => {
      setThemeMode(nextMode);
      setDocumentTheme(nextMode);
    };

    if (prefersReducedMotion) {
      apply();
      return;
    }

    if (document.startViewTransition) {
      document.documentElement.classList.add("theme-revealing");
      const transition = document.startViewTransition(() => flushSync(apply));
      transition.finished.finally(() => document.documentElement.classList.remove("theme-revealing"));
      return;
    }

    const overlay = document.createElement("span");
    overlay.className = "theme-transition-overlay";
    overlay.style.setProperty("--reveal-x", `${x}px`);
    overlay.style.setProperty("--reveal-y", `${y}px`);
    overlay.style.setProperty("--reveal-color", themeBackground(nextTheme));
    overlay.style.setProperty("--fallback-scale", `${Math.ceil(parseInt(radius, 10) * 2)}`);
    document.body.appendChild(overlay);
    window.setTimeout(apply, 210);
    overlay.addEventListener("animationend", () => overlay.remove(), { once: true });
  };

  return (
    <div className="app-shell">
      <LayoutChrome themeMode={themeMode} onThemeChange={changeThemeMode} />
      <main className="site-main">
        <Home />
        <CodedProjects />
        <FigmaDesigns />
        <Profile />
        <Experience />
        <Stack />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
