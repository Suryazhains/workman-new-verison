import React from 'react';
import LandingPageThree from './landingthree';

// ✅ IMPORT TEAM IMAGES
import team1 from '../assets/team.png'; 
import team2 from '../assets/team 2.png';
import team3 from '../assets/team 3.jpg'; 
import team4 from '../assets/team 4.jpg';
import team5 from '../assets/team 5.jpg'; 
import team6 from '../assets/team 6.jpg';
import team7 from '../assets/team 7.jpg'; 
import team8 from '../assets/team 8.jpg';
import team9 from '../assets/team 9.jpg'; 

const Team: React.FC = () => {
  // Consolidating all images into one array for a perfect uniform grid
  const allTeamMembers = [team1, team2, team3, team4, team5, team6, team7, team8, team9];

  return (
    <main className="bg-[#FFFFF] w-full">
      {/* 1. Infrastructure Equipment Section */}
      <section id="infrastructure" className="w-full pt-[90px] pb-[90px]">
        
        {/* ✅ 2. OUR TEAM SECTION WITH 90px PADDING */}
        <div id="team" className="w-full max-w-[1920px] mx-auto px-6 md:px-10 xl:px-[90px] scroll-mt-24">
          
          {/* Header & Description */}
          <div className="mb-16">
            <h2 className="text-[42px] md:text-[56px] font-bold text-black mb-6 tracking-tight">
              Our Team
            </h2>
            {/* Full width description spanning two lines */}
            <p className="text-gray-500 text-[18px] md:text-[20px] w-full leading-relaxed">
              Our dedicated team of professionals brings years of expertise and industry knowledge to every project we deliver. From design planning to fabrication and installation, we ensure precision, quality, and attention to detail at every stage. Driven by commitment and teamwork, we consistently deliver reliable signage solutions that meet the highest standards.
            </p>
          </div>

          {/* Grid: 3 Images Per Row, Expanded Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {allTeamMembers.map((member, index) => (
              <div 
                key={index} 
                className="rounded-2xl overflow-hidden h-[350px] md:h-[450px] lg:h-[550px] shadow-sm bg-white group"
              >
                <img 
                  src={member} 
                  alt={`Team member ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTACT & FOOTER COMPONENT */}
      <LandingPageThree />
    </main>
  );
};

export default Team;