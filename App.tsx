import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { ChatProvider } from './contexts/ChatContext';
import { ScrollProvider } from './contexts/ScrollContext';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <ScrollProvider>
        <HashRouter>
          <div className="snap-container" style={{
            background: 'var(--bg)',
            color: 'var(--text)',
          }}>
            <Header />
            <main id="main-content">
              <Home />
            </main>
          </div>
        </HashRouter>
      </ScrollProvider>
    </ChatProvider>
  );
};

export default App;