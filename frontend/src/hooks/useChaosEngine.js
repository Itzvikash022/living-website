import { useState, useEffect } from 'react';
import { generateProceduralMessage, generateChaosColor, getProceduralEffect } from '../utils/procedural';

export const useChaosEngine = (globalState, userState, timeSpent) => {
    const [chaosState, setChaosState] = useState({
        intensity: 0.0,
        bgColor: '#111',
        fgColor: '#eee',
        effects: '',
        message: ''
    });

    useEffect(() => {
        // Calculate raw mathematical limits binding global physics bounds to local cache arrays
        // Intensity sits tightly between 0.0 and 1.0 scaling infinitely toward the 200 ping maximums.
        const globalScale = Math.min((globalState.totalClicks || 0) / 200, 1);
        const localScale = Math.min((userState.clicks || 0) / 100, 1);
        const timeScale = Math.min(timeSpent / 300, 1);
        
        // Weights: Global drives 60% of absolute chaos intensity, user behavior tracks the rest.
        let intensity = 0;
        if (globalState.totalClicks > 0) {
            let rawIntensity = (globalScale * 0.6) + (localScale * 0.3) + (timeScale * 0.1);
            // Exponential scaling bounds ensuring chaos remains structurally dormant during early sessions softly blooming identically along progression limits.
            rawIntensity = Math.pow(rawIntensity, 1.8);
            intensity = Math.min(Math.max(rawIntensity, 0), 1); 
        } 
        
        // Calculate refresh rate dynamically decreasing limits based on chaos.
        // Calm = updates every ~15 seconds mapping slow pulses.
        // Chaos = aggressively refreshes styles fully every ~2 seconds!
        const shiftRateMs = Math.floor(Math.max(2000, 15000 - (intensity * 13000)));
        
        const shiftState = () => {
             setChaosState({
                 intensity,
                 bgColor: generateChaosColor(intensity, false),
                 fgColor: generateChaosColor(intensity, true),
                 effects: getProceduralEffect(intensity),
                 message: generateProceduralMessage()
             });
        };
        
        shiftState(); 
        
        const interval = setInterval(shiftState, shiftRateMs);
        return () => clearInterval(interval);
        
    }, [globalState.totalClicks, userState.clicks, timeSpent]);

    return chaosState;
};
