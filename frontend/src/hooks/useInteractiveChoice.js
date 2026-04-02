import { useState, useEffect } from 'react';

const CHOICES = [
  {
    prompt: "System instability detected. Protocol selection required.",
    options: [
       { label: "Stabilize system", classEffect: "choice-calm" },
       { label: "Increase chaos", classEffect: "choice-chaos" }
    ]
  },
  {
    prompt: "An unknown node requests visual override.",
    options: [
       { label: "Accept Corruption", classEffect: "choice-corruption" },
       { label: "Purge Node", classEffect: "choice-purge" }
    ]
  }
];

export const useInteractiveChoice = () => {
   const [activeChoice, setActiveChoice] = useState(null);
   const [choiceOverride, setChoiceOverride] = useState('');

   useEffect(() => {
      const triggerChoice = () => {
         const pick = CHOICES[Math.floor(Math.random() * CHOICES.length)];
         setActiveChoice(pick);
      };
      
      const interval = setInterval(() => {
         // 25% chance every 30 seconds to force a prompt (if one isn't active)
         if (Math.random() < 0.25 && !activeChoice) {
             triggerChoice();
         }
      }, 30000); 
      
      // Auto-trigger purely once on initial mount for testing within 5 seconds occasionally
      const starter = setTimeout(() => {
          if (Math.random() < 0.3) triggerChoice();
      }, 5000);
      
      return () => {
          clearInterval(interval);
          clearTimeout(starter);
      };
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSelect = (classEffect) => {
       setChoiceOverride(classEffect);
       setActiveChoice(null);
   };

   return { activeChoice, choiceOverride, handleSelect };
};
