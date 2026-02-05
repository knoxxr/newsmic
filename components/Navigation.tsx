
import React, { useState } from 'react';
import { Menu, X, Cpu, Globe } from 'lucide-react';
import { NavigationItem, Language } from '../types';
import { translations } from '../locales';

interface NavigationProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language].nav;

  const mainNavItems: { id: NavigationItem; label: string }[] = [
    { id: 'HOME', label: t.home },
    { id: 'ABOUT', label: t.about },
    { id: 'RESEARCH', label: t.research },
    { id: 'FLOORPLAN', label: t.floorplan },
    { id: 'VISITORNOTICE', label: t.visitorNotice },
    { id: 'DIRECTIONS', label: t.directions },
  ];

  const secondaryNavItems: { id: NavigationItem; label: string }[] = [
    { id: 'DOCS', label: t.docs },
    { id: 'NOTICES', label: t.notices },
  ];

  const handleNavClick = (id: NavigationItem) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'KO' ? 'EN' : 'KO');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('HOME')}>
            <img src="/logo.png" alt="SMIC Logo" className="h-8 w-auto mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 tracking-tight">SMIC</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
                {translations[language].siteSubName}
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {mainNavItems.map((item) => (
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
            <span className="text-slate-300 mx-4">|</span>
            <div className="flex items-center space-x-4">
              {secondaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    activeTab === item.id
                      ? 'bg-brand-100 text-brand-700' // Active state: light blue background, darker blue text
                      : 'bg-brand-600 text-white hover:bg-blue-100 hover:text-slate-900' // Default: blue, white text, hover light blue background, dark text
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={toggleLanguage}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center border border-slate-200 shadow-sm"
              >
                <Globe className="w-4 h-4 mr-2 text-brand-600" /> 
                {language === 'KO' ? 'ENG' : 'KOR'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleLanguage} className="text-xs font-bold text-slate-500 bg-slate-100 p-2 rounded">
              {language === 'KO' ? 'ENG' : 'KOR'}
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
            {[...mainNavItems, ...secondaryNavItems].map((item) => (
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
