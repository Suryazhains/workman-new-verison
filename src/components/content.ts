import printer1 from "../assets/equiment 1.png";
import printer2 from "../assets/equiment 2.png";
import printer3 from "../assets/equiment 3.png";
import printer4 from "../assets/equiment 4.png";
import printer5 from "../assets/equiment 5.png";
import printer6 from "../assets/equiment 6.png";
import printer7 from "../assets/equiment 7.png";
import printer8 from "../assets/equiment 8.png";
import printer9 from "../assets/equiment 9.jpeg";
import printer10 from "../assets/equiment 10.png";
import portfolio1 from "../assets/portfolio 1.png";
import portfolio2 from "../assets/portfolio 2.png";
import portfolio3 from "../assets/portfolio 3.png";
import portfolio4 from "../assets/portfolio 4.png";
import portfolio5 from "../assets/portfolio 5.png";
import portfolio6 from "../assets/portfolio 6.png";
import portfolio7 from "../assets/portfolio 7.png";
import portfolio8 from "../assets/portfolio 8.png";
import pylon1 from "../assets/outdoor 1.png";
import pylon2 from "../assets/outdoor 2.png";
import pylon3 from "../assets/outdoor 3.png";
import blink1 from "../assets/outdoor 4.png";
import blink2 from "../assets/outdoor 5.png";
import blink3 from "../assets/outdoor 6.png";
import uni1 from "../assets/outdoor 7.png";
import uni2 from "../assets/outdoor 8.png";
import uni3 from "../assets/outdoor 9.png";
import Hs1 from "../assets/outdoor 10.png";
import Hs2 from "../assets/outdoor 11.png";
import Hs3 from "../assets/outdoor 12.png";
import M1 from "../assets/outdoor 13.png";
import M2 from "../assets/outdoor 14.png";
import M3 from "../assets/outdoor 15.png";
// Retail Interiors
import retail1 from "../assets/outdoor 16.png";
import retail2 from "../assets/outdoor 17.png";
import retail3 from "../assets/outdoor 18.png";

// Exhibition Stalls
import exhibit1 from "../assets/portfolio 1.png";
import exhibit2 from "../assets/outdoor 20.png";
import exhibit3 from "../assets/outdoor 21.png";

// Kiosk
import kiosk1 from "../assets/outdoor 22.png";
import kiosk2 from "../assets/outdoor 23.png";
import kiosk3 from "../assets/outdoor 24.png";

// Display Stands
import display1 from "../assets/outdoor 25.png";
import display2 from "../assets/outdoor 26.png";
import display3 from "../assets/outdoor 27.png";

// Metal Stands
import metal1 from "../assets/outdoor 28.png";
import metal2 from "../assets/outdoor 29.png";
import metal3 from "../assets/outdoor 30.png";

// Wall Graphics / Inshop Branding
import wall1 from "../assets/outdoor 31.png";
import wall2 from "../assets/outdoor 32.png";
import wall3 from "../assets/outdoor 33.png";
// LED Video Wall (34–36)
import led1 from "../assets/outdoor 34.png";
import led2 from "../assets/outdoor 35.png";
import led3 from "../assets/outdoor 36.png";

// Standees (37–39)
import standee1 from "../assets/outdoor 37.png";
import standee2 from "../assets/outdoor 38.png";
import standee3 from "../assets/outdoor 39.png";

// Scrollers (40–42)
import scroller1 from "../assets/outdoor 40.png";
import scroller2 from "../assets/outdoor 41.png";
import scroller3 from "../assets/outdoor 42.png";

// Catalogue Stands (43–45)
import catalogue1 from "../assets/outdoor 43.png";
import catalogue2 from "../assets/outdoor 44.png";
import catalogue3 from "../assets/outdoor 45.png";

// Category Signage (46–48)
import category1 from "../assets/outdoor 46.png";
import category2 from "../assets/outdoor 47.png";
import category3 from "../assets/outdoor 48.png";

