
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';

// Extend window interface to include toggleTheme
declare global {
  interface Window {
    toggleTheme?: () => void;
  }
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          setIsDarkMode(currentTheme === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = () => {
    if (typeof window !== 'undefined' && window.toggleTheme) {
      window.toggleTheme();
    }
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b sticky top-0 backdrop-blur-sm z-10" style={{backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)'}}>
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="portfolio-name focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2" style={{'--tw-ring-offset-color': 'var(--bg-primary)'}}>
          {siteData.name}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex-shrink-0">
            <ul className="flex items-center space-x-2 text-sm sm:text-base">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `nav-button ${isActive && path !== '/' ? 'active' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button 
            onClick={handleThemeToggle}
            className="header-theme-toggle"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <svg className="theme-icon sun-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/> 
              </svg>
            ) : (
              <svg className="theme-icon moon-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
