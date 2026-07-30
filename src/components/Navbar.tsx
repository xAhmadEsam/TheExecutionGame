import React from 'react';

export const Navbar: React.FC = () => {
  // Define menu items and their matching section IDs
  const links = [
    { name: 'Overview', target: '#overview' },
    { name: 'Teams', target: '#teams' },
    { name: 'Schedule', target: '#schedule' },
    { name: 'Brackets', target: '#brackets' }
  ];
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-cardBg/90 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="text-xl font-bold text-gold tracking-wider">MLBB CHAMPIONSHIP</div>
      <div className="flex space-x-2 md:space-x-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.target}
            onClick={(e) => handleScroll(e, link.target)}
            className="px-3 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};
