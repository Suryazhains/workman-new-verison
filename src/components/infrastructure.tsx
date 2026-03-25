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
    <main className="bg-[#BBB791] w-full min-h-screen">
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
        {/* Page Heading - Slashed sizes to counter the 1.11vw global scaling */}
        <div className="w-full mx-auto mb-[2.5rem] px-[1.5rem] lg:px-[3rem] xl:px-[5rem] 2xl:px-[6rem] max-w-[120rem]">
          <h2 className="font-imperial text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] xl:text-[3.5rem] 2xl:text-[4rem] min-[2000px]:text-[5rem] font-bold text-white mb-4 leading-tight transition-all">
            {infrastructurePage.heading}
          </h2>
          <p className="text-white/90 max-w-[70rem] text-[1.125rem] md:text-[1.125rem] lg:text-[1.125rem] xl:text-[1.25rem] 2xl:text-[1.5rem] min-[2000px]:text-[2rem] leading-relaxed transition-all">
            {infrastructurePage.description}
          </p>
        </div>

        {/* Machines Grid - Tighter padding to prevent huge blank spaces */}
        <div className="w-full flex flex-col px-[1rem] lg:px-[2rem] xl:px-[3rem] 2xl:px-[4rem] max-w-[120rem] mx-auto">
          {infrastructurePage.equipments.map((item, index) => (
            <div
              key={item.id}
              id={getServiceSlug(item.title)}
              className={`flex flex-col lg:flex-row items-center w-full border-b border-white/5 py-[2.5rem] lg:py-[3rem] xl:py-[3.5rem] transition-all ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container - Reduced padding so images don't look lost */}
              <div 
                className="w-full lg:w-1/2 flex items-center justify-center cursor-pointer p-[1.5rem] lg:p-[2rem] xl:p-[2.5rem] 2xl:p-[3rem] min-[2000px]:p-[4rem] bg-transparent"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full max-w-[85%] lg:max-w-[80%] h-auto object-contain block transition-all hover:scale-[1.02] duration-300 drop-shadow-lg"
                />
              </div>

              {/* Text Container - Slashed Font Sizes */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center px-[1.5rem] py-[1.5rem] lg:px-[2.5rem] xl:px-[4rem] 2xl:px-[6rem] min-[2000px]:px-[8rem] transition-all">
                <div className="w-full max-w-[40rem] 2xl:max-w-[50rem]">
                  <span className="text-white/70 text-[0.875rem] md:text-[0.875rem] lg:text-[1rem] 2xl:text-[1.125rem] min-[2000px]:text-[1.25rem] font-medium mb-3 block font-inter uppercase tracking-[0.3em] transition-all">
                    {item.model}
                  </span>

                  <h3 className="font-imperial text-[1.875rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] 2xl:text-[3.5rem] min-[2000px]:text-[4.5rem] font-bold text-white mb-4 leading-tight transition-all">
                    {item.title}
                  </h3>

                  <div className="w-full">
                    <p className="text-white/90 leading-relaxed text-[1rem] md:text-[1rem] lg:text-[1.125rem] xl:text-[1.125rem] 2xl:text-[1.375rem] min-[2000px]:text-[1.75rem] font-inter w-full text-left md:text-justify [text-justify:inter-word] transition-all">
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
          className="fixed inset-0 z-[99999] flex items-center justify-center preview-fade-in"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-[2rem] right-[2rem] lg:top-[3rem] lg:right-[3rem] 2xl:top-[4rem] 2xl:right-[4rem] text-white hover:text-gray-300 transition-colors z-[100000]"
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