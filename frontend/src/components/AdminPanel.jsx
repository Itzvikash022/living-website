import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = ({ onClose }) => {
    const [pin, setPin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [statusLog, setStatusLog] = useState('AWAITING AUTHENTICATION');
    
    // Explicit API bounds mapped securely via Vite defaults overriding fallback bounds organically
    const API_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

    const verifyPin = async (e) => {
        e.preventDefault();
        try {
            setStatusLog('VERIFYING NODE ACCESS...');
            const res = await axios.post(`${API_URL}/admin/verify`, { pin });
            if (res.data.success) {
                setIsAuthenticated(true);
                setStatusLog('ACCESS GRANTED. INITIALIZING MASTER CONTROLS.');
                setError('');
            }
        } catch (err) {
            setError('ACCESS DENIED: INVALID SIGNATURE');
            setStatusLog('UNAUTHORIZED BREACH DETECTED');
            setPin('');
        }
    };

    const triggerAction = async (endpoint, payload = {}) => {
        try {
            setStatusLog(`EXECUTING OVERRIDE: ${endpoint}`);
            await axios.post(`${API_URL}/admin/${endpoint}`, { pin, ...payload });
            setStatusLog(`OVERRIDE PUSHED: ${endpoint} SUCCESSFUL`);
            
            // Hard Reload Factory physical cleanup mapping pure white layouts immediately tracking perfectly.
            if (endpoint === 'reset') {
                localStorage.clear();
                window.location.reload();
                return;
            }

            // Automatically dump the admin overlay completely cleanly projecting the physical behaviors accurately
            setTimeout(() => {
                onClose();
            }, 600); // 600ms organic pause parsing the Success Log natively
        } catch (err) {
            setStatusLog(`OVERRIDE FAILED: ${err.message}`);
        }
    };

    return (
        <div className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-sm flex items-center justify-center font-mono pointer-events-auto">
            <div className="w-full max-w-lg border-2 border-red-900 bg-[#050000] p-8 text-green-500 shadow-[0_0_100px_rgba(200,0,0,0.15)] animate-[float_4s_ease-in-out_infinite]">
                
                <div className="flex justify-between items-center border-b border-red-900/50 pb-4 mb-6">
                    <h2 className="text-2xl tracking-[0.3em] font-black text-red-600 animate-pulse">SYS_ADMIN.EXE</h2>
                    <button onClick={onClose} className="text-red-500 hover:text-white transition-colors tracking-widest text-xs">EXIT [X]</button>
                </div>
                
                {/* Terminal Window tracking execution bounding limits */}
                <div className="bg-black border border-green-900/50 p-4 mb-8 h-20 overflow-hidden text-xs flex items-end">
                    <span>{`> `} <span className={error ? 'text-red-500' : 'text-green-500'}>{statusLog}</span><span className="animate-pulse">_</span></span>
                </div>

                {!isAuthenticated ? (
                    <form onSubmit={verifyPin} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs tracking-[0.2em] text-red-500/70">ENTER PHYSICAL OVERRIDE PIN:</label>
                            <input 
                                type="password" 
                                autoFocus
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="bg-black border border-red-900/50 p-4 text-red-500 outline-none focus:border-red-500 tracking-[2em] text-center text-3xl placeholder-red-900/20"
                                placeholder="****"
                            />
                        </div>

                        <button type="submit" className="border-2 border-red-900 text-red-500 py-4 font-bold tracking-[0.2em] hover:bg-red-900 hover:text-black transition-all">
                            AUTHENTICATE
                        </button>
                        
                        {error && <p className="text-red-500 text-center text-xs font-black animate-pulse mt-1 tracking-widest">{error}</p>}
                    </form>
                ) : (
                    <div className="flex flex-col gap-6 animateIn outline-none">
                        <p className="text-xs text-green-700 tracking-[0.4em] uppercase text-center mb-2">Override Parameters Allowed</p>
                        
                        {/* Administrator Explicit Trigger Overrides mapped absolutely */}
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => triggerAction('reset')} className="border border-red-600/50 text-red-500 hover:bg-red-600 hover:text-white py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors font-bold uppercase">
                                [ RESET SYSTEM ]
                            </button>
                            
                            <button onClick={() => triggerAction('trigger', { event: 'chaos' })} className="border border-purple-500/50 text-purple-500 hover:bg-purple-600 hover:text-white py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors uppercase">
                                [ FORCE CHAOS ]
                            </button>
                            
                            <button onClick={() => triggerAction('trigger', { event: 'fake_warning' })} className="border border-yellow-500/50 text-yellow-500 hover:bg-yellow-600 hover:text-black py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors uppercase">
                                [ INJECT WARNING ]
                            </button>

                            <button onClick={() => triggerAction('trigger', { event: 'glitch' })} className="border border-blue-500/50 text-blue-500 hover:bg-blue-600 hover:text-white py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors uppercase">
                                [ BREAK REALITY ]
                            </button>
                            
                            <button onClick={() => triggerAction('trigger', { event: 'rare_crash' })} className="border border-white/50 text-white hover:bg-white hover:text-black py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                [ RARE: BSOD CRASH ]
                            </button>
                            
                            <button onClick={() => triggerAction('trigger', { event: 'rare_glass' })} className="border border-cyan-500/50 text-cyan-500 hover:bg-cyan-600 hover:text-white py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                                [ RARE: SHATTER WINDOW ]
                            </button>

                            <button onClick={() => triggerAction('trigger', { event: 'rare_stop_it' })} className="border border-orange-500/50 text-orange-500 hover:bg-orange-600 hover:text-white py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors shadow-[0_0_10px_rgba(255,100,0,0.5)]">
                                [ RARE: MEME STOP IT ]
                            </button>
                            
                            <button onClick={() => triggerAction('trigger', { event: 'rare_heli' })} className="border border-green-500/50 text-green-500 hover:bg-green-600 hover:text-white py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                                [ RARE: HELICOPTER EVAC ]
                            </button>

                            <button onClick={() => triggerAction('trigger', { event: 'rare_rickroll' })} className="col-span-2 border border-pink-500/50 text-pink-500 hover:bg-pink-600 hover:text-white py-4 px-2 text-[10px] sm:text-xs tracking-widest transition-colors shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                                [ RARE: FIX ERROR (RICKROLL) ]
                            </button>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
};
export default AdminPanel;
