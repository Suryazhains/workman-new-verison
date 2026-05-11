import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import circlelogo from '../assets/whitelogo.png';
import emailIcon from '../assets/email.png';
import phoneIcon from '../assets/phone.png';
import { LANDING_CONTENT } from './content';

// BRAND IMAGES
import brand1 from "../assets/brand 1.png";
import brand2 from "../assets/brand 2.png";
import brand3 from "../assets/brand 3.png";
import brand4 from "../assets/brand 4.png";
import brand5 from "../assets/brand 5.png";
import brand6 from "../assets/brand 6.png";
import brand7 from "../assets/brand 7.png";
import brand8 from "../assets/brand 8.png";
import brand9 from "../assets/brand 9.png";
import brand10 from "../assets/brand 10.png";
import brand11 from "../assets/brand 11.png";
import brand12 from "../assets/brand 12.png";
import brand13 from "../assets/brand 13.png";
import brand14 from "../assets/brand 14.png";
import brand15 from "../assets/brand 15.png";
import brand16 from "../assets/brand 16.png";
import brand17 from "../assets/brand 17.png";
import brand18 from "../assets/brand 18.png";
import brand19 from "../assets/brand 20.png";
import brand20 from "../assets/brand 21.jpg";
import brand21 from "../assets/brand 22.svg";
import brand22 from "../assets/brand 23.jpg";
import brand23 from "../assets/brand 24.png";
import brand24 from "../assets/brand25.png";

// SEPARATED BRAND DATA
// You can now adjust the sizing classes independently for every single brand below.
const BRANDS_DATA = [
  { id: 1, logo: brand1, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[124px] lg:h-[100px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 2, logo: brand2, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 3, logo: brand3, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 4, logo: brand4, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 5, logo: brand5, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[134px] lg:h-[100px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 6, logo: brand6, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 7, logo: brand7, sizing: "w-[65px] h-[33px] md:w-[96px] md:h-[52px] lg:w-[159px] lg:h-[120px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 8, logo: brand8, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 9, logo: brand9, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 10, logo: brand10, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 11, logo: brand11, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[124px] lg:h-[100px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 12, logo: brand12, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 13, logo: brand13, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 14, logo: brand14, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 15, logo: brand15, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 16, logo: brand16, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 17, logo: brand17, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 18, logo: brand18, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 19, logo: brand19, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[124px] lg:h-[100px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 20, logo: brand20, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 21, logo: brand21, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 22, logo: brand22, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 23, logo: brand23, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
  { id: 24, logo: brand24, sizing: "w-[65px] h-[33px] md:w-[86px] md:h-[42px] lg:w-[94px] lg:h-[60px] [@media(min-width:2400px)]:w-[132px] [@media(min-width:2400px)]:h-[65px]" },
];

const LandingPageThree: React.FC = () => {
  const { footer } = LANDING_CONTENT;
  const navigate = useNavigate();
  const location = useLocation();

  const contactInfo = {
    title: "Contact Link",
    phone1: "+91 98403 27575",
    phone2: "+91 44 4238 5222",
    phone3: "+91 97908 09675",
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

  const getCategoryPath = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes('INDOOR')) return '/indoor';
    if (cat.includes('LED')) return '/led';
    if (cat.includes('MODULAR')) return '/modular';
    return '/outdoor';
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
      `}} />

      <div className="w-full font-inter overflow-x-hidden min-h-screen flex flex-col m-0 p-0 bg-white">
        <section className="bg-white py-12 md:py-13 [@media(min-width:2400px)]:py-20">
          <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 lg:px-12">
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-black text-center font-dm-sans-extralight tracking-normal text-3xl md:text-4xl mb-10 "
            >
              Our Clients
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
                
                <p className="text-[0.7rem] leading-relaxed font-normal text-white opacity-100 pr-4">
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
                
                <div className="w-full lg:col-span-3 flex flex-col">
            
                  <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    {"Address".split(" ").map((word, index, array) => (
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
                  <div className="flex flex-col gap-3.5 text-[0.75rem] text-white opacity-100">
                    {["No16, 2nd Main Rd,", "Pallavan Nagar, Maduravoyal,", "Chennai, Tamil Nadu 600095,", "India"].map((line, index) => (
                      <motion.span 
                        key={`addr-line-${index}`}
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

                <div className="w-full lg:col-span-2 flex flex-col">
           
                  <h4 className="font-dm-sans-extralight tracking-normal text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    {String(footer.productTitle).split(" ").map((word, index, array) => (
                      <React.Fragment key={`prod-title-${index}`}>
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
                  <ul className="flex flex-col gap-3.5 text-[0.75rem]">
                    {footer.products.map((product, idx) => (
                      <motion.li
                        key={`prod-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + (idx * 0.1) }}
                        onClick={() => handleNavigation(getCategoryPath(product))}
                        className="text-white hover:text-green-100 cursor-pointer transition opacity-100 leading-tight block"
                      >
                        {product}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="w-full lg:col-span-4 flex flex-col">
                 
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
                  <div className="flex flex-col gap-3.5 text-[0.75rem]">
                    
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
                    
                    {[contactInfo.phone1, contactInfo.phone2, contactInfo.phone3].map((phone, idx) => (
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
         
              <p className="text-[0.65rem] tracking-wide text-white opacity-100">
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