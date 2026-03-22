import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there is NO hash in the URL.
    // If there is a hash (e.g., /#contact), let your existing code handle it.
    if (!hash) {
      window.scrollTo({ top: 50, behavior: 'auto' }); 
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;