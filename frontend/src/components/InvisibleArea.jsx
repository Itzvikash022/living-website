const InvisibleArea = ({ onDiscover }) => {
  return (
    <div 
      className="fixed top-0 right-0 w-16 h-16 opacity-0 cursor-crosshair z-[999] hover:opacity-10 bg-red-600 transition-opacity flex items-center justify-center text-xs font-mono font-black"
      onClick={onDiscover}
      title="?"
    >
      ?
    </div>
  );
};
export default InvisibleArea;
