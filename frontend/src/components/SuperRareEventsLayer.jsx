import React, { useEffect } from 'react';
import mjMeme from '../assets/stop-it-get-some-help.gif';

const SuperRareEventsLayer = ({ event, onClear }) => {
    if (!event) return null;

    // specific MJ Meme overlay dropping all execution
    if (event === 'rare_stop_it') {
        setTimeout(onClear, 5000); // 5s structural lock physically terminating interactions exactly
        return (
            <div className="fixed inset-0 z-[100000] bg-black flex items-center justify-center animateIn shadow-2xl pointer-events-auto">
                <img 
                    src={mjMeme} 
                    alt="Stop it get some help" 
                    className="w-full max-w-2xl h-auto object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                />
            </div>
        );
    }

    // Windows BSOD style logical crash completely separating user interactions
    if (event === 'rare_crash') {
        return (
            <div className="fixed inset-0 z-[100000] bg-black pointer-events-auto flex items-center justify-center font-mono">
                <div className="bg-[#c0c0c0] border-t-[3px] border-l-[3px] border-t-white border-l-white border-r-[3px] border-b-[3px] border-r-gray-800 border-b-gray-800 p-1 w-96 shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
                    <div className="bg-[#000080] text-white px-2 py-1 font-bold text-sm tracking-wider w-full mb-4">
                        FATAL EXCEPTION 0x00000042
                    </div>
                    
                    <div className="px-6 pb-6 pt-2 text-[#000] flex flex-col items-center text-center">
                        <p className="mb-4 text-sm font-semibold">
                            A severe error has occurred because your APM (Actions Per Minute) exceeds allowable safety constraints.
                        </p>
                        <p className="mb-6 text-xs text-gray-700 font-bold">
                            Reason: YOU_CLICK_TOO_MUCH_EXCEPTION.
                            <br/><br/>
                            We highly recommend touching grass.
                        </p>

                        <button 
                            onClick={onClear}
                            className="bg-[#c0c0c0] w-32 py-1 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-800 font-black text-sm active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white focus:outline-dashed focus:outline-[1px]"
                        >
                            REBOOT
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Broken glass reality shattering simulating screen fragmenting
    if (event === 'rare_glass') {
        return (
            <div className="fixed inset-0 z-[100000] pointer-events-auto flex flex-col items-center justify-center font-mono animate-[shake_0.2s_ease-in-out_1]">
                
                {/* Organic polygonal shards mapped explicitly stretching bounds natively tracking random points */}
                <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                     <div className="w-full h-full backdrop-blur-sm relative"
                          style={{
                              backgroundImage: `
                                linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.8) 42%, transparent 44%),
                                linear-gradient(-30deg, transparent 50%, rgba(255,255,255,0.9) 52%, transparent 55%),
                                linear-gradient(80deg, transparent 60%, rgba(255,255,255,0.7) 61%, transparent 63%),
                                linear-gradient(-75deg, transparent 30%, rgba(255,255,255,0.9) 33%, transparent 35%)
                              `
                          }}
                     />
                </div>

                <div className="relative z-10 text-center flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-black text-red-600 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] mb-2 tracking-[0.2em] transform rotate-[-5deg]">
                        YOU BROKE IT.
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-bold bg-black/50 p-2 mb-10 tracking-[0.3em]">
                        THIS IS WHY WE CAN'T HAVE NICE UIs.
                    </p>

                    <button 
                        onClick={onClear}
                        className="animate-pulse bg-blue-600 text-white border-[6px] border-blue-400 px-10 py-6 text-2xl md:text-3xl font-black tracking-widest uppercase hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(0,100,255,0.8)]"
                    >
                        [ REWIND TIME ]
                    </button>
                </div>
            </div>
        );
    }

    // `rare_heli` structurally hijacks the original InteractionButton organically parsing a dropping animation externally.
    // We render the helicopter swooping horizontally, coming back, stopping at the center, dropping, and flying off!
    if (event === 'rare_heli') {
        // Drop constraints resolving locally securely reverting native layouts exactly
        setTimeout(onClear, 7500); 
        
        return (
            <div className="fixed inset-0 z-[100000] pointer-events-none overflow-hidden">
                <div className="absolute top-[30%] animate-[heliSequence_8s_linear_forwards] flex flex-col items-center drop-shadow-2xl translate-x-[50vw]">
                    <span className="text-[120px] drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">🚁</span>
                    
                    {/* The Cargo block falling down physically using its own distinct internal timeline */}
                    <div className="flex flex-col items-center animate-[cargoDrop_8s_linear_forwards]">
                        <div className="w-1 h-32 bg-gray-500 shadow-[0_0_10px_black] animate-[weirdRotate_1s_infinite]"></div>
                        <button className="bg-gradient-to-r from-red-600 to-orange-500 rounded-[50px] shadow-2xl py-6 px-12 border-t border-white/20 text-white font-semibold flex items-center justify-center gap-4 text-2xl tracking-[0.2em] shadow-[0_40px_100px_rgba(255,0,0,0.6)] animate-[float_1s_infinite]">
                            Do Something
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (event === 'rare_rickroll') return <RickRollEvent onClear={onClear} />;

    return null;
};

// Internal execution array completely isolated resolving strict coordinate mappings accurately 
const RickRollEvent = ({ onClear }) => {
    const [step, setStep] = React.useState(0);
    // Random target clicks exactly bounded natively 7 -> 20.
    const [target] = React.useState(() => Math.floor(Math.random() * 14) + 7);
    const [position, setPosition] = React.useState({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });

    const taunts = [
        "CLICK ME TO FIX SERVER",
        "Nah, try again 😂",
        "Too slow bro 🐢",
        "Skill issue? 🤡",
        "My grandma clicks faster",
        "You trying or what?",
        "Missed me by a mile",
        "Over here dumbass",
        "Are you even looking?",
        "Almost... jk 😁",
        "Imagine struggling to click",
        "I'm literally right here",
        "Aim training required",
        "Wow, you suck at this",
        "Still nothing? 💤",
        "Bro just give up",
        "Keep trying...",
        "Any second now...",
        "Psyche! 😈",
        "Can't touch this",
        "Goodbye!"
    ];

    const handleClick = () => {
        if (step >= target) {
            onClear();
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            return;
        }

        setStep(s => s + 1);
        // Generates completely random offsets accurately avoiding screen edge clipping completely explicitly
        setPosition({
            top: Math.max(10, Math.random() * 80) + '%',
            left: Math.max(10, Math.random() * 80) + '%',
            transform: 'none'
        });
    };

    const currentText = step === 0 ? taunts[0] : taunts[Math.min(step, taunts.length - 1)];

    return (
        <div className="fixed inset-0 z-[100000] backdrop-blur-[20px] bg-gray-500/60 pointer-events-auto overflow-hidden flex items-center justify-center animate-in fade-in duration-500">
            {step === 0 && (
                <div className="absolute top-[25%] px-10 py-6 bg-black/80 text-white font-mono text-xl md:text-3xl font-black border-4 border-red-500 shadow-[0_0_50px_red] tracking-widest uppercase text-center animate-pulse">
                    ⚠ VISUAL ENGINE FRAGMENTATION ERROR
                </div>
            )}

            <button
                onClick={handleClick}
                style={position}
                className={`absolute px-8 py-5 bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-xl md:text-2xl rounded-xl shadow-[0_0_30px_rgba(255,0,0,0.8)] border-[3px] border-white/60 transition-all ease-out whitespace-nowrap active:scale-95 ${step > 0 ? 'duration-100 shadow-[0_0_10px_black]' : 'duration-300 hover:scale-110'}`}
            >
                {currentText}
            </button>
        </div>
    );
};

export default SuperRareEventsLayer;
