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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allTeamMembers = [team1, team2, team3, team4, team5, team6, team7, team8, team9];
  // Triple the array to ensure the infinite scroll has enough "track" to move
  const duplicatedMembers = [...allTeamMembers, ...allTeamMembers, ...allTeamMembers];

  // 🟢 Mouse Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (!scrollRef.current) return;
    // Calculate start position relative to the container
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Increase multiplier for faster drag
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDown(false);
  };

  // 📱 Touch Drag Logic
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

  return (
    <main className="bg-[#f4f4f4] w-full overflow-hidden">
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

        /* Stops the auto-animation when the user interacts or hovers */
        .fisheye-container:active .animate-infinite,
        .fisheye-container:hover .animate-infinite {
          animation-play-state: paused;
        }

        .fisheye-section {
          position: relative;
          background: #fff; 
          overflow: hidden;
          padding: 10px 0; /* Tightened padding */
        }

        /* Top Curve */
        .fisheye-section::before {
          content: "";
          position: absolute;
          top: -150px;
          left: -10%;
          width: 120%;
          height: 250px;
          background: #f4f4f4;
          border-radius: 0 0 50% 50%;
          z-index: 20;
          pointer-events: none;
        }

        /* Bottom Curve */
        .fisheye-section::after {
          content: "";
          position: absolute;
          bottom: -150px;
          left: -10%;
          width: 120%;
          height: 250px;
          background: #f4f4f4;
          border-radius: 50% 50% 0 0;
          z-index: 20;
          pointer-events: none;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Header Area - Reduced Bottom Padding */}
      <div className="pt-10 pb-4 text-center bg-[#f4f4f4]">
        {/* UPDATED FONT HERE */}
        <h2 className="font-imperial text-[50px] md:text-[72px] font-bold text-black mb-4">
          Meet our experts
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-6 text-lg md:text-xl opacity-90 leading-relaxed">
          Teamwork begins by building trust. And the only way to do that is to overcome our need for invulnerability.
        </p>
      </div>

      {/* Curved Expert Section */}
      <section className="fisheye-section w-full fisheye-container">
        <div
          ref={scrollRef}
          className="relative z-10 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
          <div className="flex w-max animate-infinite gap-1 md:gap-2 px-0">
            {duplicatedMembers.map((member, index) => (
              <div
                key={index}
                className="w-[280px] h-[400px] md:w-[480px] md:h-[650px] flex-shrink-0 overflow-hidden"
              >
                <img
                  src={member}
                  alt={`Expert ${index}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="bg-[#f4f4f4] h-16 w-full" />

      <LandingPageThree />
    </main>
  );
};

export default Team;