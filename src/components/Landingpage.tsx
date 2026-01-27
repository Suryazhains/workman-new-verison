import React from 'react';
import LandingTwo from './LandingTwo';
import { LANDING_CONTENT } from './content';

const LandingPage: React.FC = () => {
  const { hero, about } = LANDING_CONTENT;

  return (

    <main className="w-full bg-[#F6F7F9] overflow-x-hidden border-none outline-none selection:bg-blue-100 font-inter">
  
      <section id="home" className="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[30px] pt-12 md:pt-20 lg:pt-[7px] pb-16 md:pb-24 lg:pb-[100px] flex flex-col lg:flex-row items-center lg:items-start justify-between">
        
        <div className="w-full lg:w-[686px] mt-8 lg:mt-[100px] text-left z-10">

<h1
  className="font-inter text-[26px] sm:text-[48px] md:text-[64px] lg:text-[82px]
  font-semibold leading-[1.05] tracking-[-0.03em] text-black mb-6
  text-center sm:text-left"
>
  {hero.title.join(" ")}
</h1>



          <p className="text-[#6B7280] text-base md:text-lg lg:text-[18px] leading-relaxed max-w-[500px] mb-10">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
  onClick={() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="bg-[#163B73] text-white rounded-[6px] 
             w-full sm:w-[156px] h-[48px] font-inter font-medium text-[16px] 
             tracking-[-0.04em] hover:bg-[#0f2a52] transition-all 
             flex items-center justify-center shadow-lg active:scale-95"
>
  {hero.cta}
</button>

          </div>
        </div>

        <div className="w-full max-w-[520px] h-[300px] sm:h-[400px] lg:h-[620px] bg-[#4B73B1] rounded-[24px] md:rounded-[30px] lg:rounded-[45px] mt-12 lg:mt-[77px] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#163B73]/20 to-transparent"></div>
        </div>
      </section>

   <section
  id="about"
  className="w-full bg-[#F3F8FF] py-16 md:py-24 px-6 md:px-12 lg:px-[50px]"
>
  <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
    
    <div className="w-full lg:w-[60%] text-left order-2 lg:order-1">
      <span className="text-[#163B73] font-inter font-bold text-lg md:text-[20px] leading-none tracking-[-0.04em] mb-4 block uppercase lg:normal-case">
        {about.label}
      </span>

      <h2 className="font-inter font-bold text-[28px] sm:text-[34px] md:text-[40px] leading-[1.2] md:leading-[60px] tracking-[-0.04em] text-[#000000] mb-6">
        {about.heading}
      </h2>

      <p className="text-[#6B7280] text-base md:text-[18px] leading-relaxed max-w-[580px] mb-12">
        {about.description}
      </p>

      {/* Grid changed to grid-cols-3 for horizontal layout on mobile */}
      <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-4 sm:gap-8 lg:gap-16">
        {about.stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center gap-1 md:gap-2">
              <p className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-[#163B73]">
                {stat.value}
              </p>
              <span className="text-[#FF7A00] text-sm sm:text-xl md:text-2xl font-bold animate-bounce-subtle">
                ↗
              </span>
            </div>
            <p className="text-[#6B7280] text-[10px] sm:text-sm md:text-base font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full lg:w-[450px] h-[300px] sm:h-[400px] lg:h-[480px] bg-white rounded-[24px] md:rounded-[45px] shadow-md border border-blue-50 order-1 lg:order-2">
    </div>

  </div>
</section>


      <LandingTwo />
    </main>
  );
};

export default LandingPage;