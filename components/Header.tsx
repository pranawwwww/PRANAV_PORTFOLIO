import React, { useState } from 'react';
import { useScroll } from '../contexts/ScrollContext';
import { siteData } from '../data/siteData';

const navLinks = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeSection, scrollToSection } = useScroll();

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const linkClass = (id: string) =>
    `px-3 py-2 rounded-md transition-colors cursor-pointer ${
      activeSection === id
        ? 'text-[var(--text)] font-semibold bg-[var(--surface-2)]'
        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
    }`;

  return (
    <header
      className="py-3 px-4 sm:px-6 fixed top-0 left-0 right-0 z-20"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
    >
      <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <a
          href="#about"
          onClick={(e) => { e.preventDefault(); go('about'); }}
          className="font-bold text-sm sm:text-base whitespace-nowrap"
          style={{ color: 'var(--text)' }}
        >
          Pranav Kutralingam
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={linkClass(id)} onClick={(e) => { e.preventDefault(); go(id); }}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            Open to Work
          </span>
          <a
            href={siteData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md text-sm font-medium hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            Resume
          </a>
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border"
            style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'var(--surface-2)' }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="md:hidden mt-3 p-2 rounded-lg flex flex-col gap-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={`block ${linkClass(id)}`} onClick={(e) => { e.preventDefault(); go(id); }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
