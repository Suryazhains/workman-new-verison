import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import circlelogo from '../assets/whitelogo.png';
import emailIcon from '../assets/email.png';
import phoneIcon from '../assets/phone.png';
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
    phone2: "044 4238 5222",
    phone3: "97908 09675",
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

    // Try immediately, and also after a short delay to account for page rendering
    scrollToHash();
    const timer = setTimeout(scrollToHash, 500);
    return () => clearTimeout(timer);
  }, [location]);

  // BULLETPROOF NAVIGATION LOGIC (Synced with Header.tsx for consistency)
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
        // Already on the correct page, just smooth scroll to the section
        scrollToTarget(hashPart);
      } else {
        // Different page! Navigate and then wait a moment for render before scrolling
        navigate(path);
        setTimeout(() => {
          scrollToTarget(hashPart);
        }, 400);
      }
    } else {
      // Standard page navigation (no hash involved)
      if (location.pathname !== targetRoute) {
        navigate(targetRoute);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // EXACT PATHS FOR YOUR APP
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
          className="bg-[#BBB791] py-[90px] px-6 lg:px-[120px] font-inter flex-grow transition-all scroll-mt-[180px]"
        >
          <div className="max-w-full mx-auto">
            
            <div className="mb-12 text-left">
              <h1 className="font-imperial text-[32px] md:text-[48px] font-bold text-[#FFFFFF] mb-4 leading-tight">
                {contactSection.heading}
              </h1>
              <p className="text-[#FFFFFF] text-[16px] md:text-[18px] max-w-[1600px] leading-relaxed">
                {contactSection.description}
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm border border-green-100 w-full">
              <h2 className="font-imperial text-[24px] md:text-[28px] font-bold text-[#BBB791] mb-8">
                {contactSection.form.title}
              </h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6" onSubmit={handleSubmit}>
                
                <div className="space-y-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[14px] font-medium text-[#5A7184]">
                      {contactSection.form.fields.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full bg-[#F9FAFB] border border-gray-100 rounded-lg h-[54px] px-5 focus:outline-none focus:ring-1 focus:ring-[#51A147] text-[#374151] placeholder:text-gray-300"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[14px] font-medium text-[#5A7184]">
                      {contactSection.form.fields.phone}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Your Number"
                      required
                      className="w-full bg-[#F9FAFB] border border-gray-100 rounded-lg h-[54px] px-5 focus:outline-none focus:ring-1 focus:ring-[#51A147] text-[#374151] placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left flex flex-col h-full">
                  <label className="text-[14px] font-medium text-[#6B7280]">
                    {contactSection.form.fields.message}
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project"
                    required
                    className="w-full bg-[#F9FAFB] border border-gray-100 rounded-lg flex-grow min-h-[140px] p-5 focus:outline-none focus:ring-1 focus:ring-[#51A147] resize-none text-[#374151] placeholder:text-gray-300"
                  ></textarea>
                </div>

                <div className="md:col-span-2 mt-4">
                  {submitted && (
                    <div className="flex items-center gap-2 text-[#51A147] font-semibold text-sm mb-4 animate-bounce">
                      <CheckCircle size={18} />
                      <span>Message submitted successfully!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white py-3.5 rounded-lg font-bold text-[16px] md:text-[18px] transition-all 
                      ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#BBB791] hover:brightness-95 hover:shadow-lg'}`}
                  >
                    {isSubmitting ? 'Sending...' : contactSection.form.buttonText}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* --- FOOTER SECTION --- */}
        <footer className="bg-[#BBB791] w-full text-white py-12 md:py-20 px-6 lg:px-[80px] xl:px-[120px]">
          <div className="max-w-[1440px] mx-auto">
            
            <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16 text-left items-start">

              {/* LEFT: Logo & Branding */}
              <div className="max-w-[300px] xl:max-w-[390px] space-y-6 shrink-0">
                <img
                  src={circlelogo}
                  alt="Logo"
                  className="w-45 h-auto cursor-pointer"
                  onClick={() => handleNavigation('/')}
                />
                <p className="text-[14px] leading-relaxed font-normal text-white opacity-100">
                  {contactInfo.quote}
                </p>
                <button 
                  onClick={() => handleNavigation('/#contact')}
                  className="bg-white text-[#000000] px-8 py-3 rounded-[6px] font-bold text-[15px] hover:bg-gray-100 transition"
                >
                  Contact now
                </button>
              </div>

              {/* RIGHT: Links | Services | Contacts | Map */}
              <div className="flex flex-row flex-wrap lg:flex-nowrap justify-between w-full gap-x-8 gap-y-12">

                {/* Links */}
                <div className="min-w-[120px]">
                  <h4 className="font-imperial font-medium text-[20px] xl:text-[22px] mb-6 text-white">
                    {footer.linksTitle}
                  </h4>
                  <ul className="space-y-4 text-[15px]">
                    {header.navLinks.map((link, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleNavigation(getRoutePath(link.name))}
                        className="text-white hover:text-green-100 cursor-pointer transition opacity-100"
                      >
                        {link.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="min-w-[120px]">
                  <h4 className="font-imperial font-medium text-[20px] xl:text-[22px] mb-6 text-white">
                    {footer.productTitle}
                  </h4>
                  <ul className="space-y-4 text-[15px]">
                    {footer.products.map((product, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleNavigation(getCategoryPath(product))}
                        className="text-white hover:text-green-100 cursor-pointer transition opacity-100"
                      >
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contacts */}
                <div className="space-y-6 min-w-[200px] xl:min-w-[240px]">
                  <h4 className="font-imperial font-medium text-[20px] xl:text-[22px] mb-6 text-white">
                    {contactInfo.title}
                  </h4>
                  <div className="space-y-5 text-[15px]">
                    <div className="flex items-start gap-4">
                      <img src={emailIcon} alt="Email" className="w-5 h-5 invert brightness-0 mt-1" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-white hover:text-green-100 transition break-all opacity-100"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                    
                    {/* Phone 1 */}
                    <div className="flex items-center gap-4">
                      <img src={phoneIcon} alt="Phone" className="w-5 h-5 invert brightness-0" />
                      <a href={`tel:${contactInfo.phone1.replace(/\s/g, '')}`} className="text-white hover:text-green-100 transition opacity-100">
                        {contactInfo.phone1}
                      </a>
                    </div>

                    {/* Phone 2 */}
                    <div className="flex items-center gap-4">
                      <img src={phoneIcon} alt="Phone" className="w-5 h-5 invert brightness-0" />
                      <a href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`} className="text-white hover:text-green-100 transition opacity-100">
                        {contactInfo.phone2}
                      </a>
                    </div>

                    {/* Phone 3 */}
                    <div className="flex items-center gap-4">
                      <img src={phoneIcon} alt="Phone" className="w-5 h-5 invert brightness-0" />
                      <a href={`tel:${contactInfo.phone3.replace(/\s/g, '')}`} className="text-white hover:text-green-100 transition opacity-100">
                        {contactInfo.phone3}
                      </a>
                    </div>
                  </div>
                </div>

                {/* MAP - VALID HTTPS GOOGLE MAPS EMBED */}
                <div className="w-full lg:w-[250px] xl:w-[300px] shrink-0">
                  <iframe
                    title="The Workman Advertising Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0315560647895!2d80.17415177454848!3d13.097205112117565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264000305f883%3A0xcda6fba652dc97da!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710856030123!5m2!1sen!2sin"
                    className="w-full h-[220px] rounded-lg border border-white/20 bg-green-50/10"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>
            </div>

            <div className="pt-8 border-t border-white/20 text-center">
              <p className="text-[13px] tracking-wide text-white opacity-100">
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