import { useEffect, useState } from 'react';

const EffectsLayer = ({ eventMessage, mood, clearEvent }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (eventMessage) {
      setToast(eventMessage);
      const timer = setTimeout(() => {
        setToast(null);
        clearEvent();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [eventMessage, clearEvent]);

  const getOverlay = () => {
    if (mood === 'chaos') return 'bg-red-500/10 pointer-events-none fixed inset-0 z-[100] mix-blend-color-burn animate-pulse';
    if (mood === 'weird') return 'bg-fuchsia-500/5 pointer-events-none fixed inset-0 z-[100] mix-blend-overlay';
    return '';
  };

  return (
    <>
      <div className={getOverlay()} />
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 pointer-events-none" style={{ opacity: toast ? 1 : 0, transform: toast ? 'translate(-50%, 0)' : 'translate(-50%, -20px)' }}>
        <div className={`px-8 py-4 backdrop-blur-md shadow-2xl rounded-xl border text-xl font-medium tracking-wide ${mood === 'chaos' ? 'bg-black text-lime-400 border-lime-400 font-mono animate-bounce' : 'bg-white/80 text-black border-black/10'}`}>
          {toast}
        </div>
      </div>
    </>
  );
};
export default EffectsLayer;
