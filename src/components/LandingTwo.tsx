import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LANDING_CONTENT, PORTFOLIO_IMAGES } from './content';
import LandingThree from './landingthree';

const LandingTwo: React.FC = () => {
  const { portfolio, testimonials } = LANDING_CONTENT;

  // --- TESTIMONIAL SLIDER LOGIC ---
  const allTestimonials = [
    testimonials.large, 
    ...testimonials.small
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === allTestimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? allTestimonials.length - 1 : prev - 1));
  };

 
  const getRowImages = (start: number, end: number) => {
    const slice = PORTFOLIO_IMAGES.slice(start, end);
    return [...slice, ...slice, ...slice, ...slice]; 
  };

  const row1 = getRowImages(0, 4);
  const row2 = getRowImages(4, 8);
  const row3 = getRowImages(8, 12);

  return (
    <>
      {/* GLOBAL STYLES: Font Import and Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300&display=swap');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }
        
        .font-dm-sans-light {
            font-family: 'DM Sans', sans-serif !important;
            font-weight: 300 !important;
        }

        /* Seamless Marquee Keyframes (Translating exactly 1 container width + 1 gap) */
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 6px)); }
        }

        @keyframes marqueeRight {
          0% { transform: translateX(calc(-100% - 6px)); }
          100% { transform: translateX(0); }
        }

        /* Custom Scrollbar for long testimonials to keep box size fixed */
        .testimonial-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .testimonial-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .testimonial-scroll::-webkit-scrollbar-thumb {
          background: #FE4E5D33;
          border-radius: 10px;
        }
      `}} />

      <section
        id="portfolio"
        className="w-full bg-[#959064] pt-[4.5rem] pb-[5.5rem] overflow-hidden scroll-mt-[6rem] lg:scroll-mt-[8rem]"
      >
       <div className="max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24 mb-10">
          {/* Animated Portfolio Heading */}
        <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="font-dm-sans-light text-3xl md:text-[2.5rem] text-[#FFFFFF] mb-4 tracking-[0.05em] "
>
  {portfolio.heading}
</motion.h2>
          
          {/* Animated Portfolio Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-[#FFFFFF] max-w-full text-base leading-relaxed"
          >
            {portfolio.description}
          </motion.p>
        </div>

        {/* UNTOUCHED: Image Marquee Grid */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[3.75rem] md:w-[10rem]
            bg-gradient-to-r from-[#959064] via-[#959064] to-transparent" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[3.75rem] md:w-[10rem]
            bg-gradient-to-l from-[#959064] via-[#959064] to-transparent" />

          <div className="flex flex-col gap-[6px]">
            
            {/* ROW 1 */}
            <div className="flex flex-nowrap gap-[6px] overflow-hidden w-full">
              <div className="flex shrink-0 gap-[6px] w-max" style={{ animation: 'marqueeLeft 60s linear infinite' }}>
                {row1.map((src, i) => (
                  <div key={`r1a-${i}`} className="relative overflow-hidden w-[9.5rem] h-[6.5rem] md:w-[16rem] md:h-[8.5rem] shrink-0 rounded-sm">
                    <img src={src} alt="Portfolio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </div>
                ))}
              </div>
             
              <div className="flex shrink-0 gap-[6px] w-max" style={{ animation: 'marqueeLeft 60s linear infinite' }}>
                {row1.map((src, i) => (
                  <div key={`r1b-${i}`} className="relative overflow-hidden w-[9.5rem] h-[6.5rem] md:w-[16rem] md:h-[8.5rem] shrink-0 rounded-sm">
                    <img src={src} alt="Portfolio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2 */}
            <div className="flex flex-nowrap gap-[6px] overflow-hidden w-full">
              <div className="flex shrink-0 gap-[6px] w-max" style={{ animation: 'marqueeRight 50s linear infinite' }}>
                {row2.map((src, i) => (
                  <div key={`r2a-${i}`} className="relative overflow-hidden w-[9.5rem] h-[6.5rem] md:w-[16rem] md:h-[8.5rem] shrink-0 rounded-sm">
                    <img src={src} alt="Portfolio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </div>
                ))}
              </div>
              {/* Duplicate track for seamless loop */}
              <div className="flex shrink-0 gap-[6px] w-max" style={{ animation: 'marqueeRight 50s linear infinite' }}>
                {row2.map((src, i) => (
                  <div key={`r2b-${i}`} className="relative overflow-hidden w-[9.5rem] h-[6.5rem] md:w-[16rem] md:h-[8.5rem] shrink-0 rounded-sm">
                    <img src={src} alt="Portfolio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 3 */}
            <div className="flex flex-nowrap gap-[6px] overflow-hidden w-full">
              <div className="flex shrink-0 gap-[6px] w-max" style={{ animation: 'marqueeLeft 70s linear infinite' }}>
                {row3.map((src, i) => (
                  <div key={`r3a-${i}`} className="relative overflow-hidden w-[9.5rem] h-[6.5rem] md:w-[16rem] md:h-[8.5rem] shrink-0 rounded-sm">
                    <img src={src} alt="Portfolio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </div>
                ))}
              </div>
             
              <div className="flex shrink-0 gap-[6px] w-max" style={{ animation: 'marqueeLeft 70s linear infinite' }}>
                {row3.map((src, i) => (
                  <div key={`r3b-${i}`} className="relative overflow-hidden w-[9.5rem] h-[6.5rem] md:w-[16rem] md:h-[8.5rem] shrink-0 rounded-sm">
                    <img src={src} alt="Portfolio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

 
      <section id="testimonials" className="w-full bg-[#F9FAFB] pt-[3.75rem] md:pt-[5.5rem] pb-[3.75rem] md:pb-[5.5rem] overflow-hidden scroll-mt-[6rem] lg:scroll-mt-[8rem]">
        <div className="max-w-[90rem] mx-auto px-4">
          
          {/* Animated Testimonials Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-dm-sans-light text-[2rem] md:text-[3.5rem] text-[#00000] mb-4 text-center"
          >
            {testimonials.heading}
          </motion.h2>
          
          {/* Animated Testimonials Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-[#535353] text-center text-sm md:text-sm mb-8 md:mb-12 max-w-[75rem] mx-auto leading-relaxed px-2"
          >
            {testimonials.description}
          </motion.p>

          {/* UNTOUCHED: Testimonial Slider System */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-full flex items-center justify-center min-h-[22rem] md:min-h-[24rem]">
              
              <button 
                onClick={prevSlide} 
                className="hidden md:flex absolute left-4 z-40 w-14 h-14 items-center justify-center rounded-full bg-white shadow-xl text-[#BBB791] text-2xl font-bold border border-gray-100 active:scale-95"
              >
                ←
              </button>
              <button 
                onClick={nextSlide} 
                className="hidden md:flex absolute right-4 z-40 w-14 h-14 items-center justify-center rounded-full bg-white shadow-xl text-[#BBB791] text-2xl font-bold border border-gray-100 active:scale-95"
              >
                →
              </button>

              <div className="relative w-full flex items-center justify-center overflow-visible">
                {allTestimonials.map((item, index) => {
                  const isActive = index === currentIndex;
                  const isLeft = index === (currentIndex - 1 + allTestimonials.length) % allTestimonials.length;
                  const isRight = index === (currentIndex + 1) % allTestimonials.length;

                  let positionClass = "opacity-0 scale-50 pointer-events-none absolute";
                  if (isActive) positionClass = "opacity-100 scale-100 z-30 relative shadow-2xl border-[#FE4E5D]";
                  if (isLeft) positionClass = "opacity-30 -translate-x-[70%] lg:-translate-x-[100%] scale-90 z-10 absolute blur-[1.5px] hidden md:flex";
                  if (isRight) positionClass = "opacity-30 translate-x-[70%] lg:translate-x-[100%] scale-90 z-10 absolute blur-[1.5px] hidden md:flex";

                  return (
                    <div
                      key={index}
                      className={`transition-all duration-700 ease-in-out transform 
                        bg-white border rounded-xl flex flex-col justify-between
                        p-6 md:p-8 
                        w-[90%] md:w-full max-w-[30rem] 
                        text-left h-[18rem] md:h-[21rem] 
                        ${positionClass}`}
                    >
                      <div className="overflow-y-auto testimonial-scroll pr-2">
                        <p className="font-crimson text-[#333333] text-[0.875rem] md:text-[1rem] leading-relaxed pt-0">
                          {item.quote}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-[#959064] flex items-center gap-3 md:gap-4 flex-shrink-0">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#959064] flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg flex-shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden text-ellipsis">
                          <p className="font-bold text-[#1A1A1A] text-xs md:text-sm truncate">{item.name}</p>
                          <p className="text-[#888888] text-[0.5rem] md:text-[0.65rem] font-medium uppercase truncate">{item.company}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex md:hidden items-center justify-between w-[90%] mt-8 gap-4">
                <button 
                  onClick={prevSlide} 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#959064] text-xl font-bold border border-gray-100 active:scale-90"
                >
                  ←
                </button>
                
                <div className="flex justify-center gap-2">
                  {allTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`transition-all duration-300 h-1.5 rounded-full ${currentIndex === i ? 'bg-[#959064] w-8' : 'bg-gray-200 w-1.5'}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextSlide} 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#BBB791] text-xl font-bold border border-gray-100 active:scale-90"
                >
                  →
                </button>
            </div>

            {/* Desktop Dots Indicator */}
            <div className="hidden md:flex justify-center gap-3 mt-12">
              {allTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-300 h-2.5 rounded-full ${currentIndex === i ? 'bg-[#959064] w-12' : 'bg-gray-200 w-2.5'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mt-0 pb-0">
        <LandingThree />
      </div>
    </>
  );
};

export default LandingTwo;