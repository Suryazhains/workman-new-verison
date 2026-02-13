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
  // State for Lightbox
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openViewer = (index: number) => setViewerIndex(index);
  const closeViewer = () => setViewerIndex(null);

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

  // Handle Keyboard Arrows
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
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.98);
          z-index: 10002;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }
        .lightbox-img {
          max-width: 85vw;
          max-height: 80vh;
          object-fit: contain;
          user-select: none;
          box-shadow: 0 0 50px rgba(0,0,0,0.8);
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.05);
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 2.5rem;
          transition: all 0.3s;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .nav-btn:hover { background: rgba(255,255,255,0.2); scale: 1.1; }
        
        .close-btn-left {
          position: absolute;
          top: 30px;
          left: 40px;
          color: #ffffff;
          font-size: 4rem;
          cursor: pointer;
          line-height: 0.5;
          z-index: 10003;
          transition: opacity 0.3s;
        }
        .close-btn-left:hover { opacity: 0.7; }

        .counter {
          position: absolute;
          bottom: 40px;
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          letter-spacing: 3px;
          font-weight: 500;
        }
      `}} />

      {/* --- IMAGE VIEWER MODAL --- */}
      {viewerIndex !== null && service.images && (
        <div className="lightbox-overlay" onClick={closeViewer}>
          {/* Close button moved to Left side and forced White */}
          <div className="close-btn-left" onClick={closeViewer}>&times;</div>
          
          <div className="nav-btn left-[40px]" onClick={showPrev}>&#8249;</div>
          
          <img 
            src={service.images[viewerIndex]} 
            className="lightbox-img" 
            alt="Full View" 
            onClick={(e) => e.stopPropagation()} 
          />
          
          <div className="nav-btn right-[40px]" onClick={showNext}>&#8250;</div>
          
          <div className="counter uppercase">
             Image {viewerIndex + 1} of {service.images.length}
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="py-20 px-[8%] border-b border-gray-100">
        <h1 className="font-crimson text-5xl md:text-7xl font-bold text-black mb-4">
          {service.title} Project Gallery
        </h1>
        <div className="w-20 h-1 bg-[#FE4E5D]" />
        <p className="mt-6 text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
          Explore our recent installations and high-quality craftsmanship for {service.title}.
        </p>
      </div>

      {/* Image Gallery */}
      <div className="px-[8%] py-24 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {service.images?.map((img, idx) => (
            <div 
              key={idx} 
              className="overflow-hidden rounded-sm shadow-lg bg-white cursor-pointer group"
              onClick={() => openViewer(idx)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={img} 
                  alt={`${service.title} ${idx}`} 
                  className="w-full h-[450px] md:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Removed "View Image" text overlay, kept a subtle hover dim */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}

          {/* Video Section */}
          {service.videoUrl && (
            <div className="col-span-1 md:col-span-2 mt-4">
              <video 
                src={service.videoUrl} 
                controls 
                autoPlay 
                loop 
                muted 
                className="w-full rounded-sm shadow-xl" 
              />
            </div>
          )}
        </div>
      </div>

      {!isLedVideoWall && (
        <div className="w-full">
          <LandingPageThree />
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;