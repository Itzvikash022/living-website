import React from 'react';

const DailyBonusModal = ({ streak, reward, onClaim }) => {
    return (
        <div className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center font-mono animateIn">
            <div className="bg-[#111] border-4 border-yellow-500 p-8 shadow-[0_0_150px_rgba(234,179,8,0.3)] max-w-sm w-full text-center relative border-dashed">
                
                <h2 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">
                    Daily Bonus<br />
                    <span className="text-yellow-400">Unlocked 🎁</span>
                </h2>
                
                <div className="bg-black/50 border border-yellow-500/30 py-4 px-6 rounded my-6">
                    <p className="text-gray-400 text-xs tracking-widest mb-1 uppercase">Current Streak</p>
                    <div className="flex justify-center items-center gap-2">
                        <span className="text-4xl text-yellow-500 font-black tracking-widest">{streak}</span>
                        <span className="text-sm text-yellow-600 font-bold uppercase mt-2">Days</span>
                    </div>
                </div>

                {reward && (
                    <div className="mb-8">
                        <p className="text-[10px] text-green-500 uppercase tracking-[0.3em] mb-2 animate-pulse">Acquired Payload:</p>
                        <p className="text-lg text-white font-bold tracking-widest border-b border-green-500/50 pb-2 inline-block">
                            {reward.desc}
                        </p>
                    </div>
                )}
                
                <button 
                    onClick={onClaim}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xl py-4 uppercase tracking-[0.2em] transform hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                    Claim Sequence
                </button>
            </div>
        </div>
    );
};

export default DailyBonusModal;
