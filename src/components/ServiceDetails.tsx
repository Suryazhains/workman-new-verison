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
  
  // Refs to track swipe gestures on mobile
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const images = service?.images || [];

  // Strictly memoize to prevent the gallery from constantly remounting
  const galleryItems = useMemo(() => {
    return images.map((img) => ({
      image: img,
      text: service?.title || ''
    }));
  }, [images, service?.title]);

  const openViewer = useCallback((index: number) => {
    openTimeRef.current = Date.now();
    setViewerIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeViewer = useCallback(() => {
    if (Date.now() - openTimeRef.current < 300) return;
    setViewerIndex(null);
    document.body.style.overflow = '';
  }, []);

  // Infinite Loop Logic (Like Google Drive)
  const showNext = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (images.length === 0) return;
    setViewerIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  }, [images.length]);

  const showPrev = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (images.length === 0) return;
    setViewerIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
  }, [images.length]);

  // Swipe Gesture Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches.clientX;
    touchEndX.current = e.touches.clientX; // Reset end position
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches.clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    // Swipe left (next image)
    if (swipeDistance > 50) showNext();
    // Swipe right (previous image)
    else if (swipeDistance < -50) showPrev();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewerIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape' || e.key === 'Esc') closeViewer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewerIndex, showNext, showPrev, closeViewer]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!service) return null;

  const isLedVideoWall = service.title.toLowerCase().includes('led video wall') || service.id === 13;

  return (
    <div className="w-full bg-white font-inter">
      <style dangerouslySetInnerHTML={{ __html: `
        .lightbox-overlay { 
          position: fixed; 
          inset: 0; 
          background: rgba(0, 0, 0, 0.98); 
          z-index: 99999; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          backdrop-filter: blur(15px); 
          user-select: none;
        }

        .image-frame {
          width: 90vw;
          max-width: 1200px;
          aspect-ratio: 16 / 9;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden; 
        }

        .lightbox-img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          /* Prevents user from selecting the image and breaking clicks */
          user-select: none;
          -webkit-user-drag: none;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: background 0.2s;
          z-index: 100001;
        }
        .nav-btn:hover { background: rgba(255, 255, 255, 0.3); }
        .prev-btn { left: 30px; }
        .next-btn { right: 30px; }
        
        .close-btn-new { 
          position: absolute; 
          top: 30px; 
          right: 30px; 
          color: white; 
          font-size: 3rem; 
          cursor: pointer; 
          z-index: 100002;
          line-height: 1;
        }

        .image-counter {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-family: sans-serif;
          font-size: 1rem;
          letter-spacing: 1px;
          z-index: 100002;
        }
        
        @media (max-width: 768px) {
          /* Hide the arrows entirely on mobile view */
          .nav-btn { display: none !important; }
          .image-frame { width: 95vw; aspect-ratio: 4 / 3; }
        }
      `}} />

      {/* Lightbox Overlay */}
      {viewerIndex !== null && images.length > 0 && (
        <div className="lightbox-overlay" onClick={closeViewer}>
          <div className="close-btn-new" onClick={closeViewer}>&times;</div>
          
          <button className="nav-btn prev-btn" onClick={showPrev}>&#8592;</button>
          
          <div 
            className="image-frame" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img 
              src={images[viewerIndex]} 
              className="lightbox-img" 
              alt={`Project Gallery ${viewerIndex + 1}`} 
              draggable={false} /* Stops the image drag crash */
            />
            <div className="image-counter" onClick={(e) => e.stopPropagation()}>
              {viewerIndex + 1} / {images.length}
            </div>
          </div>
          
          <button className="nav-btn next-btn" onClick={showNext}>&#8594;</button>
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
              onItemClick={openViewer}
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