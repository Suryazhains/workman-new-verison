import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
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

const OutdoorServices: React.FC = () => {
  const { outdoorPage, header, categoryData } = LANDING_CONTENT;
  const { hash, pathname } = useLocation();
  const [selectedFullscreenService, setSelectedFullscreenService] = useState<Service | null>(null);

  // Explicit type for category indexing
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

  return (
    <div className="flex flex-col w-full bg-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-inter { font-family: 'Inter', sans-serif !important; }

        /* Split Layout for LED/POP */
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
            padding: 6% 8%;
            display: flex;
            flex-direction: column;
            justify-content: center;
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

        /* Fullscreen Overlay Styles */
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
          padding: 8% 6%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .fs-right-media {
          width: 50%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        .fs-track-inner {
          display: flex;
          width: fit-content;
          height: 100%;
          animation: horizontalScroll 16s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        .fs-track-inner img, .fs-track-inner video { 
          height: 100vh; 
          width: 50vw; 
          object-fit: cover; 
          flex-shrink: 0; 
        }

        @keyframes horizontalScroll {
          0%, 20% { transform: translateX(0); }
          25%, 45% { transform: translateX(-50vw); }
          50%, 70% { transform: translateX(-100vw); }
          75%, 95% { transform: translateX(-150vw); }
          100% { transform: translateX(0); }
        }

        /* Responsive Close Button */
        .fs-close { 
            position: fixed !important; 
            top: 20px; 
            right: 20px; 
            left: auto;
            color: #ffffff !important; 
            font-size: 2.5rem; 
            font-family: Arial, sans-serif;
            cursor: pointer; 
            line-height: 1;
            z-index: 10001; 
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3); 
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        @media (min-width: 1024px) {
            .fs-close {
                top: 30px;
                left: 40px;
                right: auto;
                font-size: 3.5rem;
            }
        }

        @media (max-width: 1024px) { 
          .outdoor-grid { grid-template-columns: repeat(2, 1fr); } 
          .split-hero-container, .fs-top-horizontal-row { flex-direction: column; height: auto; }
          .split-hero-left, .split-hero-right, .fs-left-content, .fs-right-media { width: 100%; height: 50vh; }
          .fs-track-inner img, .fs-track-inner video { width: 100vw; height: 50vh; }
          
          @keyframes horizontalScroll {
            0%, 20% { transform: translateX(0); }
            25%, 45% { transform: translateX(-100vw); }
            50%, 70% { transform: translateX(-200vw); }
            75%, 95% { transform: translateX(-300vw); }
            100% { transform: translateX(0); }
          }
        }

        @media (max-width: 640px) {
            .outdoor-grid { grid-template-columns: 1fr; }
            .fs-close { top: 15px; right: 15px; font-size: 2.2rem; width: 44px; height: 44px; }
        }

        body:has(.fs-split-overlay) { overflow: hidden; }
      `}} />

      {/* --- FULLSCREEN OVERLAY --- */}
      {selectedFullscreenService && (
        <div className="fs-split-overlay">
          <div className="fs-close" onClick={() => setSelectedFullscreenService(null)}>&times;</div>
          
          <div className="fs-top-horizontal-row">
            <div className="fs-left-content">
              <span className="uppercase tracking-[0.2em] font-bold text-white/70 mb-4 block text-[10px] md:text-xs">
                Service Details
              </span>
              <h2 className="font-crimson text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
                {selectedFullscreenService.title}
              </h2>
              <div className="space-y-6 max-w-md">
                <div className="flex items-start gap-4">
                  <span className="bg-white text-[#FE4E5D] w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] mt-1">1</span>
                  <p className="text-base md:text-xl font-light text-white/90 leading-relaxed">
                    Precision engineering designed for high-impact visibility and performance.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="bg-white text-[#FE4E5D] w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] mt-1">2</span>
                  <p className="text-base md:text-xl font-light text-white/90 leading-relaxed">
                    Seamlessly integrated solutions crafted with premium materials.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="fs-right-media">
              <div className="fs-track-inner">
                {selectedFullscreenService.videoUrl ? (
                  <video 
                    src={selectedFullscreenService.videoUrl} 
                    autoPlay loop muted playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {selectedFullscreenService.images?.map((img, idx) => (
                      <img key={idx} src={img} alt="" />
                    ))}
                  </>
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
            <div className="split-hero-left">
              <span className="uppercase tracking-widest font-bold text-white/60 mb-3 block text-[10px] md:text-xs">
                Service Details
              </span>
              <h1 className="font-crimson text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]">
                {pageHeader?.heading}
              </h1>
              <div className="space-y-4 text-white/80 text-sm md:text-lg font-light max-w-lg leading-relaxed">
                {formattedParagraphs.slice(0, 3).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div className="split-hero-right">
              {filteredServices[0]?.videoUrl ? (
                <video 
                  src={filteredServices[0].videoUrl} 
                  autoPlay loop muted playsInline 
                  className="split-video-bg"
                />
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
              <h1 className="font-crimson text-4xl md:text-[64px] font-bold text-black mb-8 leading-tight">
                {pageHeader?.heading}
              </h1>
              <div className="text-gray-500 text-base md:text-xl leading-relaxed max-w-[1000px]">
                {formattedParagraphs.map((para, index) => (
                  <p key={index} className="mb-6">{para}</p>
                ))}
              </div>
              <div className="mt-8 md:mt-12">
                <button 
                  className="flex items-center text-gray-400 hover:text-black transition-colors font-medium text-sm group" 
                  onClick={() => window.history.back()}
                >
                  <span className="mr-2 text-xl transition-transform group-hover:-translate-x-1">←</span> 
                  {outdoorPage.backButtonText}
                </button>
              </div>
            </div>
          </section>

          <section className="w-full px-6 md:px-[8%] pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredServices.map((service) => (
                <div 
                  key={service.id} 
                  onClick={() => setSelectedFullscreenService(service)} 
                  className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
                >
                  <img 
                    src={service.images?.[0]} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                    <h3 className="font-crimson text-2xl md:text-3xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
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