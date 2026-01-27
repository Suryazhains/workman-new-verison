import React from 'react';
import { LANDING_CONTENT, PORTFOLIO_IMAGES } from './content';
import LandingThree from './LandingThree';
import quotes from '../assets/Quote.png';

const LandingTwo: React.FC = () => {
  const { portfolio, testimonials } = LANDING_CONTENT;

  // duplicate images for seamless loop
  const row1Images = [...PORTFOLIO_IMAGES.slice(0, 4), ...PORTFOLIO_IMAGES.slice(0, 4)];
  const row2Images = [...PORTFOLIO_IMAGES.slice(4, 8), ...PORTFOLIO_IMAGES.slice(4, 8)];

  return (
    <section
      id="portfolio"
      className="w-full bg-[#F6F7F9] pt-16 md:pt-[100px] pb-0 overflow-hidden"
    >
      {/* Animations */}
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      {/* Heading */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-10">
        <h2 className="font-bold text-3xl md:text-[40px] text-[#163B73] mb-4">
          {portfolio.heading}
        </h2>
        <p className="text-[#4B5563] max-w-[520px]">
          {portfolio.description}
        </p>
      </div>

      {/* Portfolio Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* LEFT FADE */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[160px]
          bg-gradient-to-r from-[#F6F7F9] via-[#F6F7F9] to-transparent" />

        {/* RIGHT FADE */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[160px]
          bg-gradient-to-l from-[#F6F7F9] via-[#F6F7F9] to-transparent" />

        <div className="flex flex-col gap-[6px]">
          {/* Row 1 – Right to Left */}
          <div
            className="flex gap-[6px] w-max"
            style={{ animation: 'marqueeLeft 30s linear infinite' }}
          >
            {row1Images.map((src, i) => (
              <div
                key={`row1-${i}`}
                className="w-[280px] h-[160px] md:w-[435px] md:h-[232px] flex-shrink-0"
              >
                <img
                  src={src}
                  alt="Portfolio"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Row 2 – Left to Right */}
          <div
            className="flex gap-[6px] w-max"
            style={{ animation: 'marqueeRight 30s linear infinite' }}
          >
            {row2Images.map((src, i) => (
              <div
                key={`row2-${i}`}
                className="w-[280px] h-[160px] md:w-[435px] md:h-[232px] flex-shrink-0"
              >
                <img
                  src={src}
                  alt="Portfolio"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <section
        id="testimonials"
        className="w-full bg-[#F6F7F9] pt-[80px] md:pt-[120px] pb-0 px-[16px]"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Heading */}
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#163B73] mb-4">
            {testimonials.heading}
          </h2>
          <p className="text-[#535353] text-[16px] md:text-[18px] mb-12 max-w-[500px] leading-relaxed">
            {testimonials.description}
          </p>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px]">
            
            {/* LEFT BIG CARD */}
            <div className="bg-[#F9FAFB] p-8 md:p-10 rounded-[16px] border border-gray-100 flex flex-col justify-between">
              <div>
                <img 
                  src={quotes} 
                  alt="quotes" 
                  className="w-[20px] h-[20px] block mb-2 object-contain" 
                />
                <p className="text-[#535353] text-[16px] md:text-[18px] leading-relaxed">
                  {testimonials.large.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-10">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold text-[#000000]">
                    {testimonials.large.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {testimonials.large.company}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-[6px]">
              
              {/* RIGHT TOP BIG */}
              <div className="bg-[#F9FAFB] p-8 md:p-10 rounded-[16px] border border-gray-100 flex flex-col justify-between">
                <div>
                  <img 
                    src={quotes} 
                    alt="quotes" 
                    className="w-[20px] h-[20px] block mb-2 object-contain" 
                  />
                  <p className="text-[#535353] text-[16px] md:text-[18px] leading-relaxed">
                    {testimonials.small[0].quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-10">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-[#000000]">
                      {testimonials.small[0].name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {testimonials.small[0].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT BOTTOM SMALL CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
                
                <div className="bg-[#F9FAFB] p-6 md:p-8 rounded-[16px] border border-gray-100 flex flex-col justify-between">
                  <img 
                    src={quotes} 
                    alt="quotes" 
                    className="w-[20px] h-[20px] block mb-2 object-contain" 
                  />
                  <p className="text-[#535353] text-[15px] leading-relaxed mb-6">
                    {testimonials.small[1].quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-[#000000] text-sm">
                        {testimonials.small[1].name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {testimonials.small[1].company}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] p-6 md:p-8 rounded-[16px] border border-gray-100 flex flex-col justify-between">
                  <img 
                    src={quotes} 
                    alt="quotes" 
                    className="w-[20px] h-[20px] block mb-2 object-contain" 
                  />
                  <p className="text-[#535353] text-[15px] leading-relaxed mb-6">
                    {testimonials.small[2].quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-[#000000] text-sm">
                        {testimonials.small[2].name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {testimonials.small[2].company}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gap before next section - Margin top kept, but padding bottom of parent set to 0 */}
      <div className="mt-16 md:mt-24 mb-0 pb-0">
        <LandingThree />
      </div>
    </section>
  );
};

export default LandingTwo;