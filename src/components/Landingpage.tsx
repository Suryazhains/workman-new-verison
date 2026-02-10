import React from 'react';
import LandingTwo from './LandingTwo';
import { LANDING_CONTENT } from './content';
import Home_image from '../assets/Home_image.png';
import W_image from '../assets/w.png';

const LandingPage: React.FC = () => {
  const { hero, about } = LANDING_CONTENT;

  return (
    <main className="w-full bg-[#51A147] overflow-x-hidden border-none outline-none selection:bg-green-200 font-inter">
      {/* Updated Font Import: Crimson Pro & Inter */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }
      `}} />

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        className="relative w-full flex flex-col lg:flex-row items-stretch justify-between min-h-[600px] lg:h-[90vh] pt-24 lg:pt-0 scroll-mt-24 bg-[#51A147]"
      >
        {/* Left Content Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-end z-20">
          <div className="w-full max-w-[850px] px-6 md:px-12 lg:px-[90px] pt-4 lg:pt-12 pb-16">
            {/* Heading: Now using Crimson Pro */}
      <h1 className="font-crimson text-[26px] sm:text-[48px] md:text-[64px] lg:text-[82px] font-medium leading-[1.05] tracking-[-0.01em] text-white mb-6 text-center sm:text-left">
  {hero.title.join(" ")}
</h1>



            <p className="text-white/90 text-base md:text-lg lg:text-[18px] leading-relaxed max-w-[500px] mb-10 text-center sm:text-left">
              {hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-[#51A147] rounded-[6px] w-full sm:w-[156px] h-[48px] font-inter font-bold text-[16px] tracking-[-0.04em] hover:bg-green-50 transition-all flex items-center justify-center shadow-lg active:scale-95"
              >
                {hero.cta}
              </button>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#51A147] via-[#51A147]/40 to-transparent"></div>
          <div className="w-full h-full overflow-hidden">
            <img 
              src={Home_image}
              alt="Hero Signage"
              className="w-full h-full object-cover object-left lg:object-center"
            />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section 
        id="about" 
        className="relative w-full bg-[#F3F9F2] py-16 md:py-24 px-6 md:px-12 lg:px-[90px] overflow-hidden scroll-mt-24"
      >
        <div className="hidden lg:flex absolute right-0 top-0 h-full w-full lg:w-1/2 z-0 pointer-events-none select-none items-center justify-end">
          <img 
            src={W_image} 
            alt="" 
            className="h-[110%] w-auto object-contain object-right opacity-100" 
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div id="about-mobile" className="w-full lg:w-[65%] text-left scroll-mt-0">
            <span className="text-[#51A147] font-inter font-bold text-lg md:text-[20px] leading-none tracking-[-0.04em] mb-4 block uppercase lg:normal-case">
              {about.label}
            </span>

            {/* Heading: Now using Crimson Pro */}
            <h2 className="font-crimson font-black text-[32px] sm:text-[42px] md:text-[48px] leading-[1.1] tracking-[-0.01em] text-[#000000] mb-6 max-w-[650px]">
              {about.heading}
            </h2>

            <p className="text-[#6B7280] text-base md:text-[18px] leading-relaxed max-w-[580px] mb-12">
              {about.description}
            </p>

            <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-4 sm:gap-8 lg:gap-16">
              {about.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center gap-1 md:gap-2">
                    {/* Stats: Now using Crimson Pro */}
                    <p className="text-[28px] sm:text-[36px] md:text-[44px] font-crimson font-black tracking-[-0.01em] text-[#51A147]">
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
          <div className="hidden lg:block lg:w-[35%] h-1"></div>
        </div>
      </section>

      <LandingTwo />
    </main>
  );
};

export default LandingPage;