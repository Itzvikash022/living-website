import React from 'react';

const RoastOverlay = ({ roasts, onDismiss }) => {
    if (!roasts || roasts.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9500] overflow-hidden">
            {roasts.map(roast => (
                <div 
                    key={roast.id} 
                    className="absolute pointer-events-auto bg-[#c0c0c0] border-t-[3px] border-l-[3px] border-t-[#ffffff] border-l-[#ffffff] border-r-[3px] border-b-[3px] border-r-[#808080] border-b-[#808080] shadow-[2px_2px_10px_rgba(0,0,0,0.5)] flex flex-col font-sans w-64 md:w-80 animateIn"
                    style={{ left: `${roast.x}vw`, top: `${roast.y}vh` }}
                >
                    {/* Windows 95 Title Bar */}
                    <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold text-xs select-none cursor-default">
                        <span>SYSTEM_ALERT.EXE</span>
                        <button 
                            onClick={() => onDismiss(roast.id)}
                            className="bg-[#c0c0c0] text-black border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black px-2 hover:active:border-t-black hover:active:border-l-black hover:active:border-b-white hover:active:border-r-white font-black leading-none pb-0.5"
                        >
                            X
                        </button>
                    </div>
                    
                    {/* Content Component Layer */}
                    <div className="p-4 flex flex-col items-center justify-center text-black text-center text-sm font-medium">
                        {roast.meme && (
                            <img 
                                src={roast.meme.url} 
                                alt="Meme Validation" 
                                className="w-full h-32 object-cover mb-4 border border-[#808080] shadow-[inset_-2px_-2px_0_#ffffff,inset_2px_2px_0_#000000]"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        )}
                        <p>{roast.text}</p>
                        
                        <button 
                            onClick={() => onDismiss(roast.id)}
                            className="mt-6 bg-[#c0c0c0] text-black border-t-[2px] border-l-[2px] border-t-[#ffffff] border-l-[#ffffff] border-b-[2px] border-r-[2px] border-b-[#000000] border-r-[#000000] px-8 py-1 mx-auto active:border-t-black active:border-l-black active:border-b-white active:border-r-white focus:outline-dotted focus:outline-[1px]"
                        >
                            OK
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoastOverlay;
