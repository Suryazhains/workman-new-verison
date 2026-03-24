import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/whitelogo.png';
import { LANDING_CONTENT } from './content';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

  const { navLinks, servicesData, infrastructureData, contactBtn } = LANDING_CONTENT.header;
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string | null) => {
    if (!path) return;

    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubMenu(null);

    const [routePart, hashPart] = path.split('#');
    const targetRoute = routePart || '/'; 

    if (location.pathname === targetRoute) {
      if (hashPart) {
        const element = document.getElementById(hashPart);
        if (element) {
          window.history.pushState(null, '', path);
          
          const headerOffset = window.innerWidth >= 2400 ? 200 : (window.innerWidth < 1024 ? 90 : 100); 
          
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
          });
        }
      } else {
        window.history.pushState(null, '', targetRoute);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const getRoutePath = (name: string) => {
    switch (name) {
      case 'Home': return '/';
      case 'About us': return '/aboutbrief'; 
      case 'Our services': return '/services';
      case 'Infrastructure': return '/infrastructure'; 
      case 'Team': return '/team';
      case 'Testimonials': return '/#testimonials';
      case 'Portfolio': return '/#portfolio';
      default: return null; 
    }
  };

  const getCategoryPath = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes('INDOOR')) return '/indoor';
    if (cat.includes('LED')) return '/led';
    if (cat.includes('POP')) return '/pop';
    if (cat.includes('MODULAR')) return '/modular';
    return '/outdoor';
  };

  const getServiceSlug = (name: string) => {
    const mapping: { [key: string]: string } = {
      'OUTDOOR': 'outdoor',
      'INDOOR': 'indoor',
      'LED VIDEO WALL': 'led',
      'POP': 'pop',
      'MODULAR SIGNAGE': 'modular',
      'Pylon Signage': 'pylon-signage',
      'Facade / Signages': 'facade-signages', 
      'Backlit Signages': 'backlit-signages',
      'Hoardings & Structures': 'hoardings-structures',
      'Metal Letters': 'metal-letters',
      'Unipole': 'unipole',
      'Retail Interiors': 'retail-interiors',
      'Exhibition Stalls': 'exhibition-stalls',
      'Kiosk': 'kiosk',
      'Display Stands': 'display-stands',
      'Metal Stands': 'metal-stands',
      'Wall Graphics / Inshop Branding': 'wall-graphics',
      'LED video wall': 'led-video-wall',
      'Standees': 'standees',
      'Scrollers': 'scrollers',
      'Catalogue Stands': 'catalogue-stands',
      'Category Signage': 'category-signage',
      'Clip On Frames': 'clip-on-frames',
      'Equipments': 'equipments',
      'Team': 'team' 
    };
    
    const target = mapping[name] || name;
    return target
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  return (
    <header className="w-full bg-[#BBB791] sticky top-0 z-50 border-none outline-none">
      <style>
        {`
          *:focus {
            outline: none !important;
            box-shadow: none !important;
          }
          a, button, Link {
            -webkit-tap-highlight-color: transparent;
          }
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 130px; 
          }
          @media (max-width: 1024px) {
            html {
              scroll-padding-top: 100px;
            }
          }
          @media (min-width: 2400px) {
            html {
              scroll-padding-top: 200px; 
            }
          }
        `}
      </style>
      
      <div className="w-full h-[80px] lg:h-[110px] [@media(min-width:2400px)]:h-[180px] flex items-center justify-between px-6 md:px-12 lg:px-12 [@media(min-width:2400px)]:px-[8rem] relative border-none outline-none transition-all duration-300">
    
        <div className="flex items-center">
          <Link to="/" className="outline-none focus:outline-none border-none" onClick={(e) => {
            e.preventDefault();
            handleNavigation('/');
          }}>
            <img 
              src={logoImg} 
              alt="WORKMAN LOGO" 
              className="w-[180px] md:w-[240px] [@media(min-width:2400px)]:w-[480px] h-auto object-contain border-none outline-none transition-all duration-300"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-[48px] [@media(min-width:2400px)]:space-x-[120px] h-full outline-none transition-all duration-300">
          {navLinks.map((link) => {
            const path = getRoutePath(link.name);

            return (
              <div
                key={link.name}
                className="relative h-full flex items-center outline-none"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={path || '#'} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(path);
                  }}
                  className="text-[15px] [@media(min-width:2400px)]:text-[32px] font-semibold text-white hover:text-white transition-all py-2 outline-none"
                >
                  {link.name}
                </Link>

                {link.name === 'Our services' && activeDropdown === 'Our services' && (
                  <div className="absolute top-[110px] [@media(min-width:2400px)]:top-[180px] left-1/2 -translate-x-1/2 w-[1000px] [@media(min-width:2400px)]:w-[2000px] bg-white shadow-2xl rounded-xl p-8 [@media(min-width:2400px)]:p-16 grid grid-cols-5 gap-6 [@media(min-width:2400px)]:gap-14 border border-gray-100 z-[60] outline-none transition-all duration-300">
                    {Object.entries(servicesData).map(([category, items]) => {
                      const baseRoute = getCategoryPath(category);
                      const categoryTarget = `${baseRoute}#${getServiceSlug(category)}`;

                      return (
                        <div key={category} className="outline-none">
                          <Link
                            to={categoryTarget}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(categoryTarget);
                            }}
                            className="text-[11px] [@media(min-width:2400px)]:text-[24px] font-bold text-gray-400 uppercase mb-4 [@media(min-width:2400px)]:mb-8 tracking-wider hover:text-[#163B73] transition-colors block"
                          >
                            {category}
                          </Link>
                          <ul className="space-y-3 [@media(min-width:2400px)]:space-y-6">
                            {(items as string[]).map((item) => {
                              const itemTarget = `${baseRoute}#${getServiceSlug(item)}`;
                              return (
                                <li key={item}>
                                  <Link 
                                    to={itemTarget}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavigation(itemTarget);
                                    }}
                                    className="text-[13px] [@media(min-width:2400px)]:text-[26px] text-gray-600 hover:text-[#163B73] transition-colors block"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}

                {link.name === 'Infrastructure' && activeDropdown === 'Infrastructure' && (
                  <div className="absolute top-[110px] [@media(min-width:2400px)]:top-[180px] left-0 w-[220px] [@media(min-width:2400px)]:w-[440px] bg-white shadow-2xl rounded-lg p-4 [@media(min-width:2400px)]:p-12 border border-gray-100 z-[60] outline-none transition-all duration-300">
                    <ul className="space-y-3 [@media(min-width:2400px)]:space-y-6">
                      {(infrastructureData as string[]).map((item) => {
                        const infraTarget = item.toLowerCase() === 'team' 
                          ? '/team' 
                          : `/infrastructure#${getServiceSlug(item)}`;

                        return (
                          <li key={item}>
                            <Link 
                              to={infraTarget}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(infraTarget);
                              }}
                              className="text-[14px] [@media(min-width:2400px)]:text-[28px] text-gray-600 hover:text-[#163B73] transition-colors block"
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <Link 
            to="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/#contact');
            }}
            className="hidden md:flex items-center justify-center bg-white text-[#BBB791] rounded-[6px] [@media(min-width:2400px)]:rounded-[12px] w-[150px] h-[45px] lg:w-[170px] lg:h-[50px] [@media(min-width:2400px)]:w-[340px] [@media(min-width:2400px)]:h-[90px] font-inter font-bold text-[15px] lg:text-[16px] [@media(min-width:2400px)]:text-[32px] hover:bg-gray-100 transition-all duration-300 shadow-sm"
          >
            {contactBtn}
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white w-full border-t border-gray-100 absolute left-0 top-[80px] shadow-lg z-50 overflow-y-auto max-h-[calc(100vh-80px)]">
          <nav className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => {
              const path = getRoutePath(link.name);
              const isDropdown = link.name === 'Our services' || link.name === 'Infrastructure';
              const isOpen = mobileSubMenu === link.name;

              return (
                <div key={link.name} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      to={path || '#'}
                      className="text-[18px] font-bold text-[#163B73] py-2 flex-grow"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(path);
                      }}
                    >
                      {link.name}
                    </Link>
                    
                    {isDropdown && (
                      <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            setMobileSubMenu(isOpen ? null : link.name);
                        }} 
                        className="p-3 cursor-pointer"
                      >
                        <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-[#163B73]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {link.name === 'Our services' && isOpen && (
                    <div className="flex flex-col ml-4 mt-2 space-y-4 border-l-2 border-gray-100 pl-4 animate-in slide-in-from-top-2 duration-300">
                      {Object.entries(servicesData).map(([category, items]) => (
                        <div key={category} className="flex flex-col">
                          <button 
                             onClick={() => handleNavigation(`${getCategoryPath(category)}#${getServiceSlug(category)}`)}
                             className="text-left text-[12px] font-black text-gray-400 uppercase tracking-widest mb-2"
                          >
                            {category}
                          </button>
                          <div className="flex flex-col space-y-2">
                            {(items as string[]).map((item) => (
                              <button
                                key={item}
                                onClick={() => handleNavigation(`${getCategoryPath(category)}#${getServiceSlug(item)}`)}
                                className="text-left text-[15px] text-gray-600 hover:text-[#163B73]"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {link.name === 'Infrastructure' && isOpen && (
                    <div className="flex flex-col ml-4 mt-2 space-y-3 border-l-2 border-gray-100 pl-4 animate-in slide-in-from-top-2 duration-300">
                      {(infrastructureData as string[]).map((item) => (
                        <button
                          key={item}
                          onClick={() => handleNavigation(item.toLowerCase() === 'team' ? '/team' : `/infrastructure#${getServiceSlug(item)}`)}
                          className="text-left text-[15px] text-gray-600 hover:text-[#163B73]"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            <Link 
              to="/#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/#contact');
              }}
              className="w-full bg-white border-2 border-[#51A147] text-[#51A147] text-center py-4 rounded-md font-bold block mt-4"
            >
              {contactBtn}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;