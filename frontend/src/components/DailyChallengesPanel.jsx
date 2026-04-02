const DailyChallengesPanel = ({ challenges, tracking, isCompleted, timeUntilReset }) => {
  if (!challenges || challenges.length === 0) return null;

  return (
    <div className="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-inner">
      <div className="flex border-b border-black/10 pb-4 mb-6 justify-between items-end">
        <div className="flex flex-col text-left">
           <h3 className="text-sm uppercase tracking-[0.2em] opacity-60 font-bold text-inherit">Daily Bounties</h3>
           {timeUntilReset && <div className="text-[10px] font-mono opacity-50 mt-1 uppercase">Reset in {timeUntilReset}</div>}
        </div>
        {isCompleted && (
          <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-black uppercase rounded-full animate-pulse shadow-xl tracking-wider">
            Champion
          </span>
        )}
      </div>
      
      <div className="flex flex-col gap-5 text-left">
        {challenges.map((ach) => {
          let current = 0;
          if (ach.id === 'daily_clicks_20') current = tracking.clicks;
          else if (ach.id === 'daily_chaos') current = tracking.chaos;
          else if (ach.id === 'daily_night') current = tracking.night;
          
          let progress = Math.min((current / ach.goal) * 100, 100);
          const isDone = progress >= 100;
          
          return (
            <div key={ach.id} className="w-full">
              <div className="flex justify-between text-sm mb-2 opacity-90 font-medium">
                <span>{ach.title}</span>
                <span className="font-mono">{Math.min(current, ach.goal)} / {ach.goal}</span>
              </div>
              <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full transition-all duration-700 ease-out ${isDone ? 'bg-green-400' : 'bg-blue-400 rounded-r-full'}`} 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyChallengesPanel;
