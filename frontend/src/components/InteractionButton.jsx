const InteractionButton = ({ onClick, mood, isHeliEvac }) => {
  const getButtonStyles = () => {
    switch (mood) {
      case 'calm': return 'bg-white text-slate-800 border block mx-auto border-slate-200 hover:bg-slate-50 hover:-translate-y-1';
      case 'weird': return 'bg-[#ff479c] text-white border-2 border-dashed border-[#2c3e50] hover:rotate-6 hover:scale-110';
      case 'chaos': return 'bg-transparent text-[#0f0] border-4 border-[#f0f] hover:bg-[#f0f] hover:text-black hover:skew-x-12 animate-[glitch_0.5s_infinite]';
      default: return 'bg-white text-black';
    }
  };

  return (
    <div className="my-8 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 rounded-full" />
      <button 
        onClick={onClick}
        disabled={isHeliEvac}
        className={`relative px-12 py-6 text-2xl font-bold rounded-full transition-all duration-300 shadow-xl select-none ${getButtonStyles()} ${isHeliEvac ? 'animate-[fallAway_2s_forwards] pointer-events-none' : ''}`}
      >
        {mood === 'chaos' ? 'D O N T  C L I C K !' : 'Do Something'}
      </button>
    </div>
  );
};
export default InteractionButton;
