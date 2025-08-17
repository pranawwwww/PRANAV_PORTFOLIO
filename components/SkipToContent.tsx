
import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="absolute z-50 top-0 left-0 m-2 p-3 bg-white text-black font-bold -translate-y-full focus:translate-y-0 transition-transform duration-300"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
