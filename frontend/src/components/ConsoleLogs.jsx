const ConsoleLogs = ({ logs, className }) => {
  if (!logs || logs.length === 0) return null;

  return (
    <div className={`z-[400] px-4 font-mono text-[10px] md:text-xs font-medium text-green-500 opacity-60 pointer-events-none drop-shadow-[0_0_2px_rgba(34,197,94,0.8)] ${className || 'fixed bottom-4 left-4 w-72 md:w-96'}`}>
      <div className="flex flex-col items-start text-left gap-1 transition-all">
        {logs.map((log, index) => (
          <div key={`${log}_${index}`} className="animate-[pulse_2s_ease-in-out_1] origin-left">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsoleLogs;
