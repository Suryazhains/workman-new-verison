import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './outdoor.css';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

// Define the Service interface to fix the "Unexpected any" error
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
  
  // KEEPING POP FULL WIDTH AS REQUESTED
  const isFullWidthCategory = currentCategoryKey === 'LED VIDEO WALL' || currentCategoryKey === 'POP';
  
  const pageHeader = categoryData[currentCategoryKey];
  
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
        .product-highlight { 
          animation: blue-glow-pulse 2.5s ease-out forwards; 
          background-color: rgba(22, 59, 115, 0.04); 
          border-radius: 12px; 
          z-index: 10; 
        }
        @keyframes blue-glow-pulse {
          0% { box-shadow: 0 0 0 0px rgba(22, 59, 115, 0.4); }
          30% { box-shadow: 0 0 0 15px rgba(22, 59, 115, 0.1); }
          100% { box-shadow: 0 0 0 0px transparent; }
        }
        .full-width-layout { display: flex !important; flex-direction: column; width: 100%; gap: 5rem; }
        .full-width-card { width: 100% !important; max-width: 1440px !important; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .media-container-full { width: 100%; height: auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .media-content-full { width: 100%; height: auto; display: block; object-fit: contain; }
        .title-container-full { margin-top: 1.5rem; text-align: center; width: 100%; }
        @media (max-width: 768px) { .full-width-layout { gap: 3rem; } }
      `}} />

      <section className="w-full bg-white pt-[90px] pb-[90px]">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10 xl:px-[90px]">
          <div className="mb-12">
            <h1 className="font-crimson text-[42px] md:text-[56px] font-bold text-black mb-4 capitalize tracking-tight">
              {pageHeader.heading}
            </h1>
            <p className="text-gray-500 text-[18px] w-full leading-relaxed font-inter">
              {pageHeader.description}
            </p>
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

          <div className={isFullWidthCategory ? "full-width-layout" : "outdoor-grid"}>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
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
                              className="media-content-full" 
                            />
                          )}
                        </div>
                        <div className="title-container-full">
                          <h3 className="font-crimson text-3xl font-bold text-black text-center">
                            {service.title}
                          </h3>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="image-filmstrip">
                          {service.images?.slice(0, 3).map((img, idx) => (
                            <img key={`${service.id}-img-${idx}`} src={img} alt={service.title} className="filmstrip-img" loading="lazy" />
                          ))}
                        </div>
                        <div className="initial-label">
                          <h3 className="font-crimson initial-title-text text-[24px] font-bold">
                            {service.title}
                          </h3>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 font-inter">
                No services found for this category.
              </div>
            )}
          </div>
        </div>
      </section>
      <LandingPageThree />
    </div>
  );
};

export default OutdoorServices;