import { useState, useRef, useEffect } from 'react';
import ROASTS from '../data/roasts.json';

const MEME_URLS = [
    'https://cataas.com/cat', 
    'https://cataas.com/cat/cute',
    'https://placedog.net/300/300',
    'https://picsum.photos/300/300?random',
    'https://cataas.com/cat/gif'
];

export const useRoaster = (globalState, timeSpent) => {
    const [activeRoasts, setActiveRoasts] = useState([]);
    const historyBuffer = useRef(new Set());
    
    // Physics tracking caches natively isolating performance limits
    const lastClickTime = useRef(Date.now());
    const consecutiveFastClicks = useRef(0);
    const idleTime = useRef(0);
    
    // Determine the safest pseudo-random unsaid message.
    const getUniqueRoast = (category) => {
        const payload = ROASTS[category];
        if (!payload) return null;
        
        let attempts = 0;
        let selected = payload[Math.floor(Math.random() * payload.length)];
        
        // Prevent repeating identical toasts natively mapping 10 loops maximum ensuring it safely breaks structurally
        while (historyBuffer.current.has(selected) && attempts < 10) {
            selected = payload[Math.floor(Math.random() * payload.length)];
            attempts++;
        }
        
        // Push onto history buffer, ensuring it doesn't leak memory linearly bounding to 50 caches max natively.
        historyBuffer.current.add(selected);
        if (historyBuffer.current.size > 50) {
            const first = historyBuffer.current.values().next().value;
            historyBuffer.current.delete(first);
        }
        
        return selected;
    };

    const triggerRoast = (category, attachMeme = false) => {
        // Hard limits active roasts preventing DOM freezing loops rendering natively
        if (activeRoasts.length >= 20) return;
        
        const message = getUniqueRoast(category);
        if (!message) return;

        let meme = null;
        if (attachMeme || Math.random() < 0.25) { 
            // 25% chance ANY roast spawns a combo, OR forced by passing the parameter
            const specificMessage = getUniqueRoast('meme_combo');
            meme = {
               url: `${MEME_URLS[Math.floor(Math.random() * MEME_URLS.length)]}?${Date.now()}`,
               desc: specificMessage
            };
        }

        const newRoast = {
            id: `roast_${Date.now()}_${Math.random()}`,
            text: meme ? meme.desc : message,
            meme: meme,
            category: category,
            x: Math.floor(Math.random() * 60) + 10, // Maps bounds dynamically over 10vw to 70vw
            y: Math.floor(Math.random() * 60) + 10  // Maps bounds dynamically over 10vh to 70vh
        };

        setActiveRoasts(prev => [...prev, newRoast]);
    };

    const dismissRoast = (id) => {
        setActiveRoasts(prev => prev.filter(r => r.id !== id));
    };

    // Global behavior evaluator loop natively parsing user time
    useEffect(() => {
        const interval = setInterval(() => {
            idleTime.current += 1000;
            if (idleTime.current === 15000) {
                triggerRoast('idle_user');
            } else if (timeSpent > 300 && idleTime.current % 60000 === 0) {
                 triggerRoast('long_session_user');   
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timeSpent, activeRoasts.length]);

    // Externally bindable function structurally parsing discrete actions accurately
    const evaluateAction = () => {
        const now = Date.now();
        const delta = now - lastClickTime.current;
        lastClickTime.current = now;
        
        // Reset idle blocks structurally overriding native interval parameters
        if (idleTime.current > 20000) {
             triggerRoast('returning_user');
        }
        idleTime.current = 0;

        if (delta < 300) {
            consecutiveFastClicks.current += 1;
            if (consecutiveFastClicks.current === 5) {
               triggerRoast(Math.random() > 0.5 ? 'fast_clicking' : 'over_clicking_addict');
            } else if (consecutiveFastClicks.current === 15) {
               triggerRoast('chaos_enjoyer', true); // Mega spamming? Force a meme natively!
               consecutiveFastClicks.current = 0; // Wrap tracking correctly.
            }
        } else if (delta > 3000) {
            consecutiveFastClicks.current = 0;
            if (Math.random() < 0.1) triggerRoast('hesitation_mode');
        } else {
            // Evaluated completely random pseudo checks tracking standard bounds.
            consecutiveFastClicks.current = 0;
            if (globalState.activeEvent === 'fake_warning' && Math.random() < 0.4) {
                triggerRoast('ignored_warning');
            } else if (Math.random() < 0.05) {
                triggerRoast('random_clicker');
            } else if (Math.random() < 0.05) {
                triggerRoast('trying_to_break_site');
            }
        }
    };

    return { activeRoasts, evaluateAction, dismissRoast };
};