// Clip On Frames (49–52)
import clip1 from "../assets/outdoor 49.png";
import clip2 from "../assets/outdoor 50.png";
import clip3 from "../assets/outdoor 51.png";
// Facade / Signages
import facade1 from "../assets/outdoor 52.png";
import facade2 from "../assets/outdoor 53.png";
import facade3 from "../assets/outdoor 54.png";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";


export const PORTFOLIO_IMAGES = [
  portfolio1,
  portfolio2,
  portfolio3,
  portfolio4,
  portfolio5,
  portfolio6,
  portfolio7,
  portfolio8,
];

export const LANDING_CONTENT = {
  header: {
    navLinks: [
      { name: 'Home', href: '/' },
      { name: 'About us', href: '#about' },
      { name: 'Our services', href: '/services', hasDropdown: true },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Infrastructure', href: '#infrastructure', hasDropdown: true },
      { name: 'Testimonials', href: '#testimonials' },
    ],
    servicesData: {
      OUTDOOR: [
        'Facade / Signages',
        'Pylon Signage',
        'Backlit Signages',
        'Unipole',
        'Hoardings & Structures',
        'Metal Letters'
      ],
      INDOOR: [
        'Retail Interiors',
        'Exhibition Stalls',
        'Kiosk',
        'Display Stands',
        'Metal Stands',
        'Wall Graphics / Inshop Branding'
      ],
      'LED VIDEO WALL': [
        'LED Video Wall'
      ],
      POP: [
        'POP '
      ],
      'MODULAR SIGNAGE': [
        'Standees',
        'Scrollers',
        'Catalogue Stands',
        'Category Signage',
        'Clip On Frames'
      ],
    },
    infrastructureData: ['Equipments', 'Team'],
    contactBtn: 'Contact now',
  },
  hero: {
    title: [
      'Making brands visible',
      'through',
      'powerful signage'
    ],
    description: 'We design, manufacture, and install high-quality signage solutions that help brands stand out across outdoor, indoor, and retail environments.',
    cta: 'Contact now',
  },

  about: {
    label: 'About Us',
    heading: 'Signage & Branding Solutions',
    description: 'We are a signage and branding solutions company with hands-on experience in executing projects across commercial, retail, and corporate spaces. Our team focuses on quality workmanship, practical design, and timely execution — ensuring every project meets real-world requirements.',
    stats: [
      { value: '3000+', label: 'Projects Completed' },
      { value: '25+', label: 'Years of Experience' },
      { value: '100%', label: 'Quality & Timely Delivery' },
    ],
  },

  servicesSection: {
    heading: "Our Services",
    description:
      "Our range of services is designed to cover all your branding and signage needs, no matter the scale.",

    tabs: [
      { id: "outdoor", label: "Outdoor" },
      { id: "indoor", label: "Indoor" },
      { id: "led", label: "LED Video Wall" },
      { id: "pop", label: "POP" },
      { id: "modular", label: "Modular Signage" },
    ],

    contentMap: {
  outdoor: {
    heading: "Outdoor Services",
    description: [
      "High-impact outdoor branding designed to maximize visibility across prime locations. We specialize in facade signage, backlit signboards, hoardings, unipoles, metal letters, and custom structural branding.",
      "Built with premium materials, our outdoor solutions ensure durability, weather resistance, and strong day-and-night visibility.",
      "From commercial buildings to highways, we help your brand stand out and get noticed."
    ],
    buttonText: "View more",
  },

  indoor: {
    heading: "Indoor Services",
    description: [
      "Thoughtfully designed indoor branding solutions that enhance visual appeal, optimize space, and improve customer engagement.",
      "With premium finishes and precise execution, we create interiors that strengthen brand recall and elevate customer experience."
    ],
    buttonText: "View more",
  },

  led: {
    heading: "LED Video Wall  Services",
    description: [
      "High-performance LED video wall solutions for dynamic visual communication and impactful brand storytelling across indoor and outdoor environments.",
      "We deliver end-to-end LED solutions including consultation, installation, calibration, and technical support.",
      "With high brightness, seamless panels, and crystal-clear visuals, our LED walls create powerful brand experiences."
    ],
    buttonText: "View more",
  },

  pop: {
    heading: "POP Services",
    description: [
      "Strategic Point of Purchase (POP) branding designed to attract attention and influence buying decisions at the point of sale.",
      "Our durable and visually impactful POP solutions enhance visibility, engagement, and in-store conversions."
    ],
    buttonText: "View more",
  },

  modular: {
    heading: "Modular Signage  Services",
    description: [
      "Flexible and cost-effective modular signage solutions designed for easy updates and reusable branding.",
      "Ideal for retail, malls, exhibitions, and corporate spaces, our modular signages combine convenience with strong visual impact."
    ],
    buttonText: "View more",
  },
},

  },

  portfolio: {
    label: 'Portfolio',
    heading: 'Portfolio',
    description: 'Signage solutions delivered with precision and reliability.',
    images: [
      portfolio1,
    ],
  },

  testimonials: {
    heading: 'Testimonials',
    description: 'Our range of services is designed to cover all your branding and signage needs, no matter the scale.',
    large: {
      quote:
        'From the initial discussion to the final installation, Workman Advertising managed our LED video wall project in a very structured and professional manner. Their technical expertise, clear communication, and strong on-site coordination ensured smooth execution without delays. The display quality significantly enhanced our showroom presence.',
      name: 'Suresh Balaji',
      company: 'Director, VCMart Retail Pvt. Ltd., Chennai',
    },
    small: [
      {
        quote:
          'Workman Advertising handled our facade signage and indoor branding with excellent precision. The material quality, finishing, and installation were executed very professionally, and the project was delivered on time.',
        name: 'Ramesh Kumar',
        company: 'Operations Head, Sri Renuka Electronics, Chennai',
      },
      {
        quote:
          'Their understanding of retail branding and attention to detail really stood out. The POP displays and in-store branding looked premium and consistent across all our outlets.',
        name: 'Priya Anand',
        company: 'Marketing Manager, Care Retail, Tamil Nadu',
      },
      {
        quote:
          'They consistently deliver practical designs with strong visual appeal while maintaining cost efficiency. Reliable execution and continued support make them a dependable branding partner.',
        name: 'Karthik Velmurugan',
        company: 'Proprietor, Renesson Displays, Coimbatore',
      },
    ],

  },

  contactSection: {
    heading: "Contact Us",
    description: "Our range of services is designed to cover all your branding and Signage needs, no matter the scale.",
    form: {
      title: "Send a Message",
      fields: {
        name: "Full name *",
        phone: "Contact number *",
        message: "Message *"
      },
      buttonText: "Submit"
    },
    info: {
      title: "Contact Link",
      phone: "+91 98403 27575",
      email: "workmansign@hotmail.com",
      quote: "Our range of services is designed to cover all your branding and signage needs, no matter the scale."
    }
  },

  footer: {
    description: "Our range of services is designed to cover all your branding and signage needs, no matter the scale. Our range of services",
    linksTitle: "Links",
    productTitle: "Product",
    contactsTitle: "Contacts",
    products: ["Outdoor", "Indoor", "LED Video Wall", "POP", "Modular"],
    email: "workmansign@hotmail.com",
    phone: "+91 98403 27575",
    copyright: `Copyright 2026 The Work Man. All Rights Reserved`
  },

categoryData: {
    OUTDOOR: {
      heading: "Outdoor Services",
      description: "Elevate your brand presence with our premium outdoor advertising and signage solutions designed for high-impact visibility."
    },
    INDOOR: {
      heading: "Indoor Services",
      description: "Transform your interior spaces with high-quality branding, retail displays, and custom-designed indoor signage."
    },
    'LED VIDEO WALL': {
      heading: "LED Video Wall Services",
      description: "Advanced digital display solutions for dynamic visual communication and high-definition brand storytelling."
    },
    'POP': {
      heading: "POP Services",
      description: "Strategic Point of Purchase (POP) branding designed to attract attention and influence buying decisions at the point of sale."
    },
    'MODULAR SIGNAGE': {
      heading: "Modular Signage Services",
      description: "Versatile, reusable, and cost-effective display systems designed for flexible retail and exhibition environments."
    }
  },

  outdoorPage: {
    heading: "Signage & Branding Solutions", // Updated to be more generic since it hosts all
    description:
      "Comprehensive branding and signage solutions designed for high-impact visibility across all environments.",
    backButtonText: "Categories",

    services: [
      { id: 1, title: "Pylon Signage", images: [pylon1, pylon2, pylon3] },
      { id: 2, title: "Backlit Signages", images: [blink1, blink2, blink3] },
      { id: 3, title: "Unipole", images: [uni1, uni2, uni3] },
      { id: 4, title: "Hoardings & Structures", images: [Hs1, Hs2, Hs3] },
      { id: 5, title: "Metal Letters", images: [M1, M2, M3] },
      { id: 6, title: "Facade / Signages", images: [facade1, facade2, facade3] },
      { id: 7, title: "Retail Interiors", images: [retail1, retail2, retail3] },
      { id: 8, title: "Exhibition Stalls", images: [exhibit1, exhibit2, exhibit3] },
      { id: 9, title: "Kiosk", images: [kiosk1, kiosk2, kiosk3] },
      { id: 10, title: "Display Stands", images: [display1, display2, display3] },
      { id: 11, title: "Metal Stands", images: [metal1, metal2, metal3] },
      { id: 12, title: "Wall Graphics / Inshop Branding", images: [wall1, wall2, wall3] },
      { id: 13, title: "LED Video Wall", images: [led1, led2, led3] },
      { id: 14, title: "Standees", images: [standee1, standee2, standee3] },
      { id: 15, title: "Scrollers", images: [scroller1, scroller2, scroller3] },
      { id: 16, title: "Catalogue Stands", images: [catalogue1, catalogue2, catalogue3] },
      { id: 17, title: "Category Signage", images: [category1, category2, category3] },
      { id: 18, title: "Clip On Frames", images: [clip1, clip2, clip3] },
      // Added POP with ID 19
      { id: 19, title: "POP", images: [p1, p2, p3] } 
    ],
  },

  infrastructurePage: {
    heading: "Our Equipments",
    description: "Our facility is equipped with advanced industrial machines for printing, lamination, laser cutting, engraving, and signage fabrication. With state-of-the-art UV printers, CO₂ laser systems, laminators, vinyl cutters, and channel letter bending machines.",
    equipments: [
      {
        id: 1,
        title: "Auto Hot / Cold Laminator",
        model: "FY-1600DA",
        description:
          "Single hot/cold laminator designed for industrial applications. Suitable for laminating, mounting, and encapsulating prints. Supports application tape and double-sided adhesive, and is compatible with all types of cold laminating films. Ideal for flexible materials, rigid displays, packaging boards, car wrapping, floor graphics, and exhibition displays.",
        imageUrl: printer1,
        isImageLeft: true
      },
      {
        id: 2,
        title: "Auto Hot / Cold Laminator",
        model: "FY-1600SE",
        description:
          "Multi-function single hot/cold laminator built for high-performance industrial use. Enables laminating, mounting, and encapsulating prints with precision. Works with application tape and double-sided adhesive and supports all cold laminating films. Suitable for banners, roll-ups, backlit displays, table displays, exhibitions, and large-format graphics.",
        imageUrl: printer2,
        isImageLeft: false
      },
      {
        id: 3,
        title: "CO₂ Laser Cutting Machine",
        model: "MT-1812",
        description:
          "Industrial flatbed CO₂ laser cutting machine designed for precision cutting and engraving of non-metal materials. Ideal for acrylic, MDF, plywood, PVC foam board, leather, fabric, and signage materials. Widely used in advertising, signage, interior décor, exhibition displays, and custom fabrication applications.",
        imageUrl: printer3,
        isImageLeft: true
      },
      {
        id: 4,
        title: "RF/ZF Flatbed UV Printer",
        model: "RF/ZF Series",
        description: "The RF/ZF Flatbed UV Printer is designed for direct printing on rigid and thick materials with high precision and durability. It supports a wide range of substrates such as glass, acrylic, wood, metal, PVC boards, foam boards, and other flat media up to heavy thickness. Built with a robust industrial frame and advanced UV curing system, this printer delivers sharp details, vibrant colors, and excellent adhesion, making it ideal for signage, interior décor, industrial printing, and customized applications.",
        imageUrl: printer4,
        isImageLeft: true
      },
      {
        id: 5,
        title: "ZR Roll-to-Roll UV Printer",
        model: "ZR Series",
        description: "The ZR Roll-to-Roll UV Printer is a high-capacity large-format machine developed for continuous printing on flexible roll media. It is suitable for materials such as flex banners, vinyl, wallpapers, backlit films, window films, and soft signage. Designed for high-speed production with stable media handling, the ZR Series ensures consistent color output, smooth ink curing, and reliable performance, making it ideal for commercial print shops, advertising companies, and large-scale production environments.",
        imageUrl: printer5,
        isImageLeft: true
      },
      {
        id: 6,
        title: "Vinyl Cutting Plotter with Camera",
        model: "Saga 1400III CAM",
        description: "The Saga 1400III CAM Vinyl Cutting Plotter is an advanced print-and-cut solution equipped with a CCD camera for automatic contour cutting. It is designed for precise cutting of printed graphics, stickers, labels, heat transfer vinyl, and signage materials. With high cutting speed, servo motor accuracy, and stable media tracking, this machine is ideal for sign makers, advertising studios, and digital print shops requiring accuracy and efficiency.",
        imageUrl: printer6,
        isImageLeft: true
      },
      {
        id: 7,
        title: "CO₂ Laser Cutting & Engraving Machine",
        model: "GT 1325",
        description: "The GT 1325 CO₂ Laser Cutting and Engraving Machine is a large-format, high-performance system designed for cutting and engraving non-metal materials. It supports materials such as acrylic, wood, MDF, leather, rubber, stone, and glass. With a spacious working area, powerful laser options, and water-cooling protection, this machine is widely used in signage, crafts, interior décor, and industrial fabrication applications.",
        imageUrl: printer7,
        isImageLeft: false
      },
      {
        id: 8,
        title: "Automatic Aluminum Channel Letter Bending Machine",
        model: "GT-NL Series",
        description: "The GT-NL Series Automatic Channel Letter Bending Machine is an industrial-grade solution for fabricating aluminum channel letters. It integrates automatic feeding, grooving, cutting, and bending in one system, ensuring high precision and consistent output. Suitable for aluminum profiles and flat materials, this machine is ideal for signage manufacturers producing 3D channel letters for outdoor and indoor advertising.",
        imageUrl: printer8,
        isImageLeft: true
      },
      {
        id: 9,
        title: "Wide Format Lamination Machine",
        model: "LM-1600",
        description: "The LM-1600 Wide Format Cold Lamination Machine is designed for professional print finishing applications. It delivers smooth, bubble-free lamination for vinyl, flex, photo paper, and posters. Built with high-quality silicone rollers and a sturdy metal frame, it ensures uniform pressure, easy operation, and long-lasting performance. Ideal for use with eco-solvent, solvent, UV, and inkjet printers in advertising and signage production.",
        imageUrl: printer9,
        isImageLeft: true
      },
      {
        id: 10,
        title: "Sun Laser CO₂ Laser Cutting Machine",
        model: "1325MG-P-1",
        description: "The Sun Laser 1325MG-P-1 is a professional CO₂ laser cutting and engraving machine for wood, acrylic, MDF, leather, fabric, and other non-metal materials. It offers high precision, a large working area, and reliable performance for signage, prototyping, and workshop applications.",
        imageUrl: printer10,
        specifications: {
          laserType: "CO₂ Laser",
          laserPower: "100W – 150W",
          workingArea: "1300 × 2500 mm",
          controlSystem: "DSP Controller",
          coolingSystem: "Water Chiller",
          supportedFormats: ["AI", "DXF", "PLT"]
        },
        isImageLeft: true
      }
    ]
  }
};