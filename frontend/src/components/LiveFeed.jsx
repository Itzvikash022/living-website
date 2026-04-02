const LiveFeed = ({ feed, isEmbedded = false }) => {
  if (!feed || feed.length === 0) return null;

  // We reverse the array to show the most recent logs at the top
  const displayFeed = [...feed].reverse();

  return (
    <div className={`${isEmbedded ? 'w-full' : 'fixed top-20 right-4 w-48 md:w-64'} bg-black/40 border border-white/10 rounded overflow-hidden shadow-2xl backdrop-blur z-[200] pointer-events-none`}>
       <div className="bg-white/10 px-3 py-2 text-[10px] uppercase font-bold tracking-[0.2em] text-white/60 border-b border-white/10 flex justify-between items-center">
         <span>Live Network</span>
         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
       </div>
       <div className="p-3 flex flex-col gap-2 h-48 overflow-y-hidden relative">
          {displayFeed.map(item => (
              <div 
                key={item.id} 
                className="text-[10px] md:text-xs font-mono text-white/80 animate-slideInRight leading-tight border-l-2 border-white/20 pl-2"
              >
                {item.text}
              </div>
          ))}
          {/* Gradient fade mask at bottom text block */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
       </div>
    </div>
  );
};

export default LiveFeed;
