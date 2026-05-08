import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Scroll Container State
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const isDraggingRef = useRef(false);
  const startX = useRef(0);
  const isHovered = useRef(false);

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
  
  const REPEAT_COUNT = 3;
  const sets = Array.from({ length: REPEAT_COUNT }, (_, i) => i);

  // --- True Infinite Loop Engine ---
  useEffect(() => {
    if (!scrollRef.current || images.length === 0) return;
    
    let animationId: number;
    const el = scrollRef.current;

    setTimeout(() => {
      if (!el) return;
      const setWidth = el.scrollWidth / REPEAT_COUNT;
      el.scrollLeft = setWidth;
    }, 100);

    const tick = () => {
      if (el) {
        const setWidth = el.scrollWidth / REPEAT_COUNT;

        if (!isHovered.current && !isDown.current) {
          el.scrollLeft += 1.5; 
        }

        if (el.scrollLeft <= 0) {
          el.scrollLeft += setWidth;
        } 
        else if (el.scrollLeft >= setWidth * 2) {
          el.scrollLeft -= setWidth;
        }
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [images]);

  // --- Horizontal Drag Scroll Logic ---
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    isDraggingRef.current = false;
    if (!scrollRef.current) return;
    startX.current = e.pageX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const delta = (startX.current - x) * 1.5; 
    
    if (Math.abs(delta) > 5) {
      isDraggingRef.current = true;
    }
    
    if (delta !== 0) {
      scrollRef.current.scrollLeft += delta;
      startX.current = x; 
    }
  };

  const handleMouseUpOrLeave = () => {
    isDown.current = false;
  };

  const handleTouchStartScroll = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    isDraggingRef.current = false;
    startX.current = e.touches[0].pageX;
  };

  const handleTouchMoveScroll = (e: React.TouchEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    const x = e.touches[0].pageX;
    const delta = (startX.current - x) * 1.5;

    if (Math.abs(delta) > 5) {
      isDraggingRef.current = true;
    }

    if (delta !== 0) {
      scrollRef.current.scrollLeft += delta;
      startX.current = x;
    }
  };

  // --- Lightbox Handlers ---
  const openViewer = useCallback((index: number) => {
    if (typeof index !== 'number') return;
    openTimeRef.current = Date.now();
    setViewerIndex(index % images.length); 
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

  if (isLoading) return <div className="min-h-screen bg-[#959064]"></div>;
  if (!activeService) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#959064] text-white">
        <h1 className="text-4xl font-dm-sans-extralight tracking-normal mb-4">Service Not Found</h1>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-white text-[#959064] font-bold rounded-lg mt-4">
          Go Back
        </button>
      </div>
    );
  }

  const isLedVideoWall = activeService.title.toLowerCase().includes('led video wall') || activeService.id === 13;

  return (
    <div className="w-full bg-[#959064] font-inter overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,700&display=swap');

        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        
        .font-dm-sans-extralight { 
            font-family: 'DM Sans', sans-serif !important; 
            font-weight: 200 !important;
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

        /* Further Reduced box sizes for large desktops here */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .team-card { width: 380px !important; height: 260px !important; border-radius: 16px !important; }
          .team-scroll-container { padding-left: 24px; padding-right: 24px; }
        }
        @media (min-width: 1920px) {
          .team-card { width: 440px; height: 300px; }
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
            if (e.target === e.currentTarget) closeViewer();
          }}
        >
          <div className="close-btn-new" onClick={closeViewer}>&times;</div>
          <button className="nav-btn prev-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); showPrev(); }}>&#8592;</button>
          
          <div 
            className="image-frame" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStartLightbox}
            onTouchMove={handleTouchMoveLightbox}
            onTouchEnd={handleTouchEndLightbox}
          >
            <img key={viewerIndex} src={images[viewerIndex]} className="lightbox-img" alt={`Project Gallery ${viewerIndex + 1}`} draggable={false} />
            <div className="image-counter" onClick={(e) => e.stopPropagation()}>{viewerIndex + 1} / {images.length}</div>
          </div>
          
          <button className="nav-btn next-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); showNext(); }}>&#8594;</button>
        </div>
      )}

      {/* SPLIT HERO SECTION */}
      <div className="w-full flex flex-col lg:flex-row min-h-[70vh] lg:min-h-screen bg-[#959064]">
        <div className="w-full lg:w-1/2 relative flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-24 [@media(min-width:2400px)]:px-[8rem]">
          
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() => navigate(-1)} 
            className="absolute top-6 left-6 lg:top-8 lg:left-8 z-50 text-white drop-shadow-lg hover:text-gray-200 transition-colors bg-black/20 rounded-full p-2 backdrop-blur-sm" 
            aria-label="Back"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
          
          {/* Animated Sub-Heading - Word by Word */}
          <h4 className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 mt-8 md:mt-0">
            {"SERVICE DETAILS".split(" ").map((word, wIndex, wArray) => (
              <React.Fragment key={`sub-${wIndex}`}>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (wIndex * 0.1), ease: "easeOut" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {wIndex < wArray.length - 1 && " "}
              </React.Fragment>
            ))}
          </h4>

          {/* Animated Main Title - Part by Part */}
          <h1 className="font-dm-sans-extralight tracking-normal text-2xl md:text-3xl lg:text-4xl xl:text-4xl [@media(min-width:2400px)]:text-[100px] text-white leading-tight mb-8 whitespace-nowrap">
            {activeService.title.split('/').map((part: string, index: number, array: string[]) => (
              <React.Fragment key={index}>
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                  className="inline-block"
                >
                  {part.trim()}
                </motion.span>
                {index < array.length - 1 && <span className="opacity-80 mx-2">/</span>}
              </React.Fragment>
            ))}
          </h1>

          {activeService.description_points && (
            <ul className="space-y-4 md:space-y-6 max-w-[650px] [@media(min-width:2400px)]:max-w-[900px]">
              {activeService.description_points.map((point: string, index: number) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 [@media(min-width:2400px)]:w-8 [@media(min-width:2400px)]:h-8 shrink-0 bg-white text-[#BBB791] rounded-full font-bold text-xs md:text-sm mt-1">
                    {index + 1}
                  </span>
                  <p className="text-white/95 text-sm md:text-base lg:text-lg [@media(min-width:2400px)]:text-[22px] leading-relaxed font-light">
                    {point}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Media Block */}
        <div className="w-full lg:w-1/2 relative min-h-[40vh] lg:min-h-screen bg-black">
          {activeService.videoUrl ? (
            <video src={activeService.videoUrl} autoPlay loop muted playsInline className="absolute inset-0 !w-full !h-full !object-cover" />
          ) : images.length > 0 ? (
            <img src={images[0]} alt={activeService.title} className="absolute inset-0 !w-full !h-full !object-cover" />
          ) : (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center"><span className="text-white/50">No media available</span></div>
          )}
        </div>
      </div>

      {/* Dynamic Gallery Header Section */}
      {!isLedVideoWall && images.length > 0 && (
        <div className="pt-24 pb-8 px-8 lg:px-16 xl:px-[120px] [@media(min-width:2400px)]:px-[10rem] text-left bg-[#959064]">
          <h2 className="font-dm-sans-extralight tracking-normal text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {String(`${activeService.title} Project Gallery`).split(" ").map((word, index, array) => (
              <React.Fragment key={index}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {index < array.length - 1 && " "}
              </React.Fragment>
            ))}
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-white/80 text-lg font-light max-w-2xl"
          >
            Drag horizontally to explore. Click any image to expand.
          </motion.p>
        </div>
      )}

      {/* SCROLLING GALLERY TRACK */}
      {!isLedVideoWall && images.length > 0 && (
        <section className="expert-section w-full expert-container py-12 relative">
          <div
            ref={scrollRef}
            className="relative z-10 overflow-x-hidden no-scrollbar cursor-grab active:cursor-grabbing select-none team-scroll-container"
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; handleMouseUpOrLeave(); }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStartScroll}
            onTouchMove={handleTouchMoveScroll}
            onTouchEnd={handleMouseUpOrLeave}
          >
            <div className="flex w-max">
              {sets.map((setIndex) => (
                /* Reduced gap and right padding here (gap-4 and pr-4 for tight spacing) */
                <div key={setIndex} className="flex gap-4 md:gap-5 pr-4 md:pr-5">
                  {images.map((img: string, index: number) => (
                    <div
                      key={`${setIndex}-${index}`}
                      onClick={(e) => {
                        if (isDraggingRef.current) {
                          e.stopPropagation();
                          e.preventDefault();
                          return;
                        }
                        openViewer(index);
                      }}
                      /* Substantially reduced width and height for images here */
                      className="team-card w-[220px] h-[150px] md:w-[320px] md:h-[220px] flex-shrink-0 overflow-hidden rounded-[12px] bg-black/10 transition-all duration-500 hover:rounded-[16px] hover:shadow-2xl cursor-pointer"
                    >
                      <img src={img} alt={`${activeService.title} Image ${index}`} className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110 pointer-events-none" draggable="false" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Optional Bottom Video Section */}
      {activeService.videoUrl && (
        <div className={`px-6 md:px-12 lg:px-[8%] bg-[#959064] ${isLedVideoWall ? 'py-24' : 'pb-24 pt-8'}`}>
          <div className="max-w-[1920px] mx-auto">
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl bg-gray-900">
              <video src={activeService.videoUrl} controls autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}

      <div className="w-full"><LandingPageThree /></div>
    </div>
  );
};

export default ServiceDetails;