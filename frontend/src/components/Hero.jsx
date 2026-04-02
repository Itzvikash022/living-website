const Hero = ({ mood, awarenessMessage, personality = 'calm', proceduralMessage }) => {
  const getSubtext = () => {
    if (personality === 'chaotic') return "You're moving too fast for this realm.";
    if (personality === 'curious') return "Scanning deeper node hierarchies...";

    switch (mood) {
      case 'calm':
        return "Everything is peaceful.";
      case 'weird':
        return "Something feels off...";
      case 'chaos':
        return "People are breaking the system...";
      default:
        return "Reality is stable.";
    }
  };

  const getTitleClass = () => {
    if (mood === 'chaos') return 'text-6xl font-black text-rose-500 animate-[shake_0.2s_ease-in-out_infinite] tracking-tighter';
    if (mood === 'weird') return 'text-6xl font-bold tracking-widest text-[#2c3e50] animate-[float_4s_ease-in-out_infinite]';
    return 'text-6xl font-light text-slate-700 tracking-tight';
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center pointer-events-none p-6">
      <h1 className={`${getTitleClass()} transition-all duration-700 uppercase drop-shadow-xl`}>
        Living Website
      </h1>
      <p className={`text-xl font-medium transition-colors duration-700 ${mood === 'chaos' ? 'text-red-400 font-mono tracking-widest' : 'text-slate-500'}`}>
        {getSubtext()}
      </p>
      {awarenessMessage && (
        <p className="mt-4 text-sm font-mono opacity-50 tracking-widest text-inherit animate-pulse">
           * {awarenessMessage} *
        </p>
      )}
      
      {proceduralMessage && (
         <div className="text-inherit font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mt-4 opacity-60 drop-shadow-md select-none transition-all duration-1000">
            {proceduralMessage}
         </div>
      )}
    </div>
  );
};

export default Hero;
