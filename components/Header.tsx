import React, { useState } from 'react';
import { useScroll } from '../contexts/ScrollContext';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeSection, scrollToSection } = useScroll();

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-20" style={{
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
                  className={`px-3 py-2 rounded-md transition-all duration-200 focus:outline-none cursor-pointer ${
                    activeSection === id
                      ? 'text-[var(--text)] font-semibold bg-[var(--surface-2)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
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

        {/* Right side - Open to Work badge + Mobile hamburger */}
        <div className="absolute right-0 flex items-center gap-3">
          {/* Open to Work badge */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 hover:opacity-80 cursor-pointer"
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}
            />
            <span className="hidden sm:inline">Open to Work</span>
            <span className="sm:hidden">Available</span>
          </a>
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
                  className={`block px-3 py-2 rounded-md transition-colors cursor-pointer ${
                    activeSection === id
                      ? 'text-[var(--text)] font-semibold bg-[var(--surface-2)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
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
