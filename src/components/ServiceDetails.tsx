import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

interface ServiceProps {
  service?: {
    id: string | number;
    title: string;
    videoUrl?: string;
    images?: string[];
    description_points?: string[];
  };
}

// Helper function to match the URL slug from the header
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const ServiceDetails: React.FC<ServiceProps> = ({ service: propService }) => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const [activeService, setActiveService] = useState<any>(propService);
  const [isLoading, setIsLoading] = useState(!propService);

  // Lightbox State
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const openTimeRef = useRef<number>(0);
  
  // Refs to track swipe gestures on mobile for Lightbox
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Scroll Container State (For Horizontal Track)
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch the data from content.ts if we routed here via URL
  useEffect(() => {
    if (!propService && serviceId) {
      window.scrollTo(0, 0);
      const allServices = LANDING_CONTENT.outdoorPage.services;
      const foundService = allServices.find((s: any) => generateSlug(s.title) === serviceId);
      
      if (foundService) {
        setActiveService(foundService);
      }
      setIsLoading(false);
    }
  }, [serviceId, propService]);

  const images = activeService?.images || [];
  const duplicatedImages = [...images, ...images, ...images];

  // --- Lightbox Handlers ---
  const openViewer = useCallback((index: number) => {
    if (typeof index !== 'number') return;
    openTimeRef.current = Date.now();
    setViewerIndex(index % images.length); // Modulo ensures correct image from duplicated track
    document.body.style.overflow = 'hidden';
  }, [images.length]);

  const closeViewer = useCallback(() => {
    if (Date.now() - openTimeRef.current < 300) return;
    setViewerIndex(null);
    document.body.style.overflow = '';
  }, []);

  const showNext = useCallback(() => {
    setViewerIndex((prev) => {
      if (prev === null || images.length === 0) return 0;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const showPrev = useCallback(() => {
    setViewerIndex((prev) => {
      if (prev === null || images.length === 0) return 0;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  // --- Horizontal Drag Scroll Logic ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => setIsDown(false);

  const handleTouchStartScroll = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMoveScroll = (e: React.TouchEvent) => {
    if (!isDown || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- Lightbox Swipe Gesture Handlers for Mobile ---
  const handleTouchStartLightbox = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX; 
  };

  const handleTouchMoveLightbox = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEndLightbox = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (Math.abs(swipeDistance) < 50) return; 
    if (swipeDistance > 50) showNext();
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
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (isLoading) return <div className="min-h-screen bg-[#BBB791]"></div>;
  if (!activeService) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#BBB791] text-white">
        <h1 className="text-4xl font-bold font-imperial mb-4">Service Not Found</h1>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-white text-[#BBB791] font-bold rounded-lg mt-4">
          Go Back
        </button>
      </div>
    );
  }

  const isLedVideoWall = activeService.title.toLowerCase().includes('led video wall') || activeService.id === 13;

  return (
    <div className="w-full bg-[#BBB791] font-inter overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');

        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }

        /* Animation & Scroll Bar for Horizontal Gallery */
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        .animate-infinite {
          animation: infiniteScroll 60s linear infinite;
        }

        .expert-container:active .animate-infinite,
        .expert-container:hover .animate-infinite {
          animation-play-state: paused;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Lightbox Styles */
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
          z-index: 100000;
          background-color: black;
        }

        .lightbox-img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          user-select: none;
          -webkit-user-drag: none;
          transition: transform 0.3s ease;
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
          z-index: 100005;
          pointer-events: auto;
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
          z-index: 100005;
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

        /* Responsive Fixes - HORIZONTAL RECTANGLES TO MATCH SCREENSHOT */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .team-card { width: 650px !important; height: 450px !important; border-radius: 20px !important; }
          .team-scroll-container { padding-left: 40px; padding-right: 40px; }
        }
        @media (min-width: 1920px) {
          .team-card { width: 800px; height: 550px; }
        }
        
        @media (max-width: 768px) {
          .nav-btn { display: none !important; }
          .image-frame { width: 95vw; aspect-ratio: 4 / 3; }
        }
      `}} />

      {/* Lightbox Overlay */}
      {viewerIndex !== null && images.length > 0 && (
        <div 
          className="lightbox-overlay" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeViewer();
            }
          }}
        >
          <div className="close-btn-new" onClick={closeViewer}>&times;</div>
          
          <button 
            className="nav-btn prev-btn" 
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              showPrev(); 
            }}
          >
            &#8592;
          </button>
          
          <div 
            className="image-frame" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStartLightbox}
            onTouchMove={handleTouchMoveLightbox}
            onTouchEnd={handleTouchEndLightbox}
          >
            <img 
              key={viewerIndex} 
              src={images[viewerIndex]} 
              className="lightbox-img" 
              alt={`Project Gallery ${viewerIndex + 1}`} 
              draggable={false}
            />
            <div className="image-counter" onClick={(e) => e.stopPropagation()}>
              {viewerIndex + 1} / {images.length}
            </div>
          </div>
          
          <button 
            className="nav-btn next-btn" 
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              showNext(); 
            }}
          >
            &#8594;
          </button>
        </div>
      )}

      {/* SPLIT HERO SECTION */}
      <div className="w-full flex flex-col lg:flex-row min-h-[70vh] lg:min-h-screen bg-[#BBB791]">
        
        {/* Left Side: Text Details */}
        <div className="w-full lg:w-1/2 relative flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-24 [@media(min-width:2400px)]:px-[8rem]">
          
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-6 left-6 lg:top-8 lg:left-8 z-50 text-white drop-shadow-lg hover:text-gray-200 transition-colors bg-black/20 rounded-full p-2 backdrop-blur-sm"
            aria-label="Back"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <h4 className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 mt-8 md:mt-0">
            SERVICE DETAILS
          </h4>
          
          {/* Title */}
          <h1 className="font-imperial text-4xl md:text-5xl lg:text-6xl xl:text-7xl [@media(min-width:2400px)]:text-[100px] text-white font-bold leading-tight mb-8">
            {activeService.title.split('/').map((part: string, index: number, array: string[]) => (
              <React.Fragment key={index}>
                {part.trim()}
                {index < array.length - 1 && <span className="opacity-80 mx-2">/</span>}
                <br />
              </React.Fragment>
            ))}
          </h1>

          {/* Numbered Bullet Points */}
          {activeService.description_points && (
            <ul className="space-y-6 md:space-y-8 max-w-[650px] [@media(min-width:2400px)]:max-w-[1000px]">
              {activeService.description_points.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 [@media(min-width:2400px)]:w-10 [@media(min-width:2400px)]:h-10 shrink-0 bg-white text-[#BBB791] rounded-full font-bold text-sm md:text-base mt-1">
                    {index + 1}
                  </span>
                  <p className="text-white/95 text-base md:text-lg lg:text-xl [@media(min-width:2400px)]:text-[28px] leading-relaxed font-light">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side: Large Cover Image / Video */}
        <div className="w-full lg:w-1/2 relative min-h-[40vh] lg:min-h-screen bg-black">
          {activeService.videoUrl ? (
            <video 
              src={activeService.videoUrl} 
              autoPlay loop muted playsInline 
              className="absolute inset-0 !w-full !h-full !object-cover" 
            />
          ) : images.length > 0 ? (
            <img 
              src={images[0]} 
              alt={activeService.title} 
              className="absolute inset-0 !w-full !h-full !object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="text-white/50">No media available</span>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Gallery Header Section */}
      {!isLedVideoWall && images.length > 0 && (
        <div className="pt-24 pb-8 px-8 lg:px-16 xl:px-[120px] [@media(min-width:2400px)]:px-[10rem] text-left bg-[#BBB791]">
          <h2 className="font-imperial text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4">
            {activeService.title} Project Gallery
          </h2>
          <p className="text-white/80 text-lg font-light max-w-2xl">
            Drag horizontally to explore. Click any image to expand.
          </p>
        </div>
      )}

      {/* SCROLLING GALLERY TRACK */}
      {!isLedVideoWall && images.length > 0 && (
        <section className="expert-section w-full expert-container py-12 relative">
          <div
            ref={scrollRef}
            className="relative z-10 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none team-scroll-container"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStartScroll}
            onTouchMove={handleTouchMoveScroll}
            onTouchEnd={handleMouseUpOrLeave}
          >
            <div className="flex w-max animate-infinite gap-8 md:gap-12 px-4">
              {duplicatedImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => openViewer(index)}
                  className="team-card w-[350px] h-[250px] md:w-[550px] md:h-[400px] flex-shrink-0 overflow-hidden rounded-[12px] bg-black/10 transition-all duration-500 hover:rounded-[20px] hover:shadow-2xl cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${activeService.title} Image ${index}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110 pointer-events-none"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Optional Bottom Video Section */}
      {activeService.videoUrl && (
        <div className={`px-6 md:px-12 lg:px-[8%] bg-[#BBB791] ${isLedVideoWall ? 'py-24' : 'pb-24 pt-8'}`}>
          <div className="max-w-[1920px] mx-auto">
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl bg-gray-900">
              <video 
                src={activeService.videoUrl} 
                controls autoPlay loop muted playsInline
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="w-full">
        <LandingPageThree />
      </div>
    </div>
  );
};

export default ServiceDetails;