import React from 'react';

const MemeStormLayer = ({ memes }) => {
    if (!memes || memes.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[8000] pointer-events-none overflow-hidden">
            {memes.map(meme => {
                let animationClass = '';
                if (meme.behavior === 'meme-float') animationClass = 'animate-[float_3s_infinite_ease-in-out]';
                if (meme.behavior === 'meme-bounce') animationClass = 'animate-[bounce_1s_infinite]';
                if (meme.behavior === 'spin') animationClass = 'animate-[spin_2s_infinite_linear]';
                if (meme.behavior === 'meme-shake') animationClass = 'animate-[weirdRotate_0.5s_infinite]';

                return (
                    <div 
                        key={meme.id}
                        className={`absolute transition-all ${animationClass}`}
                        style={{
                            left: `${meme.x}vw`,
                            top: `${meme.y}vh`,
                            transform: `rotate(${meme.rotation}deg) scale(${meme.scale})`,
                            transitionDuration: '500ms'
                        }}
                    >
                        <img 
                            src={meme.url} 
                            alt="Chaos Meme"
                            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.4)] border-4 border-yellow-500 animateIn opacity-90 mix-blend-screen"
                            onError={(e) => { 
                                // Fallback native logic resolving broken URLs dynamically preventing DOM crashes
                                e.target.style.display = 'none'; 
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default MemeStormLayer;
