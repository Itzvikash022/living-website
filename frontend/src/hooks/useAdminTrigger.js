import { useState, useEffect } from 'react';

export const useAdminTrigger = () => {
    const [leftClicks, setLeftClicks] = useState(0);
    const [rightClicks, setRightClicks] = useState(0);
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    const hitLeft = () => setLeftClicks(prev => prev + 1);
    const hitRight = () => setRightClicks(prev => prev + 1);

    useEffect(() => {
        // Unlock sequence maps successfully bounding triggers behind exact combination nodes
        if (leftClicks === 6 && rightClicks === 9) {
            setShowAdminPanel(true);
            setLeftClicks(0); // Reset cleanly
            setRightClicks(0);
        }
        
        // Timeout cleanup resets attempts dynamically if sequences fail midway
        const timer = setTimeout(() => {
             if(leftClicks > 0 || rightClicks > 0) {
                 setLeftClicks(0);
                 setRightClicks(0);
             }
        }, 5000); // Sequence must be inputted within 5 seconds natively
        
        return () => clearTimeout(timer);
    }, [leftClicks, rightClicks]);

    const closeAdmin = () => setShowAdminPanel(false);

    return { showAdminPanel, hitLeft, hitRight, closeAdmin };
};
