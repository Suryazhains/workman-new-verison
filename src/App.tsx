import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/Landingpage';
import Services from './components/services';
import Infrastructure from './components/infrastructure';
import OutdoorServices from './components/outdoor'; 
import Team from './components/Team';
import Aboutbreif from './components/Aboutbreif';
import ServiceDetails from './components/ServiceDetails'; 
import '../src/components/global-layout.css'; // Add this at the top!
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
    // Force the browser to stop remembering scroll positions automatically
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (location.hash) {
      const id = location.hash.replace('#', '');
      let attempts = 0;

      // 🔥 THE FIX: A polling function that waits for React to finish rendering the DOM
      const tryScroll = () => {
        const element = document.getElementById(id);
        
        if (element) {
          // MATCH THE HEADER: 110px desktop height + 20px extra breathing room = 130px
          const headerOffset = window.innerWidth < 1024 ? 100 : 130; 
          
          // Absolute math: calculates exact distance from the very top of the document
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth',
          });
        } else {
          // If the element is null (React is still loading the page), try again!
          attempts++;
          if (attempts < 20) { // Will retry every 50ms for a total of 1 second
            setTimeout(tryScroll, 50);
          }
        }
      };

      // Start the checking process immediately
      tryScroll();
      
      // Safety net: One final check after 1.2 seconds in case heavy images push the layout down
      setTimeout(tryScroll, 1200); 

    } else {
      // Normal page navigation - instantly jump to top (using 'instant' prevents weird upward scrolling)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  return null;
};

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
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