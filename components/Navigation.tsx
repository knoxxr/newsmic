import React, { useState } from 'react';
import { Menu, X, Cpu, Globe } from 'lucide-react';
import { NavigationItem, Language } from '../types';

interface NavigationProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: NavigationItem; label: string }[] = language === 'KO' ? [
    { id: 'HOME', label: '홈' },
    { id: 'ABOUT', label: '센터 소개' },
    { id: 'RESEARCH', label: '핵심 연구' },
    { id: 'DOCS', label: '기술 문서' },
    { id: 'NOTICES', label: '공지/홍보' },
  ] : [
    { id: 'HOME', label: 'Home' },
    { id: 'ABOUT', label: 'About' },
    { id: 'RESEARCH', label: 'Research' },
    { id: 'DOCS', label: 'Documents' },
    { id: 'NOTICES', label: 'Notices' },
  ];

  const handleNavClick = (id: NavigationItem) => {
    // If it's ADMIN (handled outside this list usually, but just in case) or we are currently IN admin mode,
    // we might need to reset state. But for standard One-Page nav:
    
    if (id === 'ADMIN') {
        setActiveTab('ADMIN');
        return;
    }

    // Scroll to element
    const element = document.getElementById(id.toLowerCase());
    if (element) {
        const headerOffset = 80; // Adjusted for sticky header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    } else {
        // Fallback if element not found (e.g. if we were in ADMIN mode)
        // This sets the state, which triggers a re-render of App.tsx to show the sections,
        // then we might need to scroll.
        setActiveTab(id);
    }
    
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'KO' ? 'EN' : 'KO');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('HOME')}>
            <Cpu className="h-8 w-8 text-brand-600 mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 tracking-tight">SMIC</span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'KO' ? '스마트제조혁신센터 안산' : 'Smart Manufacturing Innovation Center'}
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative ${
                  activeTab === item.id
                    ? 'text-brand-600'
                    : 'text-slate-600 hover:text-brand-600'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 transform transition-transform duration-300 ${
                    activeTab === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </button>
            ))}
            <button 
              onClick={toggleLanguage}
              className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center"
            >
              <Globe className="w-4 h-4 mr-1" /> {language === 'KO' ? 'ENG' : 'KOR'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
                onClick={toggleLanguage}
                className="text-slate-600 font-bold text-xs border border-slate-300 rounded px-2 py-1"
            >
              {language === 'KO' ? 'EN' : 'KO'}
            </button>
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