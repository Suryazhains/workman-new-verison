import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';
import { X } from 'lucide-react';

// --- Smooth Animation Variants (TIMINGS DECREASED FOR FASTER SPEED) ---

// For main sections and headings (Snappy & Elegant)
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.03,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.003,
      delayChildren: 0.02,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
};

const Infrastructure: React.FC = () => {
  const { infrastructurePage } = LANDING_CONTENT;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /**
   * ✅ FORCE SCROLL TO TOP ON MOUNT
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * ✅ PREVENT SCROLL WHEN PREVIEW IS OPEN
   */
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const getServiceSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  return (
    <main className="bg-[#959064] w-full min-h-screen">
      {/* GLOBAL FONT IMPORT & CLASSES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }

        .font-dm-sans {
            font-family: 'DM Sans', sans-serif !important;
        }

        .preview-fade-in {
          animation: previewFade 0.2s ease-out;
        }

        @keyframes previewFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />

      <section 
        id="infrastructure" 
        className="w-full pt-[4rem] md:pt-[5rem] pb-[4rem] md:pb-[5rem] scroll-mt-[7rem] font-inter"
      >
        {/* Animated Main Header Section */}
        <div className="w-full max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24 mb-4 lg:mb-6 text-left">
          
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px 0px" }}
          >
            {/* Animated Main Heading - Word by Word */}
            <h2 className="font-dm-sans tracking-normal text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-extralight text-white mb-4 leading-tight transition-all">
              {String(infrastructurePage.heading || "Infrastructure").split(" ").map((word, index, array) => (
                <React.Fragment key={`main-heading-${index}`}>
                  <motion.span
                    variants={textVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                  {index < array.length - 1 && " "}
                </React.Fragment>
              ))}
            </h2>
          </motion.div>

          {/* Animated Main Description - Line by Line / Word by Word cascade */}
          <motion.p 
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px 0px" }}
            className="text-white/90 max-w-[70rem] text-[14px] md:text-[15px] lg:text-[17px] leading-relaxed transition-all"
          >
            {String(infrastructurePage.description).split(" ").map((word, index, array) => (
              <React.Fragment key={`main-desc-${index}`}>
                <motion.span
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {index < array.length - 1 && " "}
              </React.Fragment>
            ))}
          </motion.p>
        </div>

        {/* Machines List */}
        <div className="w-full flex flex-col max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24">
          {infrastructurePage.equipments.map((item, index) => (
            <motion.div
              key={item.id}
              id={getServiceSlug(item.title)}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              /* ✅ REDUCED VERTICAL PADDING HERE TO TIGHTEN SPACING */
              className={`flex flex-col lg:flex-row items-center justify-between w-full py-[1rem] lg:py-[1.5rem] gap-8 lg:gap-12 transition-all ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Animated Image Container */}
              <motion.div 
                variants={imageVariants}
                className="w-full lg:w-1/2 flex items-center justify-center cursor-pointer p-4 lg:p-6"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full max-w-[95%] lg:max-w-[90%] h-auto object-contain block transition-transform hover:scale-[1.03] duration-300 drop-shadow-2xl"
                />
              </motion.div>

              {/* Text Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="w-full max-w-[40rem] mx-auto lg:mx-0">
                  {/* Animated Item Title - Word by Word */}
                  <h3 className="font-dm-sans tracking-normal text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.25rem] font-extralight text-white mb-4 leading-tight transition-all">
                    {String(item.title).split(" ").map((word, wIndex, wArray) => (
                      <React.Fragment key={`${item.id}-${wIndex}`}>
                        <motion.span
                          variants={textVariants}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                        {wIndex < wArray.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </h3>
                  <motion.div 
                    variants={paragraphVariants} 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px 0px" }}
                    className="w-full mt-2"
                  >
                    <p className="text-white/90 leading-relaxed text-[14px] md:text-[15px] lg:text-[17px] font-inter w-full text-left transition-all">
                      {String(item.description).split(" ").map((word, wIndex, wArray) => (
                        <React.Fragment key={`desc-${item.id}-${wIndex}`}>
                          <motion.span
                            variants={wordVariants}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                          {wIndex < wArray.length - 1 && " "}
                        </React.Fragment>
                      ))}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ DRIVE-STYLE PREVIEW WITH HIGH Z-INDEX */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center preview-fade-in"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-[2rem] right-[2rem] lg:top-[3rem] lg:right-[3rem] 2xl:top-[4rem] 2xl:right-[4rem] text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem] 2xl:w-[4rem] 2xl:h-[4rem]" strokeWidth={2} />
          </button>

          <div 
            className="relative w-full h-full flex items-center justify-center p-[2rem] md:p-[4rem] lg:p-[6rem] 2xl:p-[8rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      )}

      <LandingPageThree />
    </main>
  );
};

export default Infrastructure;