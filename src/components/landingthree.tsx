import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import circlelogo from '../assets/whitelogo.png';
import emailIcon from '../assets/email.png';
import phoneIcon from '../assets/phone.png';
import { LANDING_CONTENT } from './content';

// BRAND IMAGES
import brand1 from "../assets/brand 1.png";
import brand2 from "../assets/brand 20.png";
import brand3 from "../assets/brand 21.jpg";
import brand4 from "../assets/brand 18.png";
import brand5 from "../assets/brand 25.png";
import brand6 from "../assets/brand 16.png";
import brand7 from "../assets/brand 7.png";
import brand8 from "../assets/brand 23.jpg";
import brand9 from "../assets/brand 2.png";
import brand10 from "../assets/brand 9.png";
import brand12 from "../assets/brand 12.png";
import brand13 from "../assets/brand 13.png";
import brand14 from "../assets/brand 14.png";
import brand15 from "../assets/brand 15.png";
import brand16 from "../assets/brand 6.png";
import brand17 from "../assets/brand 17.png";
import brand18 from "../assets/brand 27.png";
import brand19 from "../assets/brand 10.png";
import brand21 from "../assets/brand 22.png";
import brand22 from "../assets/brand 8.png";
import brand23 from "../assets/brand 24.png";
import brand24 from "../assets/brand 5.png";
import brand25 from "../assets/brand 26.png";
import brand26 from "../assets/brand 4.png";

