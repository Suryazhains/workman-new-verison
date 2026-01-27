import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/Landingpage';
import Services from './components/services';
import Infrastructure from './components/infrastructure';
import OutdoorServices from './components/outdoor'; 

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
          
        
          <Route path="/outdoor" element={<OutdoorServices />} />
          <Route path="/indoor" element={<OutdoorServices />} />
          <Route path="/led" element={<OutdoorServices />} />
          <Route path="/modular" element={<OutdoorServices />} />
          
          <Route path="/infrastructure" element={<Infrastructure />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;