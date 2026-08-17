import { useState, useEffect } from 'react';

export const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keeps the loading curtain active for 2.2 seconds before revealing the layout
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-tegDarkBg z-[999] flex flex-col justify-center items-center overflow-hidden">
      {/* Background ambient dark energy clouds */}
      <div className="absolute w-[500px] h-[500px] bg-tegSteelBlue/10 rounded-full blur-[120px] animate-pulse"></div>
      
      {/* JJK Impact Strike Bar */}
      <div className="w-full max-w-md h-1 bg-tegCrimson relative overflow-hidden rounded animate-black-flash">
        <div className="absolute inset-0 bg-white shadow-[0_0_15px_#fff]"></div>
      </div>

      {/* Title presentation text layout */}
      <div className="mt-8 text-center tracking-[0.3em] relative">
        <h1 className="text-sm font-black text-white/40 uppercase">Domain Configuration</h1>
        <div className="text-xl font-black text-tegCrimson tracking-[0.4em] uppercase mt-1 animate-pulse">
          THE EXECUTION GAME
        </div>
      </div>
    </div>
  );
};
