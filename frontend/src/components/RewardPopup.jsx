const RewardPopup = ({ reward, onClose }) => {
  if (!reward) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-yellow-600 to-yellow-900 border-2 border-yellow-400 p-8 md:p-12 rounded-3xl shadow-[0_0_150px_rgba(250,204,21,0.5)] text-center animate-[bounce_1s_infinite] transform scale-110 cursor-pointer"
        onClick={(e) => e.stopPropagation() /* Prevent outer click from double firing */}
      >
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-[0_0_10px_white]">
          ⚠️ ANOMALY UNLOCKED ⚠️
        </h2>
        <p className="text-yellow-100 font-mono text-sm md:text-lg uppercase opacity-90 max-w-sm mx-auto">
          {reward.label}
        </p>
        <div className="mt-6 text-[10px] font-mono text-white/50 uppercase tracking-widest">
           [ Click to resume ]
        </div>
      </div>
    </div>
  );
};

export default RewardPopup;
