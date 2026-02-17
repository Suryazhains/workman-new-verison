import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import './outdoor.css';
import LandingPageThree from './landingthree';
import ServiceDetails from "./ServiceDetails"; // Matches exact file casing
import { LANDING_CONTENT } from './content';

interface Service {
  id: string | number;
  title: string;
  videoUrl?: string;
  images?: string[];
  description_points?: string[];
}

// --- Scroll Stack Sub-Components ---
const ScrollStackItem: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <div 
    className="scroll-stack-card bg-white rounded-[40px] overflow-hidden mb-[10vh] sticky top-[15vh]" 
    onClick={onClick}
    style={{ 
        cursor: 'pointer', 
        height: '70vh', 
        width: '100%', 
        transformOrigin: 'top center',
        boxShadow: 'none' 
    }}
  >
    {children}
  </div>
);

const OutdoorServices: React.FC = () => {
  const { outdoorPage, header, categoryData } = LANDING_CONTENT;
  const { hash, pathname } = useLocation();
  const [selectedFullscreenService, setSelectedFullscreenService] = useState<Service | null>(null);

  type CategoryKey = 'INDOOR' | 'LED VIDEO WALL' | 'MODULAR SIGNAGE' | 'OUTDOOR' | 'POP';

  const getCategoryKey = (): CategoryKey => {
    const currentPath = (pathname + hash).toLowerCase();
    if (currentPath.includes('indoor')) return 'INDOOR';
    if (currentPath.includes('led')) return 'LED VIDEO WALL';
    if (currentPath.includes('pop')) return 'POP'; 
    if (currentPath.includes('modular')) return 'MODULAR SIGNAGE';
    return 'OUTDOOR';
  };

  const currentCategoryKey = getCategoryKey();
  const isFullWidthCategory = currentCategoryKey === 'LED VIDEO WALL' || currentCategoryKey === 'POP';
  const pageHeader = categoryData[currentCategoryKey];
  
  const formattedParagraphs = useMemo(() => {
    const text = pageHeader?.description || "";
    const words = text.split(/\s+/);
    const paragraphs = [];
    for (let i = 0; i < words.length; i += 40) {
      paragraphs.push(words.slice(i, i + 40).join(' '));
    }
    return paragraphs;
  }, [pageHeader?.description]);

  const filteredServices = useMemo(() => {
    const servicesMap = header.servicesData as Record<string, string[]>;
    const allowedTitles = servicesMap[currentCategoryKey] || [];
    return (outdoorPage.services as Service[]).filter(service => 
      allowedTitles.some((title: string) => 
        title.toLowerCase().trim() === service.title.toLowerCase().trim()
      )
    );
  }, [currentCategoryKey, header.servicesData, outdoorPage.services]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedFullscreenService(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useLayoutEffect(() => {
    if (isFullWidthCategory || selectedFullscreenService) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const cards = document.querySelectorAll('.scroll-stack-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        
        if (cardTop < 200 && cardTop > -500) {
          const progress = Math.max(0, (200 - cardTop) / 600);
          const scale = 1 - progress * 0.05;
          const opacity = 1 - progress * 0.2;
          (card as HTMLElement).style.transform = `scale(${scale})`;
          (card as HTMLElement).style.opacity = `${opacity}`;
        } else {
          (card as HTMLElement).style.transform = `scale(1)`;
          (card as HTMLElement).style.opacity = `1`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFullWidthCategory, selectedFullscreenService]);

  return (
    <div className="flex flex-col w-full bg-[#FE4E5D]">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-inter { font-family: 'Inter', sans-serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }

        .split-hero-container {
            display: flex;
            width: 100%;
            height: 100vh;
            background: white;
            overflow: hidden;
        }

        .split-hero-left {
            width: 50%;
            height: 100%;
            background: #FE4E5D;
            color: white;
            padding: 8% 8%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            position: relative;
        }

        .split-hero-right {
            width: 50%;
            height: 100%;
            position: relative;
            background: #000;
        }

        .split-video-bg {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .fs-split-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: white;
          overflow-y: auto;
          display: block;
          animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .fs-top-horizontal-row {
          display: flex;
          width: 100%;
          height: 100vh;
        }

        .fs-left-content {
          width: 50%;
          height: 100%;
          background: #FE4E5D;
          color: white;
          padding: 8% 8%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .fs-right-media {
          width: 50%;
          height: 100%;
          position: relative;
          background: #000;
        }

        .fs-static-media-container img, .fs-static-media-container video { 
          height: 100vh; 
          width: 100%; 
          object-fit: cover; 
        }

        .fs-close { 
            position: fixed !important; 
            top: 20px; 
            right: 20px; 
            color: #ffffff !important; 
            font-size: 2.5rem; 
            cursor: pointer; 
            z-index: 10001; 
        }

        .btn-view-details {
          margin-top: 24px;
          padding: 14px 32px;
          background: #FE4E5D;
          color: white;
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          width: fit-content;
          transition: all 0.3s ease;
          border: 1px solid #FE4E5D;
        }

        .btn-view-details:hover {
          transform: translateY(-2px);
          background: #e43d4b;
          box-shadow: 0 4px 12px rgba(254, 78, 93, 0.2);
        }

        @media (max-width: 1024px) { 
          .split-hero-container, .fs-top-horizontal-row { flex-direction: column; height: auto; }
          .split-hero-left, .split-hero-right, .fs-left-content, .fs-right-media { width: 100%; height: auto; min-height: 40vh; }
        }
        body:has(.fs-split-overlay) { overflow: hidden; }
      `}} />

      {/* --- FULLSCREEN OVERLAY --- */}
      {selectedFullscreenService && (
        <div className="fs-split-overlay">
          <div className="fs-close" onClick={() => setSelectedFullscreenService(null)}>&times;</div>
          <div className="fs-top-horizontal-row">
            <div className="fs-left-content pt-24 md:pt-32">
              <span className="uppercase tracking-[0.2em] font-bold text-white/60 mb-4 block text-[10px] md:text-xs">
                Service Details
              </span>
              <h2 className="font-imperial text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
                {selectedFullscreenService.title}
              </h2>
              <div className="space-y-6 max-w-md">
                {selectedFullscreenService.description_points?.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="bg-white text-[#FE4E5D] w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] mt-1">
                      {index + 1}
                    </span>
                    <p className="text-base md:text-xl font-light text-white/90 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fs-right-media">
              <div className="fs-static-media-container">
                {selectedFullscreenService.videoUrl ? (
                  <video src={selectedFullscreenService.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={selectedFullscreenService.images?.[0]} alt="" />
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full bg-white">
            <ServiceDetails service={selectedFullscreenService} />
          </div>
        </div>
      )}

      {/* --- MAIN PAGE LAYOUT --- */}
      {isFullWidthCategory ? (
        <div className="flex flex-col w-full">
          <div className="split-hero-container">
            <div className="split-hero-left pt-24 md:pt-32">
              <span className="uppercase tracking-[0.2em] font-bold text-white/60 mb-4 block text-[10px] md:text-xs">
                Service Overview
              </span>
              <h1 className={`font-imperial font-bold mb-6 leading-[1.1] ${currentCategoryKey === 'LED VIDEO WALL' ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-4xl md:text-7xl lg:text-8xl'}`}>
                {pageHeader?.heading}
              </h1>
              <div className="space-y-4 mb-8">
                {filteredServices[0]?.description_points?.slice(0, 2).map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="bg-white text-[#FE4E5D] w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[9px] mt-1">
                      {index + 1}
                    </span>
                    <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 text-white/80 text-sm md:text-lg font-light max-w-lg leading-relaxed">
                {formattedParagraphs.slice(0, 3).map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
            <div className="split-hero-right min-h-[40vh]">
              {filteredServices[0]?.videoUrl ? (
                <video src={filteredServices[0].videoUrl} autoPlay loop muted playsInline className="split-video-bg" />
              ) : (
                <img src={filteredServices[0]?.images?.[0]} className="split-video-bg" alt="" />
              )}
            </div>
          </div>
          <div className="w-full bg-white">
            <ServiceDetails service={filteredServices[0] || ({} as Service)} />
          </div>
        </div>
      ) : (
        <>
          <section className="w-full pt-24 md:pt-32 pb-12">
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-[8%]">
              <h1 className="font-imperial text-4xl md:text-[64px] font-bold text-white mb-8 leading-tight">
                {pageHeader?.heading}
              </h1>
              <div className="text-white text-base md:text-xl leading-relaxed max-w-[1600px]">
                {formattedParagraphs.map((para, index) => <p key={index} className="mb-6">{para}</p>)}
              </div>
              <button className="flex items-center text-white hover:text-black transition-colors mt-8 group" onClick={() => window.history.back()}>
                <span className="mr-2 text-xl transition-transform group-hover:-translate-x-1">←</span> Back
              </button>
            </div>
          </section>

          <section className="w-full px-6 md:px-[8%] pb-[20vh] relative">
            <div className="flex flex-col gap-0">
              {filteredServices.map((service) => (
                <ScrollStackItem key={service.id} onClick={() => setSelectedFullscreenService(service)}>
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white text-left">
                      <h3 className="font-imperial text-3xl md:text-6xl font-bold text-black mb-6 leading-tight">
                        {service.title}
                      </h3>
                      
                      {/* Integrated Description Points (Sync with Details) */}
                      <div className="space-y-4 mb-8">
                        {service.description_points?.slice(0, 2).map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className="bg-[#FE4E5D] text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-1">
                              {idx + 1}
                            </span>
                            <p className="text-gray-600 text-sm md:text-base font-light line-clamp-2">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>

                      <button className="btn-view-details">
                        View Project Details
                      </button>
                    </div>
                    <div className="w-full md:w-1/2 overflow-hidden bg-black">
                      <img 
                        src={service.images?.[0]} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
                      />
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </div>
          </section>
        </>
      )}
      <LandingPageThree />
    </div>
  );
};

export default OutdoorServices;