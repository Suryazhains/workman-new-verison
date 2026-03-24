import React, { useEffect, useRef, useState } from "react";
import LandingPageThree from "./landingthree";

// ✅ IMPORT TEAM IMAGES
import team1 from "../assets/team.png";
import team2 from "../assets/team 2.png";
import team3 from "../assets/team 3.jpg";
import team4 from "../assets/team 4.jpg";
import team5 from "../assets/team 5.jpg";
import team6 from "../assets/team 6.jpg";
import team7 from "../assets/team 7.jpg";
import team8 from "../assets/team 8.jpg";
import team9 from "../assets/team 9.jpg";

const Team: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Lightbox State
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allTeamMembers = [team1, team2, team3, team4, team5, team6, team7, team8, team9];
  const duplicatedMembers = [...allTeamMembers, ...allTeamMembers, ...allTeamMembers];

  // Drag Logic
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

  // Touch Logic
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDown || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Lightbox Navigation
  const openLightbox = (idx: number) => setSelectedIndex(idx % allTeamMembers.length);
  const closeLightbox = () => setSelectedIndex(null);
  
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % allTeamMembers.length : null));
  };
  
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + allTeamMembers.length) % allTeamMembers.length : null));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <main className="bg-[#BBB791] w-full overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');

        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }

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
        
        .lightbox-blur {
          backdrop-filter: blur(12px);
        }

        /* ============== 32-INCH DESKTOP SUPPORT ONLY ============== */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .team-card {
            width: 520px !important;
            height: 520px !important;
            border-radius: 20px !important;
          }

          .team-scroll-container {
            padding-left: 40px;
            padding-right: 40px;
          }

          .team-header h2 {
            font-size: clamp(68px, 5.5vw, 92px) !important;
          }

          .lightbox-image-container {
            width: 92vw !important;
            height: 88vh !important;
          }
        }

        /* Normal large desktop (1920px+) - unchanged */
        @media (min-width: 1920px) {
          .team-card {
            width: 500px;
            height: 500px;
          }
        }
      `}} />

      {/* Header Area */}
      <div className="pt-20 pb-10 text-center bg-[#BBB791] team-header">
        <h2 className="font-imperial text-[50px] md:text-[72px] font-bold text-white mb-4">
          Meet our experts
        </h2>
        <p className="text-white max-w-2xl mx-auto px-6 text-lg md:text-xl opacity-90 leading-relaxed font-inter font-light">
          A balanced perspective in every frame. Discover the team that makes it happen.
        </p>
      </div>

      {/* Grid Track Section */}
      <section className="expert-section w-full expert-container py-12 relative">
        <div
          ref={scrollRef}
          className="relative z-10 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none team-scroll-container"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
          <div className="flex w-max animate-infinite gap-8 md:gap-12 px-4">
            {duplicatedMembers.map((member, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="team-card w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex-shrink-0 overflow-hidden rounded-[12px] bg-black/10 transition-all duration-500 hover:rounded-[20px] hover:shadow-2xl cursor-pointer"
              >
                <img
                  src={member}
                  alt={`Expert Member ${index}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110 pointer-events-none"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center lightbox-blur"
          onClick={closeLightbox}
        >
          {/* Close Icon */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white text-5xl transition-colors z-[1001]"
            onClick={closeLightbox}
          >
            &times;
          </button>

          {/* Left Arrow */}
          <button 
            className="absolute left-6 md:left-12 text-white/50 hover:text-white text-6xl md:text-8xl transition-all"
            onClick={prevImage}
          >
            &#8249;
          </button>

          {/* Centered Image */}
          <div className="lightbox-image-container w-[85vw] h-[80vh] flex items-center justify-center p-4">
            <img 
              src={allTeamMembers[selectedIndex]} 
              alt="Expert Full View" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Right Arrow */}
          <button 
            className="absolute right-6 md:right-12 text-white/50 hover:text-white text-6xl md:text-8xl transition-all"
            onClick={nextImage}
          >
            &#8250;
          </button>
        </div>
      )}

      {/* Bottom Spacer */}
      <div className="bg-[#BBB791] h-20 w-full" />

      <LandingPageThree />
    </main>
  );
};

export default Team;