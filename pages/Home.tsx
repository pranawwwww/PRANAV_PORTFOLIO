
import React from 'react';
import { Link } from 'react-router-dom';
import HomePageChat from '../components/chat/HomePageChat';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12">
      <div className="w-full max-w-3xl border border-white/10 bg-[#111111]/50">
         <HomePageChat />
      </div>
      <div className="mt-8">
        <Link
          to="/projects"
          className="inline-block border border-white/30 px-6 py-3 text-base font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111] transition-all duration-300"
        >
          View My Work
        </Link>
      </div>
    </div>
  );
};

export default Home;
