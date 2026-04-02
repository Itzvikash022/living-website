import { useState, useEffect, useCallback } from 'react';

export const ACHIEVEMENTS_LIST = [
  { id: 'first_click', title: 'First Click', description: 'You have taken your first step.' },
  { id: 'curious', title: 'Curious', description: 'Reached 10 clicks.' },
  { id: 'destroyer', title: 'Destroyer', description: 'Triggered Chaos Mode.' },
  { id: 'nightwalker', title: 'Nightwalker', description: 'Visited during the dead of night (8PM - 6AM).' },
];

export const useAchievements = (globalState, userState) => {
  const [unlocked, setUnlocked] = useState([]);
  const [newUnlocks, setNewUnlocks] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);

  // Initialize from local storage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
      setUnlocked(stored);
      
      const storedTime = parseInt(localStorage.getItem('timeSpent') || '0', 10);
      setTimeSpent(storedTime);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Time tracker interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => {
        const next = prev + 1;
        localStorage.setItem('timeSpent', next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Main unlock logic checks
  useEffect(() => {
    const checkUnlock = (id) => {
      setUnlocked(prevUnlocked => {
        if (prevUnlocked.includes(id)) return prevUnlocked;
        
        const list = [...prevUnlocked, id];
        localStorage.setItem('unlockedAchievements', JSON.stringify(list));
        
        setNewUnlocks(prevNewUnlocks => {
          if (prevNewUnlocks.some(a => a.id === id)) return prevNewUnlocks;
          return [...prevNewUnlocks, ACHIEVEMENTS_LIST.find(a => a.id === id)];
        });
        
        return list;
      });
    };

    if (userState.clicks >= 1) checkUnlock('first_click');
    if (userState.clicks >= 10) checkUnlock('curious');
    if (globalState.mood === 'chaos') checkUnlock('destroyer');

    const hour = new Date().getHours();
    if (hour >= 20 || hour < 6) checkUnlock('nightwalker');

  }, [userState.clicks, globalState.mood]);

  const clearNewUnlock = useCallback((id) => {
    setNewUnlocks(prev => prev.filter(a => a.id !== id));
  }, []);

  return { unlocked, newUnlocks, clearNewUnlock, timeSpent };
};
