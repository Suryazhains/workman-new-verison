import AboutVideo from '../assets/0225.mp4'; 
import React, { useEffect, useState } from 'react';
import LandingPageThree from './landingthree';

// import main1 from "../assets/main 1.jpg";
import main2 from "../assets/ourspecialization.png";
// PORTFOLIO IMAGES
import portfolio3 from "../assets/outdooScoller.png";
import portfolio4 from "../assets/outdoor 13.png";
import portfolio5 from "../assets/outdoor 17.png";
import portfolio6 from "../assets/outdoor 20.png";
import portfolio7 from "../assets/outdoor 27.png";
import portfolio8 from "../assets/outdoor 44.png";

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
    // Default state is 0 so the first section is open by default
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        <main className="bg-[#959064] font-inter text-white w-full overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
                @import url('https://db.onlinewebfonts.com/c/59d406a1ae963118d955b267eb04f9f3?family=ImperialStd-BoldItalic');

                .font-crimson { font-family: 'Crimson Pro', serif !important; }
                .font-imperial { font-family: "ImperialStd-BoldItalic", serif !important; }

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
            <section className="w-full max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24 pt-16 md:pt-24 [@media(min-width:2400px)]:pt-32 pb-16">
                <h1 className="font-imperial text-[38px] md:text-[52px] [@media(min-width:2400px)]:text-[120px] font-bold mb-6 [@media(min-width:2400px)]:mb-10">About Us</h1>
                
                <p className="text-white/90 text-lg md:text-xl [@media(min-width:2400px)]:text-[32px] w-full max-w-full leading-relaxed mb-12 md:mb-16 [@media(min-width:2400px)]:mb-24">
                    Workman Advertising is a Chennai-based branding and signage solutions company delivering high-quality indoor, outdoor, and digital display services.
                </p>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 [@media(min-width:2400px)]:gap-24 items-stretch">
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <video 
                            src={AboutVideo} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="rounded-2xl shadow-2xl w-full h-full min-h-[350px] lg:min-h-full object-cover flex-grow aspect-video"
                        />
                    </div>
                    
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 [@media(min-width:2400px)]:space-y-16 text-white/80 leading-relaxed text-lg [@media(min-width:2400px)]:text-[36px] [@media(min-width:2400px)]:leading-[1.8] pt-4 lg:pt-0 text-justify">
                        <p>Workman Advertising, Chennai, India is a leading provider of complete branding and signage solutions, delivering high-quality visual communication for businesses across multiple industries.</p>
                        <p>Our core strength lies in delivering customized signage and advertising solutions for corporate, retail, showroom, and commercial environments. We specialize in indoor and outdoor signage, facade branding, LED video walls, POP displays, and modular signage.</p>
                        <p>With a reputation built on trust, craftsmanship, and customer satisfaction, we continue to be a preferred signage partner for brands looking for long-lasting and high-impact advertising solutions.</p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: PORTFOLIO MARQUEE */}
            <section className="py-12 [@media(min-width:2400px)]:py-24 overflow-hidden">
                <div className="animate-marquee flex gap-6">
                    {[...PORTFOLIO_SCROLL, ...PORTFOLIO_SCROLL].map((img, i) => (
                        <div key={i} className="w-[300px] h-[180px] md:w-[480px] md:h-[280px] xl:w-[600px] xl:h-[350px] [@media(min-width:2400px)]:w-[800px] [@media(min-width:2400px)]:h-[480px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                            <img src={img} alt="Work" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: OUR SPECIALIZATION */}
            <section className="bg-[#959064] text-white py-20 [@media(min-width:2400px)]:py-32 px-10 md:px-20 lg:px-24">
                <div className="w-full max-w-[90rem] mx-auto">
                    
                    {/* items-start prevents columns from affecting each other */}
                    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 [@media(min-width:2400px)]:gap-32">
                        
                        {/* LEFT COLUMN - IMAGE */}
                        <div className="lg:w-1/2 w-full sticky top-24">
                            <h2 className="font-imperial text-[42px] md:text-[56px] [@media(min-width:2400px)]:text-[96px] font-bold mb-8 [@media(min-width:2400px)]:mb-16 leading-tight border-t border-white/30 pt-4 inline-block">
                                Our Specialization
                            </h2>
                            
                            <div className="flex flex-col w-full rounded-xl overflow-hidden shadow-2xl h-[450px] md:h-[500px] lg:h-[580px] xl:h-[620px] [@media(min-width:2400px)]:h-[850px] bg-black/10">
                                <img 
                                    src={main2} 
                                    alt="Specialization" 
                                    className="flex-1 w-full h-full object-cover block" 
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN - ACCORDION */}
                        <div className="lg:w-1/2 w-full space-y-6 [@media(min-width:2400px)]:space-y-12">
                            {specializationData.map((item, index) => (
                                <div key={index} className="border-b border-white/20 pb-6 [@media(min-width:2400px)]:pb-10">
                                    <div 
                                        className="flex items-start gap-6 [@media(min-width:2400px)]:gap-10 cursor-pointer" 
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <span className="text-white text-3xl [@media(min-width:2400px)]:text-6xl font-light w-8 [@media(min-width:2400px)]:w-12 shrink-0 pt-1">
                                            {activeIndex === index ? '−' : '+'}
                                        </span>
                                        
                                        <div className="flex-1">
                                            <h3 className="text-2xl md:text-3xl [@media(min-width:2400px)]:text-5xl font-bold font-imperial mb-2 [@media(min-width:2400px)]:mb-6">
                                                {item.title}
                                            </h3>
                                            
                                            <div 
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                                    activeIndex === index ? 'max-h-[500px] [@media(min-width:2400px)]:max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <p className="text-lg [@media(min-width:2400px)]:text-3xl opacity-90 mb-4 [@media(min-width:2400px)]:mb-8 leading-relaxed">{item.shortDesc}</p>
                                                {item.highlight && (
                                                    <p className="font-bold mb-2 [@media(min-width:2400px)]:mb-6 text-white/80 [@media(min-width:2400px)]:text-3xl">{item.highlight}</p>
                                                )}
                                                <ul className="space-y-2 [@media(min-width:2400px)]:space-y-6 pb-4">
                                                    {item.fullContent.map((point, i) => (
                                                        <li key={i} className="flex items-center gap-3 [@media(min-width:2400px)]:gap-6 text-base [@media(min-width:2400px)]:text-2xl">
                                                            <span className="w-1.5 h-1.5 [@media(min-width:2400px)]:w-3 [@media(min-width:2400px)]:h-3 rounded-full bg-white shrink-0" />
                                                            <span className="opacity-90">{point}</span>
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
            <section className="bg-white py-12 md:py-20 [@media(min-width:2400px)]:py-32">
                <div className="w-full max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-8 md:gap-x-16 md:gap-y-12 [@media(min-width:2400px)]:gap-x-24 [@media(min-width:2400px)]:gap-y-20">
                        {BRANDS.map((logo, i) => (
                            <div 
                                key={i} 
                                className="flex items-center justify-center w-[calc(50%-1rem)] md:w-auto"
                            >
                                <img 
                                    src={logo} 
                                    alt={`Brand ${i + 1}`} 
                                    className="w-[100px] sm:w-[120px] md:w-[160px] [@media(min-width:2400px)]:w-[320px] h-[50px] md:h-[75px] [@media(min-width:2400px)]:h-[150px] object-contain" 
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