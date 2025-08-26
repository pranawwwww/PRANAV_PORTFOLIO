import React, { useEffect, useRef, useState } from "react";

function getSystemPref(): "light" | "dark" {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  // Determine if a stored preference exists (do this synchronously)
  const hasStoredPref = typeof window !== "undefined" && localStorage.getItem("theme") !== null;
  const initialTheme: "light" | "dark" = (() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || getSystemPref();
    }
    return "light";
  })();

  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const userPref = useRef<boolean>(hasStoredPref);

  // Apply theme to document and persist only if user explicitly chose one
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (userPref.current) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  // Sync with OS changes only when there's no explicit user preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (!userPref.current) {
        setTheme(getSystemPref());
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const handleToggle = () => {
    userPref.current = true; // user has explicitly chosen now
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      className="mono"
      aria-label="Toggle theme"
      onClick={handleToggle}
      style={{
        background: "var(--surface-2)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "0.5rem .75rem",
      }}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}