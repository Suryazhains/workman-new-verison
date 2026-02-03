import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/workman LOGO.png';
import { LANDING_CONTENT } from './content';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for mobile sub-menu toggles
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

  const { navLinks, servicesData, infrastructureData, contactBtn } = LANDING_CONTENT.header;
  
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * ✅ FIXED NAVIGATION HANDLER
   * Specifically handles the mobile header offset (80px) to prevent 
   * sections from being hidden behind the sticky navbar.
   */
  const handleNavigation = (path: string | null) => {
    if (!path) return;

    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileSubMenu(null);

    const [route, hash] = path.split('#');

    // Internal helper for precise offset scrolling
    const scrollToTarget = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (element) {
        // 80px for mobile header, 110px for desktop
        const offset = window.innerWidth < 1024 ? 70 : 110; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    if (location.pathname === route && hash) {
      // Same page: Scroll immediately
      scrollToTarget(hash);
    } 
    else if (hash) {
      // Different page: Navigate first, then scroll
      navigate(route);
      setTimeout(() => {
        scrollToTarget(hash);
      }, 400); // Increased timeout to ensure DOM is ready on slow mobile connections
    } 
    else {
      // Standard page navigation
      navigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getRoutePath = (name: string) => {
    switch (name) {
      case 'Home': return '/';
      case 'About us': return '/#about'; 
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
    <header className="w-full bg-[#F6F7F9] sticky top-0 z-50 border-none outline-none">
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
          }
          /* Fallback for standard anchor jumps */
          section[id] {
            scroll-margin-top: 90px;
          }
          @media (min-width: 1024px) {
            section[id] {
              scroll-margin-top: 120px;
            }
          }
        `}
      </style>

      <div className="w-full h-[80px] lg:h-[110px] flex items-center justify-between px-4 lg:px-12 relative border-none outline-none">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="outline-none focus:outline-none border-none" onClick={(e) => {
            e.preventDefault();
            handleNavigation('/');
          }}>
            <img 
              src={logoImg} 
              alt="WORKMAN LOGO" 
              className="w-[140px] md:w-[180px] h-auto object-contain border-none outline-none"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-[48px] h-full outline-none">
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
                  className="text-[15px] font-semibold text-[#4B5563] hover:text-[#163B73] transition-colors py-2 outline-none"
                >
                  {link.name}
                </Link>

                {/* Services Dropdown */}
                {link.name === 'Our services' && activeDropdown === 'Our services' && (
                  <div className="absolute top-[110px] left-1/2 -translate-x-1/2 w-[1000px] bg-white shadow-2xl rounded-xl p-8 grid grid-cols-5 gap-6 border border-gray-100 z-[60] outline-none">
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
                            className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-wider hover:text-[#163B73] transition-colors block"
                          >
                            {category}
                          </Link>
                          <ul className="space-y-3">
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
                                    className="text-[13px] text-gray-600 hover:text-[#163B73] transition-colors block"
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

                {/* Infrastructure Dropdown */}
                {link.name === 'Infrastructure' && activeDropdown === 'Infrastructure' && (
                  <div className="absolute top-[110px] left-0 w-[220px] bg-white shadow-2xl rounded-lg p-4 border border-gray-100 z-[60] outline-none">
                    <ul className="space-y-3">
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
                              className="text-[14px] text-gray-600 hover:text-[#163B73] transition-colors block"
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

        {/* Contact Button */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/#contact');
            }}
            className="hidden md:flex items-center justify-center bg-[#163B73] text-white rounded-[6px]
                       w-[150px] h-[45px] lg:w-[170px] lg:h-[50px]
                       font-inter font-medium text-[15px] lg:text-[16px]
                       hover:bg-[#0f2a52] transition-all"
          >
            {contactBtn}
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#163B73]"
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

      {/* Mobile Menu */}
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
                      className="text-[18px] font-bold text-[#163B73]"
                      onClick={(e) => {
                        if (isDropdown) {
                          e.preventDefault();
                          setMobileSubMenu(isOpen ? null : link.name);
                        } else {
                          e.preventDefault();
                          handleNavigation(path);
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                    {isDropdown && (
                      <button onClick={() => setMobileSubMenu(isOpen ? null : link.name)} className="p-2">
                        <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Mobile Services Dropdown Options */}
                  {link.name === 'Our services' && isOpen && (
                    <div className="flex flex-col ml-4 mt-2 space-y-4 border-l-2 border-gray-100 pl-4 animate-in slide-in-from-top-2 duration-300">
                      {Object.entries(servicesData).map(([category, items]) => (
                        <div key={category} className="flex flex-col">
                          <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-2">{category}</span>
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

                  {/* Mobile Infrastructure Dropdown Options */}
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
              className="w-full bg-[#163B73] text-center text-white py-4 rounded-md font-bold block mt-4"
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