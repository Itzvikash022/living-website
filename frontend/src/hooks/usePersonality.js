import { useState, useEffect, useRef } from 'react';

export const usePersonality = () => {
  const [personality, setPersonality] = useState('calm');
  const scrollDepth = useRef(0);
  const clickRates = useRef([]);
  const lastClickTime = useRef(null);

  const evaluatePersonality = () => {
    let newPersonality = 'calm';
    
    // If the user clicks very rapidly on average
    if (clickRates.current.length >= 8) {
      const avg = clickRates.current.reduce((a, b) => a + b, 0) / clickRates.current.length;
      if (avg < 500) {
        newPersonality = 'chaotic';
      }
    }
    
    // If they haven't been aggressively clicking, but scroll very far down to explore panels
    if (newPersonality === 'calm' && scrollDepth.current > 75) {
      newPersonality = 'curious';
    }

    setPersonality(prev => {
        if (prev !== newPersonality) {
            localStorage.setItem('userPersonality', newPersonality);
            return newPersonality;
        }
        return prev;
    });
  };

  useEffect(() => {
    // Restore past personality on boot
    const stored = localStorage.getItem('userPersonality');
    if (stored) setPersonality(stored);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const depth = (scrollY / docHeight) * 100;
        if (depth > scrollDepth.current) {
          scrollDepth.current = depth;
          evaluatePersonality();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePersonalityClick = () => {
    const now = Date.now();
    if (lastClickTime.current) {
      const diff = now - lastClickTime.current;
      clickRates.current.push(diff);
      if (clickRates.current.length > 10) {
        clickRates.current.shift();
      }
    }
    lastClickTime.current = now;
    evaluatePersonality();
  };

  return { personality, handlePersonalityClick };
};
