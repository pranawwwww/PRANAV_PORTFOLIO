import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10" style={{
      borderBottom: "1px solid var(--border)",
      background: "var(--surface)",
      backdropFilter: "blur(8px)"
    }}>
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="px-2 py-1 rounded-md text-2xl sm:text-3xl brand-title gradient-blue"
        >
          {siteData.name}
        </Link>
        <div className="flex items-center gap-3">
          <ul className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none ${
                      isActive && path !== '/' 
                        ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' 
                        : 'text-[var(--text)] hover:text-[var(--accent)]'
                    }`
                  }
                  style={{ 
                    focusVisible: { outline: "2px solid var(--focus)", outlineOffset: "2px" }
                  }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
