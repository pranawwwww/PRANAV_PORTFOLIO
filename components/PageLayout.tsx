
import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12" style={{color: 'var(--text-primary)'}}>{title}</h1>
      <div className="space-y-12">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
