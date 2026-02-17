import React, { useState } from 'react';
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

  // Duplicate images for seamless loop
  const row1Images = [...PORTFOLIO_IMAGES.slice(0, 4), ...PORTFOLIO_IMAGES.slice(0, 4)];
  const row2Images = [...PORTFOLIO_IMAGES.slice(4, 8), ...PORTFOLIO_IMAGES.slice(4, 8)];
  const baseRow3 = [...PORTFOLIO_IMAGES.slice(8, 12)]; 
  const row3Images = [...baseRow3, ...baseRow3];

  return (
    <>
      {/* GLOBAL STYLES: Font Import and Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }
        
        .font-imperial {
            font-family: "ImperialStd-BoldItalic", serif !important;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
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

      {/* PORTFOLIO SECTION */}
      <section
        id="portfolio"
        className="w-full bg-[#FE4E5D] pt-[70px] pb-[90px] overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-2 mb-10">
          {/* UPDATED FONT HERE */}
          <h2 className="font-imperial font-bold text-3xl md:text-[56px] text-[#FFFFFF] mb-4">
            {portfolio.heading}
          </h2>
          <p className="text-[#FFFFFF] max-w-full text-lg leading-relaxed">
            {portfolio.description}
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[60px] md:w-[160px]
            bg-gradient-to-r from-[#FE4E5D] via-[#FE4E5D] to-transparent" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[60px] md:w-[160px]
            bg-gradient-to-l from-[#FE4E5D] via-[#FE4E5D] to-transparent" />

          <div className="flex flex-col gap-[6px]">
            <div
              className="flex gap-[6px] w-max"
              style={{ animation: 'marqueeLeft 40s linear infinite' }}
            >
              {row1Images.map((src, i) => (
                <div
                  key={`row1-${i}`}
                  className="w-[200px] h-[120px] md:w-[435px] md:h-[232px] flex-shrink-0"
                >
                  <img
                    src={src}
                    alt="Portfolio"
                    className="w-full h-full object-cover rounded-sm"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div
              className="flex gap-[6px] w-max"
              style={{ animation: 'marqueeRight 35s linear infinite' }}
            >
              {row2Images.map((src, i) => (
                <div
                  key={`row2-${i}`}
                  className="w-[200px] h-[120px] md:w-[435px] md:h-[232px] flex-shrink-0"
                >
                  <img
                    src={src}
                    alt="Portfolio"
                    className="w-full h-full object-cover rounded-sm"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div
              className="flex gap-[6px] w-max"
              style={{ animation: 'marqueeLeft 45s linear infinite' }}
            >
              {row3Images.map((src, i) => (
                <div
                  key={`row3-${i}`}
                  className="w-[200px] h-[120px] md:w-[435px] md:h-[232px] flex-shrink-0"
                >
                  <img
                    src={src}
                    alt="Portfolio"
                    className="w-full h-full object-cover rounded-sm"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="w-full bg-[#FFFFFF] pt-[60px] md:pt-[90px] pb-[60px] md:pb-[90px] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4">
          {/* UPDATED FONT HERE */}
          <h2 className="font-imperial text-[32px] md:text-[56px] font-bold text-[#FE4E5D] mb-4 text-center">
            {testimonials.heading}
          </h2>
          <p className="text-[#535353] text-center text-sm md:text-lg mb-8 md:mb-12 max-w-[1200px] mx-auto leading-relaxed px-2">
            {testimonials.description}
          </p>

          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-full flex items-center justify-center min-h-[400px] md:min-h-[450px]">
              
              <button 
                onClick={prevSlide} 
                className="hidden md:flex absolute left-4 z-50 w-14 h-14 items-center justify-center rounded-full bg-white shadow-xl text-[#FE4E5D] text-2xl font-bold border border-gray-100 active:scale-95"
              >
                ←
              </button>
              <button 
                onClick={nextSlide} 
                className="hidden md:flex absolute right-4 z-50 w-14 h-14 items-center justify-center rounded-full bg-white shadow-xl text-[#FE4E5D] text-2xl font-bold border border-gray-100 active:scale-95"
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
                        bg-white p-8 md:p-12 border rounded-xl 
                        w-[90%] md:w-full max-w-[650px] 
                        text-left h-[350px] md:h-[400px] 
                        flex flex-col justify-between ${positionClass}`}
                    >
                      <div className="overflow-y-auto testimonial-scroll pr-2">
                        <p className="font-crimson text-[#333333] text-[18px] md:text-[24px] leading-relaxed pt-0">
                          {item.quote}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-3 md:gap-4 flex-shrink-0">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#FE4E5D] flex items-center justify-center text-white font-bold text-base md:text-xl shadow-lg flex-shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden text-ellipsis">
                          <p className="font-bold text-[#1A1A1A] text-base md:text-lg truncate">{item.name}</p>
                          <p className="text-[#FE4E5D] text-[10px] md:text-sm font-medium uppercase truncate">{item.company}</p>
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
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#FE4E5D] text-xl font-bold border border-gray-100 active:scale-90"
                >
                  ←
                </button>
                
                <div className="flex justify-center gap-2">
                  {allTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`transition-all duration-300 h-1.5 rounded-full ${currentIndex === i ? 'bg-[#FE4E5D] w-8' : 'bg-gray-200 w-1.5'}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={nextSlide} 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#FE4E5D] text-xl font-bold border border-gray-100 active:scale-90"
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
                  className={`transition-all duration-300 h-2.5 rounded-full ${currentIndex === i ? 'bg-[#FE4E5D] w-12' : 'bg-gray-200 w-2.5'}`}
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