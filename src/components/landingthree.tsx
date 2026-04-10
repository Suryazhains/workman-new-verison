import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import circlelogo from '../assets/whitelogo.png';
import emailIcon from '../assets/email.png';
import phoneIcon from '../assets/phone.png';
import conectus from '../assets/contactus.svg'; 
import { CheckCircle } from 'lucide-react'; 

import { LANDING_CONTENT } from './content';

const LandingPageThree: React.FC = () => {
  const { contactSection, footer, header } = LANDING_CONTENT;
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Updated Contact Info
  const contactInfo = {
    title: "Contact Link",
    phone1: "+91 98403 27575",
    phone2: "+91 44 4238 5222",
    phone3: "+91 97908 09675",
    email: "workmansign@hotmail.com",
    quote: "Our range of services is designed to cover all your branding and signage needs, no matter the scale."
  };

  // SCROLL FIX: Reliably scrolls when the page loads with a #hash in the URL
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

  // BULLETPROOF NAVIGATION LOGIC 
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

  const getRoutePath = (name: string) => {
    switch (name) {
      case 'Home': return '/';
      case 'About us': return '/aboutbrief'; 
      case 'Our services': return '/services';
      case 'Infrastructure': return '/infrastructure'; 
      case 'Testimonials': return '/#testimonials';
      case 'Portfolio': return '/#portfolio';
      default: return null; 
    }
  };

  const getCategoryPath = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes('INDOOR')) return '/indoor';
    if (cat.includes('LED')) return '/led';
    if (cat.includes('MODULAR')) return '/modular';
    return '/outdoor';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitted(false);
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbz7QGTDDDOkSasd9GM8Y2KzgWqulEwcWUPhLe9xhiatuQR95GyuFobhTGRapE9l7fo-XA/exec",
        {
          method: "POST",
          body: formData,
          mode: "no-cors", 
        }
      );

      setSubmitted(true);
      formElement.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was a network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }
        .font-imperial {
            font-family: "ImperialStd-BoldItalic", serif !important;
        }
      `}} />

      <div className="w-full font-inter overflow-x-hidden min-h-screen flex flex-col m-0 p-0 bg-white">
        
        {/* --- CONTACT SECTION --- */}
        <section
          id="contact"
          className="bg-[#959064] pt-[4rem] md:pt-[5rem] pb-[5rem] md:pb-[6rem] px-6 lg:px-[7.5rem] font-inter flex-grow transition-all scroll-mt-[11.25rem]"
        >
          <div className="max-w-[105rem] 2xl:max-w-[130rem] mx-auto w-full">
            
            {/* Header */}
            <div className="mb-4 text-left">
              <h1 className="font-imperial italic text-[2rem] md:text-[2.5rem] font-bold text-white mb-1 leading-tight">
                Contact Us
              </h1>
              <p className="text-white text-[0.85rem] md:text-[0.95rem] max-w-lg leading-snug">
                Our range of services is designed to cover all your branding and signage needs.
              </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-[1.25rem] py-4 px-6 md:py-5 md:px-10 shadow-sm border border-gray-100 w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
              
              {/* Form */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-[1rem] md:text-[1.15rem] font-semibold text-gray-900 mb-2">
                  Send a Message
                </h2>

                <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
                  
                  <div className="space-y-0.5 text-left">
                    <label className="text-[0.7rem] text-gray-600">Full name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="your name"
                      required
                      className="w-full border border-gray-100 rounded-md h-[2.2rem] px-3 text-[0.8rem] focus:outline-none focus:ring-1 focus:ring-[#BBB791]"
                    />
                  </div>

                  <div className="space-y-0.5 text-left">
                    <label className="text-[0.7rem] text-gray-600">Contact number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="your number"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                      }}
                      className="w-full border border-gray-100 rounded-md h-[2.2rem] px-3 text-[0.8rem] focus:outline-none focus:ring-1 focus:ring-[#BBB791]"
                    />
                  </div>

                  <div className="space-y-0.5 text-left">
                    <label className="text-[0.7rem] text-gray-600">Message *</label>
                    <textarea
                      name="message"
                      placeholder="Tell us"
                      required
                      className="w-full border border-gray-100 rounded-md min-h-[3.5rem] p-2 text-[0.8rem] focus:outline-none focus:ring-1 focus:ring-[#BBB791] resize-none"
                    ></textarea>
                  </div>

                  {submitted && (
                    <div className="flex items-center gap-1.5 text-[#51A147] text-[0.7rem]">
                      <CheckCircle size={14} />
                      <span>Submitted successfully!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-1 py-[0.5rem] rounded-md text-[0.85rem] font-medium transition-all 
                      ${isSubmitting ? 'bg-gray-300' : 'bg-[#959064] text-white hover:brightness-95'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>

                </form>
              </div>

              {/* Explicitly Sized Image Container */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center mt-4 lg:mt-0 lg:pr-8">
                <img
                  src={conectus}
                  alt="Customer Support"
                  className="w-[340px] md:w-[360px] lg:w-[380px] h-auto object-contain" 
                />
              </div>

            </div>
          </div>
        </section>

        {/* --- FOOTER SECTION --- */}
        <footer className="bg-[#959064] w-full text-white py-[2.5rem] md:py-[4rem] px-6 lg:px-[5rem] xl:px-[7.5rem]">
          <div className="max-w-[105rem] 2xl:max-w-[130rem] mx-auto w-full">
            
            <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 xl:gap-12 mb-10 text-left items-start">

              {/* LEFT: Logo & Branding */}
              <div className="w-full xl:w-[25%] space-y-4 shrink-0">
              <img
  src={circlelogo}
  alt="Logo"
  className="w-[9rem] h-auto cursor-pointer mt-[6px]"
  onClick={() => handleNavigation('/')}
/>

<p className="text-[0.7rem] leading-relaxed font-normal text-white opacity-100 pr-4">
  {contactInfo.quote}
</p>
                <button 
                  onClick={() => handleNavigation('/#contact')}
                  className="bg-white text-[#959064] px-8 py-3 rounded-[0.375rem] font-bold text-[0.75rem] hover:bg-gray-100 transition"
                >
                  Contact now
                </button>
              </div>

              {/* RIGHT: Grid Layout - 12-COL PROPORTIONAL GRID */}
              <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4 xl:gap-8 items-start">

                {/* Address (Takes 3/12 width) */}
                <div className="w-full lg:col-span-3 flex flex-col">
                  <h4 className="font-imperial font-medium text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    Address
                  </h4>
                  <div className="flex flex-col gap-3.5 text-[0.75rem] text-white opacity-100">
                    <span className="leading-tight block">No16, 2nd Main Rd,</span>
                    <span className="leading-tight block">Pallavan Nagar, Maduravoyal,</span>
                    <span className="leading-tight block">Chennai, Tamil Nadu 600095,</span>
                    <span className="leading-tight block">India</span>
                  </div>
                </div>

                {/* Services (Takes 2/12 width - pulls the contact column closer) */}
                <div className="w-full lg:col-span-2 flex flex-col">
                  <h4 className="font-imperial font-medium text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    {footer.productTitle}
                  </h4>
                  <ul className="flex flex-col gap-3.5 text-[0.75rem]">
                    {footer.products.map((product, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleNavigation(getCategoryPath(product))}
                        className="text-white hover:text-green-100 cursor-pointer transition opacity-100 leading-tight block"
                      >
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contacts (Takes 4/12 width - gives enough room for the long email) */}
                <div className="w-full lg:col-span-4 flex flex-col">
                  <h4 className="font-imperial font-medium text-[1rem] xl:text-[1.1rem] mb-5 text-white">
                    {contactInfo.title}
                  </h4>
                  <div className="flex flex-col gap-3.5 text-[0.75rem]">
                    <div className="flex items-center gap-3">
                      <img src={emailIcon} alt="Email" className="w-[1rem] h-[1rem] invert brightness-0 shrink-0" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-white hover:text-green-100 transition whitespace-nowrap leading-tight"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <img src={phoneIcon} alt="Phone" className="w-[1rem] h-[1rem] invert brightness-0 shrink-0" />
                      <a href={`tel:${contactInfo.phone1.replace(/\s/g, '')}`} className="text-white hover:text-green-100 transition opacity-100 leading-tight">
                        {contactInfo.phone1}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={phoneIcon} alt="Phone" className="w-[1rem] h-[1rem] invert brightness-0 shrink-0" />
                      <a href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`} className="text-white hover:text-green-100 transition opacity-100 leading-tight">
                        {contactInfo.phone2}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={phoneIcon} alt="Phone" className="w-[1rem] h-[1rem] invert brightness-0 shrink-0" />
                      <a href={`tel:${contactInfo.phone3.replace(/\s/g, '')}`} className="text-white hover:text-green-100 transition opacity-100 leading-tight">
                        {contactInfo.phone3}
                      </a>
                    </div>
                  </div>
                </div>

                {/* MAP (Takes 3/12 width) - Shifted upward with negative margin */}
                <div className="w-full lg:col-span-3 flex flex-col">
               <iframe
  title="The Workman Advertising Location"
  src="https://www.google.com/maps?q=No16,2nd+Main+Rd,Pallavan+Nagar,Maduravoyal,Chennai,Tamil+Nadu+600095&output=embed"
  className="w-full h-[12rem] xl:h-auto xl:aspect-square 2xl:aspect-auto 2xl:h-[15rem] rounded-lg border border-white/20 bg-green-50/10 object-cover -mt-2 lg:-mt-4"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-white/20 text-center">
              <p className="text-[0.65rem] tracking-wide text-white opacity-100">
                {footer.copyright}
              </p>
            </div>

          </div>
        </footer>

      </div>
    </main>
  );
};

export default LandingPageThree;