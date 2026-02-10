import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LANDING_CONTENT } from './content';
import LandingPageThree from './landingthree';

// LOCAL IMAGES
import outdoorImg from '../assets/outdoor.png';
import indoorImg from '../assets/indoor.png';
import ledImg from '../assets/Led.png';
import popImg from '../assets/pop.png';
import modularImg from '../assets/modular.png';

const IMAGE_MAP: Record<string, string> = {
  outdoor: outdoorImg,
  indoor: indoorImg,
  led: ledImg,
  pop: popImg,
  modular: modularImg,
};

const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const servicesData = LANDING_CONTENT?.servicesSection;

  if (!servicesData) {
    console.error("Critical Error: 'servicesSection' is missing in LANDING_CONTENT.");
    return null;
  }

  const { heading, description, tabs, contentMap } = servicesData;
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

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

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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
      <section
        id="services"
        className="w-full pt-[90px] pb-[90px] bg-[#FFFFF] font-inter"
      >
        <div className="w-full max-w-[1920px] mx-auto px-5 md:px-10 xl:px-[90px]">

          {/* Header Section */}
          <div className="mb-10 text-left animate-[fadeSlide_0.4s_ease-in-out]">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#51A147] mb-4 tracking-tight">
              {activeContent.heading || heading}
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563] w-full leading-relaxed">
              {activeContent.topDescription || description}
            </p>
          </div>

          {/* ---------------- MOBILE VIEW ---------------- */}
          <div className="flex flex-col gap-6 md:hidden">
            {tabs.map(service => {
              const serviceContent = contentMap[service.id as keyof typeof contentMap];
              return (
                <div
                  key={service.id}
                  className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm"
                >
                  <div className="w-full h-[220px] overflow-hidden">
                    <img
                      src={IMAGE_MAP[service.id]}
                      alt={service.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-[#51A147]">
                      {serviceContent?.heading || service.label}
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed line-clamp-4">
                      {serviceContent?.description[0] || ""}
                    </p>
                    <button
                      onClick={() => handleViewMore(service.id)}
                      className="flex items-center gap-4 px-10 py-3 bg-[#51A147] text-white text-sm font-bold rounded-lg active:scale-95 transition-all border-none outline-none"
                    >
                      View more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- DESKTOP VIEW ---------------- */}
          <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
            
            {/* Tabs Row */}
            <div className="relative flex bg-[#F0FDF4] rounded-t-2xl overflow-x-auto no-scrollbar">
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-t-2xl transition-transform duration-300 ease-in-out pointer-events-none"
                style={{
                  width: `${100 / tabs.length}%`,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              />

              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex-1 py-5 px-2 text-lg font-semibold transition-all border-none outline-none focus:outline-none ${
                    activeTab === tab.id ? 'text-[#51A147]' : 'text-[#4B5563] hover:text-[#51A147]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div
              key={activeTab}
              className="grid grid-cols-1 xl:grid-cols-2 items-stretch animate-[fadeSlide_0.4s_ease-in-out]"
            >
              <div className="order-2 xl:order-1 px-10 pb-10 xl:px-[70px] xl:pt-[80px] xl:pb-[80px] flex flex-col justify-between">
                
                <div className="space-y-6">
                  {activeContent.description.map((para: string, index: number) => (
                    <p key={index} className="text-lg text-[#4B5563] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="pt-[90px]">
                  <button
                    onClick={() => handleViewMore(activeTab)}
                    className="flex items-center gap-4 px-14 py-4 bg-[#51A147] text-white text-base font-bold rounded-lg hover:bg-[#3E7D36] active:scale-95 transition-all border-none outline-none"
                  >
                    {activeContent.buttonText}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="w-full h-full min-h-[500px] xl:min-h-[600px] overflow-hidden order-1 xl:order-2 animate-[fadeZoom_0.5s_ease-in-out]">
                <img
                  src={IMAGE_MAP[activeTab] || outdoorImg} 
                  alt={activeContent.heading}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingPageThree />

      <style>
        {`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeZoom {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { scrollbar-width: none; }
          button:focus, button:active { outline: none !important; box-shadow: none !important; }
        `}
      </style>
    </>
  );
};

export default Services;