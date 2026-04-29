import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import type { Variants } from 'framer-motion';
import LandingTwo from './LandingTwo';
import { LANDING_CONTENT } from './content';

// Asset Imports
import Home_1 from '../assets/home 4.png'; 
import Home_2 from '../assets/home 7.png';
import Home_3 from '../assets/homeAbid3.png';
import Home_4 from '../assets/home 1.jpg';
import Home_5 from '../assets/home 5.png';
import Home_7 from '../assets/home 2.png';
import AboutVideo from '../assets/0225.mp4'; 

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
      {/* Added DM Sans import here alongside the existing ones if it wasn't already imported globally */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }
        .font-dm-sans { font-family: 'DM Sans', sans-serif !important; }

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
          <div className="w-full px-10 md:px-20 lg:px-24">
            <div className="max-w-[43.75rem]">
              {/* Animated Hero Title - Word by Word */}
              <h1 className="font-dm-sans  text-[3rem] md:text-[4.25rem] lg:text-[5.25rem] font-extralight leading-[1.05]  text-white mb-8 text-readable-shadow">
                {hero.title.join(" ").split(" ").map((word, index, array) => (
                  <React.Fragment key={index}>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {/* Add space after every word except the very last one */}
                    {index < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </h1>
              
              {/* Animated Hero Description - Paragraph Splitting Logic Applied */}
              <motion.div 
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-white text-lg md:text-xl leading-relaxed max-w-[34.375rem] mb-12 text-readable-shadow font-medium"
              >
                {String(hero.description).split('\n').map((line, lineIndex) => (
                  <span key={`hero-desc-line-${lineIndex}`} className="block min-h-[1rem] mb-2">
                    {line.split(" ").map((word, wordIndex, array) => (
                      <React.Fragment key={`hero-desc-word-${lineIndex}-${wordIndex}`}>
                        <motion.span variants={wordVariants} className="inline-block">
                          {word}
                        </motion.span>
                        {wordIndex < array.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </span>
                ))}
              </motion.div>
              
              {/* Animated Hero Button */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }} // Slightly delayed to let text finish
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
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section 
        id="about" 
        className="relative w-full bg-[#FFFDE8] py-16 md:py-36 px-10 md:px-20 lg:px-24 scroll-mt-24 overflow-hidden"
      >
        <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row items-center justify-between">
          
          <div className="w-full lg:w-[50%] text-left z-10 lg:pr-10">
            {/* Animated About Label - Word by Word */}
            <span className="text-black font-dm-sans font-extralight text-[23px] md:text-[30px] leading-none tracking-[0em] mb-4 block ">
              {about.label.split(" ").map((word, index, array) => (
                <React.Fragment key={index}>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                  {index < array.length - 1 && " "}
                </React.Fragment>
              ))}
            </span>

            {/* Animated About Heading - Word by Word */}
            <h2 className="font-inter font-bold text-[27px] sm:text-[37px] md:text-[39px] xl:text-[43px] leading-[1.1] tracking-[-0.04em] text-black mb-6 w-full">
              {about.heading.split(" ").map((word, index, array) => (
                <React.Fragment key={index}>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + (index * 0.1) }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                  {index < array.length - 1 && " "}
                </React.Fragment>
              ))}
            </h2>

            {/* Animated About Description - Paragraph Splitting Logic Applied */}
            <motion.div 
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-gray-800 text-[14px] md:text-[16px] leading-relaxed w-full max-w-[95%] mb-12"
            >
              {String(about.description).split('\n').map((line, lineIndex) => (
                <span key={`about-desc-line-${lineIndex}`} className="block mb-4 min-h-[1rem]">
                  {line.split(" ").map((word, wordIndex, array) => (
                    <React.Fragment key={`about-desc-word-${lineIndex}-${wordIndex}`}>
                      <motion.span variants={wordVariants} className="inline-block">
                        {word}
                      </motion.span>
                      {wordIndex < array.length - 1 && " "}
                    </React.Fragment>
                  ))}
                </span>
              ))}
            </motion.div>

            <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-4 sm:gap-8 lg:gap-12">
              {about.stats.map((stat, index) => (
                /* Animated Stats Items */
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 + (index * 0.1) }} // Delayed to follow paragraph
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-1 md:gap-2">
          
                    <p className="text-[23px] sm:text-[31px] md:text-[39px] font-bold text-black">
                      {stat.value}
                    </p>
                
                    <span className="text-[#FF7A00] text-[9px] sm:text-[15px] md:text-[19px] font-bold">↗</span>
                  </div>

                  <p className="text-[#6B7280] text-[5px] sm:text-[9px] md:text-[11px] font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Unanimated Video Element */}
          <div className="w-full lg:absolute lg:right-10 lg:top-0 lg:h-full lg:w-1/2 mt-12 lg:mt-0 flex items-center justify-center lg:justify-end z-0">
            <video 
              src={AboutVideo}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[calc(110%-80px)] lg:w-auto object-cover lg:object-contain object-center lg:object-right"
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