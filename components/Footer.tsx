import React from 'react';
import { MapPin, Phone, Mail, Github, Linkedin, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">SMIC 안산</h3>
            <p className="text-sm leading-relaxed mb-4 text-slate-400">
              미래 제조업의 경쟁력을 높이기 위해<br/>
              AI와 Physical AI 기술을 연구하고<br/>
              현장 적용을 실증하는 글로벌 허브입니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>경기도 안산시 상록구 해안로 705<br/>스마트제조혁신센터</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>031-123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>contact@smic-ansan.kr</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">관련 사이트</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition-colors">산업통상자원부</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">한국산업단지공단</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">경기테크노파크</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">한양대학교 ERICA</a></li>
              {onAdminClick && (
                <li className="pt-4">
                  <button 
                    onClick={onAdminClick} 
                    className="flex items-center text-xs text-slate-600 hover:text-brand-400 transition-colors"
                  >
                    <Lock className="w-3 h-3 mr-1" /> 관리자 접속
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
          © 2024 Smart Manufacturing Innovation Center Ansan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;