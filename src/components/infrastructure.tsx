import React, { useEffect, useState } from 'react';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';
import { X } from 'lucide-react';

const Infrastructure: React.FC = () => {
  const { infrastructurePage } = LANDING_CONTENT;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /**
   * ✅ FORCE SCROLL TO TOP ON MOUNT
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * ✅ PREVENT SCROLL WHEN PREVIEW IS OPEN
   */
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const getServiceSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  return (
    <main className="bg-[#959064] w-full min-h-screen">
      {/* GLOBAL FONT IMPORT & CLASSES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }

        .font-imperial {
            font-family: "ImperialStd-BoldItalic", serif !important;
        }

        .preview-fade-in {
          animation: previewFade 0.2s ease-out;
        }

        @keyframes previewFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />

      <section 
        id="infrastructure" 
        className="w-full pt-[4rem] md:pt-[5rem] pb-[4rem] md:pb-[5rem] scroll-mt-[7rem] font-inter"
      >
        {/* Standardized Page Wrapper - Reduced bottom margin to shrink the gap */}
        <div className="w-full max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24 mb-[1rem] lg:mb-[2rem]">
          <h2 className="font-imperial text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-bold text-white mb-4 leading-tight transition-all">
            {infrastructurePage.heading}
          </h2>

          <p className="text-white/90 max-w-[70rem] text-[0.85rem] md:text-[0.95rem] lg:text-[1.1rem] leading-relaxed transition-all">
            {infrastructurePage.description}
          </p>
        </div>

        {/* Machines List */}
        <div className="w-full flex flex-col max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24">
          {infrastructurePage.equipments.map((item, index) => (
            <div
              key={item.id}
              id={getServiceSlug(item.title)}
              // ✅ FIX: Split 'py' into 'pb' and conditional 'pt' to remove top padding strictly for the first item
              className={`flex flex-col lg:flex-row items-center justify-between w-full border-b border-white/10 pb-[3rem] lg:pb-[4rem] gap-10 lg:gap-16 transition-all ${
                index === 0 ? 'pt-4 lg:pt-0' : 'pt-[3rem] lg:pt-[4rem]'
              } ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container - Increased padding to guarantee shadow/bottom edge isn't clipped */}
              <div 
                className="w-full lg:w-1/2 flex items-center justify-center cursor-pointer p-6 lg:p-10"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                {/* FIX: Removed all max-h constraints. We let the width dictate the size with h-auto so it never gets vertically chopped. */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full max-w-[95%] lg:max-w-[90%] h-auto object-contain block transition-transform hover:scale-[1.03] duration-300 drop-shadow-2xl"
                />
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="w-full max-w-[40rem] mx-auto lg:mx-0">
                  <span className="text-white/70 text-[0.75rem] md:text-[0.85rem] lg:text-[0.95rem] font-medium mb-3 block font-inter uppercase tracking-[0.3em] transition-all">
                    {item.model}
                  </span>

                  <h3 className="font-imperial text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.25rem] font-bold text-white mb-4 leading-tight transition-all">
                    {item.title}
                  </h3>

                  <div className="w-full">
                    <p className="text-white/90 leading-relaxed text-[0.85rem] md:text-[0.95rem] lg:text-[1.05rem] font-inter w-full text-left md:text-justify [text-justify:inter-word] transition-all">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ DRIVE-STYLE PREVIEW WITH HIGH Z-INDEX */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center preview-fade-in"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-[2rem] right-[2rem] lg:top-[3rem] lg:right-[3rem] 2xl:top-[4rem] 2xl:right-[4rem] text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem] 2xl:w-[4rem] 2xl:h-[4rem]" strokeWidth={2} />
          </button>

          <div 
            className="relative w-full h-full flex items-center justify-center p-[2rem] md:p-[4rem] lg:p-[6rem] 2xl:p-[8rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      )}

      <LandingPageThree />
    </main>
  );
};

export default Infrastructure;