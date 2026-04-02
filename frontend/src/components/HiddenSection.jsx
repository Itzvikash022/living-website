const HiddenSection = ({ mood }) => {
  return (
    <div className={`mt-8 p-12 w-full max-w-lg mx-auto rounded-3xl border-t border-dashed transition-all duration-1000 ${mood === 'chaos' ? 'border-red-500 bg-red-950/20' : 'border-black/20 bg-black/5'} animate-in fade-in slide-in-from-bottom-8`}>
      <h3 className="text-2xl font-mono mb-4 text-inherit">You found the hidden layer.</h3>
      <p className="opacity-80 text-base leading-relaxed">
        Most users leave before staying this long. The longer you interact, the more the system adapts to your presence.
      </p>
      {mood === 'chaos' && (
        <p className="mt-8 font-black text-red-500 text-3xl animate-[glitch_0.3s_infinite]">
          T U R N  B A C K N O W !!!
        </p>
      )}
    </div>
  );
};
export default HiddenSection;
