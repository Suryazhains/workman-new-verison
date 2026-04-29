import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './outdoor.css';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

interface Service {
  id: string | number;
  title: string;
  videoUrl?: string;
  images?: string[];
  description_points?: string[];
}

// --- Slower Paragraph Animation Variants ---
const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015, // Slower stagger for a more deliberate cascade
      delayChildren: 0.4,      // Waits for the heading to animate first
    },
  },
};

const wordVariants = {
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

// --- Helper for generating the slug ---
const getServiceSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// --- Scroll Stack Sub-Components ---
const ScrollStackItem: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <div 
    className="scroll-stack-card bg-white rounded-[40px] overflow-hidden mb-[10vh] sticky top-[15vh]" 
    onClick={onClick}
    style={{ 
        cursor: 'pointer', 
        height: '70vh', 
        width: '100%', 
        transformOrigin: 'top center',
        boxShadow: 'none' 
    }}
  >
    {children}
  </div>
);

const OutdoorServices: React.FC = () => {
  const { outdoorPage, header, categoryData } = LANDING_CONTENT;
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  type CategoryKey = 'INDOOR' | 'LED VIDEO WALL' | 'MODULAR SIGNAGE' | 'OUTDOOR' | 'POP';

  const getCategoryKey = (): CategoryKey => {
    const currentPath = (pathname + hash).toLowerCase();
    if (currentPath.includes('indoor')) return 'INDOOR';
    if (currentPath.includes('led')) return 'LED VIDEO WALL';
    if (currentPath.includes('pop')) return 'POP'; 
    if (currentPath.includes('modular')) return 'MODULAR SIGNAGE';
    return 'OUTDOOR';
  };

  const currentCategoryKey = getCategoryKey();
  const isFullWidthCategory = currentCategoryKey === 'LED VIDEO WALL' || currentCategoryKey === 'POP';
  const pageHeader = categoryData[currentCategoryKey];

  const handleBack = () => {
    const tabMap: Record<CategoryKey, string> = {
      'OUTDOOR': 'outdoor',
      'INDOOR': 'indoor',
      'LED VIDEO WALL': 'led',
      'POP': 'pop',
      'MODULAR SIGNAGE': 'modular'
    };
    const targetTab = tabMap[currentCategoryKey] || 'outdoor';
    navigate(`/services#${targetTab}`);
  };

  const handleViewDetails = (title: string) => {
    const slug = getServiceSlug(title);
    navigate(`/servicedetails/${slug}`);
  };
  
  const formattedParagraphs = useMemo(() => {
    const text = pageHeader?.description || "";
    return text.split('\n').filter(p => p.trim() !== '');
  }, [pageHeader?.description]);

  const filteredServices = useMemo(() => {
    const servicesMap = header.servicesData as Record<string, string[]>;
    const allowedTitles = servicesMap[currentCategoryKey] || [];
    return (outdoorPage.services as Service[]).filter(service => 
      allowedTitles.some((title: string) => 
        title.toLowerCase().trim() === service.title.toLowerCase().trim()
      )
    );
  }, [currentCategoryKey, header.servicesData, outdoorPage.services]);

  // Extract the first service for full-width views
  const singleService = filteredServices[0]; // Assuming you meant to extract the first one here

  useEffect(() => {
    if (isFullWidthCategory) return;

    const handleScroll = () => {
      const cards = document.querySelectorAll('.scroll-stack-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;

        if (cardTop < 200 && cardTop > -500) {
          const progress = Math.max(0, (200 - cardTop) / 600);
          const scale = 1 - progress * 0.05;
          const opacity = 1 - progress * 0.2;

          (card as HTMLElement).style.transform = `scale(${scale})`;
          (card as HTMLElement).style.opacity = `${opacity}`;
        } else {
          (card as HTMLElement).style.transform = `scale(1)`;
          (card as HTMLElement).style.opacity = `1`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFullWidthCategory]);

  return (
    <div className="flex flex-col w-full bg-[#959064]">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }
        .font-inter { font-family: 'Inter', sans-serif !important; }
        
        .font-dm-sans-extralight { 
            font-family: 'DM Sans', sans-serif !important; 
            font-weight: 200 !important;
        }

        .description-text p {
          max-width: 100% !important;
          width: 100% !important;
        }

        @media (min-width: 2560px) {
          .scroll-stack-card {
            height: 75vh !important;
            border-radius: 60px !important;
            margin-bottom: 15vh !important;
          }
          .split-hero-left, .fs-left-content { padding: 10% 10% !important; }
        }

        .split-hero-container {
            display: flex;
            width: 100%;
            height: 100vh;
            background: white;
            overflow: hidden;
        }

        .split-hero-left {
            width: 50%;
            height: 100%;
            background: #959064;
            color: white;
            padding: 8% 8%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            position: relative;
        }

        .split-hero-right {
            width: 50%;
            height: 100%;
            position: relative;
            background: #000;
        }

        .split-video-bg {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .btn-view-details {
          margin-top: 24px;
          padding: 14px 32px;
          background: #959064;
          color: white;
          border-radius: 100px;
          font-weight: 600;
          font-size: 14px;
          width: fit-content;
          transition: all 0.3s ease;
          border: 1px solid white;
        }

        .btn-view-details:hover {
          transform: translateY(-2px);
          background: white;
          color: #959064;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 1024px) { 
          .split-hero-container { 
            flex-direction: column; 
            height: auto; 
          }
          .split-hero-left, .split-hero-right { 
            width: 100%; 
            height: auto; 
            min-height: 40vh; 
          }
        }
      `}} />

      {isFullWidthCategory ? (
        <div className="flex flex-col w-full">
          <div className="split-hero-container">
            <div className="split-hero-left pt-24 md:pt-32 min-[2560px]:pt-48">
              
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center text-white/80 hover:text-white transition-colors mb-8 group w-fit min-[2560px]:text-2xl" 
                onClick={handleBack}
              >
                <span className="mr-2 text-xl min-[2560px]:text-3xl transition-transform group-hover:-translate-x-1">←</span> Back to Services
              </motion.button>

              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="uppercase tracking-[0.2em] font-bold text-white/60 mb-4 block text-[10px] md:text-xs min-[2560px]:text-xl"
              >
                Service Overview
              </motion.span>

              {/* Animated Full-Width Heading - Word by Word */}
              <h1 className={`font-dm-sans-extralight tracking-normal mb-6 leading-[1.1] min-[2560px]:mb-12 ${currentCategoryKey === 'LED VIDEO WALL' ? 'text-3xl md:text-5xl lg:text-6xl min-[2560px]:text-[90px] min-[3840px]:text-[120px]' : 'text-4xl md:text-7xl lg:text-8xl min-[2560px]:text-[110px] min-[3840px]:text-[150px]'}`}>
                {String(pageHeader?.heading || "").split(" ").map((word, index, array) => (
                  <React.Fragment key={index}>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {index < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </h1>

              <div className="space-y-4 mb-8 min-[2560px]:mb-16">
                {/* Safe array slice without optional chaining method */}
                {(singleService?.description_points || []).slice(0, 2).map((point, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    key={index} 
                    className="flex items-start gap-4 min-[2560px]:gap-8"
                  >
                    <span className="bg-white text-[#959064] w-5 h-5 min-[2560px]:w-10 min-[2560px]:h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[9px] min-[2560px]:text-lg mt-1 min-[2560px]:mt-2">
                      {index + 1}
                    </span>
                    <p className="text-white/90 text-sm md:text-base min-[2560px]:text-3xl min-[3840px]:text-4xl font-light leading-relaxed min-[2560px]:leading-loose">{point}</p>
                  </motion.div>
                ))}
              </div>

              {/* FAST Animated Full-Width Description - Paragraph Splitting Logic Applied */}
              <motion.div 
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 text-white/80 text-sm md:text-lg min-[2560px]:text-3xl min-[3840px]:text-4xl font-light leading-relaxed min-[2560px]:leading-loose description-text w-full"
              >
                {formattedParagraphs.map((para, i) => (
                  <p key={i} className="w-full">
                    {para.split(" ").map((word, wordIndex, array) => (
                      <React.Fragment key={`full-desc-word-${i}-${wordIndex}`}>
                        <motion.span variants={wordVariants} className="inline-block">
                          {word}
                        </motion.span>
                        {wordIndex < array.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </motion.div>
              
              {singleService && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  onClick={() => handleViewDetails(singleService.title)}
                  className="btn-view-details min-[2560px]:px-12 min-[2560px]:py-6 min-[2560px]:text-2xl min-[2560px]:rounded-[2rem] mt-6"
                >
                  View Project Details
                </motion.button>
              )}
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="split-hero-right min-h-[40vh]"
            >
              {singleService?.videoUrl ? (
                <video src={singleService.videoUrl} autoPlay loop muted playsInline className="split-video-bg" />
              ) : (
                <img src={singleService?.images && singleService.images.length > 0 ? singleService.images[0] : ''} className="split-video-bg" alt="" />
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          <section className="w-full pt-24 md:pt-32 min-[2560px]:pt-[180px] min-[3840px]:pt-[250px] pb-12 min-[2560px]:pb-24">
            <div className="w-full mx-auto px-6 md:px-[8%] min-[2560px]:px-[10%]">
              
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center text-white hover:text-black transition-colors mb-8 group w-fit min-[2560px]:text-2xl" 
                onClick={handleBack}
              >
                <span className="mr-2 text-xl min-[2560px]:text-3xl transition-transform group-hover:-translate-x-1">←</span> Back to Services
              </motion.button>

              {/* Animated Stacked Category Heading - Word by Word */}
              <h1 className="font-dm-sans-extralight tracking-normal text-4xl md:text-[64px] min-[2560px]:text-[100px] min-[3840px]:text-[130px] text-white mb-8 min-[2560px]:mb-12 leading-tight w-full">
                {String(pageHeader?.heading || "").split(" ").map((word, index, array) => (
                  <React.Fragment key={index}>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 + (index * 0.1), ease: "easeOut" }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {index < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </h1>

              {/* FAST Animated Stacked Description - Paragraph Splitting Logic Applied */}
              <motion.div 
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-white w-full description-text"
              >
                {formattedParagraphs.map((para, index) => (
                  <p key={index} className="mb-6 min-[2560px]:mb-10 text-sm md:text-base min-[2560px]:text-3xl min-[3840px]:text-4xl leading-relaxed min-[2560px]:leading-loose w-full">
                    {para.split(" ").map((word, wordIndex, array) => (
                      <React.Fragment key={`stack-desc-word-${index}-${wordIndex}`}>
                        <motion.span variants={wordVariants} className="inline-block">
                          {word}
                        </motion.span>
                        {wordIndex < array.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="w-full px-6 md:px-[8%] min-[2560px]:px-[10%] pb-[20vh] relative">
            <div className="flex flex-col gap-0">
              {filteredServices.map((service) => (
                <ScrollStackItem key={service.id} onClick={() => handleViewDetails(service.title)}>
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 p-8 md:p-12 min-[2560px]:p-20 flex flex-col justify-center bg-white text-left">
                      
                      {/* Animated Service Card Title - Word by Word */}
                      <h3 className="font-dm-sans-extralight tracking-normal service-card-title text-2xl md:text-4xl min-[2560px]:text-[70px] min-[3840px]:text-[100px] text-black mb-6 min-[2560px]:mb-12 leading-tight">
                        {String(service.title).split(" ").map((word, index, array) => (
                          <React.Fragment key={index}>
                            <motion.span
                              initial={{ opacity: 0, y: 15 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                              className="inline-block"
                            >
                              {word}
                            </motion.span>
                            {index < array.length - 1 && " "}
                          </React.Fragment>
                        ))}
                      </h3>
                      
                      <div className="space-y-4 mb-8 min-[2560px]:mb-16">
                        {/* Safe array slice without optional chaining method */}
                        {(service.description_points || []).slice(0, 2).map((point, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            key={idx} 
                            className="flex items-start gap-3 min-[2560px]:gap-6"
                          >
                            <span className="bg-[#959064] text-white w-5 h-5 min-[2560px]:w-10 min-[2560px]:h-10 rounded-full flex items-center justify-center shrink-0 text-[10px] min-[2560px]:text-lg font-bold mt-1 min-[2560px]:mt-2">
                              {idx + 1}
                            </span>
                            <p className="text-gray-600 text-sm md:text-base min-[2560px]:text-3xl min-[3840px]:text-4xl font-light line-clamp-2 min-[2560px]:leading-relaxed">
                              {point}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleViewDetails(service.title);
                        }}
                        className="btn-view-details min-[2560px]:px-12 min-[2560px]:py-6 min-[2560px]:text-2xl min-[2560px]:rounded-[2rem]"
                      >
                        View Project Details
                      </motion.button>
                    </div>
                    <div className="w-full md:w-1/2 overflow-hidden bg-black">
                      {/* Fixed: Pulling index 0 so it successfully renders the first image string instead of an array */}
                      <img 
                        src={service.images && service.images.length > 0 ? service.images[0] : ''} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
                      />
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </div>
          </section>
        </>
      )}
      <LandingPageThree />
    </div>
  );
};

export default OutdoorServices;