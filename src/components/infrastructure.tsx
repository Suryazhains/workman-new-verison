import React, { useEffect } from 'react';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

const Infrastructure: React.FC = () => {
  const { infrastructurePage } = LANDING_CONTENT;

  /**
   * ✅ FORCE SCROLL TO TOP ON MOUNT
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getServiceSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  return (
    <main className="bg-white">
      {/* GLOBAL FONT IMPORT & CRIMSON CLASS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-crimson {
            font-family: 'Crimson Pro', serif !important;
        }
      `}} />

      {/* id="infrastructure" 
          scroll-mt-28: Ensures that when called by ID, it starts below the sticky header.
      */}
      <section 
        id="infrastructure" 
        className="w-full py-16 md:py-24 scroll-mt-28 font-inter"
      >
        {/* Page Heading - Crimson Pro Applied */}
        <div className="max-w-[1280px] mx-auto mb-16 px-6">
          <h2 className="font-crimson text-[32px] md:text-[48px] font-bold text-black mb-4">
            {infrastructurePage.heading}
          </h2>
          <p className="text-gray-500 max-w-[650px] text-lg">
            {infrastructurePage.description}
          </p>
        </div>

        {/* Machines Grid */}
        <div className="max-w-[1280px] mx-auto flex flex-col">
          {infrastructurePage.equipments.map((item, index) => (
            <div
              key={item.id}
              id={getServiceSlug(item.title)}
              className={`flex flex-col lg:flex-row items-stretch w-full scroll-mt-28 ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-1/2 h-[350px] md:h-[500px] lg:h-auto overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover block hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-8 py-12 md:px-16 lg:px-20">
                <div className="max-w-[500px]">
                  <span className="text-gray-400 text-sm font-medium mb-2 block font-inter">
                    {item.model}
                  </span>

                  {/* Machine Title - Crimson Pro Applied */}
                  <h3 className="font-crimson text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {item.title}
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-500 leading-relaxed text-base md:text-lg font-inter">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LandingPageThree />
    </main>
  );
};

export default Infrastructure;