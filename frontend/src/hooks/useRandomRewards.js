import { useState, useEffect } from 'react';

const REWARDS = [
  { id: 'theme_matrix', label: 'Matrix Protocol Overwrite', type: 'theme' },
  { id: 'theme_abyss', label: 'Abyssal Darkness Unlocked', type: 'theme' },
  { id: 'theme_golden', label: 'Gold Core Restored', type: 'theme' },
  { id: 'msg_void', label: '"Something is looking back at you."', type: 'message' },
  { id: 'msg_static', label: '"Bzzzzt... Data stream corrupted."', type: 'message' }
];

export const useRandomRewards = () => {
    const [unlockedRewards, setUnlockedRewards] = useState([]);
    const [recentReward, setRecentReward] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('randomRewards') || '[]');
        setUnlockedRewards(stored);
    }, []);

    const handleRewardRoll = () => {
        // 8% chance to roll a reward upon user action triggers
        if (Math.random() < 0.08) {
            const unobtained = REWARDS.filter(r => !unlockedRewards.includes(r.id));
            
            if (unobtained.length > 0) {
                const picked = unobtained[Math.floor(Math.random() * unobtained.length)];
                
                const nextUnlocked = [...unlockedRewards, picked.id];
                setUnlockedRewards(nextUnlocked);
                localStorage.setItem('randomRewards', JSON.stringify(nextUnlocked));
                
                setRecentReward(picked);
                setTimeout(() => setRecentReward(null), 6000); // Popup lifecycle
            } else {
                // Generic spam check once fully maxed
                if (Math.random() < 0.2) {
                    setRecentReward({ id: 'msg_repeat', label: '"The well is empty... Keep digging."', type: 'message' });
                    setTimeout(() => setRecentReward(null), 4000);
                }
            }
        }
    };

    const clearReward = () => setRecentReward(null);

    return { unlockedRewards, recentReward, handleRewardRoll, clearReward };
};
