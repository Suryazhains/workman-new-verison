import React from 'react';
import { LANDING_CONTENT, PORTFOLIO_IMAGES } from './content';
import LandingThree from './landingthree';
import quotes from '../assets/Quote.png';

const LandingTwo: React.FC = () => {
  const { portfolio, testimonials } = LANDING_CONTENT;

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
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />

      {/* PORTFOLIO SECTION */}
      <section
        id="portfolio"
        className="w-full bg-[#F2FFF0] pt-[90px] pb-[90px] overflow-hidden"
      >
        {/* Heading */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-10">
          <h2 className="font-crimson font-bold text-3xl md:text-[56px] text-[#51A147] mb-4">
            {portfolio.heading}
          </h2>
          <p className="text-[#4B5563] max-w-full text-lg leading-relaxed">
            {portfolio.description}
          </p>
        </div>

        {/* Portfolio Marquee */}
        <div className="relative w-full overflow-hidden">
          {/* LEFT FADE - Matches updated background color */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[60px] md:w-[160px]
            bg-gradient-to-r from-[#F2FFF0] via-[#F2FFF0] to-transparent" />

          {/* RIGHT FADE - Matches updated background color */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[60px] md:w-[160px]
            bg-gradient-to-l from-[#F2FFF0] via-[#F2FFF0] to-transparent" />

          <div className="flex flex-col gap-[6px]">
            {/* Row 1 – Right to Left */}
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

            {/* Row 2 – Left to Right */}
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

            {/* Row 3 – Right to Left */}
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
      <section
        id="testimonials"
        className="w-full bg-[#F2FFF0] pt-[90px] pb-[90px] px-[24px] md:px-[40px] lg:px-[64px]"
      >
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-crimson text-[32px] md:text-[56px] font-bold text-[#51A147] mb-4">
            {testimonials.heading}
          </h2>
          <p className="text-[#535353] text-[16px] md:text-[18px] mb-12 max-w-full leading-relaxed">
            {testimonials.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px]">
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-[6px]">
              <div className="bg-white p-8 md:p-10 border border-[#E5E7EB] flex flex-col justify-between h-full rounded-sm shadow-sm">
                <div>
                  <img src={quotes} alt="quotes" className="w-[20px] h-[20px] block mb-2 object-contain" />
                  <p className="text-[#535353] text-[16px] md:text-[18px] leading-relaxed">
                    {testimonials.large.quote}
                  </p>
                </div>
                <div className="mt-10">
                  <p className="font-semibold text-[#000000]">{testimonials.large.name}</p>
                  <p className="text-gray-400 text-sm">{testimonials.large.company}</p>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 border border-[#E5E7EB] flex flex-col justify-between h-full rounded-sm shadow-sm">
                <div>
                  <img src={quotes} alt="quotes" className="w-[20px] h-[20px] block mb-2 object-contain" />
                  <p className="text-[#535353] text-[16px] md:text-[18px] leading-relaxed">
                    {testimonials.small[0].quote}
                  </p>
                </div>
                <div className="mt-10">
                  <p className="font-semibold text-[#000000]">{testimonials.small[0].name}</p>
                  <p className="text-gray-400 text-sm">{testimonials.small[0].company}</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-[6px]">
              <div className="bg-white p-8 md:p-10 border border-[#E5E7EB] flex flex-col justify-between h-full rounded-sm shadow-sm">
                <div>
                  <img src={quotes} alt="quotes" className="w-[20px] h-[20px] block mb-2 object-contain" />
                  <p className="text-[#535353] text-[16px] md:text-[18px] leading-relaxed">
                    {testimonials.small[1].quote}
                  </p>
                </div>
                <div className="mt-10">
                  <p className="font-semibold text-[#000000]">{testimonials.small[1].name}</p>
                  <p className="text-gray-400 text-sm">{testimonials.small[1].company}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
                <div className="bg-white p-6 md:p-8 border border-[#E5E7EB] flex flex-col justify-between rounded-sm shadow-sm">
                  <div>
                    <img src={quotes} alt="quotes" className="w-[20px] h-[20px] block mb-2 object-contain" />
                    <p className="text-[#535353] text-[15px] leading-relaxed mb-6">
                      {testimonials.small[2].quote}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000] text-sm">{testimonials.small[2].name}</p>
                    <p className="text-gray-400 text-xs">{testimonials.small[2].company}</p>
                  </div>
                </div>

                <div className="bg-white p-6 md:p-8 border border-[#E5E7EB] flex flex-col justify-between rounded-sm shadow-sm">
                  <div>
                    <img src={quotes} alt="quotes" className="w-[20px] h-[20px] block mb-2 object-contain" />
                    <p className="text-[#535353] text-[15px] leading-relaxed mb-6">
                      {testimonials.large.quote.substring(0, 120)}...
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000] text-sm">{testimonials.large.name}</p>
                    <p className="text-gray-400 text-xs">{testimonials.large.company}</p>
                  </div>
                </div>
              </div>
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