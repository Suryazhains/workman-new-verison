import React, { useEffect } from 'react';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

const Infrastructure: React.FC = () => {
  const { infrastructurePage } = LANDING_CONTENT;

  /**
   * ✅ FORCE SCROLL TO TOP ON MOUNT
   * This ensures that if a user navigates from a bottom section of another page,
   * the Infrastructure page starts at the very top.
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
    <main className="bg-[#FFFFF]">
      {/* id="infrastructure" 
          scroll-mt-28: Ensures that when called by ID, it starts below the sticky header.
      */}
      <section 
        id="infrastructure" 
        className="w-full py-16 md:py-24 scroll-mt-28"
      >
        {/* Page Heading */}
        <div className="max-w-[1280px] mx-auto mb-16 px-6">
          <h2 className="text-[32px] md:text-[48px] font-bold text-black mb-4">
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
              /* ✅ Added id and scroll-mt to each item.
                 This allows the Header's handleNavigation to jump specifically to 
                 each machine without it being cut off by the navbar.
              */
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
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-8 py-12 md:px-16 lg:px-20">
                <div className="max-w-[500px]">
                  <span className="text-gray-400 text-sm font-medium mb-2 block">
                    {item.model}
                  </span>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    {item.title}
                  </h3>

                  <div className="space-y-4">
                    <p className="text-gray-500 leading-relaxed text-base md:text-lg">
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