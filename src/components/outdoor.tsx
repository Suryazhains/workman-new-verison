import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './outdoor.css';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

const OutdoorServices: React.FC = () => {
  const { outdoorPage, header, categoryData } = LANDING_CONTENT;
  const { hash, pathname } = useLocation();
  const [activeId, setActiveId] = useState<string>("");

  /**
   * 1. IDENTIFY CATEGORY & FILTER LOGIC
   * Checks both pathname and hash to ensure Indoor, LED, POP, and Modular load correctly.
   */
  const getCategoryKey = () => {
    const currentPath = (pathname + hash).toLowerCase();
    
    if (currentPath.includes('indoor')) return 'INDOOR';
    if (currentPath.includes('led')) return 'LED VIDEO WALL';
    if (currentPath.includes('pop')) return 'POP'; // Correctly detects POP route
    if (currentPath.includes('modular')) return 'MODULAR SIGNAGE';
    return 'OUTDOOR';
  };

  const currentCategoryKey = getCategoryKey() as keyof typeof categoryData;
  
  // Get dynamic heading and description based on the detected category
  const pageHeader = categoryData[currentCategoryKey];

  // Get the list of titles allowed for this specific category from the Header data
  const allowedTitles = header.servicesData[currentCategoryKey] || [];

  /**
   * Filter the master services list.
   * We use .trim() on both sides to prevent mismatches caused by accidental trailing spaces.
   */
  const filteredServices = outdoorPage.services.filter(service => 
    allowedTitles.some(title => title.toLowerCase().trim() === service.title.toLowerCase().trim())
  );

  /**
   * Standardized ID generator
   * Matches the logic in Header.tsx exactly
   */
  const formatId = (text: string) => 
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  /**
   * Effect to handle automatic scrolling and setting the active highlight
   */
  useEffect(() => {
    if (hash) {
      const targetHash = hash.replace('#', '').toLowerCase();
      
      const matchedService = filteredServices.find(s => {
        const fullSlug = formatId(s.title);
        return fullSlug === targetHash || targetHash.includes(fullSlug);
      });

      if (matchedService) {
        const finalId = formatId(matchedService.title);
        setActiveId(finalId);
        
        const element = document.getElementById(finalId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      }
    } else {
      setActiveId("");
      window.scrollTo(0, 0); 
    }
  }, [hash, pathname, filteredServices]);

  return (
    <div className="flex flex-col w-full">
      <style>
        {`
          .service-card {
            transition: all 0.4s ease;
            outline: none !important;
            border: none;
          }

          .product-highlight {
            animation: blue-glow-pulse 2.5s ease-out forwards;
            background-color: rgba(22, 59, 115, 0.04);
            border-radius: 12px;
            z-index: 10;
          }

          @keyframes blue-glow-pulse {
            0% {
              box-shadow: 0 0 0 0px rgba(22, 59, 115, 0.4);
            }
            30% {
              box-shadow: 0 0 0 15px rgba(22, 59, 115, 0.1);
            }
            100% {
              box-shadow: 0 0 0 0px transparent;
            }
          }

          *:focus {
            outline: none !important;
          }
        `}
      </style>

      <section className="w-full bg-[#F6F7F9] pt-16 pb-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[80px]">

          {/* DYNAMIC HEADER */}
          <div className="mb-12">
            <h1 className="text-[42px] md:text-[56px] font-bold text-black mb-4 capitalize tracking-tight">
              {pageHeader.heading}
            </h1>
            <p className="text-gray-500 text-[16px] max-w-xl leading-relaxed">
              {pageHeader.description}
            </p>
          </div>

          {/* Back Button */}
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

          {/* FILTERED SERVICES GRID */}
          <div className="outdoor-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const currentSlug = formatId(service.title);
                const isActive = activeId === currentSlug;

                return (
                  <div 
                    key={service.id} 
                    id={currentSlug} 
                    className={`service-card scroll-mt-32 ${isActive ? 'product-highlight' : ''}`}
                  >
                    {/* Image Filmstrip */}
                    {service.images && service.images.length > 0 && (
                      <div className="image-filmstrip">
                        {service.images.slice(0, 3).map((img, idx) => (
                          <img
                            key={`${service.id}-img-${idx}`}
                            src={img}
                            alt={service.title}
                            className="filmstrip-img"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}

                    <div className="initial-label">
                      <h3 className="initial-title-text">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400">
                No services found for this category. Please check naming consistency in content.ts.
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