import { useState, useRef, useEffect } from 'react';

export const useCatastrophicGlitch = () => {
    const [isGlitching, setIsGlitching] = useState(false);
    const [hasAfterEffect, setHasAfterEffect] = useState(false);
    const glitchTimeout = useRef(null);
    const afterEffectTimeout = useRef(null);

    const triggerGlitchProbability = () => {
        // Strict ~2% bounds calculated across concurrent input logic mapping traps.
        if (!isGlitching && Math.random() < 0.02) {
            setIsGlitching(true);
            setHasAfterEffect(false);

            // Sever standard interaction bounds for roughly 2.5 seconds creating brief panic.
            glitchTimeout.current = setTimeout(() => {
                setIsGlitching(false);
                setHasAfterEffect(true);
                
                // Trail minor structural effects after standard inputs recover simulating hardware faults.
                afterEffectTimeout.current = setTimeout(() => {
                    setHasAfterEffect(false);
                }, 5000);
            }, 2500);

            return true; // Used to sever sequential execution cascades on standard click endpoints
        }
        return false;
    };

    // Clean unmount memory leaks
    useEffect(() => {
        return () => {
            if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
            if (afterEffectTimeout.current) clearTimeout(afterEffectTimeout.current);
        };
    }, []);

    return { isGlitching, hasAfterEffect, triggerGlitchProbability };
};
