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

  // SAFETY CHECK: Get the section first to prevent destructuring error
  const servicesData = LANDING_CONTENT?.servicesSection;

  // If the data is missing, we show a console error and return null to prevent crash
  if (!servicesData) {
    console.error("Critical Error: 'servicesSection' is missing in LANDING_CONTENT.");
    return null;
  }

  // Safely destructure
  const { heading, description, tabs, contentMap } = servicesData;

  // Initialize state with the first tab ID
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  /**
   * SYNC TABS WITH URL HASH
   */
  useEffect(() => {
    const currentHash = location.hash.replace('#', '').toLowerCase();
    const matchedTab = tabs.find(t => t.id === currentHash);
    
    if (matchedTab) {
      setActiveTab(matchedTab.id);
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash, tabs]);

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  // FIX: Cast activeTab to keyof typeof contentMap to solve TS7053
  const activeContent = contentMap[activeTab as keyof typeof contentMap];

  // Fallback if content is missing
  if (!activeContent) return null;

  return (
    <>
      <section
        id="services"
        className="w-full pt-8 pb-12 md:pt-14 md:pb-20 bg-[#F6F7F9] font-inter"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-20">

          {/* Header */}
          <div className="mb-6 md:mb-10 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4 tracking-tight transition-all duration-300">
              {activeContent.heading || heading}
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] max-w-[600px] leading-relaxed mx-auto md:mx-0">
              {description}
            </p>
          </div>

          {/* ---------------- MOBILE VIEW (Shows all services now) ---------------- */}
          <div className="flex flex-col gap-6 md:hidden">
            {tabs.map(service => (
              <div
                key={service.id}
                className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm animate-[fadeSlide_0.4s_ease-in-out]"
              >
                <div className="w-full h-[220px] overflow-hidden">
                  <img
                    src={IMAGE_MAP[service.id]}
                    alt={service.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-[#111827]">
                    {service.label}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed line-clamp-4">
                    {/* Fetch description for each specific service card */}
                    {(contentMap[service.id as keyof typeof contentMap] as any)?.description[0] || ""}
                  </p>

                  <button
                    onClick={() => navigate(`/${service.id}`)}
                    className="flex items-center gap-4 px-10 py-3 bg-[#163B73] text-white text-sm font-bold rounded-lg active:scale-95 transition-all outline-none focus:outline-none border-none"
                  >
                    View more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ---------------- DESKTOP VIEW (The Table / Tabs) ---------------- */}
          <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">

            {/* Tabs (Navigation Row) */}
            <div className="relative flex bg-[#E6F0FF] rounded-t-2xl overflow-x-auto no-scrollbar">
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
                  className={`relative z-10 flex-1 py-4 px-2 text-base font-semibold transition-all outline-none focus:outline-none border-none
                    ${
                      activeTab === tab.id
                        ? 'text-[#163B73]'
                        : 'text-[#4B5563] hover:text-[#163B73]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content (Table Body) */}
            <div
              key={activeTab}
              className="grid grid-cols-1 lg:grid-cols-2 items-stretch animate-[fadeSlide_0.4s_ease-in-out]"
            >
              {/* Text Side */}
              <div className="space-y-5 order-2 lg:order-1 p-7 lg:p-16 flex flex-col justify-center">
                {activeContent.description.map((para: string, index: number) => (
                  <p
                    key={index}
                    className="text-base text-[#4B5563] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}

                <div className="pt-15">
                  <button
                    onClick={() => navigate(`/${activeTab}`)}
                    className="flex items-center gap-4 px-12 py-4 bg-[#163B73] text-white font-bold rounded-lg hover:bg-[#0f2a52] active:scale-95 transition-all outline-none focus:outline-none border-none"
                  >
                    {activeContent.buttonText}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="w-full h-full min-h-[450px] lg:min-h-[550px] overflow-hidden order-1 lg:order-2 animate-[fadeZoom_0.5s_ease-in-out]">
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
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeZoom {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { scrollbar-width: none; }
          
          button:focus, button:active {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </>
  );
};

export default Services;