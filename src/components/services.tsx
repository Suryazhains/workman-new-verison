import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LANDING_CONTENT } from './content';
import LandingPageThree from './landingthree';

// --- ASSET IMPORTS ---
import out1 from '../assets/out 1.jpg';
import out2 from '../assets/out 2.jpg';
import out3 from '../assets/out 3.jpg';
import out4 from '../assets/out 4.jpg';

import in1 from '../assets/in 1.png';
import in2 from '../assets/in 2.png';
import in3 from '../assets/in 3.jpg';
import in4 from '../assets/in 4.jpg';

import ledVideo from '../assets/ledvideo.mp4'; 

import pop1 from '../assets/pops 1.png';
import pop2 from '../assets/pops 2.png';
import pop3 from '../assets/pops 4.jpg';
import pop4 from '../assets/pops 1.png'; 

import mod1 from '../assets/mod 1.jpeg';
import mod2 from '../assets/mod 2.png';
import mod3 from '../assets/mod 3.png';
import mod4 from '../assets/mod 4.png';

const MEDIA_MAP: Record<string, string[]> = {
  outdoor: [out1, out2, out3, out4],
  indoor: [in1, in2, in3, in4],
  pop: [pop1, pop2, pop3, pop4],
  modular: [mod1, mod2, mod3, mod4],
};

