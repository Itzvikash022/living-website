import { useEffect } from 'react';

const AchievementToast = ({ achievements, onDismiss }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex flex-col gap-4 pointer-events-none">
      {achievements.map((achievement) => (
        <ToastItem key={achievement.id} achievement={achievement} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem = ({ achievement, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(achievement.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [achievement, onDismiss]);

  return (
    <div className="max-w-sm animate-in slide-in-from-right-8 fade-in bg-yellow-400 text-black p-4 rounded-xl shadow-2xl border-2 border-yellow-600 flex items-center gap-4 pointer-events-auto transition-transform">
      <div className="text-4xl drop-shadow-md">🏆</div>
      <div>
        <h4 className="font-black text-lg leading-tight uppercase tracking-wide">Achievement Unlocked!</h4>
        <p className="font-semibold text-black/80">{achievement.title}</p>
      </div>
    </div>
  );
};

export default AchievementToast;
