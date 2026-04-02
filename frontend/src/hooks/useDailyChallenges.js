import { useState, useEffect } from 'react';

const CHALLENGE_POOL = [
  { id: 'daily_clicks_20', title: 'Click 20 times today', goal: 20 },
  { id: 'daily_chaos', title: 'Trigger Chaos Mode', goal: 1 },
  { id: 'daily_night', title: 'Ping during the night (8PM-6AM)', goal: 1 },
];

export const useDailyChallenges = (globalState) => {
  const [challenges, setChallenges] = useState([]);
  const [dailyTracking, setDailyTracking] = useState({ clicks: 0, night: 0, chaos: 0 });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
     const checkDateProgress = () => {
         const today = new Date().toDateString();
         const storedDate = localStorage.getItem('dailyDate');
         
         if (storedDate !== today) {
             localStorage.setItem('dailyDate', today);
             localStorage.setItem('dailyTracking', JSON.stringify({ clicks: 0, night: 0, chaos: 0 }));
             localStorage.setItem('dailyChallengesComplete', 'false');
             setDailyTracking({ clicks: 0, night: 0, chaos: 0 });
             setIsCompleted(false);
         } else {
             const t = JSON.parse(localStorage.getItem('dailyTracking') || '{"clicks":0,"night":0,"chaos":0}');
             setDailyTracking(t);
             setIsCompleted(localStorage.getItem('dailyChallengesComplete') === 'true');
         }
     };
     
     checkDateProgress();
     window.addEventListener('dailyReset', checkDateProgress);
     
     setChallenges(CHALLENGE_POOL);
     
     return () => window.removeEventListener('dailyReset', checkDateProgress);
  }, []);

  const incrementDailyClicks = () => {
       setDailyTracking(prev => {
          const next = { ...prev, clicks: prev.clicks + 1 };
          localStorage.setItem('dailyTracking', JSON.stringify(next));
          return next;
       });
  };

  useEffect(() => {
     const currentHour = new Date().getHours();
     if (currentHour >= 20 || currentHour < 6) {
        setDailyTracking(p => {
           if (p.night >= 1) return p;
           const next = { ...p, night: 1 };
           localStorage.setItem('dailyTracking', JSON.stringify(next));
           return next;
        });
     }
  }, []);

  useEffect(() => {
     if (globalState.mood === 'chaos') {
         setDailyTracking(p => {
           if (p.chaos >= 1) return p;
           const next = { ...p, chaos: 1 };
           localStorage.setItem('dailyTracking', JSON.stringify(next));
           return next;
        });
     }
  }, [globalState.mood]);

  useEffect(() => {
     if (challenges.length > 0 && !isCompleted) {
        const c1 = dailyTracking.clicks >= 20;
        const c2 = dailyTracking.chaos >= 1;
        const c3 = dailyTracking.night >= 1;
        if (c1 && c2 && c3) {
            setIsCompleted(true);
            localStorage.setItem('dailyChallengesComplete', 'true');
        }
     }
  }, [dailyTracking, challenges, isCompleted]);

  return { challenges, dailyTracking, incrementDailyClicks, isCompleted };
};
