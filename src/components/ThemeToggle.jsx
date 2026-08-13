import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

function getResolvedTheme(mode) {
  if (mode === "light" || mode === "dark") return mode;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ themeMode, onThemeChange }) {
  const resolvedTheme = getResolvedTheme(themeMode);

  const selectTheme = (mode, event) => {
    onThemeChange(mode, event.currentTarget);
  };

  return (
    <div className="theme-toggle" role="group" aria-label="Theme selector">
      <button
        className="theme-icon-button"
        type="button"
        aria-label="Switch to light mode"
        aria-pressed={resolvedTheme === "light"}
        title="Light mode"
        onClick={(event) => selectTheme("light", event)}
      >
        <FiSun aria-hidden="true" />
      </button>
      <button
        className="theme-icon-button"
        type="button"
        aria-label="Switch to dark mode"
        aria-pressed={resolvedTheme === "dark"}
        title="Dark mode"
        onClick={(event) => selectTheme("dark", event)}
      >
        <FiMoon aria-hidden="true" />
      </button>
    </div>
  );
}
