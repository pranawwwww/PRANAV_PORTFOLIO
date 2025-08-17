
import React from 'react';
import { siteData } from '../data/siteData.ts';

const Footer: React.FC = () => {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="mt-auto py-4 px-4 sm:px-6 lg:px-8 border-t border-white/10 text-neutral-500">
      <div className="max-w-4xl mx-auto flex justify-between items-center text-xs">
        <span>© {new Date().getFullYear()} {siteData.name}. All rights reserved.</span>
        <a 
          href="#top" 
          onClick={handleBackToTop}
          className="hover:text-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] p-1"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
