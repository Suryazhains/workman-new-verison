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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
  }, [location.pathname, location.hash, tabs]);

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
        .no-scrollbar { scrollbar-width: none; }
        
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <section id="services" className="w-full pt-[90px] pb-[90px] bg-[#FE4E5D] font-inter">
        <div className="w-full max-w-[1920px] mx-auto px-5 md:px-10 xl:px-[90px]">

          <div className="mb-10 text-left animate-[fadeSlide_0.4s_ease-in-out]">
            {/* UPDATED FONT */}
            <h2 className="font-imperial text-4xl md:text-[56px] font-bold text-white mb-4 tracking-tight">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-white/90 w-full leading-relaxed max-w-[1600px]">
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
                    {/* UPDATED FONT */}
                    <h3 className="font-imperial text-2xl font-bold text-[#FE4E5D]">{serviceContent?.heading || service.label}</h3>
                    <p className="text-sm text-[#4B5563] line-clamp-4">{serviceContent?.description?.[0]}</p>
                    <button onClick={() => handleViewMore(service.id)} className="w-full py-3 bg-[#FE4E5D] text-white text-sm font-bold rounded-lg">
                      View more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- DESKTOP VIEW ---------------- */}
          <div className="hidden md:block bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="relative flex bg-[#F0FDF4] border-b border-gray-100 no-scrollbar">
              <div
                className="absolute top-0 left-0 h-full bg-white transition-transform duration-300 ease-in-out pointer-events-none"
                style={{ width: `${100 / tabs.length}%`, transform: `translateX(${activeIndex * 100}%)` }}
              />
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative z-10 flex-1 py-6 px-2 text-lg font-semibold transition-all outline-none border-none ${activeTab === tab.id ? 'text-[#FE4E5D]' : 'text-[#FE4E5D] hover:text-[#FE4E5D]'}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 items-stretch">
              <div className="order-2 xl:order-1 px-10 pb-10 xl:px-[70px] xl:pt-[80px] xl:pb-[80px] flex flex-col justify-between animate-[fadeSlide_0.4s_ease-in-out]">
                <div className="space-y-6">
                  {/* UPDATED FONT */}
                  <h3 className="font-imperial text-3xl md:text-4xl font-bold text-[#FE4E5D]">
                    {activeContent.heading || activeTab}
                  </h3>
                  {activeContent.description?.map((para: string, index: number) => (
                    <p key={index} className="text-lg text-[#4B5563] leading-relaxed">{para}</p>
                  ))}
                </div>
                <div className="pt-12">
                  <button onClick={() => handleViewMore(activeTab)} className="flex items-center gap-4 px-14 py-4 bg-[#FE4E5D] text-white text-base font-bold rounded-xl hover:bg-[#FE4E5D] transition-all outline-none border-none shadow-lg shadow-green-900/20">
                    {activeContent.buttonText || "View More"}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="w-full h-full min-h-[500px] xl:min-h-[600px] overflow-hidden order-1 xl:order-2 relative bg-black">
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
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {(MEDIA_MAP[activeTab] || []).map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-2 rounded-full transition-all duration-500 ${currentIdx === i ? 'bg-[#FE4E5D] w-8' : 'bg-white/60 w-2'}`} 
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