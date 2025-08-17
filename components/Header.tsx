
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteData } from '../data/siteData.ts';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const activeLinkClass = 'underline underline-offset-4 decoration-white/50';
  const linkBaseClass = 'hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111]';

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10 sticky top-0 bg-[#111111]/80 backdrop-blur-sm z-10">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className={`text-lg font-bold ${linkBaseClass}`}>
          {siteData.name}
        </Link>
        <ul className="flex items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${linkBaseClass} ${isActive && path !== '/' ? activeLinkClass : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
