import React from 'react';
import { MapPin, Phone, Mail, Lock, Printer } from 'lucide-react';
import { translations } from '../locales';
import { Language } from '../types';

interface FooterProps {
  onAdminClick?: () => void;
  language: Language;
}

const familySites = [
  { name: '5G-SFA', url: 'https://www.5g-sfa.com/' },
  { name: 'SVC AI', url: 'https://service.smic.kr/' },
  { name: '안산시', url: 'https://www.ansan.go.kr/www/main/main.do' },
  { name: '경기도', url: 'https://www.gg.go.kr/' },
  { name: '경기테크노파크', url: 'https://www.gtp.or.kr/web/main/index.jsp' },
  { name: '한국산업기술진흥원', url: 'https://www.kiat.or.kr/front/user/main.do' },
  { name: '한국스마트제조산업협회', url: 'https://kosmia.or.kr/' },
  { name: '중소기업진흥공단(SBC)', url: 'https://hp.sbc.or.kr/intro/intro_real.html' },
  { name: '한국표준협회(KSA)', url: 'https://ksa.or.kr/ksa_kr/index.do' },
  { name: '한국생산성본부(KPC)', url: 'https://www.kpc.or.kr/' },
  { name: '한국생산기술연구원(KITECH)', url: 'https://www.kitech.re.kr/main/main.php' },
  { name: '전자부품연구원(KETI)', url: 'https://www.keti.re.kr/main/main.php' },
  { name: '대한상공회의소', url: 'https://www.korcham.net/nCham/Service/Main/appl/Main.asp' },
  { name: '스마트공장 추진단', url: 'https://www.smart-factory.kr/' },
  { name: '산업통상자원부', url: 'https://www.motir.go.kr/' },
];

const Footer: React.FC<FooterProps> = ({ onAdminClick, language }) => {
  const t = translations[language]?.footer || translations.KO.footer;
  const tDirections = translations[language]?.directions || translations.KO.directions;

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t.title}</h3>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="SMIC Logo" className="h-6 w-auto mr-2" />
              <span className="font-bold text-xl text-white tracking-tight">SMIC</span>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.desc.replace(/\n/g, '<br/>') }}></p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t.contact}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>{tDirections.address.addr1}<br/>{tDirections.address.addr2}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>{tDirections.tel}: {tDirections.address.tel}</span>
              </li>
              <li className="flex items-center">
                <Printer className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>{tDirections.fax}: {tDirections.address.fax}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-brand-500 shrink-0" />
                <span>{tDirections.address.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t.familySite}</h3>
            <div className="relative text-left">
              <select 
                onChange={(e) => {
                  const url = e.target.value;
                  if (url && url !== '#') {
                    window.open(url, '_blank');
                  }
                }}
                className="block w-full bg-slate-800 border border-slate-700 text-white py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              >
                <option value="#">{t.familySite}</option>
                {familySites.map((site) => (
                  <option key={site.name} value={site.url}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
            {onAdminClick && (
                <div className="pt-4">
                  <button 
                    onClick={onAdminClick} 
                    className="flex items-center text-xs text-slate-600 hover:text-brand-400 transition-colors"
                  >
                    <Lock className="w-3 h-3 mr-1" /> {t.admin}
                  </button>
                </div>
            )}
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;