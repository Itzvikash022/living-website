const ChaosProgressBar = ({ globalClicks = 0 }) => {
  const maxClicks = 200;
  const rawProgress = (globalClicks / maxClicks) * 100;
  const progress = Math.min(rawProgress, 100);
  const isChaos = globalClicks > maxClicks;

  return (
    <div className="w-full max-w-sm mx-auto my-4 flex flex-col gap-2 relative z-50 pointer-events-none">
      <div className="flex justify-between items-end text-[10px] font-mono font-bold tracking-[0.2em] opacity-80 uppercase">
        <span>Global Entropy</span>
        <span>{globalClicks} / {maxClicks}</span>
      </div>
      
      <div className={`relative h-2 w-full bg-black/40 rounded-full border ${isChaos ? 'border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.8)]' : 'border-white/10 shadow-inner'} overflow-hidden transition-all duration-1000`}>
        {/* Animated Background Fill */}
        <div 
          className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-out 
            ${globalClicks < 50 ? 'bg-blue-300' : globalClicks <= 200 ? 'bg-purple-500' : 'bg-red-600 animate-pulse'}
          `}
          style={{ width: `${progress}%` }}
        />
        
        {/* Boundary Segment Markers */}
        <div className="absolute left-[25%] top-0 h-full w-px bg-white/50" title="Weird Boundary (50)" />
      </div>
      
      <div className="flex justify-between text-[8px] font-mono opacity-50 uppercase tracking-widest mt-1">
        <span>Calm</span>
        <div className="ml-10">Weird</div>
        <span>Chaos</span>
      </div>
      
      {isChaos && (
         <div className="text-center text-red-500 text-[10px] font-black tracking-[0.4em] font-mono mt-2 animate-bounce uppercase drop-shadow-[0_0_10px_red]">
            <span className="opacity-50">{"<<"}</span> MAX ENTROPY ACHIEVED <span className="opacity-50">{">>"}</span>
         </div>
      )}
    </div>
  );
};

export default ChaosProgressBar;
