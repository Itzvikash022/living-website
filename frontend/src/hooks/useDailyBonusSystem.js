import { useState, useEffect } from 'react';

export const useDailyBonusSystem = () => {
    const [streakCount, setStreakCount] = useState(0);
    const [showBonusModal, setShowBonusModal] = useState(false);
    const [rewardPayload, setRewardPayload] = useState(null);

    useEffect(() => {
        const checkDailyBonus = () => {
            const today = new Date().toISOString().split("T")[0];
            const storedDate = localStorage.getItem('lastBonusDate');
            let currentStreak = parseInt(localStorage.getItem('streakCount') || "0", 10);

            if (!storedDate) {
                // First ever visit
                currentStreak = 1;
            } else if (storedDate === today) {
                // Already claimed today
                return; 
            } else {
                // Check if streak is broken
                const lastDate = new Date(storedDate);
                const todayDate = new Date(today);
                const diffTime = Math.abs(todayDate - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

                if (diffDays === 1) {
                    currentStreak += 1;
                } else {
                    currentStreak = 1; // Streak broken structurally
                }
            }

            // Reward Evaluation Matrix mapping milestone constraints
            let rewardType = "bonus_clicks";
            let rewardAmount = 10;
            let rewardDesc = "+10 Virtual Clicks";

            if (currentStreak % 7 === 0) {
                rewardType = "theme_unlock";
                rewardDesc = "MEME STORM OVERRIDE UNLOCKED";
                
                // Track permanent CSS theme bounds actively via existing standard
                const unlocks = JSON.parse(localStorage.getItem('unlockedRewards') || '[]');
                if (!unlocks.includes('theme_meme_storm')) {
                    localStorage.setItem('unlockedRewards', JSON.stringify([...unlocks, 'theme_meme_storm']));
                }
            } else if (currentStreak % 3 === 0) {
                rewardType = "chaos_boost";
                rewardDesc = "Temporary Intensity Push";
            }

            // Push State natively
            setStreakCount(currentStreak);
            setRewardPayload({ type: rewardType, desc: rewardDesc, amount: rewardAmount });
            setShowBonusModal(true);
            
            // Lock date physically preventing multiple rerolls per 24 hours
            localStorage.setItem('lastBonusDate', today);
            localStorage.setItem('streakCount', currentStreak.toString());
        };

        checkDailyBonus();
    }, []);

    const claimBonus = () => {
        setShowBonusModal(false);
        // If it's pure clicks, we simulate it directly via userState logic explicitly bridging App.jsx limits.
        if (rewardPayload && rewardPayload.type === 'bonus_clicks') {
            const currentClicks = parseInt(localStorage.getItem('lifetime_clicks') || '0', 10);
            localStorage.setItem('lifetime_clicks', (currentClicks + rewardPayload.amount).toString());
        }
    };

    return { showBonusModal, streakCount, rewardPayload, claimBonus };
};
