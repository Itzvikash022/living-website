import { useState, useEffect } from 'react';

export const useSuperRareEvents = (globalEvent) => {
    const [activeRareEvent, setActiveRareEvent] = useState(null);

    // Track Global Event Hooks overriding the logic natively
    useEffect(() => {
        if (globalEvent && globalEvent.startsWith('rare_')) {
            setActiveRareEvent(globalEvent);
        } else if (activeRareEvent && !globalEvent) {
            // Persist the state organically natively locally until the user physically resolves it
            // Backend auto-clears after 15 seconds, but we want glass/crash to stay until cleared locally.
        }
    }, [globalEvent]);

    const clearRareEvent = () => setActiveRareEvent(null);

    // Pseudo-random local trigger bound internally measuring extreme RNG
    const rollForRareEvent = () => {
        if (activeRareEvent) return true; // Block subsequent triggers
        
        // 0.2% probability of occurring upon interaction algorithms mapping extreme limits
        if (Math.random() < 0.002) {
            const events = ['rare_crash', 'rare_glass', 'rare_stop_it', 'rare_heli', 'rare_rickroll'];
            const drawn = events[Math.floor(Math.random() * events.length)];
            setActiveRareEvent(drawn);
            return true;
        }
        return false;
    };

    return { activeRareEvent, clearRareEvent, rollForRareEvent };
};
