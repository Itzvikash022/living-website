import { ACHIEVEMENTS_LIST } from '../hooks/useAchievements';

const AchievementsPanel = ({ unlocked }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-black/5 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-inner">
      <h3 className="text-sm uppercase tracking-[0.2em] opacity-60 font-bold mb-6 text-center text-inherit">Achievements</h3>
      <div className="grid grid-cols-2 gap-4 text-left">
        {ACHIEVEMENTS_LIST.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id);
          return (
            <div key={ach.id} className={`p-4 rounded-2xl border transition-all ${isUnlocked ? 'bg-yellow-400/20 border-yellow-400/50 shadow-inner' : 'bg-black/10 border-black/5 opacity-50 grayscale'}`}>
              <div className="text-2xl mb-2">{isUnlocked ? '🏆' : '🔒'}</div>
              <h4 className="font-bold text-sm tracking-wide text-inherit leading-tight">{ach.title}</h4>
              <p className="text-xs opacity-70 mt-1">{ach.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AchievementsPanel;
