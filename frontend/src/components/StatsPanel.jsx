const StatsPanel = ({ global, user, timeSpent }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-0 w-full max-w-lg mx-auto bg-black/5 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-inner">
      <div className="flex flex-col items-center sm:border-r border-b sm:border-b-0 border-black/10 pb-6 sm:pb-0">
        <h3 className="text-sm uppercase tracking-[0.2em] opacity-60 font-bold mb-4">Global Network</h3>
        <p className="text-4xl font-mono mb-1 text-inherit">{global.totalClicks || 0} <span className="text-sm opacity-50 block mt-1 tracking-normal font-sans">total pings</span></p>
        <p className="text-xl font-mono text-inherit mt-4">{global.totalUsers || 0} <span className="text-sm opacity-50 block tracking-normal font-sans">connected entities</span></p>
      </div>
      <div className="flex flex-col items-center pt-6 sm:pt-0">
        <h3 className="text-sm uppercase tracking-[0.2em] opacity-60 font-bold mb-4">Your Node</h3>
        <p className="text-4xl font-mono mb-1 text-inherit">{user.clicks || 0} <span className="text-sm opacity-50 block mt-1 tracking-normal font-sans">pings sent</span></p>
        <p className="text-xl font-mono text-inherit mt-4">{user.visitCount || 0} <span className="text-sm opacity-50 block tracking-normal font-sans">sessions</span></p>
        <p className="text-xl font-mono text-inherit mt-2">{timeSpent || 0}s <span className="text-sm opacity-50 block tracking-normal font-sans">time active</span></p>
      </div>
    </div>
  );
};
export default StatsPanel;
