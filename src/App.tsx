
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/Landingpage';
import Services from './components/services';
import Infrastructure from './components/infrastructure';
import OutdoorServices from './components/outdoor'; 
import Team from './components/Team';
import Aboutbreif from './components/Aboutbreif';
import ServiceDetails from './components/ServiceDetails'; 

interface Service {
  id: string | number;
  title: string;
  videoUrl?: string;
  images?: string[];
  description_points?: string[];
}

// 💥 MASTER SCROLL HANDLER 
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      
      const forceScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          // Native browser scrolling - ignores math errors!
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Staggered checking to beat layout shifts when videos/images load
      setTimeout(forceScroll, 50);
      setTimeout(forceScroll, 400);
      setTimeout(forceScroll, 1000);
      
    } else {
      // If navigating to a normal page without a hash, start at the top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Global Scroll Handler */}
      <ScrollHandler /> 
      
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
          
          <Route path="/outdoor" element={<OutdoorServices />} />
          <Route path="/indoor" element={<OutdoorServices />} />
          <Route path="/led" element={<OutdoorServices />} />
          <Route path="/modular" element={<OutdoorServices />} />
          <Route path="/pop" element={<OutdoorServices />} />
          
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/aboutbrief" element={<Aboutbreif />} />
          <Route path="/team" element={<Team />} />
          
          <Route 
            path="/servicedetails/:serviceId" 
            element={<ServiceDetails service={null as unknown as Service} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;