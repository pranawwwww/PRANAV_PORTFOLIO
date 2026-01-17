import { useEffect } from "react";

// Light mode only - no toggle needed
export default function ThemeToggle() {
  useEffect(() => {
    // Always set light theme
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }, []);

  // Return null - no toggle button rendered
  return null;
}
