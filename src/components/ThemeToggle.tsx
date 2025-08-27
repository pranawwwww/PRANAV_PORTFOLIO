import React, { useEffect, useState } from "react";

function getSystemPref(): "light"|"dark" {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light"|"dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light"|"dark") || getSystemPref();
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => { 
      if (!localStorage.getItem("theme")) {
        setTheme(getSystemPref());
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      className="mono"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={handleToggle}
      style={{
        background: "var(--surface-2)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "0.5rem .75rem"
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
