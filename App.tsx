import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { ChatProvider } from './contexts/ChatContext';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen" style={{
          background: 'transparent',
          color: 'var(--text)',
          transition: 'background-color 0.3s, color 0.3s'
        }}>
          <Header />
          <main id="main-content" className="flex-grow w-full">
            <Home />
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ChatProvider>
  );
};

export default App;