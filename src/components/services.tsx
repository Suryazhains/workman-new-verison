import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LANDING_CONTENT } from './content';
import LandingPageThree from './landingthree';

// --- ASSET IMPORTS ---
import out1 from '../assets/facadeNewOne.png';
import out2 from '../assets/pylolfinal4.png';
import out3 from '../assets/outdoor 4.png';
import out4 from '../assets/outdoorHoarding5.png';

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
  
  // Start with the first tab's ID safely
  const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.id || '');
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,700&display=swap');

        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        
        .font-dm-sans-extralight { 
            font-family: 'DM Sans', sans-serif !important; 
            font-weight: 200 !important;
        }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}} />

      <section id="services" className="w-full pt-[80px] xl:pt-[90px] min-[1920px]:pt-[clamp(110px,8vw,250px)] pb-[90px] xl:pb-[110px] min-[1920px]:pb-[clamp(110px,8vw,250px)] bg-[#959064] font-inter">
        
     
        <div className="w-full max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 xl:mb-14 min-[1920px]:mb-[clamp(3.5rem,5vw,6rem)] text-left"
          >
 
            <h2 className="font-dm-sans-extralight tracking-normal text-3xl md:text-[38px] xl:text-[45px] min-[1920px]:text-[clamp(45px,3.6vw,96px)] text-white mb-4 min-[1920px]:mb-[clamp(1rem,2vw,2rem)]">
              {"Our Services".split(" ").map((word, index, array) => (
                <React.Fragment key={index}>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                  {index < array.length - 1 && " "}
                </React.Fragment>
              ))}
            </h2>
            
            <p className="text-[10px] sm:text-xs xl:text-sm min-[1920px]:text-[clamp(11px,1vw,18px)] text-white/90 w-full leading-relaxed max-w-[1200px] min-[1920px]:max-w-[65vw]">
              {activeContent.topDescription || "Explore our range of premium signage and display solutions designed to elevate your brand presence."}
            </p>
          </motion.div>

          {/* ---------------- MOBILE VIEW ---------------- */}
          <div className="flex flex-col gap-6 md:hidden">
            {tabs.map((service, index) => {
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
                    {/* Animated Mobile Box Title - Word by Word */}
                    <h3 className="font-dm-sans-extralight tracking-normal text-xl text-[#959064]">
                      {String(serviceContent?.heading || service.label).split(" ").map((word, wIndex, wArray) => (
                        <React.Fragment key={`${service.id}-${wIndex}`}>
                          <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: (index * 0.1) + (wIndex * 0.08) }}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                          {wIndex < wArray.length - 1 && " "}
                        </React.Fragment>
                      ))}
                    </h3>
                    
                    <p className="text-xs text-[#4B5563] line-clamp-4">
                      {/* Safely handle array or string description */}
                      {Array.isArray(serviceContent?.description) 
                        ? serviceContent.description[0] 
                        : serviceContent?.description}
                    </p>
                    
                    <button onClick={() => handleViewMore(service.id)} className="w-full py-3 bg-[#959064] hover:bg-[#959064] transition-colors text-white text-xs font-bold rounded-lg">
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
                  className={`relative z-10 flex-1 py-4 xl:py-5 min-[1920px]:py-[clamp(2rem,4vw,5rem)] px-2 text-[13px] xl:text-[16px] min-[1920px]:text-[clamp(11px,1vw,19px)] font-semibold transition-all outline-none border-none ${activeTab === tab.id ? 'text-[#BBB791]' : 'text-[#BBB791]/60 hover:text-[#BBB791]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 items-stretch h-auto">
              
              {/* Left Side: Text Area */}
              <div className="order-2 xl:order-1 px-10 pb-10 pt-6 xl:px-[70px] xl:pt-[28px] xl:pb-[28px] min-[1920px]:px-[clamp(70px,6vw,160px)] min-[1920px]:pt-[clamp(28px,2vw,55px)] min-[1920px]:pb-[clamp(28px,2vw,55px)] flex flex-col justify-start overflow-hidden">
                
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col overflow-hidden h-full"
                >
                  {/* Animated Desktop Box Title - Word by Word */}
                  <h3 className="font-dm-sans-extralight tracking-normal text-2xl md:text-[1.8rem] xl:text-[1.8rem] min-[1920px]:text-[clamp(26px,2.2vw,56px)] text-[#959064] mb-4 min-[1920px]:mb-[clamp(1rem,2vw,2.5rem)] flex-shrink-0">
                    {String(activeContent.heading || activeTab).split(" ").map((word, wIndex, wArray) => (
                      <React.Fragment key={`desktop-${activeTab}-${wIndex}`}>
                        <motion.span
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: wIndex * 0.08 }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                        {wIndex < wArray.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </h3>
                  
                  <div className="overflow-y-auto no-scrollbar pr-4 flex-grow">
                    {activeContent.description?.map((para: string, index: number) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        className="text-[11px] xl:text-[16px] min-[1920px]:text-[clamp(12px,0.9vw,22px)] text-[#4B5563] leading-relaxed min-[1920px]:leading-[1.6] mb-3 min-[1920px]:mb-[clamp(0.75rem,1.5vw,2rem)]"
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>

                  <div className="pt-4 min-[1920px]:pt-[clamp(1rem,2.5vw,2.5rem)] flex-shrink-0">
                    <button 
                      onClick={() => handleViewMore(activeTab)} 
                      className="flex items-center gap-3 min-[1920px]:gap-[clamp(0.75rem,1.5vw,2rem)] px-10 py-3 xl:px-12 xl:py-4 min-[1920px]:px-[clamp(3rem,6vw,6rem)] min-[1920px]:py-[clamp(1rem,2vw,2rem)] bg-[#959064] text-white text-[11px] xl:text-[13px] min-[1920px]:text-[clamp(11px,0.9vw,21px)] font-bold rounded-xl min-[1920px]:rounded-[clamp(0.75rem,1.5vw,2rem)] hover:bg-[#a39f7a] transition-all outline-none border-none shadow-lg shadow-[#BBB791]/20 w-fit"
                    >
                      {activeContent.buttonText || "View More"}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 min-[1920px]:w-[clamp(1rem,1.8vw,2.5rem)] min-[1920px]:h-[clamp(1rem,1.8vw,2.5rem)]">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Side */}
              <div className="w-full h-[350px] md:h-[450px] xl:h-auto order-1 xl:order-2 relative bg-black">
                <div className="w-full h-full xl:absolute xl:inset-0 overflow-hidden">
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
                      
                      <div className="absolute bottom-4 min-[1920px]:bottom-[clamp(1rem,3vw,4rem)] left-1/2 -translate-x-1/2 flex gap-1.5 min-[1920px]:gap-[clamp(0.4rem,1vw,1.2rem)]">
                        {(MEDIA_MAP[activeTab] || []).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-full transition-all duration-500 h-1.5 min-[1920px]:h-[clamp(0.4rem,0.8vw,1.2rem)] ${currentIdx === i ? 'bg-[#959064] w-6 min-[1920px]:w-[clamp(1.5rem,4vw,6rem)]' : 'bg-white/60 w-1.5 min-[1920px]:w-[clamp(0.4rem,1vw,1.5rem)]'}`} 
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
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