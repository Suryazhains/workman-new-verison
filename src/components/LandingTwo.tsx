import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { LANDING_CONTENT, PORTFOLIO_IMAGES } from './content';
import LandingThree from './landingthree';

// --- NEW LOGO IMPORTS ---
import newLogo1 from '../assets/newlogo5.png';
import newLogo2 from '../assets/newlogo2.png';
import newLogo3 from '../assets/newlogo3.png';
import newLogo4 from '../assets/newlogo4.png';
import newLogo5 from '../assets/newlogo1.png';
import newLogo6 from '../assets/newlogo6.png';

// --- Slower Paragraph Animation Variants ---
const paragraphVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015, // Slower stagger for a more deliberate cascade
      delayChildren: 0.4,     // Waits for the heading to animate first
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Slower, smoother reveal for each word
      ease: "easeOut",
    },
  },
};

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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }
        
        .font-dm-sans-light {
            font-family: 'DM Sans', sans-serif !important;
            font-weight: 300 !important;
        }

        .font-dm-sans {
            font-family: 'DM Sans', sans-serif !important;
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

      {/* --- PORTFOLIO SECTION --- */}
      <section
        id="portfolio"
        className="w-full bg-[#959064] pt-[2.5rem] pb-[5.5rem] overflow-hidden scroll-mt-[6rem] lg:scroll-mt-[8rem]"
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
          
          {/* Animated Portfolio Description - Line by Line / Word by Word cascade */}
          <motion.div 
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-[#FFFFFF] max-w-full text-base leading-relaxed"
          >
            {String(portfolio.description).split('\n').map((line, lineIndex) => (
              <span key={`portfolio-desc-line-${lineIndex}`} className="block min-h-[1rem]">
                {line.split(" ").map((word, wordIndex, array) => (
                  <React.Fragment key={`portfolio-desc-word-${lineIndex}-${wordIndex}`}>
                    <motion.span variants={wordVariants} className="inline-block">
                      {word}
                    </motion.span>
                    {wordIndex < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </span>
            ))}
          </motion.div>
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

            

      {/* --- TESTIMONIALS SECTION --- */}
     
<section className="relative w-full bg-[#FAFAFA] py-12 md:py-16 overflow-hidden">
        
        {/* Main Content Grid */}
        <div className="relative z-10 max-w-[85rem] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Headings */}
          <div className="flex flex-col">
     
            <h2 className="font-dm-sans-light text-[2rem] md:text-[3.5rem] text-[#000000] leading-[1.2] tracking-tight">
              Our Channel<br />
              partners<br />
              for the long run.
            </h2>
          </div>

          {/* Right Column: Description & Logos */}
          <div className="flex flex-col">
            <p className="font-dm-sans-light text-[#535353] text-sm md:text-base leading-relaxed mb-10">
              We Build foundation of trust and commitment <strong>with our channel partners</strong> to provide top notch <strong>Signage Solutions</strong> for our customer
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 items-center justify-items-center">
              <img src={newLogo1} alt="3M Partner Logo" className="w-auto h-auto max-w-[90px] md:max-w-[110px] max-h-[40px] md:max-h-[45px] object-contain" draggable={false} />
              <img src={newLogo2} alt="Aludecor Partner Logo" className="w-auto h-auto max-w-[90px] md:max-w-[110px] max-h-[40px] md:max-h-[45px] object-contain" draggable={false} />
              <img src={newLogo3} alt="Lighting Technologies Partner Logo" className="w-auto h-auto max-w-[90px] md:max-w-[110px] max-h-[40px] md:max-h-[45px] object-contain" draggable={false} />
              <img src={newLogo4} alt="Astariglas Partner Logo" className="w-auto h-auto max-w-[90px] md:max-w-[110px] max-h-[40px] md:max-h-[45px] object-contain" draggable={false} />
              <img src={newLogo5} alt="Ecolite Partner Logo" className="w-auto h-auto max-w-[90px] md:max-w-[110px] max-h-[40px] md:max-h-[45px] object-contain" draggable={false} />
              <img src={newLogo6} alt="HP Latex Partner Logo" className="w-auto h-auto max-w-[90px] md:max-w-[110px] max-h-[40px] md:max-h-[45px] object-contain" draggable={false} />
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