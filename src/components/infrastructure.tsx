import React from 'react';
import LandingPageThree from './landingthree';
import { LANDING_CONTENT } from './content';

const Infrastructure: React.FC = () => {
  const { infrastructurePage } = LANDING_CONTENT;

  return (
    <main className="bg-[#F6F7F9]">
      <section id="infrastructure" className="w-full py-16 md:py-24">
        {/* Page Heading */}
        <div className="max-w-[1280px] mx-auto mb-16 px-6">
          <h2 className="text-[32px] md:text-[48px] font-bold text-black mb-4">
            {infrastructurePage.heading}
          </h2>
          <p className="text-gray-500 max-w-[650px] text-lg">
            {infrastructurePage.description}
          </p>
        </div>

        {/* Machines Grid - No gap between rows to keep it "Connected" */}
        <div className="max-w-[1280px] mx-auto flex flex-col">
          {infrastructurePage.equipments.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col lg:flex-row items-stretch w-full ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container: object-cover ensures it fills the 50% width perfectly */}
              <div className="w-full lg:w-1/2 h-[350px] md:h-[500px] lg:h-auto overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover display:block"
                />
              </div>

              {/* Text Container: White background as per design */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center #F6F7F9 px-8 py-12 md:px-16 lg:px-20">
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
                    {/* If you have more description text in your content file, 
                        you can map it here as multiple paragraphs */}
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