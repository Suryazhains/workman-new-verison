import React from 'react';
import LandingTwo from './LandingTwo';
import { LANDING_CONTENT } from './content';

// Asset Imports
import Home_1 from '../assets/home 1.jpg'; 
import Home_2 from '../assets/home 2.jpg';
import Home_3 from '../assets/home 3.jpg';
import Home_4 from '../assets/home 4.png';
import W_image from '../assets/w.png';

const LandingPage: React.FC = () => {
  const { hero, about } = LANDING_CONTENT;
  const heroImages = [Home_1, Home_2, Home_3, Home_4];

  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden selection:bg-red-200 font-inter">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }

        .hero-track {
          display: flex;
          width: 400%; 
          height: 100%;
          animation: heroScroll 24s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        .hero-track img {
          width: 100vw;
          height: 100%;
          object-fit: cover;
          flex-shrink: 0;
          filter: brightness(0.85); /* Slightly darkened for text readability */
        }

        @keyframes heroScroll {
          0%, 20% { transform: translateX(0); }
          25%, 45% { transform: translateX(-25%); }
          50%, 70% { transform: translateX(-50%); }
          75%, 95% { transform: translateX(-75%); }
          100% { transform: translateX(0); }
        }

        /* Clean shadow for text readability over dynamic images */
        .text-readable-shadow {
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
      `}} />

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        className="relative w-full h-[85vh] min-h-[650px] overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0">
          <div className="hero-track">
            {heroImages.map((img, index) => (
              <img key={index} src={img} alt="portfolio" />
            ))}
          </div>
        </div>

        {/* Subtle Vignette for extra clarity on the left side */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

        <div className="relative z-20 h-full flex items-center">
          <div className="w-full px-6 md:px-12 lg:pl-12"> 
            <div className="max-w-[700px]">
              <h1 className="font-imperial text-[48px] md:text-[68px] lg:text-[84px] font-bold leading-[1.05] tracking-tight text-white mb-8 text-readable-shadow">
                {hero.title.join(" ")}
              </h1>
              <p className="text-white text-lg md:text-xl leading-relaxed max-w-[550px] mb-12 text-readable-shadow font-medium">
                {hero.description}
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#FFC107] text-white rounded-[4px] px-12 h-[58px] font-inter font-bold text-[16px] hover:shadow-2xl transition-all active:scale-95 hover:bg-[#ff5f6d]"
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
        className="relative w-full bg-[#FFF7DD] py-16 md:py-24 px-6 md:px-12 lg:px-[50px] overflow-hidden scroll-mt-24"
      >
        {/* Background "W" Logo */}
        <div className="hidden lg:flex absolute right-0 top-0 h-full w-full lg:w-1/2 z-0 pointer-events-none select-none items-center justify-end">
          <img 
            src={W_image} 
            alt="" 
            className="h-[110%] w-auto object-contain object-right" 
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div id="about-mobile" className="w-full lg:w-[60%] text-left scroll-mt-0">
            <span className="text-[#FFFFF] font-imperial font-bold text-lg md:text-[20px] leading-none tracking-[-0.04em] mb-4 block uppercase lg:normal-case">
              {about.label}
            </span>

            <h2 className="font-inter font-bold text-[32px] sm:text-[42px] md:text-[48px] leading-[1.1] tracking-[-0.04em] text-[#FFFFF] mb-6 max-w-[650px]">
              {about.heading}
            </h2>

            <p className="text-[#FFFFF] text-base md:text-[18px] leading-relaxed max-w-[580px] mb-12">
              {about.description}
            </p>

            <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-4 sm:gap-8 lg:gap-16">
              {about.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center gap-1 md:gap-2">
                    <p className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-[#FFFFF]">
                      {stat.value}
                    </p>
                    <span className="text-[#FF7A00] text-sm sm:text-xl md:text-2xl font-bold">↗</span>
                  </div>
                  <p className="text-[#6B7280] text-[10px] sm:text-sm md:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block lg:w-[40%] h-1"></div>
        </div>
      </section>
      
      <LandingTwo />
    </main>
  );
};

export default LandingPage;