const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const servicesData = LANDING_CONTENT?.servicesSection;

  if (!servicesData) {
    console.error("Critical Error: 'servicesSection' is missing.");
    return null;
  }

  const { tabs, contentMap } = servicesData;
  
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '');
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setCurrentIdx(0);
    if (activeTab === 'led') return;

    const images = MEDIA_MAP[activeTab] || [];
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab]); 

  useEffect(() => {
    const currentHash = location.hash.replace('#', '').toLowerCase();
    const matchedTab = tabs.find(t => t.id === currentHash);
    
    if (matchedTab) {
      setActiveTab(matchedTab.id);
      const timer = setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          const headerOffset = window.innerWidth < 1024 ? 80 : 110; 
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash, tabs]);

  const handleViewMore = (id: string) => {
    window.scrollTo(0, 0);
    navigate(`/${id}`);
  };

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  const activeContent = contentMap[activeTab as keyof typeof contentMap];

  if (!activeContent) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');

        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <section id="services" className="w-full pt-[90px] xl:pt-[110px] min-[1920px]:pt-[clamp(110px,8vw,250px)] pb-[90px] xl:pb-[110px] min-[1920px]:pb-[clamp(110px,8vw,250px)] bg-[#BBB791] font-inter">
        
        <div className="w-full max-w-[1920px] min-[1920px]:max-w-[90vw] mx-auto px-5 md:px-10 xl:px-[90px] min-[1920px]:px-[clamp(90px,5vw,200px)]">

          <div className="mb-10 xl:mb-14 min-[1920px]:mb-[clamp(3.5rem,5vw,6rem)] text-left animate-[fadeSlide_0.4s_ease-in-out]">
            <h2 className="font-imperial text-4xl md:text-[56px] xl:text-[64px] min-[1920px]:text-[clamp(64px,5vw,140px)] font-bold text-white mb-4 min-[1920px]:mb-[clamp(1rem,2vw,2rem)] tracking-tight">
              Our Services
            </h2>
            <p className="text-base sm:text-lg xl:text-xl min-[1920px]:text-[clamp(20px,2vw,44px)] text-white/90 w-full leading-relaxed min-[1920px]:leading-loose max-w-[1600px] min-[1920px]:max-w-[80vw]">
              {activeContent.topDescription || "Explore our range of premium signage and display solutions designed to elevate your brand presence."}
            </p>
          </div>

          {/* ---------------- MOBILE VIEW ---------------- */}
          <div className="flex flex-col gap-6 md:hidden">
            {tabs.map(service => {
              const serviceContent = contentMap[service.id as keyof typeof contentMap];
              const serviceImages = MEDIA_MAP[service.id] || [];
              const isCurrentlyActive = activeTab === service.id;

              return (
                <div key={service.id} className="bg-white border border-white/20 rounded-3xl overflow-hidden shadow-xl">
                  <div className="w-full h-[240px] overflow-hidden relative bg-black">
                    {service.id === 'led' ? (
                      <video src={ledVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <div 
                        className="flex h-full transition-transform duration-700 ease-in-out" 
                        style={{ transform: `translateX(-${(isCurrentlyActive ? currentIdx : 0) * 100}%)` }}
                      >
                        {serviceImages.map((img, i) => (
                          <img key={i} src={img} className="w-full h-full object-cover flex-shrink-0" alt={service.label} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="font-imperial text-2xl font-bold text-[#BBB791]">{serviceContent?.heading || service.label}</h3>
                    <p className="text-sm text-[#4B5563] line-clamp-4">{serviceContent?.description?.[0]}</p>
                    <button onClick={() => handleViewMore(service.id)} className="w-full py-3 bg-[#BBB791] hover:bg-[#a39f7a] transition-colors text-white text-sm font-bold rounded-lg">
                      View more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- DESKTOP VIEW ---------------- */}
          <div className="hidden md:block bg-white rounded-3xl min-[1920px]:rounded-[clamp(1.5rem,3vw,5rem)] overflow-hidden border border-white/10">
            
            <div className="relative flex bg-[#F0FDF4] border-b border-gray-100 no-scrollbar">
              <div
                className="absolute top-0 left-0 h-full bg-white transition-transform duration-300 ease-in-out pointer-events-none"
                style={{ width: `${100 / tabs.length}%`, transform: `translateX(${activeIndex * 100}%)` }}
              />
              {tabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`relative z-10 flex-1 py-6 xl:py-8 min-[1920px]:py-[clamp(2rem,4vw,5rem)] px-2 text-lg xl:text-xl min-[1920px]:text-[clamp(20px,1.8vw,48px)] font-semibold transition-all outline-none border-none ${activeTab === tab.id ? 'text-[#BBB791]' : 'text-[#BBB791]/60 hover:text-[#BBB791]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* FIX: Removed the massive 50vw clamp. It now stops growing natively. */}
            <div className="grid grid-cols-1 xl:grid-cols-2 items-stretch min-h-[600px] xl:min-h-[650px] min-[1920px]:min-h-[750px] h-auto">
              
              {/* Left Side: Text Area */}
              <div className="order-2 xl:order-1 px-10 pb-10 xl:px-[70px] xl:pt-[80px] xl:pb-[80px] min-[1920px]:px-[clamp(70px,6vw,160px)] min-[1920px]:pt-[clamp(80px,4vw,120px)] min-[1920px]:pb-[clamp(80px,4vw,120px)] flex flex-col justify-start animate-[fadeSlide_0.4s_ease-in-out] overflow-hidden">
                
                <div className="flex flex-col overflow-hidden">
                  <h3 className="font-imperial text-3xl md:text-4xl xl:text-5xl min-[1920px]:text-[clamp(48px,4vw,110px)] font-bold text-[#BBB791] mb-6 min-[1920px]:mb-[clamp(1.5rem,3vw,3rem)] flex-shrink-0">
                    {activeContent.heading || activeTab}
                  </h3>
                  
                  <div className="overflow-y-auto no-scrollbar pr-4">
                    {activeContent.description?.map((para: string, index: number) => (
                      <p key={index} className="text-lg xl:text-xl min-[1920px]:text-[clamp(20px,1.5vw,44px)] text-[#4B5563] leading-relaxed min-[1920px]:leading-[1.7] mb-4 min-[1920px]:mb-[clamp(1rem,2vw,2.5rem)]">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* mt-auto ensures the button snaps directly below the text without giant gaps */}
                <div className="pt-8 min-[1920px]:pt-[clamp(2rem,4vw,4rem)] flex-shrink-0 mt-auto">
                  <button onClick={() => handleViewMore(activeTab)} className="flex items-center gap-4 min-[1920px]:gap-[clamp(1rem,2vw,2rem)] px-14 py-4 xl:px-16 xl:py-5 min-[1920px]:px-[clamp(4rem,8vw,8rem)] min-[1920px]:py-[clamp(1.25rem,2.5vw,2.5rem)] bg-[#BBB791] text-white text-base xl:text-lg min-[1920px]:text-[clamp(18px,1.5vw,36px)] font-bold rounded-xl min-[1920px]:rounded-[clamp(1rem,2vw,2rem)] hover:bg-[#a39f7a] transition-all outline-none border-none shadow-lg shadow-[#BBB791]/20 w-fit">
                    {activeContent.buttonText || "View More"}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 min-[1920px]:w-[clamp(1.25rem,2vw,3.5rem)] min-[1920px]:h-[clamp(1.25rem,2vw,3.5rem)]">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Side: Media Area */}
              <div className="w-full h-full min-h-[400px] overflow-hidden order-1 xl:order-2 relative bg-black">
                {activeTab === 'led' ? (
                  <video key="led-video" src={ledVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div 
                      className="flex h-full transition-transform duration-1000 ease-in-out" 
                      style={{ transform: `translateX(-${currentIdx * 100}%)` }}
                    >
                      {(MEDIA_MAP[activeTab] || []).map((img, i) => (
                        <div key={i} className="w-full h-full flex-shrink-0">
                          <img src={img} alt={`${activeTab}-${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute bottom-6 min-[1920px]:bottom-[clamp(1.5rem,4vw,6rem)] left-1/2 -translate-x-1/2 flex gap-2 min-[1920px]:gap-[clamp(0.5rem,1.5vw,1.5rem)]">
                      {(MEDIA_MAP[activeTab] || []).map((_, i) => (
                        <div 
                          key={i} 
                          className={`rounded-full transition-all duration-500 h-2 min-[1920px]:h-[clamp(0.5rem,1vw,1.5rem)] ${currentIdx === i ? 'bg-[#BBB791] w-8 min-[1920px]:w-[clamp(2rem,6vw,9rem)]' : 'bg-white/60 w-2 min-[1920px]:w-[clamp(0.5rem,1.5vw,2rem)]'}`} 
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingPageThree />
    </>
  );
};

export default Services;