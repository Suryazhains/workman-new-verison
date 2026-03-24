import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingTwo from './LandingTwo';
import { LANDING_CONTENT } from './content';

// Asset Imports
import Home_1 from '../assets/home 4.png'; 
import Home_2 from '../assets/home 2.png';
import Home_3 from '../assets/home 3.jpg';
import Home_4 from '../assets/home 1.jpg';
import Home_5 from '../assets/home 5.png';
import Home_7 from '../assets/home 7.png';
import AboutVideo from '../assets/0225.mp4'; 

const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      
      const executeScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          // Converted scroll offset to scale with the root font size for massive screens
          const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
          const offset = window.innerWidth < 1024 ? (70 / 16) * rootFontSize : (120 / 16) * rootFontSize;
          const y = element.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      };

      setTimeout(executeScroll, 50);
      setTimeout(executeScroll, 400);
      setTimeout(executeScroll, 1000);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
};

const LandingPage: React.FC = () => {
  const { hero, about } = LANDING_CONTENT;
  
  useScrollToHash();

  const heroImages = [Home_1, Home_2, Home_3, Home_4, Home_5, Home_7];

  return (
    <main className=" w-full min-h-screen bg-white overflow-x-hidden selection:bg-red-200 font-inter">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }

        .hero-track {
          display: flex;
          width: 600%; 
          height: 100%;
          animation: heroScroll 36s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        .hero-track img {
          width: calc(100% / 6); 
          height: 100%;
          object-fit: cover;
          flex-shrink: 0;
          filter: brightness(0.85);
        }

        @keyframes heroScroll {
          0%, 14% { transform: translateX(0); }
          16.66%, 30.66% { transform: translateX(calc(-100% / 6 * 1)); }
          33.32%, 47.32% { transform: translateX(calc(-100% / 6 * 2)); }
          49.98%, 63.98% { transform: translateX(calc(-100% / 6 * 3)); }
          66.64%, 80.64% { transform: translateX(calc(-100% / 6 * 4)); }
          83.30%, 97.30% { transform: translateX(calc(-100% / 6 * 5)); }
          100% { transform: translateX(0); }
        }

        .text-readable-shadow {
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
      `}} />

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        className="relative w-full h-[85vh] min-h-[40.625rem] overflow-hidden bg-black scroll-mt-[7.5rem]"
      >
        <div className="absolute inset-0 z-0">
          <div className="hero-track">
            {heroImages.map((img, index) => (
              <img key={index} src={img} alt={`portfolio-${index}`} />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

        <div className="relative z-20 h-full flex items-center">
          <div className="w-full px-6 md:px-12 lg:pl-12"> 
            <div className="max-w-[43.75rem]">
              <h1 className="font-imperial text-[3rem] md:text-[4.25rem] lg:text-[5.25rem] font-bold leading-[1.05] tracking-tight text-white mb-8 text-readable-shadow">
                {hero.title.join(" ")}
              </h1>
              <p className="text-white text-lg md:text-xl leading-relaxed max-w-[34.375rem] mb-12 text-readable-shadow font-medium">
                {hero.description}
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) {
                    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                    const offset = window.innerWidth < 1024 ? (70 / 16) * rootFontSize : (120 / 16) * rootFontSize;
                    const position = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: position, behavior: 'smooth' });
                  }
                }}
                className="bg-[#BBB791] text-white rounded-[4px] px-12 h-[3.625rem] font-inter font-bold text-[1rem] hover:shadow-2xl transition-all active:scale-95 hover:bg-[#ff5f6d]"
              >
                Contact now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section 
        id="about" 
        className="relative w-full bg-[#FFFDE8] py-16 md:py-24 px-6 md:px-12 lg:pl-12 lg:pr-[3.125rem] scroll-mt-24 overflow-hidden"
      >
        <div className="max-w-[90rem] flex flex-col lg:flex-row items-center justify-between">
          
          {/* 🔥 FIX: Changed lg:w-[60%] to lg:w-[50%] and added lg:pr-10 to create distance from video */}
          <div className="w-full lg:w-[50%] text-left z-10 lg:pr-10">
            <span className="text-black font-imperial font-bold text-lg md:text-[1.25rem] leading-none tracking-[-0.04em] mb-4 block uppercase lg:normal-case">
              {about.label}
            </span>

            {/* 🔥 FIX: Reduced md:text-[3rem] to md:text-[2.75rem] to prevent heading collision */}
            <h2 className="font-inter font-bold text-[2rem] sm:text-[2.625rem] md:text-[2.75rem] xl:text-[3rem] leading-[1.1] tracking-[-0.04em] text-black mb-6 w-full">
              {about.heading}
            </h2>

            {/* 🔥 FIX: Reduced text size to 1rem and added max-w-[95%] to force words to next line */}
            <p className="text-gray-800 text-[0.9375rem] md:text-[1rem] leading-relaxed w-full max-w-[95%] mb-12">
              {about.description}
            </p>

            {/* Adjusted gap slightly to fit the new 50% container width safely */}
            <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-4 sm:gap-8 lg:gap-12">
              {about.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center gap-1 md:gap-2">
                    <p className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-bold text-black">
                      {stat.value}
                    </p>
                    <span className="text-[#FF7A00] text-sm sm:text-xl md:text-2xl font-bold">↗</span>
                  </div>
                  <p className="text-[#6B7280] text-[0.625rem] sm:text-sm md:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video is UNTOUCHED and remains exactly where it was */}
          <div className="w-full lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 mt-12 lg:mt-0 flex items-center justify-end z-0">
            <video 
              src={AboutVideo}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto lg:h-[110%] lg:w-auto object-cover lg:object-contain object-right"
            />
          </div>

          <div className="hidden lg:block lg:w-[40%] h-1"></div>
        </div>
      </section>
      
      <LandingTwo />
    </main>
  );
};

export default LandingPage;