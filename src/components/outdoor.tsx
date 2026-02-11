import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './outdoor.css';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

interface Service {
  id: string | number;
  title: string;
  videoUrl?: string;
  images?: string[];
}

const OutdoorServices: React.FC = () => {
  const { outdoorPage, header, categoryData } = LANDING_CONTENT;
  const { hash, pathname } = useLocation();
  const [selectedFullscreenService, setSelectedFullscreenService] = useState<Service | null>(null);

  const getCategoryKey = () => {
    const currentPath = (pathname + hash).toLowerCase();
    if (currentPath.includes('indoor')) return 'INDOOR';
    if (currentPath.includes('led')) return 'LED VIDEO WALL';
    if (currentPath.includes('pop')) return 'POP'; 
    if (currentPath.includes('modular')) return 'MODULAR SIGNAGE';
    return 'OUTDOOR';
  };

  const currentCategoryKey = getCategoryKey() as keyof typeof categoryData;
  const isFullWidthCategory = currentCategoryKey === 'LED VIDEO WALL' || currentCategoryKey === 'POP';
  const pageHeader = categoryData[currentCategoryKey];
  
  // Logic to split description into 3-line style paragraphs (approx. 40 words per para)
  const formattedParagraphs = useMemo(() => {
    const text = pageHeader.description || "";
    const words = text.split(/\s+/);
    const paragraphs = [];
    for (let i = 0; i < words.length; i += 40) {
      paragraphs.push(words.slice(i, i + 40).join(' '));
    }
    return paragraphs;
  }, [pageHeader.description]);

  const filteredServices = useMemo(() => {
    const allowedTitles = header.servicesData[currentCategoryKey] || [];
    return (outdoorPage.services as Service[]).filter(service => 
      allowedTitles.some(title => title.toLowerCase().trim() === service.title.toLowerCase().trim())
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

        .full-bleed-container {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .full-bleed-media-wrapper {
            position: relative;
            width: 100%;
            height: 90vh;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .full-bleed-media {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        }

        .media-overlay-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
            z-index: 1;
        }

        .media-content-overlay {
            position: relative;
            z-index: 10;
            padding: 0 8%;
            color: white;
            width: 100%;
            text-align: left;
        }

        .centered-description-container {
            max-width: 1000px;
            text-align: center;
            padding: 6rem 1.5rem;
            margin: 0 auto;
        }

        .outdoor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .service-card { transition: all 0.4s ease; position: relative; overflow: hidden; aspect-ratio: 1/0.85; cursor: pointer; }
        .initial-label { position: absolute; bottom: 0; width: 100%; padding: 2rem 1.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.9)); color: white; }

        .fs-slider-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: black;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .fs-track {
          display: flex;
          width: fit-content;
          animation: stopAndGoScroll 15s cubic-bezier(0.85, 0, 0.15, 1) infinite;
        }

        .fs-track img { height: 100vh; width: 100vw; object-fit: cover; flex-shrink: 0; }

        @keyframes stopAndGoScroll {
          0%, 20% { transform: translateX(0); }
          25%, 45% { transform: translateX(-100vw); }
          50%, 70% { transform: translateX(-200vw); }
          75%, 95% { transform: translateX(-300vw); }
          100% { transform: translateX(-400vw); }
        }

        .fs-close { position: absolute; top: 30px; right: 40px; color: white; font-size: 3.5rem; cursor: pointer; z-index: 10001; }
        body:has(.fs-slider-overlay) { overflow: hidden; }

        @media (max-width: 1024px) { .outdoor-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .outdoor-grid { grid-template-columns: 1fr; } .media-content-overlay { padding: 0 24px; } }
      `}} />

      {/* Fullscreen Slider */}
      {selectedFullscreenService && (
        <div className="fs-slider-overlay">
          <div className="fs-close" onClick={() => setSelectedFullscreenService(null)}>&times;</div>
          <div className="fs-track">
            {selectedFullscreenService.images?.map((img, idx) => (
              <img key={idx} src={img} alt="" />
            ))}
            {selectedFullscreenService.images && <img src={selectedFullscreenService.images[0]} alt="" />}
          </div>
          <div className="absolute bottom-12 left-12 z-[10000] text-white">
            <h2 className="font-crimson text-5xl md:text-7xl font-bold">{selectedFullscreenService.title}</h2>
          </div>
        </div>
      )}

      {/* Header Section with 3-line paragraph chunks */}
      {!isFullWidthCategory && (
        <section className="w-full pt-[80px] md:pt-[100px] pb-12">
          <div className="w-full max-w-[1920px] mx-auto px-6 md:px-[8%]">
            <h1 className="font-crimson text-[40px] md:text-[64px] font-bold text-black mb-10 leading-tight">
              {pageHeader.heading}
            </h1>
            <div className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-[1200px]">
              {formattedParagraphs.map((para, index) => (
                <p key={index} className="mb-6">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-12">
                <button className="flex items-center text-gray-400 hover:text-black transition-colors font-medium text-sm" onClick={() => window.history.back()}>
                    <span className="mr-2 text-xl">←</span> {outdoorPage.backButtonText}
                </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Grid Section */}
      <section className={`w-full ${isFullWidthCategory ? '' : 'px-6 md:px-[8%] pb-24'}`}>
        <div className={isFullWidthCategory ? "flex flex-col" : "outdoor-grid"}>
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => !isFullWidthCategory && setSelectedFullscreenService(service)}
              className={isFullWidthCategory ? "full-bleed-container" : "service-card"}
            >
              {isFullWidthCategory ? (
                <>
                  <div className="full-bleed-media-wrapper">
                    <div className="media-overlay-gradient" />
                    {service.videoUrl ? (
                      <video src={service.videoUrl} autoPlay loop muted playsInline className="full-bleed-media" />
                    ) : (
                      <img src={service.images?.[0]} alt={service.title} className="full-bleed-media" />
                    )}
                    
                    <div className="media-content-overlay">
                      <h2 className="font-crimson text-5xl md:text-8xl font-bold leading-none tracking-tight text-white">
                          {service.title}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="centered-description-container">
                    <div className="w-16 h-[1px] bg-black/20 mx-auto mb-10" />
                    <div className="text-gray-600 text-lg md:text-2xl leading-relaxed font-inter font-light">
                        {formattedParagraphs.slice(0, 2).map((para, idx) => (
                           <p key={idx} className="mb-4">{para}</p>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img src={service.images?.[0]} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="initial-label">
                    <h3 className="font-crimson text-2xl md:text-3xl font-bold">{service.title}</h3>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <LandingPageThree />
    </div>
  );
};

export default OutdoorServices;