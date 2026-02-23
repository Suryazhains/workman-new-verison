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
    <main className="bg-[#FFC107] w-full min-h-screen">
      {/* GLOBAL FONT IMPORT & CRIMSON CLASS */}
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
        className="w-full pt-10 pb-16 md:pb-24 scroll-mt-28 font-inter"
      >
        {/* Page Heading - 90px Side Padding */}
        <div className="w-full mx-auto mb-10 px-6 lg:px-[90px]">
          {/* UPDATED FONT HERE */}
          <h2 className="font-imperial text-[40px] md:text-[56px] lg:text-[72px] font-bold text-white mb-4 leading-tight">
            {infrastructurePage.heading}
          </h2>
          <p className="text-white/90 max-w-[1700px] text-lg md:text-2xl leading-relaxed">
            {infrastructurePage.description}
          </p>
        </div>

        {/* Machines Grid - 90px Side Padding */}
        <div className="w-full flex flex-col px-4 lg:px-[20px]">
          {infrastructurePage.equipments.map((item, index) => (
            <div
              key={item.id}
              id={getServiceSlug(item.title)}
              className={`flex flex-col lg:flex-row items-stretch w-full min-h-[400px] lg:min-h-[550px] border-b border-white/5 py-2.5 ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container - Reduced padding to minimize gaps */}
              <div 
                className="w-full lg:w-1/2 flex items-center justify-center cursor-pointer p-4 md:p-8"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full max-h-[500px] object-contain block"
                />
              </div>

              {/* Text Container - Reduced vertical padding to 10px (py-2.5) */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-2.5 md:px-16 lg:px-24">
                <div className="w-full">
                  <span className="text-white/60 text-sm md:text-base font-medium mb-2 block font-inter uppercase tracking-[0.4em]">
                    {item.model}
                  </span>

                  {/* UPDATED FONT HERE */}
                  <h3 className="font-imperial text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {item.title}
                  </h3>

                  <div className="w-full">
                    <p className="text-white/90 leading-relaxed text-lg md:text-xl font-inter w-full text-justify [text-justify:inter-word]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ DRIVE-STYLE PREVIEW */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center preview-fade-in"
          style={{ 
            backgroundColor: 'rgba(30, 30, 30, 0.75)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-10 right-10 text-white hover:opacity-70 transition-opacity z-[10000]"
          >
            <X size={40} strokeWidth={1.5} />
          </button>

          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
        </div>
      )}

      <LandingPageThree />
    </main>
  );
};

export default Infrastructure;