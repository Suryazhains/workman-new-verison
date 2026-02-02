import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import circlelogo from '../assets/whitelogo.png';
import emailIcon from '../assets/email.png';
import phoneIcon from '../assets/phone.png';
// Removed ChevronDown to fix TS6133, kept CheckCircle as it is used
import { CheckCircle } from 'lucide-react'; 

import { LANDING_CONTENT } from './content';

const LandingPageThree: React.FC = () => {
  const { contactSection, footer, header } = LANDING_CONTENT;
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ Commented out to fix build errors; uncomment these when you build the mobile accordion
  // const [linksOpen, setLinksOpen] = useState(false);
  // const [servicesOpen, setServicesOpen] = useState(false);

  // ✅ Loading and Success states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /**
   * ✅ AUTO-SCROLL ON MOUNT / ROUTE CHANGE
   */
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');

    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerOffset = 160; 
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    };

    const timer = setTimeout(scroll, 300);
    return () => clearTimeout(timer);
  }, [location]);

  /**
   * ✅ UNIFIED NAVIGATION HANDLER
   */
  const handleNavigation = (path: string | null) => {
    if (!path) return;

    const [route, hash] = path.split('#');
    const HEADER_OFFSET = 160;

    const scrollToHash = (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    };

    if (location.pathname === route && hash) {
      scrollToHash(hash);
    } else if (hash) {
      navigate(route);
      setTimeout(() => {
        scrollToHash(hash);
      }, 300);
    } else {
      navigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getRoutePath = (name: string) => {
    switch (name) {
      case 'Home': return '/'; 
      case 'About us': return '/#about'; 
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
    if (cat.includes('POP')) return '/pop'; 
    return '/outdoor';
  };

  /**
   * ✅ UPDATED SUBMIT HANDLER
   */
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
      
      // Clear message after 5 seconds
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
      <div className="w-full font-inter overflow-x-hidden min-h-screen flex flex-col m-0 p-0 bg-white">
        
        {/* --- CONTACT SECTION --- */}
        <section
          id="contact"
          className="bg-[#E6F0FF] py-12 md:py-20 px-6 lg:px-[120px]
                     font-inter flex-grow transition-all
                     scroll-mt-[140px] md:scroll-mt-[160px] lg:scroll-mt-[180px]"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-10 md:mb-14 text-left">
              <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#163B73] mb-4 leading-tight">
                {contactSection.heading}
              </h1>
              <p className="text-[#6B7280] text-[15px] md:text-[16px] max-w-full md:max-w-[420px] leading-relaxed">
                {contactSection.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Form Card */}
              <div className="bg-[#F5F9FF] rounded-[24px] p-6 sm:p-8 md:p-10 shadow-sm border border-white/50 flex flex-col">
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#163B73] mb-6 md:mb-8">
                  {contactSection.form.title}
                </h2>

                <form className="space-y-5 md:space-y-6 flex-grow" onSubmit={handleSubmit}>
                  <div className="space-y-2 text-left">
                    <label className="text-[14px] font-medium text-[#5A7184]">
                      {contactSection.form.fields.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="your name"
                      required
                      className="w-full bg-white border border-gray-100 rounded-lg h-[54px] px-5 focus:outline-none focus:ring-1 focus:ring-[#163B73] text-[#163B73] placeholder:text-gray-300"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[14px] font-medium text-[#5A7184]">
                      {contactSection.form.fields.phone}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="your number"
                      required
                      className="w-full bg-white border border-gray-100 rounded-lg h-[54px] px-5 focus:outline-none focus:ring-1 focus:ring-[#163B73] text-[#163B73] placeholder:text-gray-300"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[14px] font-medium text-[#6B7280]">
                      {contactSection.form.fields.message}
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us"
                      required
                      className="w-full bg-white border border-gray-100 rounded-lg h-[140px] md:h-[160px] p-5 focus:outline-none focus:ring-1 focus:ring-[#163B73] resize-none text-[#163B73] placeholder:text-gray-300"
                    ></textarea>
                  </div>

                  {/* ✅ SUCCESS MESSAGE */}
                  {submitted && (
                    <div className="flex items-center gap-2 text-green-600 font-semibold text-sm animate-bounce">
                      <CheckCircle size={18} />
                      <span>Message submitted successfully!</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white py-4 rounded-lg font-bold text-[18px] transition-colors mt-2 
                      ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#163B73] hover:bg-[#0f2a52]'}`}
                  >
                    {isSubmitting ? 'Sending...' : contactSection.form.buttonText}
                  </button>
                </form>
              </div>

              {/* Info Card */}
              <div className="bg-[#F5F9FF] rounded-[24px] p-6 sm:p-8 md:p-10 shadow-sm border border-white/50 h-full flex flex-col justify-between">
                <div className="space-y-8 md:space-y-10 text-left">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#163B73]">
                    {contactSection.info.title}
                  </h2>

                  <div className="space-y-6 md:space-y-6">
                    <div>
                      <h4 className="text-[14px] md:text-[16px] text-[#5A7184] mb-1 md:mb-2 font-medium">Phone</h4>
                      <p className="text-[16px] md:text-[18px] font-semibold text-[#5A7184]">
                        {contactSection.info.phone}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-[14px] md:text-[16px] text-[#5A7184] mb-1 md:mb-2 font-medium">Email</h4>
                      <p className="text-[16px] md:text-[18px] font-semibold text-[#5A7184] break-all">
                        {contactSection.info.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-[#5A7184] text-[14px] md:text-[15px] italic">
                    "{contactSection.info.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER SECTION --- */}
        <footer className="bg-[#163B73] w-full text-white py-12 md:py-20 px-6 lg:px-[120px]">
          <div className="max-w-[1440px] mx-auto">
            {/* Main Wrapper: Logo Left | Grouped Info Right */}
            <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16 text-left items-start">
              
              {/* LEFT CORNER: Logo and Branding */}
              <div className="max-w-[320px] space-y-6">
                <img
                  src={circlelogo}
                  alt="Logo"
                  className="w-24 h-auto cursor-pointer"
                  onClick={() => handleNavigation('/')}
                />
                <p className="text-[14px] leading-relaxed font-normal opacity-90">
                  {footer.description}
                </p>
                <button 
                  onClick={() => handleNavigation('/#contact')}
                  className="bg-white text-[#163B73] px-8 py-3 rounded-[6px] font-bold text-[15px] hover:bg-gray-100 transition"
                >
                  Contact now
                </button>
              </div>

              {/* RIGHT CORNER: Grouped Links and Contacts */}
              <div className="flex flex-col sm:flex-row gap-10 md:gap-14 lg:gap-16">
                
                {/* Links Group */}
                <div className="pt-0">
                  {/* Updated: Font-medium, 20px, and Pure White per Figma image_dbf138.jpg */}
                  <h4 className="font-medium text-[20px] mb-6 tracking-tight text-white">{footer.linksTitle}</h4>
                  <ul className="space-y-4 text-[15px]">
                    {header.navLinks.map((link, idx) => (
                      <li 
                        key={idx} 
                        onClick={() => handleNavigation(getRoutePath(link.name))}
                        className="hover:text-gray-300 cursor-pointer transition whitespace-nowrap opacity-90"
                      >
                        {link.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services Group */}
                <div className="pt-0">
                  {/* Updated: Font-medium, 20px, and Pure White per Figma image_dbf138.jpg */}
                  <h4 className="font-medium text-[20px] mb-6 tracking-tight text-white">{footer.productTitle}</h4>
                  <ul className="space-y-4 text-[15px]">
                    {footer.products.map((product, idx) => (
                      <li 
                        key={idx} 
                        onClick={() => handleNavigation(getCategoryPath(product))}
                        className="hover:text-gray-300 cursor-pointer transition whitespace-nowrap opacity-90"
                      >
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contacts Group */}
                <div className="space-y-6">
                  {/* Updated: Font-medium, 20px, and Pure White per Figma image_dbf138.jpg */}
                  <h4 className="font-medium text-[20px] mb-6 tracking-tight text-white">{footer.contactsTitle}</h4>
                  <div className="space-y-5 text-[15px]">
                    <div className="flex items-center gap-4">
                      <img src={emailIcon} alt="Email" className="w-5 h-5 opacity-80" />
                      <a href={`mailto:${footer.email}`} className="hover:text-gray-300 transition break-all opacity-90">
                        {footer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <img src={phoneIcon} alt="Phone" className="w-5 h-5 opacity-80" />
                      <a href={`tel:${footer.phone.replace(/\s/g, '')}`} className="hover:text-gray-300 transition whitespace-nowrap opacity-90">
                        {footer.phone}
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-8 border-t border-white/20 text-center">
              <p className="text-[13px] tracking-wide opacity-80">
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