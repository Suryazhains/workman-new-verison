import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import LandingPageThree from './landingthree';
import CircularGallery from './CircularGallery';

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
  const openTimeRef = useRef<number>(0);

  const galleryItems = useMemo(() => {
    return service.images?.map((img) => ({
      image: img,
      text: service.title
    })) || [];
  }, [service.images, service.title]);

  const openViewer = (index: number) => {
    openTimeRef.current = Date.now();
    setViewerIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeViewer = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    if (Date.now() - openTimeRef.current < 300) return;
    if (e) {
      e.stopPropagation();
      if ('nativeEvent' in e) e.nativeEvent.stopImmediatePropagation();
    }
    setViewerIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (service.images) {
      setViewerIndex((prev) => (prev !== null ? (prev + 1) % service.images!.length : 0));
    }
  }, [service.images]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (service.images) {
      setViewerIndex((prev) => (prev !== null ? (prev - 1 + service.images!.length) % service.images!.length : 0));
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [viewerIndex, showNext, showPrev, closeViewer]);

  if (!service) return null;

  const isLedVideoWall = service.title.toLowerCase().includes('led video wall') || service.id === 13;

  return (
    <div className="w-full bg-white font-inter">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }
        
        .lightbox-overlay { 
          position: fixed; 
          inset: 0; 
          background: rgba(0, 0, 0, 0.96); 
          z-index: 99999; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          backdrop-filter: blur(20px); 
          user-select: none;
        }

        /* PERFECT SQUARE FRAME */
        .image-frame {
          width: 90vw;
          max-width: 600px; /* Limits size on desktop */
          aspect-ratio: 1 / 1; /* FORCES SQUARE SHAPE */
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
        }

        .lightbox-img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; /* Fills the square completely */
          pointer-events: auto;
          transition: opacity 0.3s ease;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 100001;
        }
        .nav-btn:hover { background: rgba(255, 255, 255, 0.3); }
        .prev-btn { left: 20px; }
        .next-btn { right: 20px; }
        
        .close-btn-new { 
          position: absolute; 
          top: 20px; 
          right: 20px; 
          color: rgba(255, 255, 255, 0.6); 
          font-size: 2.5rem; 
          cursor: pointer; 
          z-index: 100002;
          padding: 10px;
          line-height: 1;
        }

        .image-counter {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 0.8rem;
          opacity: 0.6;
        }
        
        @media (max-width: 768px) {
          .image-frame { width: 85vw; }
          .nav-btn { width: 40px; height: 40px; }
          .prev-btn { left: 10px; }
          .next-btn { right: 10px; }
        }
      `}} />

      {viewerIndex !== null && service.images && (
        <div className="lightbox-overlay" onClick={() => closeViewer()}>
          <div className="close-btn-new" onClick={() => closeViewer()}>&times;</div>
          
          <button className="nav-btn prev-btn" onClick={(e) => showPrev(e)}>&#8592;</button>
          
          <div className="image-frame" onClick={(e) => e.stopPropagation()}>
            <img 
              key={viewerIndex}
              src={service.images[viewerIndex]} 
              className="lightbox-img" 
              alt="Project" 
            />
            <div className="image-counter">
              {viewerIndex + 1} / {service.images.length}
            </div>
          </div>
          
          <button className="nav-btn next-btn" onClick={(e) => showNext(e)}>&#8594;</button>
        </div>
      )}

      {/* Header Section */}
      <div className="pt-28 pb-8 px-[8%] bg-[#BBB791]">
        <h1 className="font-imperial text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4">
          {service.title} Project Gallery
        </h1>
        <p className="text-white text-lg max-w-3xl font-light">
          {isLedVideoWall 
            ? `View our high-definition display solutions for ${service.title}.`
            : `Drag horizontally to explore. Click any image to expand.`
          }
        </p>
      </div>

      {/* Gallery Section */}
      {!isLedVideoWall && (
        <div className="w-full h-[600px] md:h-[800px] bg-[#BBB791] relative overflow-hidden">
          {galleryItems.length > 0 ? (
            <CircularGallery 
              items={galleryItems} 
              bend={3} 
              textColor="#FFFFFF" 
              borderRadius={0.03} 
              onItemClick={(index: number) => openViewer(index)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              Loading Gallery...
            </div>
          )}
        </div>
      )}

      {/* Video Section */}
      {service.videoUrl && (
        <div className={`px-[8%] bg-white ${isLedVideoWall ? 'py-12' : 'py-24'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl bg-gray-900">
              <video 
                src={service.videoUrl} 
                controls autoPlay loop muted playsInline
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        <LandingPageThree />
      </div>
    </div>
  );
};

export default ServiceDetails;