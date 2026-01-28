import React from 'react';
import LandingPageThree from './landingthree';


// ✅ IMPORT TEAM IMAGES
import team1 from '../assets/team.png'; 
import team2 from '../assets/team 2.png';

const Team: React.FC = () => {


  return (
    <main className="bg-[#F6F7F9]">
      {/* 1. Infrastructure Equipment Section */}
      <section id="infrastructure" className="w-full py-16 md:py-24">
        

        {/* ✅ 2. OUR TEAM SECTION WITH ID */}
        <div id="team" className="max-w-[1280px] mx-auto px-6 mb-20 scroll-mt-24">
          <div className="mb-10">
            <h2 className="text-[40px] md:text-[56px] font-bold text-black mb-4">
              Our Team
            </h2>
            <p className="text-gray-500 max-w-[600px] text-lg leading-relaxed">
              Our dedicated team of professionals brings years of expertise to every project, 
              ensuring precision and quality in every detail of our manufacturing process.
            </p>
          </div>

          {/* Side-by-Side Team Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden h-[400px] md:h-[550px] shadow-sm">
              <img 
                src={team1} 
                alt="Our team working" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden h-[400px] md:h-[550px] shadow-sm">
              <img 
                src={team2} 
                alt="Workshop facility" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT & FOOTER COMPONENT */}
      <LandingPageThree />
    </main>
  );
};

export default Team;