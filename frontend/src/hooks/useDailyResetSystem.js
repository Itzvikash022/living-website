import { useState, useEffect } from 'react';

export const useDailyResetSystem = () => {
    const [timeUntilReset, setTimeUntilReset] = useState('');
    const [showMidnightEvent, setShowMidnightEvent] = useState(false);

    useEffect(() => {
        const checkReset = () => {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const diffMs = tomorrow - now;
            
            // Format HH:MM:SS
            const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diffMs / 1000 / 60) % 60);
            const seconds = Math.floor((diffMs / 1000) % 60);
            setTimeUntilReset(
              `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );

            const todayStr = now.toDateString();
            const lastResetDate = localStorage.getItem('dailyDate');
            
            // Detect midnight turnover globally live
            if (lastResetDate && lastResetDate !== todayStr) {
                // Ensure lock fires exactly once per day immediately
                localStorage.setItem('dailyDate', todayStr);
                
                setShowMidnightEvent(true);
                
                // Allow tracking hooks to observe event and clear locally
                window.dispatchEvent(new Event('dailyReset'));
                
                setTimeout(() => {
                    setShowMidnightEvent(false);
                }, 5000); // 5 second flash
            }
        };

        checkReset(); // Initial run
        const interval = setInterval(checkReset, 1000); // Poll tracking every second
        return () => clearInterval(interval);
    }, []);

    return { timeUntilReset, showMidnightEvent };
};
