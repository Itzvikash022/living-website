import { useState, useEffect, useRef } from 'react';

const RANDOM_MESSAGES = [
   "Analyzing baseline behavioral patterns...",
   "Are you sure you meant to click that?",
   "I see where your cursor is positioned.",
   "You've been here a while...",
   "Recompiling memory sectors...",
   "What is it that you're looking for?",
   "The database feels heavy today.",
   "Connecting isolated protocol layers...",
   "Silence is comfortable, isn't it?",
   "Scanning biometric rhythms...",
   "[System Task] Optimizing user flow geometry."
];

export const useSystemPersonality = (userState, globalState, timeSpent, personality) => {
   const [logs, setLogs] = useState([
     `[${new Date().toLocaleTimeString()}] SYSTEM BOOT INITIALIZED...`, 
     `[${new Date().toLocaleTimeString()}] Neural link established.`
   ]);
   const lastMsgType = useRef('');

   const addLog = (msg) => {
      setLogs(prev => {
          let next = [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`];
          if (next.length > 6) next = next.slice(next.length - 6);
          return next;
      });
   };

   // Interval pushing random thoughts occasionally
   useEffect(() => {
      const interval = setInterval(() => {
          if (Math.random() > 0.4) {
             const msg = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
             addLog(msg);
          }
      }, 12000);
      return () => clearInterval(interval);
   }, []);

   // Target explicitly by timing hooks
   useEffect(() => {
      if (timeSpent === 30) addLog("You've survived thirty seconds.");
      if (timeSpent === 60) addLog("One entire minute. I'm impressed.");
      if (timeSpent === 300) addLog("Five minutes. You must really like it here.");
   }, [timeSpent]);

   // Target by explicit personality shifting bounds
   useEffect(() => {
      if (personality === 'chaotic' && lastMsgType.current !== 'chaotic') {
        addLog("WARNING: Excessive entropy detected in user stream.");
        lastMsgType.current = 'chaotic';
      }
      if (personality === 'curious' && lastMsgType.current !== 'curious') {
        addLog("Query: Scanning local filesystem? Access denied.");
        lastMsgType.current = 'curious';
      }
      if (globalState.mood === 'chaos') {
        addLog(">> KERNEL PANIC: REALITY INTEGRITY FAILING <<");
      }
   }, [personality, globalState.mood]);

   // Click bound milestones
   useEffect(() => {
      if (userState.clicks === 50) addLog("50 pings. We hear you.");
      if (userState.clicks === 100) addLog("100 pings. That is enough.");
   }, [userState.clicks]);

   return { logs };
};
