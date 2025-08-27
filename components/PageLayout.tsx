import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-10 heading-blue gradient-blue">{title}</h1>
      <div className="space-y-8 sm:space-y-12">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
