import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0
  });
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreen({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screen;
};

export default useResponsive;
