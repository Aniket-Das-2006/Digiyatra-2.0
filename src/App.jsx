import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DigiYatraProvider } from './context/DigiYatraContext';
import Header from './components/Header';
import Footer from './components/Footer';

import DigiYatraPage from './pages/DigiYatraPage';
import HotelsStayPage from './pages/HotelsStayPage';
import InfoPage from './pages/InfoPage';

import DigiYatraChat from './components/DigiYatraChat';

function App() {
  return (
    <DigiYatraProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/digiyatra" replace />} />
              <Route path="/digiyatra" element={<DigiYatraPage />} />
              <Route path="/hotels-stay" element={<HotelsStayPage />} />
              <Route path="/flights" element={<Navigate to="/digiyatra" replace />} />
              <Route path="/hotels" element={<Navigate to="/hotels-stay" replace />} />
              
              {/* Info Pages */}
              <Route path="/info" element={<Navigate to="/info/digiyatra/trust-center" replace />} />
              <Route path="/info/:category/:tab" element={<InfoPage />} />

              <Route path="*" element={<Navigate to="/digiyatra" replace />} />
            </Routes>
          </main>
          <Footer />
          <DigiYatraChat />
        </div>
      </Router>
    </DigiYatraProvider>
  );
}

export default App;