// SEPARATED BRAND DATA
const BRANDS_DATA = [
  { id: 1, logo: brand1, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[124px] lg:h-[100px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 2, logo: brand2, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[114px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 3, logo: brand3, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[70px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 4, logo: brand4, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 5, logo: brand5, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[114px] lg:h-[100px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 6, logo: brand6, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 7, logo: brand7, sizing: "w-[65px] h-[33px] md:w-[96px] md:h-[52px] lg:w-[159px] lg:h-[120px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 8, logo: brand8, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 9, logo: brand9, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[80px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 10, logo: brand10, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 12, logo: brand12, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 13, logo: brand13, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[114px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 14, logo: brand14, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[114px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 15, logo: brand15, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 16, logo: brand16, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[62px] lg:w-[104px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 17, logo: brand17, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 18, logo: brand18, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 19, logo: brand19, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[104px] lg:h-[100px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 21, logo: brand21, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[130px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 22, logo: brand22, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 23, logo: brand23, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 24, logo: brand24, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[124px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 25, logo: brand25, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[72px] lg:w-[104px] lg:h-[70px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 26, logo: brand26, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[90px] lg:h-[60px] mb-5 [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" }
];

// Fallback Testimonial Data in case it's missing from LANDING_CONTENT
const defaultTestimonialsInfo = {
  heading: "What Our Clients Say",
  description: "Read about the experiences of our valued clients and how we have helped them achieve their branding goals with premium signage solutions."
};

const defaultAllTestimonials = [
  { quote: "Workman Advertising delivered beyond our expectations. The quality of the signs and the professionalism of the team were outstanding. They truly brought our brand to life!", name: "Sarah Jenkins", company: "Stellar Tech" },
  { quote: "From design to installation, the entire process was seamless. The attention to detail is remarkable. We've seen a noticeable increase in foot traffic since the new signage went up.", name: "David Chen", company: "Metro Retailers" },
  { quote: "A fantastic partner for our rebranding project. They understood our vision perfectly and executed it flawlessly across all our branch locations.", name: "Priya Sharma", company: "Horizon Group" },
  { quote: "Their execution and delivery speed is unmatched. The signs have transformed our retail spaces completely.", name: "Michael Ross", company: "Apex Innovations" },
  { quote: "Exceptional service from start to finish. The team at Workman Advertising is incredibly detail-oriented and communicative.", name: "Emma Thompson", company: "Quantum Retail" },
  { quote: "We have used them for multiple projects across different cities. The consistency in quality is simply impressive.", name: "James Wilson", company: "NextGen Enterprises" },
  { quote: "The customized lighting solutions they provided for our storefront gave us exactly the premium look we wanted.", name: "Olivia Davis", company: "BlueSky Ventures" },
  { quote: "Highly recommended for any corporate signage needs. They delivered top-tier branding solutions on time and under budget.", name: "Robert Miller", company: "Pioneer Logistics" }
];

// Testimonial Animation Variants
const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02 }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const LandingPageThree: React.FC = () => {
  const { footer, testimonials: contentTestimonials, allTestimonials: contentAllTestimonials } = LANDING_CONTENT;
  const navigate = useNavigate();
  const location = useLocation();

  // Testimonial Data Initialization
  const testimonials = contentTestimonials || defaultTestimonialsInfo;
  
  // Use LANDING_CONTENT's combined array if available, otherwise fallback to the 8 default testimonials
  const allTestimonials = contentAllTestimonials || 
    (contentTestimonials?.large && contentTestimonials?.small 
      ? [contentTestimonials.large, ...contentTestimonials.small] 
      : defaultAllTestimonials);

  const [currentIndex, setCurrentIndex] = useState(0);

  const contactInfo = {
    title: "Contact Link",
    phone3: "+91 9790851275 ",
    phone1: "+91 44 4238 5222",
    phone2: "+91 97908 09675",
    phone4: "+91 9840327575",
    email: "workmansign@hotmail.com",
    quote: "Our range of services is designed to cover all your branding and signage needs, no matter the scale."
  };

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');

    const scrollToHash = () => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = window.innerWidth < 1024 ? 70 : 120; 
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth',
        });
      }
    };

    scrollToHash();
    const timer = setTimeout(scrollToHash, 500);
    return () => clearTimeout(timer);
  }, [location]);

  const handleNavigation = (path: string | null) => {
    if (!path) return;

    const [routePart, hashPart] = path.split('#');
    const targetRoute = routePart || '/'; 

    const scrollToTarget = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = window.innerWidth < 1024 ? 70 : 120;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    };

    if (hashPart) {
      if (location.pathname === targetRoute) {
        scrollToTarget(hashPart);
      } else {
        navigate(path);
        setTimeout(() => {
          scrollToTarget(hashPart);
        }, 400);
      }
    } else {
      if (location.pathname !== targetRoute) {
        navigate(targetRoute);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Testimonial Navigation Functions
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? allTestimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allTestimonials.length);
  };

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,700&display=swap');
        
        .font-crimson { font-family: 'Crimson Pro', serif !important; }

        .font-dm-sans-extralight { 
            font-family: 'DM Sans', sans-serif !important; 
            font-weight: 200 !important;
        }

        .font-dm-sans-light {
            font-family: 'DM Sans', sans-serif !important;
            font-weight: 300 !important;
        }

        /* Testimonial Scrollbar Customization */
        .testimonial-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .testimonial-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .testimonial-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .testimonial-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}} />

      <div className="w-full font-inter overflow-x-hidden min-h-screen flex flex-col m-0 p-0 bg-white">
        
        {/* --- BRANDS SECTION --- */}
        <section className="bg-white py-12 md:py-13 [@media(min-width:2400px)]:py-20">
          <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 lg:px-12">
             <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-black text-center font-dm-sans-extralight tracking-normal text-3xl md:text-4xl mb-10 "
            >
              Our Memorable Brands...
            </motion.h2>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 gap-x-1 gap-y-6 md:gap-x-2 md:gap-y-8 [@media(min-width:2400px)]:gap-x-4 [@media(min-width:2400px)]:gap-y-12 items-center justify-items-center">
              {BRANDS_DATA.map((brand) => (
                <div key={brand.id} className="flex items-center justify-center w-full">
                  <img
                    src={brand.logo}
                    alt={`Client Brand ${brand.id}`}
                    className={`${brand.sizing} object-contain`}
                    fetchPriority="high"
                    loading="eager"
                    decoding="sync"
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- TESTIMONIALS SECTION --- */}
        <section id="testimonials" className="w-full bg-[#F9FAFB] py-8 md:py-12 overflow-hidden scroll-mt-[5rem] lg:scroll-mt-[6rem]">
          <div className="max-w-5xl mx-auto px-4">
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-dm-sans-light text-2xl md:text-3xl text-[#000000] mb-2 text-center"
            >
              {testimonials.heading}
            </motion.h2>

            <motion.div 
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="font-dm-sans-light text-[#535353] text-center text-xs md:text-sm mb-6 md:mb-8 max-w-8xl mx-auto leading-relaxed px-2"
            >
              {String(testimonials.description).split('\n').map((line, lineIndex) => (
                <span key={`test-desc-line-${lineIndex}`} className="block min-h-[1rem]">
                  {line.split(" ").map((word, wordIndex, array) => (
                    <React.Fragment key={`test-desc-word-${lineIndex}-${wordIndex}`}>
                      <motion.span variants={wordVariants} className="inline-block">
                        {word}
                      </motion.span>
                      {wordIndex < array.length - 1 && " "}
                    </React.Fragment>
                  ))}
                </span>
              ))}
            </motion.div>

            <div className="relative flex flex-col items-center justify-center">
              <div className="relative w-full flex items-center justify-center min-h-[16rem] md:min-h-[18rem]">
                
                {/* ARROWS MOVED TO ABSOLUTE LEFT & RIGHT EDGES */}
                <button 
                  onClick={prevSlide} 
                  className="hidden md:flex absolute -left-39 z-40 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md text-[#BBB791] text-lg font-bold border border-gray-100 active:scale-95 hover:bg-gray-50"
                >
                  ←
                </button>
                <button 
                  onClick={nextSlide} 
                  className="hidden md:flex absolute -right-39 z-40 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md text-[#BBB791] text-lg font-bold border border-gray-100 active:scale-95 hover:bg-gray-50"
                >
                  →
                </button>

                <div className="relative w-full flex items-center justify-center overflow-visible">
                  {allTestimonials.map((item, index) => {
                    const isActive = index === currentIndex;
                    const isLeft = index === (currentIndex - 1 + allTestimonials.length) % allTestimonials.length;
                    const isRight = index === (currentIndex + 1) % allTestimonials.length;

                    let positionClass = "opacity-0 scale-50 pointer-events-none absolute";
                    if (isActive) positionClass = "opacity-100 scale-100 z-30 relative shadow-xl border-[#FE4E5D]";
                    if (isLeft) positionClass = "opacity-30 -translate-x-[65%] lg:-translate-x-[90%] scale-90 z-10 absolute blur-[1px] hidden md:flex";
                    if (isRight) positionClass = "opacity-30 translate-x-[65%] lg:translate-x-[90%] scale-90 z-10 absolute blur-[1px] hidden md:flex";

                    return (
                      <div
                        key={index}
                        className={`transition-all duration-700 ease-in-out transform 
                          bg-white border rounded-lg flex flex-col justify-between
                          p-4 md:p-6 
                          w-[90%] md:w-full max-w-md 
                          text-left h-[14rem] md:h-[16rem] 
                          ${positionClass}`}
                      >
                        <div className="overflow-y-auto testimonial-scroll pr-2">
                          <p className="font-crimson text-[#333333] text-xs md:text-sm leading-relaxed pt-0">
                            {item.quote}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#959064] flex items-center gap-3 flex-shrink-0">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#959064] flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-md flex-shrink-0">
                            {item.name.charAt(0)}
                          </div>
                          <div className="overflow-hidden text-ellipsis">
                            <p className="font-bold text-[#1A1A1A] text-xs truncate">{item.name}</p>
                            <p className="text-[#888888] text-[0.6rem] font-medium uppercase truncate">{item.company}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Navigation Controls */}
              <div className="flex md:hidden items-center justify-between w-[90%] mt-6 gap-3">
                  <button 
                    onClick={prevSlide} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-[#959064] text-lg font-bold border border-gray-100 active:scale-90"
                  >
                    ←
                  </button>
                  
                  <div className="flex justify-center gap-2">
                    {allTestimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`transition-all duration-300 h-1.5 rounded-full ${currentIndex === i ? 'bg-[#959064] w-6' : 'bg-gray-200 w-1.5'}`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={nextSlide} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-[#BBB791] text-lg font-bold border border-gray-100 active:scale-90"
                  >
                    →
                  </button>
              </div>

              {/* Desktop Dots Indicator */}
              <div className="hidden md:flex justify-center gap-2 mt-8">
                {allTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-300 h-2 rounded-full ${currentIndex === i ? 'bg-[#959064] w-8' : 'bg-gray-200 w-2'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* --- FOOTER SECTION --- */}
        <footer className="bg-[#959064] w-full text-white py-[2.5rem] md:py-[4rem] px-6 lg:px-[5rem] xl:px-[7.5rem]">
          <div className="max-w-[105rem] 2xl:max-w-[130rem] mx-auto w-full">
            
            <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 xl:gap-12 mb-10 text-left items-start">
    
              <div className="w-full xl:w-[25%] space-y-4 shrink-0">
                <motion.img
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={circlelogo}
                  alt="Logo"
                  className="w-[9rem] h-auto cursor-pointer mt-[6px]"
                  onClick={() => handleNavigation('/')}
                />
                
                {/* Changed font-normal to font-light */}
                <p className="text-[0.7rem] leading-relaxed font-light text-white opacity-100 pr-4">
                  {contactInfo.quote.split(" ").map((word, index, array) => (
                    <React.Fragment key={`quote-${index}`}>
                      <motion.span
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                      {index < array.length - 1 && " "}
                    </React.Fragment>
                  ))}
                </p>
                
                <motion.button 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  onClick={() => handleNavigation('/contact')} 
                  className="bg-white text-[#000000] px-8 py-3 rounded-[0.375rem] font-medium text-[0.75rem] hover:bg-gray-100 transition"
                >
                  Contact now
                </motion.button>
              </div>

              <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4 xl:gap-8 items-start">
                
                {/* --- ADDRESSES COLUMN 1 --- */}
                <div className="w-full lg:col-span-3 flex flex-col">
                  <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    {"Located at".split(" ").map((word, index, array) => (
                      <React.Fragment key={`address-${index}`}>
                        <motion.span
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                        {index < array.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </h4>
                  
                  {/* Added font-light */}
                  <div className="flex flex-col gap-8 text-[0.75rem] font-light text-white opacity-100">
                    
                    {/* First Address */}
                    <div className="flex flex-col gap-1.5">
                      {["No16, 2nd Main Rd,", "Pallavan Nagar, Maduravoyal,", "Chennai, Tamil Nadu 600095,", "India"].map((line, index) => (
                        <motion.span 
                          key={`addr1-line-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + (index * 0.1) }}
                          className="leading-tight block"
                        >
                          {line}
                        </motion.span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* --- ADDRESSES COLUMN 2 --- */}
                <div className="w-full lg:col-span-3 flex flex-col">
                  <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    {"Works".split(" ").map((word, index, array) => (
                      <React.Fragment key={`works-${index}`}>
                        <motion.span
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                        {index < array.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </h4>
                  
                  {/* Added font-light */}
                  <div className="flex flex-col gap-8 text-[0.75rem] font-light text-white opacity-100">

                    {/* Second Address (Maduravoyal Unit) */}
                    <div className="flex flex-col gap-1.5">
                      {["No.21, 7th St, 3rd Cross St,", "Dhanalakshmi Nagar, Maduravoyal", "Chennai-600095"].map((line, index) => (
                        <motion.span 
                          key={`addr2-line-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + (index * 0.1) }}
                          className="leading-tight block"
                        >
                          {line}
                        </motion.span>
                      ))}
                    </div>

                    {/* Third Address (Korattur Unit) */}
                    <div className="flex flex-col gap-1.5">
                      {["No.5B, Kanniyamman Koil St,", "Kachinakuppam,", "Sidco Industrial Estate,", "Korattur, Chennai - 600098."].map((line, index) => (
                        <motion.span 
                          key={`addr3-line-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + (index * 0.1) }}
                          className="leading-tight block"
                        >
                          {line}
                        </motion.span>
                      ))}
                    </div>

                    {/* Fourth Address (Moved from Column 1 - Choolaimedu) */}
                    <div className="flex flex-col gap-1.5">
                      {["82, Periyas pathiai,", "Choolaimedu,", "Chennai - 600094"].map((line, index) => (
                        <motion.span 
                          key={`addr4-line-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 + (index * 0.1) }}
                          className="leading-tight block"
                        >
                          {line}
                        </motion.span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* --- CONTACT LINKS COLUMN --- */}
                <div className="w-full lg:col-span-3 flex flex-col">
                  <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    {String(contactInfo.title).split(" ").map((word, index, array) => (
                      <React.Fragment key={`contact-title-${index}`}>
                        <motion.span
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                          className="inline-block"
                        >
                          {word}
                        </motion.span>
                        {index < array.length - 1 && " "}
                      </React.Fragment>
                    ))}
                  </h4>
                  
                  {/* Added font-light */}
                  <div className="flex flex-col gap-3.5 text-[0.75rem] font-light">
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <img src={emailIcon} alt="Email" className="w-[1rem] h-[1rem] invert brightness-0 shrink-0" />
                      <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-green-100 transition whitespace-nowrap leading-tight">
                        {contactInfo.email}
                      </a>
                    </motion.div>
                    
                    {[contactInfo.phone1, contactInfo.phone2, contactInfo.phone3, contactInfo.phone4].map((phone, idx) => (
                      <motion.div 
                        key={`phone-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                        className="flex items-center gap-3"
                      >
                        <img src={phoneIcon} alt="Phone" className="w-[1rem] h-[1rem] invert brightness-0 shrink-0" />
                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-white hover:text-green-100 transition opacity-100 leading-tight">
                          {phone}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* --- MAP COLUMN --- */}
                <div className="w-full lg:col-span-3 flex flex-col">
                  <motion.iframe
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    title="The Workman Advertising Location"
                    src="https://maps.google.com/maps?q=Workman%20Advertising%20No16%2C%202nd%20Main%20Rd%2C%20Pallavan%20Nagar%2C%20Maduravoyal%2C%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-[12rem] xl:h-auto xl:aspect-square 2xl:aspect-auto 2xl:h-[15rem] rounded-lg border border-white/20 bg-green-50/10 object-cover -mt-2 lg:-mt-4"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-white/20 text-center">
              {/* Added font-light */}
              <p className="text-[0.65rem] tracking-wide font-light text-white opacity-100">
                {String(footer.copyright).split(" ").map((word, index, array) => (
                  <React.Fragment key={`copyright-${index}`}>
                    <motion.span
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 + (index * 0.03) }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    {index < array.length - 1 && " "}
                  </React.Fragment>
                ))}
              </p>
            </div>

          </div>
        </footer>

      </div>
    </main>
  );
};

export default LandingPageThree;