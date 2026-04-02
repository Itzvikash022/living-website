import { useState, useEffect, useRef } from 'react';

const MEME_URLS = [
    'https://cataas.com/cat', 
    'https://cataas.com/cat/cute',
    'https://placedog.net/300/300',
    'https://picsum.photos/300/300?random',
    'https://cataas.com/cat/gif'
];

const BEHAVIORS = ['meme-float', 'meme-bounce', 'spin', 'meme-shake'];

export const useMemeStorm = (globalClicks) => {
    const [activeMemes, setActiveMemes] = useState([]);
    const lastTriggeredClick = useRef(0);

    useEffect(() => {
        // Enforce structural limits isolating strictly divisible sequences recursively
        if (globalClicks > 0 && globalClicks % 100 === 0 && globalClicks !== lastTriggeredClick.current) {
            lastTriggeredClick.current = globalClicks;
            
            // Generate structural variations scaling mega properties dynamically
            const isMega = Math.random() < 0.15; 
            const count = isMega ? Math.floor(Math.random() * 15 + 20) : Math.floor(Math.random() * 8 + 3);
            
            const newMemes = Array.from({ length: count }).map((_, i) => ({
                id: `meme_${Date.now()}_${i}`,
                url: `${MEME_URLS[Math.floor(Math.random() * MEME_URLS.length)]}?${Date.now()}${i}`, // Prevent caching locks
                x: Math.random() * 80 + 10, // 10vw to 90vw limits natively
                y: Math.random() * 80 + 10, // 10vh to 90vh limits natively
                behavior: BEHAVIORS[Math.floor(Math.random() * BEHAVIORS.length)],
                duration: isMega ? Math.floor(Math.random() * 4000 + 4000) : Math.floor(Math.random() * 5000 + 3000), 
                rotation: Math.floor(Math.random() * 360),
                scale: Math.random() * 0.8 + 0.6 
            }));

            setActiveMemes(prev => [...prev, ...newMemes]);

            // Assign cleanup limits removing DOM components mapping exactly onto visual durations
            newMemes.forEach(meme => {
                setTimeout(() => {
                    setActiveMemes(prev => prev.filter(m => m.id !== meme.id));
                }, meme.duration);
            });
        }
    }, [globalClicks]);

    return { activeMemes };
};
