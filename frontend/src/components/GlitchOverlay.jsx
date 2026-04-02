import React from 'react';

const GlitchOverlay = ({ active }) => {
   if (!active) return null;

   // Overlays root node isolating explicit UI behaviors forcing completely non-responsive states structurally.
   return (
       <div className="fixed inset-0 z-[9999] pointer-events-auto cursor-not-allowed flex items-center justify-center bg-black/95 backdrop-invert animate-[shake_0.1s_infinite]">
            <div className="flex flex-col gap-4 text-center select-none pointer-events-none w-full relative">
                
                <div className="bg-red-600 text-white font-black text-5xl md:text-8xl tracking-tighter uppercase w-full py-6 mix-blend-difference animate-pulse">
                    CRITICAL ERROR
                </div>
                
                <div className="text-red-500 font-mono text-xl md:text-4xl tracking-[0.5em] md:tracking-[1em] uppercase animate-bounce font-bold drop-shadow-[0_0_20px_red]">
                    SYSTEM FAILURE
                </div>
                
                <div className="text-white/80 font-mono text-xs tracking-widest uppercase mt-12 mix-blend-overlay">
                    KERNEL PANIC // REALITY.SYS CORRUPTED // DO NOT INTERACT
                </div>
                
                {/* Simulated structural tear lines randomly breaking UI horizontal mapping */}
                <div className="absolute top-[20%] left-[-10%] w-[120%] h-[2px] bg-red-500 animate-ping"></div>
                <div className="absolute top-[80%] left-[-20%] w-[150%] h-[50px] bg-white mix-blend-overlay animate-pulse"></div>
            </div>
       </div>
   );
};

export default GlitchOverlay;
