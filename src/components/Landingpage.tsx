import React, { useEffect, useState } from 'react';
import LandingTwo from './LandingTwo';
import { LANDING_CONTENT } from './content';
import { useNavigate } from "react-router-dom";

// New Imports for the Hero Gallery
import Home_1 from '../assets/home 1.jpg'; 
import Home_2 from '../assets/home 2.jpg';
import Home_3 from '../assets/home 3.jpg';
import Home_4 from '../assets/home 4.png';
import W_image from '../assets/w.png';

const LandingPage: React.FC = () => {
  const { hero, about } = LANDING_CONTENT;
  const heroImages = [Home_1, Home_2, Home_3, Home_4];
const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden selection:bg-green-200 font-inter">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }

        /* Smooth Autoscroll Animation for Hero */
        .hero-track {
          display: flex;
          width: 400%; 
          height: 100%;
          animation: heroScroll 20s cubic-bezier(0.85, 0, 0.15, 1) infinite;
        }

        .hero-track img {
          width: 100vw;
          height: 100%;
          object-fit: cover;
          flex-shrink: 0;
        }

        @keyframes heroScroll {
          0%, 20% { transform: translateX(0); }
          25%, 45% { transform: translateX(-100vw); }
          50%, 70% { transform: translateX(-200vw); }
          75%, 95% { transform: translateX(-300vw); }
          100% { transform: translateX(0); }
        }

        /* The Horizontal Gradient Shade Layer */
        .hero-shade-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          background: linear-gradient(
            to right, 
            rgba(0, 0, 0, 0.85) 0%, 
            rgba(0, 0, 0, 0.5) 35%, 
            rgba(0, 0, 0, 0.1) 70%, 
            transparent 100%
          );
        }

        .hero-shade-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%);
          pointer-events: none;
        }
      `}} />

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        className="relative w-full h-[600px] lg:h-[85vh] overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0">
          <div className="hero-track">
            {heroImages.map((img, index) => (
              <img key={index} src={img} alt={`Hero ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="hero-shade-overlay"></div>

        <div className="relative z-20 w-full h-full flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[90px]">
            <div className="max-w-[800px]">
              {/* Reduced title size from 100px to 82px */}
              <h1 className="font-crimson text-[38px] sm:text-[54px] md:text-[70px] lg:text-[82px] font-bold leading-[1.1] tracking-tight text-white mb-6">
                {hero.title.join(" ")}
              </h1>
              
              <p className="text-white/90 text-base md:text-lg lg:text-[20px] leading-relaxed max-w-[550px] mb-10 font-medium">
                {hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#51A147] text-white rounded-[6px] w-full sm:w-[180px] h-[52px] font-inter font-bold text-[16px] hover:bg-[#458e3c] transition-all flex items-center justify-center shadow-2xl active:scale-95"
                >
                  {hero.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section 
        id="about" 
        className="relative w-full bg-[#F2FFF0] py-20 md:py-28 px-6 md:px-12 lg:px-[90px] overflow-hidden scroll-mt-24"
      >
        <div className="hidden lg:flex absolute right-0 top-0 h-full w-1/2 z-0 pointer-events-none select-none items-center justify-end p-6">
          <img 
            src={W_image} 
            alt="Decoration" 
            className="h-[80%] w-auto object-contain opacity-100" 
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto">
          <div className="w-full lg:w-[60%]">
            <span className="text-[#51A147] font-inter font-bold text-lg md:text-[20px] mb-4 block uppercase tracking-widest">
              {about.label}
            </span>

            <h2 className="font-crimson font-black text-[32px] sm:text-[42px] md:text-[52px] leading-[1.1] text-[#000000] mb-8 max-w-[700px]">
              {about.heading}
            </h2>

            <p className="text-[#6B7280] text-lg md:text-[19px] leading-relaxed max-w-[600px] mb-12">
              {about.description}
            </p>

            <div className="grid grid-cols-3 gap-8 md:gap-16 mb-16">
              {about.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-[30px] md:text-[48px] font-crimson font-black text-[#51A147]">
                      {stat.value}
                    </p>
                    <span className="text-[#FF7A00] text-lg md:text-2xl font-bold">↗</span>
                  </div>
                  <p className="text-[#6B7280] text-xs md:text-sm font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* View More Button added at the end of About section */}
        <button 
  className="group flex items-center gap-3 bg-white border border-[#51A147] text-[#51A147] px-8 py-3 rounded-[6px] font-inter font-bold text-[16px] hover:bg-[#51A147] hover:text-white transition-all duration-300"
  onClick={() =>navigate ("/aboutbrief")}
>
  View More
  <span className="transform group-hover:translate-x-1 transition-transform">
    →
  </span>
</button>

          </div>
        </div>
      </section>

      <LandingTwo />
    </main>
  );
};

export default LandingPage;