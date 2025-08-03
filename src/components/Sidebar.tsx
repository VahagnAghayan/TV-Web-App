import React, { useState } from 'react';
import { Search, Home, Tv, Film, Grid3X3, Clock, Menu, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Search, label: 'Search', id: 'search', iconPath: '/assets/icons/search.svg' },
    { icon: Home, label: 'Home', id: 'home', active: true, iconPath: '/assets/icons/home.svg' },
    { icon: Tv, label: 'TV Shows', id: 'tv-shows', iconPath: '/assets/icons/tv.svg' },
    { icon: Film, label: 'Movies', id: 'movies', iconPath: '/assets/icons/movies.svg' },
    { icon: Grid3X3, label: 'Genres', id: 'genres', iconPath: '/assets/icons/genres.svg' },
    { icon: Clock, label: 'Watch Later', id: 'watch-later', iconPath: '/assets/icons/watch-later.svg' },
  ];

  const bottomMenuItems = [
    { label: 'LANGUAGE', id: 'language' },
    { label: 'GET HELP', id: 'help' },
    { label: 'EXIT', id: 'exit' },
  ];

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/80 rounded-lg"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
      <div 
        className={`hidden lg:block fixed left-0 top-0 h-full bg-black transition-all duration-300 z-50 ${
          isOpen ? 'w-80' : 'w-24'
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex flex-col h-full px-6 py-8">
          <div className={`flex items-center gap-4 mb-10 h-14 ${!isOpen && 'invisible'}`}>
            <img 
              src="/assets/profile.jpg" 
              alt="Profile" 
              className="w-14 h-14 rounded-full object-cover"
            />
            {isOpen && (
              <span className="text-white text-xl font-medium">Daniel</span>
            )}
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`flex items-center gap-4 w-full py-4 px-3 rounded-lg transition-colors ${
                      item.active ? 'bg-blue-600' : 'hover:bg-gray-800'
                    } ${!isOpen && 'justify-center'}`}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    {isOpen && (
                      <span className="text-white text-lg">{item.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {isOpen && (
            <div className="mt-auto">
              <ul className="space-y-3">
                {bottomMenuItems.map((item) => (
                  <li key={item.id}>
                    <button className="text-gray-400 text-sm uppercase tracking-wider hover:text-white transition-colors">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div 
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-black transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-6 py-20">
          <div className="flex items-center gap-4 mb-10">
            <img 
              src="/assets/profile.jpg" 
              alt="Profile" 
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="text-white text-xl font-medium">Daniel</span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`flex items-center gap-4 w-full py-4 px-3 rounded-lg transition-colors ${
                      item.active ? 'bg-blue-600' : 'hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-white text-lg">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <ul className="space-y-3">
              {bottomMenuItems.map((item) => (
                <li key={item.id}>
                  <button className="text-gray-400 text-sm uppercase tracking-wider hover:text-white transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>      
      {(isOpen || mobileMenuOpen) && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-80 transition-opacity duration-300 z-40 ${
            mobileMenuOpen ? 'lg:hidden' : 'hidden lg:block'
          }`}
          onClick={() => {
            setIsOpen(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Sidebar;
