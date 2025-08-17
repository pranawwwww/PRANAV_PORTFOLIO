import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SkipToContent from './components/SkipToContent';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import { ChatProvider } from './contexts/ChatContext';
import ChatWidget from './components/chat/ChatWidget';

const AppContent: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <SkipToContent />
      <div className="flex flex-col min-h-screen font-mono leading-relaxed selection:bg-white/20">
        <Header />
        <main id="main-content" className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        {location.pathname !== '/' && <ChatWidget />}
      </div>
    </>
  );
};


const App: React.FC = () => {
  return (
    <ChatProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ChatProvider>
  );
};

export default App;