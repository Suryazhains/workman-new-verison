import React, { useEffect, useState } from 'react';
import LandingPageThree from './landingthree';

import main1 from "../assets/main 1.jpg";
import main2 from "../assets/main 2.jpg";
// PORTFOLIO IMAGES
import portfolio3 from "../assets/portfolio 3.png";
import portfolio4 from "../assets/portfolio 4.png";
import portfolio5 from "../assets/portfolio 5.png";
import portfolio6 from "../assets/portfolio 6.png";
import portfolio7 from "../assets/portfolio 7.png";
import portfolio8 from "../assets/portfolio 8.png";

// BRAND IMAGES (18 Imports)
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

const PORTFOLIO_SCROLL = [portfolio3, portfolio4, portfolio5, portfolio6, portfolio7, portfolio8];
const BRANDS = [
    brand1, brand2, brand3, brand4, brand5, brand6,
    brand7, brand8, brand9, brand10, brand11, brand12,
    brand13, brand14, brand15, brand16, brand17, brand18
];

const About: React.FC = () => {
    // FIX: Removed unused 'openSpecialization' and 'setOpenSpecialization' state
    
    // FIX: Added proper type <number | null> to activeIndex state
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // FIX: Added type 'number' to index parameter
    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const specializationData = [
        {
            title: "Site Survey & Requirement Analysis",
            shortDesc: "We analyze your location, understand your requirements, and provide the most suitable branding solutions.",
            fullContent: [
                "Planning an efficient route schedule for the installation team to cover all required locations",
                "Evaluating space availability to recommend the most suitable signage type",
                "Identifying mounting methods, electrical needs, and installation challenges",
                "Taking precise on-site measurements for accurate artwork adaptation and production",
                "Documenting the entire site with detailed digital photographs for design and reference purposes"
            ]
        },
        {
            title: "Design Development & Concept Planning",
            shortDesc: "Our team creates innovative concepts tailored to your brand identity and marketing goals.",
            highlight: "“If it doesn’t sell, it isn’t creative.”",
            fullContent: [
                "Creative Graphic Designs that enhance brand visibility",
                "Technical Drawings & Layout Planning for accurate fabrication and installation",
                "Reference Images & Visual Samples to finalize the best possible output before production"
            ]
        },
        {
            title: "Mockups, Prototyping & Final Approval",
            shortDesc: "We deliver detailed mockups and prototypes before final production to ensure perfection.",
            fullContent: [
                "Ensure the finalized signage design meets manufacturability and quality standards",
                "Provide complete clarity to the client that the approved design and specifications will be delivered exactly as confirmed",
                "Finalize any required modifications and proceed confidently into production with proper approval in place"
            ]
        }
    ];

    return (
        <main className="bg-[#FE4E5D] font-inter text-white">
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
                .font-crimson { font-family: 'Crimson Pro', serif !important; }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 35s linear infinite;
                }
            `}} />

            {/* SECTION 1: ABOUT US BRIEF */}
            <section className="max-w-[1440px] mx-auto px-6 lg:px-20 pt-16 md:pt-24 pb-16">
                <h1 className="font-crimson text-[48px] md:text-[72px] font-bold mb-6">About Us</h1>
                <p className="text-white/90 text-lg md:text-xl max-w-[850px] leading-relaxed mb-16">
                    Workman Advertising is a Chennai-based branding and signage solutions company delivering high-quality indoor, outdoor, and digital display services.
                </p>

                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="w-full lg:w-1/2">
                        <img src={main1} alt="Infrastructure" className="rounded-2xl shadow-2xl w-full object-cover h-[500px]" />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8 text-white/80 leading-relaxed text-lg pt-4 text-justify">
                        <p>Workman Advertising, Chennai, India is a leading provider of complete branding and signage solutions, delivering high-quality visual communication for businesses across multiple industries.</p>
                        <p>Our core strength lies in delivering customized signage and advertising solutions for corporate, retail, showroom, and commercial environments. We specialize in indoor and outdoor signage, facade branding, LED video walls, POP displays, and modular signage.</p>
                        <p>With a reputation built on trust, craftsmanship, and customer satisfaction, we continue to be a preferred signage partner for brands looking for long-lasting and high-impact advertising solutions.</p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: PORTFOLIO MARQUEE */}
            <section className="py-12 overflow-hidden">
                <div className="animate-marquee flex">
                    {[...PORTFOLIO_SCROLL, ...PORTFOLIO_SCROLL].map((img, i) => (
                        <div key={i} className="w-[300px] h-[180px] md:w-[480px] md:h-[280px] px-3 flex-shrink-0">
                            <img src={img} alt="Work" className="w-full h-full object-cover rounded-xl shadow-lg" />
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: OUR SPECIALIZATION */}
       <section className="bg-[#FE4E5D] text-white py-20 px-6 lg:px-20">
    <div className="max-w-[1440px] mx-auto">
        {/* Changed items-start to items-center to bring text down level with image */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Side: Title and Image */}
            <div className="lg:w-1/2 w-full">
                <h2 className="font-crimson text-[42px] md:text-[56px] font-bold mb-8 leading-tight border-t border-white/30 pt-4 inline-block">
                    Our Specialization
                </h2>
                <div className="rounded-xl overflow-hidden shadow-2xl">
                    <img 
                        src={main2} 
                        alt="Specialization" 
                        className="w-full h-auto object-cover" 
                    />
                </div>
            </div>

            {/* Right Side: Accordion */}
            {/* Removed mt-10 and used lg:mt-0 to keep it centered with the image */}
            <div className="lg:w-1/2 w-full space-y-6">
                {specializationData.map((item, index) => (
                    <div key={index} className="border-b border-white/20 pb-6">
                        <div 
                            className="flex items-start gap-6 cursor-pointer" 
                            onClick={() => toggleAccordion(index)}
                        >
                            {/* The + / - Icon */}
                            <span className="text-white text-3xl font-light w-8 shrink-0">
                                {activeIndex === index ? '−' : '+'}
                            </span>
                            
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold font-crimson mb-2">
                                    {item.title}
                                </h3>
                                
                                {/* Animated Container */}
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                        activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-lg opacity-90 mb-4">{item.shortDesc}</p>
                                    {item.highlight && (
                                        <p className="font-bold mb-2 italic text-white/80">{item.highlight}</p>
                                    )}
                                    <ul className="space-y-2 pb-4">
                                        {item.fullContent.map((point, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</section>

            {/* SECTION 4: CLIENT BRANDS */}
         <section className="bg-white py-12 md:py-20">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
        {/* Changed gap for mobile and used grid logic for 2-per-row */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-8 md:gap-x-16 md:gap-y-12">
            {BRANDS.map((logo, i) => (
                <div 
                    key={i} 
                    className="flex items-center justify-center w-[calc(50%-1rem)] md:w-auto"
                >
                    <img 
                        src={logo} 
                        alt={`Brand ${i + 1}`} 
                        className="w-[100px] sm:w-[120px] md:w-[160px] h-[50px] md:h-[75px] object-contain" 
                    />
                </div>
            ))}
        </div>
    </div>
</section>

            <LandingPageThree />
        </main>
    );
};

export default About;