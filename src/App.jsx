import React, { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import CodedProjects from "./pages/CodedProjects";
import FigmaDesigns from "./pages/FigmaDesigns";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import ChatBot from "./components/ChatBot";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

const navItems = [
  { path: "/work", number: "01", label: "work" },
  { path: "/about", number: "02", label: "about" },
  { path: "/stack", number: "03", label: "stack" },
  { path: "/credentials", number: "04", label: "credentials" },
  { path: "/contact", number: "05", label: "contact" },
];

const routeTitles = {
  "/": "Khen Joshua Verson — Portfolio",
  "/work": "Work — Khen Joshua Verson",
  "/about": "About — Khen Joshua Verson",
  "/stack": "Stack — Khen Joshua Verson",
  "/credentials": "Credentials — Khen Joshua Verson",
  "/contact": "Contact — Khen Joshua Verson",
};

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
      "Developed CIMS intern workflows, HR/admin screens, DTR processes, reports, and role-based access.",
  },
  {
    title: "Web Developer / UI Designer",
    org: "Freelance",
    date: "Project-based",
    description:
      "Built client web experiences, including RSVP/access workflows and dashboard interfaces.",
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

function shouldShowIntroLoader() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem("portfolio-intro-seen") !== "true";
}

function PortfolioLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    let animationFrame = 0;
    let holdTimer = 0;
    let exitTimer = 0;

    document.body.style.overflow = "hidden";

    const complete = () => {
      window.sessionStorage.setItem("portfolio-intro-seen", "true");
      onComplete();
    };

    if (prefersReducedMotion) {
      holdTimer = window.setTimeout(() => {
        setProgress(100);
        exitTimer = window.setTimeout(() => {
          setIsExiting(true);
          exitTimer = window.setTimeout(complete, 120);
        }, 120);
      }, 0);
    } else {
      const duration = 1350;
      const start = performance.now();

      const tick = (time) => {
        const elapsed = Math.min(time - start, duration);
        const t = elapsed / duration;
        const eased = t < 0.55
          ? (t / 0.55) * 0.6
          : t < 0.86
            ? 0.6 + ((t - 0.55) / 0.31) * 0.3
            : 0.9 + (1 - Math.pow(1 - ((t - 0.86) / 0.14), 2)) * 0.1;

        setProgress(Math.min(100, Math.round(eased * 100)));

        if (elapsed < duration) {
          animationFrame = requestAnimationFrame(tick);
          return;
        }

        setProgress(100);
        holdTimer = window.setTimeout(() => {
          setIsExiting(true);
          exitTimer = window.setTimeout(complete, 460);
        }, 130);
      };

      animationFrame = requestAnimationFrame(tick);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(holdTimer);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro-loader ${isExiting ? "is-exiting" : ""}`} role="status" aria-live="polite" aria-label={`Loading portfolio ${progress}%`}>
      <header className="intro-loader-top">
        <span>KV</span>
      </header>
      <span className="halftone-field intro-loader-halftone" aria-hidden="true" />
      <div className="intro-loader-center">
        <div className="intro-loader-label">loading portfolio<span className="cursor-mark">_</span></div>
        <div className="intro-loader-percent">{progress}%</div>
        <div className="intro-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="intro-progress-labels" aria-hidden="true">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

function ScrollAndTitleManager() {
  const location = useLocation();

  useEffect(() => {
    document.title = routeTitles[location.pathname] || routeTitles["/"];
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function LayoutChrome({ themeMode, onThemeChange }) {
  const navigate = useNavigate();
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [mobileChatOpenSignal, setMobileChatOpenSignal] = useState(0);
  const pendingMenuActionRef = useRef(null);
  const location = useLocation();

  const isMenuOpen = isMenuMounted && !isMenuClosing;

  const openMenu = useCallback(() => {
    setIsMenuMounted(true);
    setIsMenuClosing(false);
  }, []);

  const closeMenu = useCallback(() => {
    if (!isMenuMounted || isMenuClosing) return;
    setIsMenuClosing(true);
  }, [isMenuClosing, isMenuMounted]);

  useEffect(() => {
    if (!isMenuClosing) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const closeTimer = window.setTimeout(() => {
      const pendingAction = pendingMenuActionRef.current;
      pendingMenuActionRef.current = null;
      setIsMenuMounted(false);
      setIsMenuClosing(false);
      if (pendingAction) {
        window.setTimeout(pendingAction, 0);
      }
    }, prefersReducedMotion ? 40 : 380);

    return () => window.clearTimeout(closeTimer);
  }, [isMenuClosing]);

  useEffect(() => {
    if (!isMenuMounted) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isMenuMounted]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    document.documentElement.classList.add("mobile-menu-active");

    return () => {
      document.documentElement.classList.remove("mobile-menu-active");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuMounted) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, isMenuMounted]);

  const handleMobileRouteClick = (event, path) => {
    event.preventDefault();
    closeMenu();
    window.setTimeout(() => navigate(path), 120);
  };

  const closeMenuThen = useCallback((action) => {
    pendingMenuActionRef.current = action;

    if (!isMenuMounted) {
      const pendingAction = pendingMenuActionRef.current;
      pendingMenuActionRef.current = null;
      pendingAction?.();
      return;
    }

    closeMenu();
  }, [closeMenu, isMenuMounted]);

  const openMobileChatFromMenu = () => {
    closeMenuThen(() => setMobileChatOpenSignal((signal) => signal + 1));
  };

  return (
    <>
      <aside className="desktop-sidebar" aria-label="Primary navigation">
        <div className="sidebar-top">
          <Link className="wordmark" to="/" aria-label="Khen Joshua Verson home">KV<span className="wordmark-cursor">_</span></Link>
          <nav className="sidebar-group">
            {navItems.map((item) => (
              <NavLink className={({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`} to={item.path} key={item.path}>
                {item.label}
              </NavLink>
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
          <Link className="wordmark" to="/" onClick={closeMenu}>KV<span className="wordmark-cursor">_</span></Link>
          <button className="menu-button" type="button" onClick={isMenuMounted ? closeMenu : openMenu} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
            {isMenuMounted ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? "is-open" : ""} ${isMenuClosing ? "is-closing" : ""}`} id="mobile-menu" hidden={!isMenuMounted}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-links">
            {navItems.map((item) => (
              <button className={`mobile-menu-link${location.pathname === item.path ? " is-active" : ""}`} type="button" key={item.path} onClick={(event) => handleMobileRouteClick(event, item.path)}>
                <span>{item.number}</span>{item.label}
              </button>
            ))}
            <button className="chat-fab sidebar-link" type="button" onClick={openMobileChatFromMenu} aria-label="Open KV.AI">
              <span aria-hidden="true">06</span>
              question?
            </button>
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
      </div>
      <ChatBot hideLauncher openSignal={mobileChatOpenSignal} openLocation="mobile-menu" />
    </>
  );
}

function Profile() {
  return (
    <section id="profile" className="section">
      <div className="site-container profile-grid">
        <div>
          <span className="section-label">02 - Profile</span>
          <h2 className="profile-title">I work between interface design and web development.</h2>
          <p className="profile-copy">
            I turn prototypes and requirements into usable interfaces, dashboards, and web systems.
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
          <h2 className="profile-title">Relevant work.</h2>
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
          <h2 className="stack-title-main">Tools I use.</h2>
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
          <span>{"\u00A9"} {new Date().getFullYear()} Khen Joshua Verson</span>
          <span>Built with React</span>
        </div>
        <div className="footer-credit">
          <span>Design inspiration {"\u2014"} </span>
          <a className="footer-link" href="https://800k.dev/" target="_blank" rel="noopener noreferrer">
            800k.dev {"\u2197"}
          </a>
        </div>
      </div>
    </footer>
  );
}

function WorkPage() {
  return (
    <>
      <CodedProjects />
      <FigmaDesigns />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Profile />
      <Experience />
    </>
  );
}

function RoutedPages() {
  const location = useLocation();

  return (
    <main className="site-main">
      <div className="route-content" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/credentials" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </main>
  );
}

function PortfolioApp() {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);
  const [showIntroLoader, setShowIntroLoader] = useState(shouldShowIntroLoader);

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
    <div className={`app-shell ${showIntroLoader ? "app-shell-loading" : "app-shell-ready"}`}>
      {showIntroLoader && <PortfolioLoader onComplete={() => setShowIntroLoader(false)} />}
      <ScrollAndTitleManager />
      <LayoutChrome themeMode={themeMode} onThemeChange={changeThemeMode} />
      <RoutedPages />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioApp />
    </BrowserRouter>
  );
}
