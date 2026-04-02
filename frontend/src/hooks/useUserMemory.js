import { useEffect, useState } from 'react';

export const useUserMemory = (userState, globalState) => {
  const [lastVisitTime, setLastVisitTime] = useState(null);
  const [awarenessMessage, setAwarenessMessage] = useState('');
  const [memoryOverrides, setMemoryOverrides] = useState('');

  // Retrieve last visit effectively once on startup
  useEffect(() => {
    const storedLastVisit = localStorage.getItem('lastVisitTime');
    const now = Date.now();
    
    if (storedLastVisit) {
      setLastVisitTime(parseInt(storedLastVisit, 10));
    }
    
    // Update last visit for NEXT session only when they load the page
    localStorage.setItem('lastVisitTime', now.toString());
  }, []);

  // Evaluate Awareness Message
  useEffect(() => {
    if (!lastVisitTime) {
      // First visit ever; basic UI will handle standard greetings
      return;
    }

    const timeSinceLastVisit = Date.now() - lastVisitTime;
    const hoursSince = Math.floor(timeSinceLastVisit / (1000 * 60 * 60));
    
    let message = '';
    let overrides = '';
    
    // Determine memory mood based on historical interactions over their entire lifecycle
    if (userState.clicks >= 100) {
      message = "You like chaos, don't you?";
      overrides = 'veteran-chaos'; 
    } else if (userState.visitCount > 3) {
      message = "You're spending a lot of time here...";
      overrides = 'veteran-loyal';
    } else if (hoursSince > 24) {
      message = "You came back... it's been a while.";
    } else if (hoursSince < 1 && userState.visitCount > 1) {
      message = "You couldn't stay away, could you?";
    } else {
      message = "The system remembers you.";
    }

    setAwarenessMessage(message);
    setMemoryOverrides(overrides);

  }, [lastVisitTime, userState.clicks, userState.visitCount]);

  return { awarenessMessage, memoryOverrides };
};
