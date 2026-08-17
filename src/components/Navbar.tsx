import React from 'react';

export const Navbar: React.FC = () => {
  const links = [
    { name: 'Overview', target: '#overview' },
    { name: 'Leaderboard', target: '#teams' },
    { name: 'Pipeline', target: '#schedule' }
  ];
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="bg-tegCardBg/80 backdrop-blur-xl border-b border-tegSteelBlue/30 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="bg-tegCrimson text-white font-black text-xs px-2 py-1 rounded tracking-tighter shadow-md shadow-tegCrimson/20">TEG</span>
        <div className="text-sm font-black text-white tracking-widest hidden sm:block">THE EXECUTION GAME</div>
      </div>
      <div className="flex space-x-1">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.target}
            onClick={(e) => handleScroll(e, link.target)}
            className="px-3 py-1.5 rounded text-xs uppercase font-bold text-gray-400 hover:text-tegCrimson hover:bg-white/5 transition duration-300"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};
