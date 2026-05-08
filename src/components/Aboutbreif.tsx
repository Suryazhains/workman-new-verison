import AboutVideo from '../assets/0225.mp4'; 
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; 
import LandingPageThree from './landingthree';

import main2 from "../assets/ourspecialization.png";
import portfolio3 from "../assets/outdooScoller.png";
import portfolio4 from "../assets/outdoor 13.png";
import portfolio5 from "../assets/outdoor 17.png";
import portfolio6 from "../assets/outdoor 34.png";
import portfolio7 from "../assets/outdoor 27.png";
import portfolio8 from "../assets/outdoor 44.png";

const PORTFOLIO_SCROLL = [portfolio3, portfolio4, portfolio5, portfolio6, portfolio7, portfolio8];
const paragraphVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.015, 
            delayChildren: 0.3,  
        },
    },
};

const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4, 
            ease: [0.2, 0.65, 0.3, 0.9], 
        },
    },
};

const About: React.FC = () => {

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

    const aboutDescriptionText = `Workman Advertising is a Chennai-based branding and signage solutions company delivering high-quality indoor, outdoor, and digital display services. Workman Advertising, Chennai, India is a leading provider of complete branding and signage solutions, delivering high-quality visual communication for businesses across multiple industries.\nOur core strength lies in delivering customized signage and advertising solutions for corporate, retail, showroom, and commercial environments. We specialize in indoor and outdoor signage, facade branding, LED video walls, POP displays, and modular signage.\nWith a reputation built on trust, craftsmanship, and customer satisfaction, we continue to be a preferred signage partner for brands looking for long-lasting and high-impact advertising solutions.`;

    return (
        <main className="bg-[#959064] font-inter text-white w-full overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');

                .font-crimson { font-family: 'Crimson Pro', serif !important; }
                .font-dm-sans { font-family: 'DM Sans', sans-serif !important; }

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

            <section className="w-full max-w-[90rem] mx-auto px-10 md:px-20 lg:px-24 pt-16 md:pt-1-4 [@media(min-width:2400px)]:pt-32 pb-16">
                
                <h1 className="font-dm-sans tracking-normal text-[28px] md:text-[39px] [@media(min-width:2400px)]:text-[90px] font-extralight mb-6 [@media(min-width:2400px)]:mb-10 text-left">
                    {"About Us".split(" ").map((word, index, array) => (
                        <React.Fragment key={index}>
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                            {index < array.length - 1 && " "}
                        </React.Fragment>
                    ))}
                </h1>

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

                    <motion.div 
                        variants={paragraphVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="w-full lg:w-1/2 flex flex-col justify-center text-white/80 font-normal leading-snug text-[16px] md:text-[16px] lg:text-[18px] [@media(min-width:2400px)]:text-[27px] [@media(min-width:2400px)]:leading-[1.4] pt-4 lg:pt-0 text-left"
                    >
                        {aboutDescriptionText.split('\n').map((line, lineIndex) => (
                            <p key={`about-desc-line-${lineIndex}`} className="mb-6 [@media(min-width:2400px)]:mb-10 min-h-[1rem]">
                                {line.split(" ").map((word, wordIndex, array) => (
                                    <React.Fragment key={`about-desc-word-${lineIndex}-${wordIndex}`}>
                                        <motion.span variants={wordVariants} className="inline-block">
                                            {word}
                                        </motion.span>
                                        {wordIndex < array.length - 1 && " "}
                                    </React.Fragment>
                                ))}
                            </p>
                        ))}
                    </motion.div>
                </div>
            </section>
            <section className="py-12 [@media(min-width:2400px)]:py-24 overflow-hidden">
                <div className="animate-marquee flex gap-6">
                    {[...PORTFOLIO_SCROLL, ...PORTFOLIO_SCROLL].map((img, i) => (
                        <div key={i} className="w-[300px] h-[180px] md:w-[480px] md:h-[280px] xl:w-[600px] xl:h-[350px] [@media(min-width:2400px)]:w-[800px] [@media(min-width:2400px)]:h-[480px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                            <img 
                                src={img} 
                                alt="Work" 
                                className="w-full h-full object-cover" 
                                fetchPriority="high" 
                                loading="eager" 
                                decoding="sync" 
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#959064] text-white py-20 [@media(min-width:2400px)]:py-32 px-10 md:px-20 lg:px-24">
                <div className="w-full max-w-[90rem] mx-auto">
                    
                    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 [@media(min-width:2400px)]:gap-32">
                        
                        <div className="lg:w-1/2 w-full sticky top-24">
                            <h2 className="font-dm-sans tracking-normal text-[42px] md:text-[56px] [@media(min-width:2400px)]:text-[96px] font-extralight mb-8 [@media(min-width:2400px)]:mb-16 leading-tight border-t border-white/30 pt-4 inline-block w-full">
                                {"Our Specialization".split(" ").map((word, index, array) => (
                                    <React.Fragment key={index}>
                                        <motion.span
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.3 }}
                                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                                            className="inline-block"
                                        >
                                            {word}
                                        </motion.span>
                                        {index < array.length - 1 && " "}
                                    </React.Fragment>
                                ))}
                            </h2>
                            
                            <div className="flex flex-col w-full rounded-xl overflow-hidden shadow-2xl h-[450px] md:h-[500px] lg:h-[580px] xl:h-[620px] [@media(min-width:2400px)]:h-[850px] bg-black/10">
                                <img 
                                    src={main2} 
                                    alt="Specialization" 
                                    className="flex-1 w-full h-full object-cover block" 
                                    fetchPriority="high"
                                    loading="eager"
                                    decoding="sync"
                                />
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full space-y-6 [@media(min-width:2400px)]:space-y-12">
                            {specializationData.map((item, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
                                    className="border-b border-white/20 pb-6 [@media(min-width:2400px)]:pb-10"
                                >
                                    <div 
                                        className="flex items-start gap-6 [@media(min-width:2400px)]:gap-10 cursor-pointer" 
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <span className="text-white text-3xl [@media(min-width:2400px)]:text-6xl font-light w-8 [@media(min-width:2400px)]:w-12 shrink-0 pt-1">
                                            {activeIndex === index ? '−' : '+'}
                                        </span>
                                        
                                        <div className="flex-1">
                                            <h3 className="text-2xl md:text-3xl [@media(min-width:2400px)]:text-5xl font-extralight font-dm-sans tracking-normal mb-2 [@media(min-width:2400px)]:mb-6">
                                                {item.title.split(" ").map((word, wIndex, wArray) => (
                                                    <React.Fragment key={wIndex}>
                                                        <motion.span
                                                            initial={{ opacity: 0, y: 20 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + (wIndex * 0.05) }}
                                                            className="inline-block"
                                                        >
                                                            {word}
                                                        </motion.span>
                                                        {wIndex < wArray.length - 1 && " "}
                                                    </React.Fragment>
                                                ))}
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
                                </motion.div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </section>

            <LandingPageThree />
        </main>
    );
};

export default About;