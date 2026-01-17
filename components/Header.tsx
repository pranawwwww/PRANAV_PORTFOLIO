import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-20" style={{
      borderBottom: "1px solid var(--border)",
      background: "var(--surface)",
      backdropFilter: "blur(8px)"
    }}>
      <nav className="max-w-6xl mx-auto flex items-center relative">
        {/* Centered nav links */}
        <div className="flex-1 flex justify-center">
          <ul className="hidden sm:flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none text-[var(--text)] hover:text-[var(--accent)] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(id);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Theme toggle - absolute right */}
        <div className="absolute right-0 flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border"
            style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'var(--surface-2)' }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="sm:hidden mt-3 p-3 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block px-3 py-2 rounded-md transition-colors text-[var(--text)] hover:text-[var(--accent)] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(id);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
