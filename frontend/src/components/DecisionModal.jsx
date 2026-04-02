const DecisionModal = ({ choice, onSelect }) => {
  if (!choice) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md pointer-events-auto">
       <div className="flex flex-col items-center max-w-lg w-full gap-8 animate-[pulse_3s_infinite]">
          <h2 className="text-xl md:text-3xl text-red-500 font-mono tracking-widest uppercase text-center w-full drop-shadow-[0_0_15px_red]">
            {choice.prompt}
          </h2>
          <div className="flex flex-col md:flex-row w-full gap-4">
             {choice.options.map((opt, i) => (
                <button 
                  key={i}
                  className="flex-1 py-4 px-6 border border-white/30 bg-white/5 hover:bg-white/20 text-white font-mono uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95"
                  onClick={() => onSelect(opt.classEffect)}
                >
                   {opt.label}
                </button>
             ))}
          </div>
       </div>
    </div>
  );
};

export default DecisionModal;
