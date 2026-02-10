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
  const [activeId, setActiveId] = useState<string>("");

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
  
  const descriptionParts = useMemo(() => {
    const text = pageHeader.description || "";
    const splitIndex = text.indexOf('.', 200); 
    if (splitIndex === -1) return [text, ""];
    return [text.substring(0, splitIndex + 1), text.substring(splitIndex + 1)];
  }, [pageHeader.description]);

  const filteredServices = useMemo(() => {
    const allowedTitles = header.servicesData[currentCategoryKey] || [];
    return (outdoorPage.services as Service[]).filter(service => 
      allowedTitles.some(title => title.toLowerCase().trim() === service.title.toLowerCase().trim())
    );
  }, [currentCategoryKey, header.servicesData, outdoorPage.services]);

  const formatId = (text: string) => 
    text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetHash = hash.replace('#', '').toLowerCase();
    const matchedService = filteredServices.find(s => 
      formatId(s.title) === targetHash || targetHash.includes(formatId(s.title))
    );

    if (matchedService) {
      const finalId = formatId(matchedService.title);
      setActiveId(finalId);
      
      const scrollTimeout = setTimeout(() => {
        const element = document.getElementById(finalId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);

      return () => clearTimeout(scrollTimeout);
    }
  }, [hash, filteredServices]);

  return (
    <div className="flex flex-col w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }

        .service-card { transition: all 0.4s ease; outline: none !important; border: none; }
        
        .full-width-layout { display: flex !important; flex-direction: column; width: 100%; gap: 5rem; }
        /* Adjusted full-width card to take maximum available space */
        .full-width-card { width: 100% !important; max-width: 100% !important; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .media-container-full { width: 100%; height: auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .media-content-full { width: 100%; height: auto; display: block; object-fit: contain; }
        .title-container-full { margin-top: 2rem; text-align: center; width: 100%; }
        @media (max-width: 768px) { .full-width-layout { gap: 3rem; } }
      `}} />

      <section className="w-full bg-white pt-[60px] md:pt-[90px] pb-[90px]">
        {/* Container set to max-w-full with padding for edge-to-edge look */}
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 xl:px-[90px]">
          <div className="mb-12">
            <h1 className="font-crimson text-[36px] md:text-[56px] font-bold text-black mb-6 capitalize tracking-tight">
              {pageHeader.heading}
            </h1>
            
            <div className="flex flex-col w-full">
              {/* Removed max-w-[1200px] to allow full-width text expansion */}
              <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed font-inter w-full">
                {descriptionParts[0]}
              </p>
              <div className="mt-8 md:mt-12" /> 
              <p className="text-gray-500 text-[16px] md:text-[18px] leading-relaxed font-inter w-full">
                {descriptionParts[1]}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <button
              type="button"
              className="flex items-center text-gray-400 hover:text-black transition-colors font-medium text-sm outline-none"
              onClick={() => window.history.back()}
            >
              <span className="mr-2">←</span>
              {outdoorPage.backButtonText}
            </button>
          </div>

          {/* Grid container utilizes full width of parent padding */}
          <div className={isFullWidthCategory ? "full-width-layout" : "outdoor-grid w-full"}>
            {filteredServices.map((service) => {
              const currentSlug = formatId(service.title);
              const isActive = activeId === currentSlug;

              return (
                <div 
                  key={service.id} 
                  id={currentSlug} 
                  className={`service-card scroll-mt-32 ${isActive ? 'product-highlight' : ''} ${isFullWidthCategory ? 'full-width-card' : ''}`}
                >
                  {isFullWidthCategory ? (
                    <>
                      <div className="media-container-full">
                        {service.videoUrl ? (
                          <video src={service.videoUrl} autoPlay loop muted playsInline className="media-content-full" />
                        ) : (
                          <img 
                            src={service.images && service.images.length > 0 ? service.images[0] : ''} 
                            alt={service.title} 
                            className="media-content-full w-full" 
                          />
                        )}
                      </div>
                      <div className="title-container-full">
                        <h3 className="font-crimson text-2xl md:text-4xl font-bold text-black text-center">
                          {service.title}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="image-filmstrip w-full">
                        {service.images?.slice(0, 3).map((img, idx) => (
                          <img key={`${service.id}-img-${idx}`} src={img} alt={service.title} className="filmstrip-img" loading="lazy" />
                        ))}
                      </div>
                      <div className="initial-label w-full">
                        <h3 className="font-crimson initial-title-text text-[20px] md:text-[24px] font-bold">
                          {service.title}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <LandingPageThree />
    </div>
  );
};

export default OutdoorServices;