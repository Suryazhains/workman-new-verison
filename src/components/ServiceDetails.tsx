import React, { useEffect, useState, useCallback } from 'react';
import LandingPageThree from './landingthree';

interface ServiceProps {
  service: {
    id: string | number;
    title: string;
    videoUrl?: string;
    images?: string[];
  };
}

const ServiceDetails: React.FC<ServiceProps> = ({ service }) => {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openViewer = (index: number) => {
    setViewerIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = () => {
    setViewerIndex(null);
    document.body.style.overflow = 'unset';
  };

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (service.images) {
      setViewerIndex((prev) => (prev !== null && prev < service.images!.length - 1 ? prev + 1 : 0));
    }
  }, [service.images]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (service.images) {
      setViewerIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : service.images!.length - 1));
    }
  }, [service.images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewerIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeViewer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerIndex, showNext, showPrev]);

  if (!service) return null;

  const isLedVideoWall = service.title.toLowerCase().includes('led video wall') || service.id === 13;

  return (
    <div className="w-full bg-white font-inter">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');

        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }

        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.98);
          z-index: 10002;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(15px);
        }
        .lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          user-select: none;
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #1a1a1a;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 2.5rem;
          transition: all 0.2s ease;
        }
        .nav-btn:hover { opacity: 0.4; }
        
        .close-btn {
          position: absolute;
          top: 30px;
          right: 40px;
          color: #000;
          font-size: 3rem;
          font-weight: 200;
          cursor: pointer;
          z-index: 10003;
          line-height: 1;
        }

        .counter {
          position: absolute;
          bottom: 30px;
          color: #999;
          font-size: 0.7rem;
          letter-spacing: 4px;
          font-weight: 400;
        }
      `}} />

      {/* --- MINIMAL LIGHTBOX --- */}
      {viewerIndex !== null && service.images && (
        <div className="lightbox-overlay" onClick={closeViewer}>
          <div className="close-btn" onClick={closeViewer}>&times;</div>
          <div className="nav-btn left-[20px] md:left-[40px]" onClick={showPrev}>&#8249;</div>
          
          <img 
            src={service.images[viewerIndex]} 
            className="lightbox-img" 
            alt="Full view" 
            onClick={(e) => e.stopPropagation()} 
          />
          
          <div className="nav-btn right-[20px] md:right-[40px]" onClick={showNext}>&#8250;</div>
          
          <div className="counter uppercase text-center">
            {viewerIndex + 1} &mdash; {service.images.length}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="pt-28 pb-16 px-[8%]">
        {/* UPDATED FONT HERE */}
        <h1 className="font-imperial text-4xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight mb-8">
          {service.title} Project Gallery
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl w-full max-w-5xl leading-relaxed font-light">
          Explore our recent installations and high-quality craftsmanship for {service.title}. 
          We specialize in delivering bespoke solutions tailored to the unique requirements of every environment.
        </p>
      </div>

      {/* Image Gallery: Clean white background */}
      <div className="px-[8%] pb-32 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {service.images?.map((img, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer"
              onClick={() => openViewer(idx)}
            >
              <div className="overflow-hidden bg-gray-50 aspect-[3/2]">
                <img 
                  src={img} 
                  alt={`${service.title} ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 h-[1px] w-0 group-hover:w-full bg-black transition-all duration-500 opacity-20" />
            </div>
          ))}

          {/* Video Section */}
          {service.videoUrl && (
            <div className="col-span-1 md:col-span-2 mt-8">
              <div className="aspect-video w-full overflow-hidden">
                <video 
                  src={service.videoUrl} 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {!isLedVideoWall && (
        <div className="w-full border-t border-gray-100">
          <LandingPageThree />
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;