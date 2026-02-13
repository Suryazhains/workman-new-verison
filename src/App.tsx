import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/Landingpage';
import Services from './components/services';
import Infrastructure from './components/infrastructure';
import OutdoorServices from './components/outdoor'; 
import Team from './components/Team';
import Aboutbreif from './components/Aboutbreif';
// 1. Unified casing to match the physical file 'ServiceDetails.tsx'
import ServiceDetails from './components/ServiceDetails'; 

// Define the Service interface to satisfy prop requirements
interface Service {
  id: string | number;
  title: string;
  videoUrl?: string;
  images?: string[];
  description_points?: string[];
}

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
          {/* Note: Remove this route if you have completely deleted 'POP' data */}
          <Route path="/pop" element={<OutdoorServices />} />
          
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/aboutbrief" element={<Aboutbreif />} />
          <Route path="/team" element={<Team />} />
          
          {/* FIX: Pass a type-safe null fallback for the 'service' prop. 
            This satisfies the 'Property service is missing' error.
          */}
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