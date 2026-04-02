import { useState, useEffect, useRef } from 'react';

export const useHiddenSecrets = () => {
  const [unlockedSecrets, setUnlockedSecrets] = useState([]);
  const [secretMessage, setSecretMessage] = useState('');
  const clickTimestamps = useRef([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('unlockedSecrets') || '[]');
      setUnlockedSecrets(stored);
    } catch {
      // ignore JSON format issues gracefully
    }
  }, []);

  const triggerSecret = (id, message) => {
    setUnlockedSecrets(prev => {
      if (prev.includes(id)) return prev;
      
      const next = [...prev, id];
      localStorage.setItem('unlockedSecrets', JSON.stringify(next));
      
      // Temporary toast text
      setSecretMessage(message);
      setTimeout(() => setSecretMessage(''), 6000);
      
      return next;
    });
  };

  const handleInteractionClick = () => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    
    // Maintain max pool of 5
    if (clickTimestamps.current.length > 5) {
      clickTimestamps.current.shift();
    }
    
    if (clickTimestamps.current.length === 5) {
      const timeDiff = clickTimestamps.current[4] - clickTimestamps.current[0];
      // 5 clicks within 1000ms is fairly fast!
      if (timeDiff < 1000) { 
        triggerSecret('rapid_fire', ">> OVERLOAD DETECTED. SPEED THRESHOLD BROKEN. <<");
      }
    }
  };

  const handleInvisibleAreaClick = () => {
    triggerSecret('hidden_node', ">> YOU FOUND THE BLIND SPOT. <<");
  };

  // The ultimate reward unlocks if multiple secrets are chained
  const hasSecretTheme = unlockedSecrets.includes('rapid_fire') && unlockedSecrets.includes('hidden_node');

  return { secretMessage, hasSecretTheme, handleInteractionClick, handleInvisibleAreaClick };
};
