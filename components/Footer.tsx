import React from 'react';
import { MapPin, Phone, Mail, Github, Linkedin, Lock } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  onAdminClick?: () => void;
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, language }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">SMIC {language === 'KO' ? '안산' : 'Ansan'}</h3>
            {language === 'KO' ? (
              <p className="text-sm leading-relaxed mb-4 text-slate-400">
                미래 제조업의 경쟁력을 높이기 위해<br/>
                AI와 Physical AI 기술을 연구하고<br/>
                현장 적용을 실증하는 글로벌 허브입니다.
              </p>
            ) : (
              <p className="text-sm leading-relaxed mb-4 text-slate-400">
                A global hub researching AI and Physical AI<br/>
                technologies to enhance manufacturing competitiveness<br/>
                and verifying field applications.
              </p>
            )}
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{language === 'KO' ? '연락처' : 'Contact'}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>
                  {language === 'KO' ? '경기도 안산시 상록구 해안로 705' : '705, Haean-ro, Sangnok-gu, Ansan-si'}<br/>
                  {language === 'KO' ? '스마트제조혁신센터' : 'Smart Manufacturing Innovation Center'}
                </span>
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
            <h3 className="text-white text-lg font-bold mb-4">{language === 'KO' ? '관련 사이트' : 'Related Sites'}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition-colors">{language === 'KO' ? '산업통상자원부' : 'MOTIE'}</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">{language === 'KO' ? '한국산업단지공단' : 'KICOX'}</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">{language === 'KO' ? '경기테크노파크' : 'Gyeonggi Technopark'}</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">{language === 'KO' ? '한양대학교 ERICA' : 'Hanyang Univ. ERICA'}</a></li>
              {onAdminClick && (
                <li className="pt-4">
                  <button 
                    onClick={onAdminClick} 
                    className="flex items-center text-xs text-slate-600 hover:text-brand-400 transition-colors"
                  >
                    <Lock className="w-3 h-3 mr-1" /> {language === 'KO' ? '관리자 접속' : 'Admin Login'}
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