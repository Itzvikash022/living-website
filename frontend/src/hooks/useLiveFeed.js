import { useState, useEffect, useRef } from 'react';

const SIMULATED_EVENTS = [
  "Another user clicked.",
  "Someone discovered a secret.",
  "An anomaly was detected.",
  "A new user connected from the void.",
  "Ping received from sector 7.",
  "A shadow crossed the screen."
];

export const useLiveFeed = (globalState) => {
   const [feed, setFeed] = useState([{ id: Date.now(), text: "System initialized. Listening to network..." }]);
   const lastMood = useRef(globalState.mood);

   const addEvent = (text) => {
      setFeed(prev => {
          const next = [...prev, { id: Date.now(), text }];
          if (next.length > 8) return next.slice(next.length - 8);
          return next;
      });
   };

   // Interval simulating active concurrent connections pushing pings
   useEffect(() => {
      const interval = setInterval(() => {
         if (Math.random() < 0.25) {
            const event = SIMULATED_EVENTS[Math.floor(Math.random() * SIMULATED_EVENTS.length)];
            addEvent(event);
         }
      }, 4000); 
      return () => clearInterval(interval);
   }, []);

   // Watch for global mode shifts to push into local feed natively natively
   useEffect(() => {
      if (globalState.mood === 'chaos' && lastMood.current !== 'chaos') {
          addEvent("⚠ WARNING: Someone pushed the network into CHAOS mode!");
      }
      lastMood.current = globalState.mood;
   }, [globalState.mood]);
   
   // Watch actual activeEvent changes
   useEffect(() => {
      if (globalState.activeEvent) {
          addEvent("⚠ GLOBAL: Reality override triggered manually.");
      }
   }, [globalState.activeEvent]);

   return { feed, addEvent };
};
