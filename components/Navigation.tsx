import React, { useState } from 'react';
import { Menu, X, Cpu, Globe } from 'lucide-react';
import { NavigationItem } from '../types';

interface NavigationProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: NavigationItem; label: string }[] = [
    { id: 'HOME', label: '홈' },
    { id: 'ABOUT', label: '센터 소개' },
    { id: 'RESEARCH', label: '핵심 연구' },
    { id: 'DOCS', label: '기술 문서' },
    { id: 'NOTICES', label: '공지/홍보' },
  ];

  const handleNavClick = (id: NavigationItem) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('HOME')}>
            <Cpu className="h-8 w-8 text-brand-600 mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 tracking-tight">SMIC</span>
              <span className="text-xs text-slate-500 font-medium">스마트제조혁신센터 안산</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'text-brand-600 border-b-2 border-brand-600'
                    : 'text-slate-600 hover:text-brand-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center">
              <Globe className="w-4 h-4 mr-1" /> ENG
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-4 text-base font-medium rounded-md ${
                  activeTab === item.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
