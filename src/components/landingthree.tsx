import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, ChevronDown } from 'lucide-react';
import circlelogo from '../assets/whitelogo.png';
import emailIcon from '../assets/email.png';
import phoneIcon from '../assets/phone.png';
import { LANDING_CONTENT } from './content';

const LandingPageThree: React.FC = () => {
  const { contactSection, footer, header } = LANDING_CONTENT;
  
  // State for mobile accordion toggles
  const [linksOpen, setLinksOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <main>
    <div className="w-full font-inter overflow-x-hidden min-h-screen flex flex-col m-0 p-0 bg-white">
      {/* Contact Section */}
      <section
        id="contact"
        className="bg-[#E6F0FF] py-12 md:py-20 px-6 lg:px-[120px] font-inter flex-grow"
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
            <div className="bg-[#F5F9FF] rounded-[24px] p-6 sm:p-8 md:p-10 shadow-sm border border-white/50 flex flex-col">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#163B73] mb-6 md:mb-8">
                {contactSection.form.title}
              </h2>

              <form
                className="space-y-5 md:space-y-6 flex-grow"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-2 text-left">
                  <label className="text-[14px] font-medium text-[#5A7184]">
                    {contactSection.form.fields.name}
                  </label>
                  <input
                    type="text"
                    placeholder="your name"
                    className="w-full bg-white border border-gray-100 rounded-lg h-[54px] px-5 focus:outline-none focus:ring-1 focus:ring-[#163B73] text-[#163B73] placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[14px] font-medium text-[#5A7184]">
                    {contactSection.form.fields.phone}
                  </label>
                  <input
                    type="text"
                    placeholder="your number"
                    className="w-full bg-white border border-gray-100 rounded-lg h-[54px] px-5 focus:outline-none focus:ring-1 focus:ring-[#163B73] text-[#163B73] placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[14px] font-medium text-[#6B7280]">
                    {contactSection.form.fields.message}
                  </label>
                  <textarea
                    placeholder="Tell us"
                    className="w-full bg-white border border-gray-100 rounded-lg h-[140px] md:h-[160px] p-5 focus:outline-none focus:ring-1 focus:ring-[#163B73] resize-none text-[#163B73] placeholder:text-gray-300"
                  ></textarea>
                </div>

                <button className="w-full bg-[#163B73] text-white py-4 rounded-lg font-bold text-[18px] hover:bg-[#0f2a52] transition-colors mt-2">
                  {contactSection.form.buttonText}
                </button>
              </form>
            </div>

            <div className="bg-[#F5F9FF] rounded-[24px] p-6 sm:p-8 md:p-10 shadow-sm border border-white/50 h-full flex flex-col justify-between">
              <div className="space-y-8 md:space-y-10 text-left">
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#163B73]">
                  {contactSection.info.title}
                </h2>

                <div className="space-y-6 md:space-y-6">
                  <div>
                    <h4 className="text-[14px] md:text-[16px] text-[#5A7184] mb-1 md:mb-2 font-medium">
                      Phone
                    </h4>
                    <p className="text-[16px] md:text-[18px] font-semibold text-[#5A7184]">
                      {contactSection.info.phone}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-[14px] md:text-[16px] text-[#5A7184] mb-1 md:mb-2 font-medium">
                      Email
                    </h4>
                    <p className="text-[16px] md:text-[18px] font-semibold text-[#5A7184] break-all">
                      {contactSection.info.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-[#5A7184] text-[14px] md:text-[15px] font-inter outline-none border-none">
                  "{contactSection.info.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#163B73] w-full text-white py-12 md:py-20 px-6 lg:px-[120px] m-0">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 mb-16 md:mb-20 text-left">
            
            {/* Logo Section */}
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <img src={circlelogo} alt="The Work Man Logo" className="w-24 md:w-30 h-auto object-contain" />
              </div>
              <p className="text-[#FFFFFF] text-[14px] leading-relaxed max-w-[280px] font-normal">
                {footer.description}
              </p>
              <button className="bg-white text-[#163B73] px-8 md:px-10 py-3 rounded-[6px] font-bold text-[15px] md:text-[16px] hover:bg-gray-100 transition-colors">
                {header.contactBtn}
              </button>
            </div>

            {/* Links Section */}
            <div className="lg:pl-16 border-t border-white/10 lg:border-none pt-6 lg:pt-0">
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setLinksOpen(!linksOpen)}
              >
                <h4 className="font-medium text-[17px] md:text-[18px] mb-4 lg:mb-8">{footer.linksTitle}</h4>
                <ChevronDown size={20} className={`lg:hidden transition-transform duration-300 ${linksOpen ? 'rotate-180' : ''}`} />
              </div>
              <ul className={`space-y-0 lg:space-y-4 text-[14px] md:text-[15px] text-[#FFFFFF] font-normal transition-all duration-300 overflow-hidden ${linksOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'}`}>
                {header.navLinks.map((link, idx) => (
                  <li key={idx} className="py-3 lg:py-0 border-b border-white/5 lg:border-none last:border-none hover:text-white cursor-pointer transition-colors">
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div className="border-t border-white/10 lg:border-none pt-6 lg:pt-0">
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <h4 className="font-medium text-[17px] md:text-[18px] mb-4 lg:mb-8">{footer.productTitle}</h4>
                <ChevronDown size={20} className={`lg:hidden transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </div>
              <ul className={`space-y-0 lg:space-y-4 text-[14px] md:text-[15px] text-[#FFFFFF] font-normal transition-all duration-300 overflow-hidden ${servicesOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'}`}>
                {footer.products.map((product, idx) => (
                  <li key={idx} className="py-3 lg:py-0 border-b border-white/5 lg:border-none last:border-none hover:text-white cursor-pointer transition-colors">
                    {product}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts Section */}
            <div className="space-y-5 md:space-y-6 border-t border-white/10 lg:border-none pt-6 lg:pt-0">
              <h4 className="font-medium text-[17px] md:text-[18px] mb-6 md:mb-8">{footer.contactsTitle}</h4>
              <div className="space-y-4 md:space-y-6 text-[14px] md:text-[15px] font-normal">
                <div className="flex items-center gap-4">
                  <img src={emailIcon} alt="Email" className="w-4 h-4 opacity-80" />
                  <a href={`mailto:${footer.email}`} className="hover:text-white transition-colors break-all">
                    {footer.email}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <img src={phoneIcon} alt="Phone" className="w-4 h-4 opacity-80" />
                  <a href={`tel:${footer.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                    {footer.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 md:pt-10 border-t border-white/20 text-center">
            <p className="text-[12px] md:text-[14px] text-[#FFFFFF] tracking-wide font-['Space_Grotesk'] m-0 p-0">
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