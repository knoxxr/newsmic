import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import AdminDashboard from './components/AdminDashboard';
import AboutImageCarousel from './components/AboutImageCarousel'; // Import the new component
import PopupModal from './components/PopupModal'; // Import PopupModal component
import { NavigationItem, ResearchArea, NoticeItem, TechDoc, Language } from './types';
import { translations } from './locales';
import { ArrowRight, Box, Brain, Cpu, FileText, Factory, ChevronRight, Activity, Users, Play, X, Search, MapPin, Phone, Mail, ClipboardList, MousePointerClick, Bell, FilePenLine, Lightbulb, CalendarDays, CheckCircle, Printer, ExternalLink } from 'lucide-react'; // Added Lightbulb, Building

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- Image Data for About Section ---
const aboutImages = ['/그림1.jpg', '/그림2.png', '/그림3.png', '/그림4.jpg'];

// --- Mock Data ---

const getResearchAreas = (lang: Language): ResearchArea[] => [
  {
    id: 'industrial-ai',
    title: lang === 'KO' ? 'Industrial AI' : 'Industrial AI',
    description: lang === 'KO' ? '제조 데이터 분석 및 공정 최적화를 위한 산업용 인공지능 기술' : 'Industrial AI technologies for manufacturing data analysis and process optimization',
    icon: 'Brain',
    mediaUrl: '/미디어1.mp4',
    imageUrl: '/산업AI.jpg', // Placeholder image
    details: lang === 'KO' ? ['예지보전 (Predictive Maintenance)', '품질 검사 자동화', '공정 최적화 강화학습'] : ['Predictive Maintenance', 'Quality Inspection Automation', 'Process Optimization Reinforcement Learning']
  },
  {
    id: 'physical-ai',
    title: lang === 'KO' ? 'Physical AI & Robotics' : 'Physical AI & Robotics',
    description: lang === 'KO' ? '인간과 협업하며 복잡한 물리적 작업을 수행하는 AI 로봇 제어 기술' : 'AI robot control technology for performing complex physical tasks in collaboration with humans',
    icon: 'Bot',
    mediaUrl: '/미디어2.mp4',
    details: lang === 'KO' ? ['협동로봇 힘 제어', '비정형 객체 파지 (Grasping)', '자율이동로봇 (AMR) 네비게이션'] : ['Collaborative Robot Force Control', 'Irregular Object Grasping', 'Autonomous Mobile Robot (AMR) Navigation']
  },
  {
    id: 'demo-factory',
    title: lang === 'KO' ? 'Demo Factory' : 'Demo Factory',
    description: lang === 'KO' ? '개발된 요소기술의 실증 및 테스트베드 역할을 수행하는 초연결 제조 인프라' : 'Hyper-connected manufacturing infrastructure serving as a testbed for developed technologies',
    icon: 'Factory',
    mediaUrl: '/미디어3.mp4',
    details: lang === 'KO' ? ['5G/6G 특화망', 'Digital Twin 동기화', '유연생산 시스템 (FMS)'] : ['5G/6G Private Network', 'Digital Twin Synchronization', 'Flexible Manufacturing System (FMS)']
  }
];

const initialNotices: NoticeItem[] = [
  { id: 1, category: '공지', title: '2024년도 하반기 스마트제조 실증 지원사업 모집 공고', date: '2024-05-20', content: '...' },
  { id: 2, category: '행사', title: '제5회 안산 스마트제조 포럼 개최 안내', date: '2024-05-15', content: '...' },
  { id: 3, category: '보도', title: '[보도] SMIC, 독일 프라운호퍼 연구소와 MOU 체결', date: '2024-05-10', content: '...' },
];

const initialDocuments: TechDoc[] = [
  { id: 'doc-1', title: '제조 데이터 표준화 가이드라인 v2.0', type: 'PDF', date: '2024.04.15', summary: 'AAS 기반의 제조 데이터 교환 표준 정의서' },
  { id: 'doc-2', title: 'Physical AI 로봇 제어 API Reference', type: 'API', date: '2024.03.10', summary: '협동로봇 제어를 위한 RESTful API 명세' },
  { id: 'doc-3', title: '5G 특화망 기반 스마트공장 구축 백서', type: 'Whitepaper', date: '2024.02.20', summary: '이음 5G 도입 사례 및 성능 분석 리포트' },
];

const chartData = [
  { name: 'Jan', efficiency: 65, production: 400 },
  { name: 'Feb', efficiency: 72, production: 450 },
  { name: 'Mar', efficiency: 78, production: 520 },
  { name: 'Apr', efficiency: 85, production: 600 },
  { name: 'May', efficiency: 82, production: 580 },
  { name: 'Jun', efficiency: 91, production: 700 },
];

// --- Sub-Components ---

const HeroSection = ({ setTab, language }: { setTab: (t: NavigationItem) => void; language: Language }) => {
  const t = translations[language].hero;
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
                  <video
                    src="/메인영상.mp4"
                    className="w-full h-full object-cover origin-center"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div className="md:w-2/3">
                      <div className="inline-flex items-center rounded-full bg-brand-600 px-3 py-1 text-sm font-semibold text-white mb-6">
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            {t.title1}<br />
            <span className="text-amber-500">{t.title2}</span>{t.title3}
          </h1>
          <p className="mt-4 text-xl font-bold text-white max-w-3xl leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }} dangerouslySetInnerHTML={{ __html: t.desc }}></p>
          <div className="mt-10 flex gap-4">
            <button onClick={() => setTab('RESEARCH')} className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-brand-900/20 flex items-center"> {/* Changed hover:bg-brand-500 to hover:bg-brand-700 */}
              {t.btnResearch} <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={() => setTab('ABOUT')} className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-all">
              {t.btnAbout}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutSection = ({ language }: { language: Language }) => {
  const t = translations[language].about;
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase">{t.subtitle}</h2>
          <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{t.title}</p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">{t.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <AboutImageCarousel images={aboutImages} />
                      </div>          <div className="space-y-8">
            {[
              { icon: <Lightbulb />, title: t.missionTitle, desc: t.missionDesc }, // Changed from Activity to Lightbulb
              { icon: <Users />, title: t.ecoTitle, desc: t.ecoDesc },
              { icon: <Factory />, title: t.infraTitle, desc: t.infraDesc }, // Changed from Zap to Factory
            ].map((item, idx) => (
              <div key={idx} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                    {item.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResearchSection = ({ language }: { language: Language }) => {
  const t = translations[language].research;
  const areas = getResearchAreas(language);
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl">{t.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div key={area.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 group">
              <div className="h-48 overflow-hidden relative">
                <video
                  src={area.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={area.id === 'demo-factory' ? { transform: 'scale(1.5)' } : {}}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {area.icon === 'Brain' && <Brain className="w-6 h-6 text-brand-600 mr-2" />}
                  {area.icon === 'Bot' && <Cpu className="w-6 h-6 text-brand-600 mr-2" />}
                  {area.icon === 'Factory' && <Factory className="w-6 h-6 text-brand-600 mr-2" />}
                  <h3 className="text-xl font-bold text-slate-900">{area.title}</h3>
                </div>
                <p className="text-slate-600 mb-6 min-h-[3rem]">{area.description}</p>
                <ul className="space-y-2">
                  {area.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-700 bg-slate-50 p-2 rounded">
                      <div className="w-1.5 h-1.5 bg-brand-400 rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                <Activity className="w-6 h-6 text-brand-500 mr-2" />
                {t.visualTitle}
              </h3>
              <p className="text-slate-500 text-sm mt-1">{t.visualDesc}</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center uppercase">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span> Operational
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full h-80" style={{ position: 'relative', width: '100%', height: '320px' }}>
              <ResponsiveContainer width="99%" height="100%" minWidth={0}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full h-80" style={{ position: 'relative', width: '100%', height: '320px' }}>
              <ResponsiveContainer width="99%" height="100%" minWidth={0}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} />
                  <Bar dataKey="production" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocsSection = ({ documents, language }: { documents: TechDoc[]; language: Language }) => {
  const t = translations[language].docs;

  const handleDownload = (doc: TechDoc) => {
    if (!doc.content) {
      alert("다운로드할 내용이 없습니다.");
      return;
    }
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title}.${doc.type === 'PDF' ? 'pdf' : 'txt'}`; // Use .pdf for PDF type, .txt for others
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-20 bg-slate-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{t.title}</h2>
            <p className="text-slate-600 mt-2">{t.desc}</p>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <input type="text" placeholder={t.search} className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none w-full md:w-64" />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          </div>
        </div>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between group">
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'}`}>
                  {doc.type === 'API' ? <Box className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-100">{doc.type}</span>
                    <span className="text-slate-400 text-xs">{doc.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{doc.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{doc.summary}</p>
                </div>
              </div>
              <button onClick={() => handleDownload(doc)} className="mt-4 md:mt-0 text-sm font-semibold text-slate-500 hover:text-brand-600 flex items-center">
                {t.download} <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{t.bannerTitle}</h3>
            <p className="text-slate-300">{t.bannerDesc}</p>
          </div>
          <button className="bg-brand-600 hover:bg-brand-500 px-6 py-3 rounded-lg font-bold whitespace-nowrap">
            {t.bannerBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

const NoticesSection = ({ notices, language, onNoticeClick, onShowGallery }: { notices: NoticeItem[]; language: Language; onNoticeClick: (notice: NoticeItem) => void; onShowGallery: () => void; }) => {
  const t = translations[language].notices;

  // 버튼 텍스트 다국어 처리
  const viewGalleryText = language === 'KO' ? '갤러리 보러가기 →' : 'View Gallery →';

  return (
    <div className="py-20 bg-white min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-slate-600 mt-2">{t.desc}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {notices.map((notice, index) => (
            <div key={notice.id} onClick={() => onNoticeClick(notice)} className={`p-6 hover:bg-slate-50 cursor-pointer group ${index !== notices.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                      notice.category === '공지' ? 'bg-blue-100 text-blue-700' :
                      notice.category === '행사' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400">{notice.date}</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 group-hover:text-brand-600">{notice.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">{t.gallery}</h3>
            {/* 수정된 버튼 텍스트 적용 */}
            <button onClick={onShowGallery} className="text-sm font-semibold text-brand-600 hover:text-brand-800">
              {viewGalleryText}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden group">
                <img src={`https://picsum.photos/400/400?random=${i + 20}`} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NoticeDetail = ({ notice, onBack }: { notice: NoticeItem; onBack: () => void }) => {
  const [isContentPopupVisible, setIsContentPopupVisible] = useState(false);

  const handleCloseContentPopup = () => {
    setIsContentPopupVisible(false);
  };


  
  return (
    <>
      <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:lg-8">
        <button onClick={onBack} className="mb-8 text-sm font-semibold text-brand-600 hover:text-brand-800">
          &larr; 목록으로 돌아가기
        </button>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-bold px-3 py-1 bg-slate-100 rounded uppercase">{notice.category}</span>
            <span className="text-sm text-slate-500">{notice.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-6">{notice.title}</h1>
          <div className="prose max-w-none text-slate-700">
            <p className="whitespace-pre-wrap">{notice.content}</p>
            {/* Add more detailed content here if available */}
          </div>

        </div>
      </div>
    </div>


    </>
  );
};

const GalleryPage = ({ onBack, language }: { onBack: () => void; language: Language }) => {
  const images = Array.from({ length: 16 }, (_, i) => `https://picsum.photos/400/400?random=${i + 1}`);

  // 언어별 텍스트 정의
  const text = {
    title: language === 'KO' ? '활동 갤러리' : 'Activity Gallery',
    backButton: language === 'KO' ? '← 공지/홍보로 돌아가기' : '← Back to Notices',
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">{text.title}</h2>
            <button onClick={onBack} className="text-sm font-semibold text-brand-600 hover:text-brand-800">
              {text.backButton}
            </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((imgSrc, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden group">
              <img src={imgSrc} alt={`Gallery Image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const FloorPlanSection = ({ language }: { language: Language }) => {
  const t = translations[language];
  
  // 영상 팝업 상태 관리
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // 층별 데이터 (색상 및 텍스트는 이미지 참고하여 구성)
  const floors = [
    { floor: '8F ~ 11F', title: '기업 입주 시설', bg: 'bg-gray-300', text: 'text-slate-500', video: null },
    { floor: '7F', title: '교육/세미나', bg: 'bg-gray-300', text: 'text-slate-500', video: null },
    { floor: '6F', title: '코워킹 스페이스', bg: 'bg-gray-300', text: 'text-slate-500', video: null },
    { floor: '5F', title: 'SMIC 운영룸', bg: 'bg-[#6B8ab0]', text: 'text-white', video: '/5층.mp4' }, // 예시 영상
    { floor: '4F', title: 'CO-LAB', bg: 'bg-[#9ea6c4]', text: 'text-white', video: '/4층.mp4' },
    { floor: '3F', title: '데모공장(구축 중)', bg: 'bg-[#8ba3c7]', text: 'text-white', video: '/3층.mp4' }, // 준비중
    { floor: '2F', title: '데이터센터', bg: 'bg-[#407bb0]', text: 'text-white', video: '/2층.mp4' },
    { floor: '1F', title: '데모공장', bg: 'bg-[#2c3e50]', text: 'text-white', video: '/1층.mp4' },
    { floor: 'B1 ~ B3', title: '지하주차장', bg: 'bg-gray-200', text: 'text-slate-500', video: null },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.nav.floorplan}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">{t.floorplan.desc}</p>
        </div>

        {/* 높이 맞춤(items-stretch) 레이아웃 */}
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden border border-slate-100">
          
          {/* 왼쪽: 건물 이미지 (부모 높이에 꽉 차게 설정) */}
          <div className="w-full lg:w-5/12 relative min-h-[400px] lg:min-h-auto">
            <img 
              src="/층별안내1.jpg" // 건물 전체 샷 이미지 경로
              alt="Building Exterior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* 오른쪽: 층별 리스트 */}
          <div className="w-full lg:w-7/12 flex flex-col bg-white">
            {floors.map((item, index) => (
              <div 
                key={index} 
                className={`${item.bg} flex items-center justify-between px-8 py-5 border-b border-white/10 last:border-0 transition-all hover:brightness-105`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-2xl font-bold ${item.text} w-24`}>{item.floor}</span>
                  <span className={`text-lg font-medium ${item.text}`}>{item.title}</span>
                </div>
                
                {/* 비디오가 있는 층만 버튼 표시 */}
                {item.video && (
                  <button 
                    onClick={() => setSelectedVideo(item.video)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm transition-colors border border-white/30"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    자세히 보기
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 영상 팝업 모달 */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedVideo(null)}>
          <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <video 
              src={selectedVideo} 
              controls 
              autoPlay 
              className="w-full h-auto max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const VisitorNoticeSection = ({ language }: { language: Language }) => {
  const t = translations[language].visitorNotice;
  const steps = t.steps;

  const getStepIcon = (index: number) => {
    const iconProps = { className: "w-12 h-12" };
    switch (index) {
      case 0: return <CalendarDays {...iconProps} />;
      case 1: return <MousePointerClick {...iconProps} />;
      case 2: return <Bell {...iconProps} />;
      case 3: return <FilePenLine {...iconProps} />;
      case 4: return <CheckCircle {...iconProps} />;
      case 5: return <Users {...iconProps} />;
      case 6: return <ClipboardList {...iconProps} />;
      default: return <ClipboardList {...iconProps} />;
    }
  };

  return (
    <div className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">{t.desc}</p>
        </div>

        {/* 첫 번째 줄 (1~4번) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {steps.slice(0, 4).map((step, index) => (
            <div key={index} className="relative bg-white pt-14 pb-6 px-6 rounded-lg shadow-md border border-slate-200 flex flex-col items-center text-center group">
              {/* 숫자 동그라미(w-12 h-12)와 숫자 텍스트(text-lg) 확대 */}
              <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-brand-600 text-white text-lg font-extrabold flex items-center justify-center group-hover:bg-brand-700 transition-colors shadow-md border-2 border-white">
                {index + 1}
              </div>
              <div className="mb-4 text-brand-500 group-hover:text-brand-600 transition-colors">
                {getStepIcon(index)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 mb-4 flex-grow">{step.subtitle}</p>
              {step.buttonText && (
                <a
                  href={(index === 1 && "https://ko.surveymonkey.com/r/52LLYW5") || (index === 3 && "https://smic.nlobbygo.kr/visitor/#") || `#link-${index + 1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-md hover:bg-brand-600 transition-colors mt-auto"
                >
                  {step.buttonText} <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* 두 번째 줄 (5~7번) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
            {steps.slice(4).map((step, index) => (
              <div key={index + 4} className="relative bg-white pt-14 pb-6 px-6 rounded-lg shadow-md border border-slate-200 flex flex-col items-center text-center group">
                {/* 숫자 동그라미(w-12 h-12)와 숫자 텍스트(text-lg) 확대 */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-brand-600 text-white text-lg font-extrabold flex items-center justify-center group-hover:bg-brand-700 transition-colors shadow-md border-2 border-white">
                  {index + 5}
                </div>
                <div className="mb-4 text-brand-500 group-hover:text-brand-600 transition-colors">
                  {getStepIcon(index + 4)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-grow">{step.subtitle}</p>
                {step.buttonText && (
                  <a
                    href={(index === 2 && "https://ko.surveymonkey.com/r/52CV8RY") || `#link-${index + 5}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-md hover:bg-brand-600 transition-colors mt-auto"
                  >
                    {step.buttonText} <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DirectionsSection = ({ language }: { language: Language }) => {
  const t = translations[language].directions;
  // 이미지에 있는 실제 주소 데이터 반영
  const addressInfo = {
    addr1: "경기도 안산시 상록구 해양3로 17",
    addr2: "디지털전환 허브 1~5층",
    center: "스마트제조혁신센터",
    tel: "031-498-7161",
    fax: "031-498-7114",
    email: "smic@smic.kr"
  };
  
  // 구글 맵 임베드 (위치는 안산시 상록구 해양3로 17 기준)
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.567736968038!2d126.8299183!3d37.2923456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b657416d6c6a7%3A0x6a053229237617!2z44K_44K344KqIOa1t-a0i-ODhuOCr-ODjuODkeODvOOCrw!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr`;

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 타이틀 */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h2>
          <p className="text-slate-500">SMIC 디지털전환허브로 오시는 길을 안내해 드립니다.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* 왼쪽: 주소 안내 카드 */}
          <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between h-auto">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-orange-300" />
                <h3 className="text-xl font-bold text-slate-900">주소 안내</h3>
              </div>
              
              <div className="space-y-1 mb-8">
                <p className="text-slate-700 font-medium text-lg">{addressInfo.addr1}</p>
                <p className="text-slate-600">{addressInfo.addr2}</p>
                <p className="text-blue-500 font-medium mt-2">{addressInfo.center}</p>
              </div>

              <div className="space-y-6 border-t border-slate-100 pt-8">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-slate-400 mt-1 mr-4" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">TEL</span>
                    <p className="text-slate-900 font-bold text-lg">{addressInfo.tel}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Printer className="w-5 h-5 text-slate-400 mt-1 mr-4" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">FAX</span>
                    <p className="text-slate-900 font-bold text-lg">{addressInfo.fax}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-slate-400 mt-1 mr-4" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">EMAIL</span>
                    <p className="text-slate-900 font-bold text-lg">{addressInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 버튼 그룹 */}
            <div className="flex gap-3 mt-10">
              <a 
                href={`https://map.kakao.com/link/search/${encodeURIComponent(addressInfo.addr1)}`}
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-[#FAE100] hover:bg-[#FCE205] text-slate-900 py-3 rounded-lg font-bold text-sm flex items-center justify-center transition-colors"
              >
                카카오맵 <ExternalLink className="w-4 h-4 ml-1 opacity-60" />
              </a>
              <a 
                href={`https://map.naver.com/v5/search/${encodeURIComponent(addressInfo.addr1)}`}
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-[#03C75A] hover:bg-[#02B351] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center transition-colors"
              >
                네이버 지도 <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </a>
            </div>
          </div>

          {/* 오른쪽: 지도 영역 */}
          <div className="w-full lg:w-2/3 h-[500px] lg:h-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 relative">
             {/* 지도 API가 없을 경우를 대비한 이미지 혹은 iframe */}
             <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="w-full h-full object-cover"
            ></iframe>
            
            {/* 우측 하단 지도 확대 버튼 UI 흉내 (장식용) */}
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-md hidden md:block">
               <Box className="w-5 h-5 text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {


  const [activeTab, setActiveTab] = useState<NavigationItem>('HOME');


  const [language, setLanguage] = useState<Language>('KO');


  const [notices, setNotices] = useState<NoticeItem[]>(initialNotices);


  const [documents, setDocuments] = useState<TechDoc[]>(initialDocuments);


  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);


  const [isGalleryVisible, setIsGalleryVisible] = useState(false);


  const tabClickRef = useRef(false);


  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);


    const [popupNotice, setPopupNotice] = useState<NoticeItem | null>(null);


  


    const [isInitialPopupVisible, setIsInitialPopupVisible] = useState(false);


    const [initialPopupContent, setInitialPopupContent] = useState({


      title: '2026년도 2월/3월 내방 투어 미진행 안내',


      content: `2026년 3월, 4월에 개최 예정인 전시회 출품 진행 및 데모공장 인프라 업그레이드 작업을 위하여


부득이하게 2026년도 2월/3월 내방 투어는 미진행 예정입니다.


2026년 4월부터 투어가 재개될 예정입니다.


투어 참석 희망하시는 분들의 너른 양해 부탁드립니다. 감사합니다.


 문의 | smic@smic.kr (031-498-7160)`


    });





  // Popup Visibility Logic


    useEffect(() => {


      const dontShowUntil = localStorage.getItem('popupDontShowUntil');


      if (!dontShowUntil || Date.now() > parseInt(dontShowUntil, 10)) {


        setIsInitialPopupVisible(true);


      }


    }, []);





    const handleCloseInitialPopup = () => {





      setIsInitialPopupVisible(false);





    };





  





    // Close notice popup





    const handleCloseNoticePopup = () => {





      setPopupNotice(null);





    };





    const handleDontShowTodayInitialPopup = () => {





      const tomorrow = new Date();





      tomorrow.setDate(tomorrow.getDate() + 1);





      tomorrow.setHours(0, 0, 0, 0); // Set to midnight





      localStorage.setItem('popupDontShowUntil', tomorrow.getTime().toString());





      handleCloseInitialPopup();





    };








  // Scroll spy implementation


  useEffect(() => {


    const sectionElements = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];


    


    if (sectionElements.length === 0) return;





    const observer = new IntersectionObserver(


      (entries) => {


        if (tabClickRef.current) return;





        entries.forEach((entry) => {


          if (entry.isIntersecting) {


            setActiveTab(entry.target.id as NavigationItem);


          }


        });


      },


      { 


        rootMargin: '-50% 0px -50% 0px',


        threshold: 0


      }


    );





    sectionElements.forEach((el) => observer.observe(el));





    return () => observer.disconnect();


  }, []);





  const handleSetTab = (tab: NavigationItem) => {


    // If the tab is not on the main page, just set it


    if (tab === 'DOCS' || tab === 'NOTICES' || tab === 'ADMIN') {


      setActiveTab(tab);


      return;


    }





    // Otherwise, handle smooth scroll


    tabClickRef.current = true;


        setActiveTab(tab);


        document.getElementById(tab.toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'start' });





    // Allow scroll spy to take over again after scroll animation


    if (scrollTimeoutRef.current) {


        clearTimeout(scrollTimeoutRef.current);


    }


    scrollTimeoutRef.current = setTimeout(() => {


      tabClickRef.current = false;


    }, 1000); // 1 second buffer for smooth scroll to finish


  };








    useEffect(() => {








      // Reset sub-views when changing main tabs








      if (activeTab !== 'NOTICES') {








          setSelectedNotice(null);








          setIsGalleryVisible(false);








          setPopupNotice(null); // Close notice popup when changing tabs








      }








    }, [activeTab]);





          const handleNoticeClick = (notice: NoticeItem) => {





            setSelectedNotice(notice);





          };





  const handleBackFromNotice = () => {


    setSelectedNotice(null);


  };





  const handleShowGallery = () => {


    setIsGalleryVisible(true);


  };





  const handleBackFromGallery = () => {


    setIsGalleryVisible(false);


  };





  const renderContent = () => {


    const mainPageContent = (


      <>


        <section id="home"><HeroSection setTab={handleSetTab} language={language} /></section>


        <section id="about"><AboutSection language={language} /></section>


        <section id="research"><ResearchSection language={language} /></section>


        <section id="floorplan"><FloorPlanSection language={language} /></section>


        <section id="visitornotice"><VisitorNoticeSection language={language} /></section>


        <section id="directions"><DirectionsSection language={language} /></section>


      </>


    );





    // This structure ensures that the main page sections are always mounted for the observer to work,


    // but visually hidden when another "page" is active.


    return (
      <>
        <div className="py-20" style={{ display: (activeTab !== 'DOCS' && activeTab !== 'NOTICES' && activeTab !== 'ADMIN') ? 'block' : 'none', minHeight: '60vh' }}>
          {mainPageContent}
        </div>
        
        {activeTab === 'DOCS' && <DocsSection documents={documents} language={language} />}
        
        {activeTab === 'NOTICES' && (
          isGalleryVisible ? 
            // [수정] language prop 추가
            <GalleryPage onBack={handleBackFromGallery} language={language} /> :
            selectedNotice ? 
            <NoticeDetail notice={selectedNotice} onBack={handleBackFromNotice} /> :
            <NoticesSection notices={notices} language={language} onNoticeClick={handleNoticeClick} onShowGallery={handleShowGallery} />
        )}
        
                {activeTab === 'ADMIN' && <AdminDashboard
                  notices={notices}
                  setNotices={setNotices}
                  documents={documents}
                  setDocuments={setDocuments}
                  onLogout={() => setActiveTab('HOME')}
                />}      </>
    );
  };




  return (


    <div className="min-h-screen flex flex-col font-sans">


            {isInitialPopupVisible && (


              <PopupModal 


                title={initialPopupContent.title}


                content={initialPopupContent.content}


                onClose={handleCloseInitialPopup}


                onDontShowToday={handleDontShowTodayInitialPopup}


                language={language}


              />


            )}


      


            {popupNotice && (


              <PopupModal 


                title={popupNotice.title}


                content={popupNotice.content}


                onClose={handleCloseNoticePopup}


                onDontShowToday={() => { /* No "Don't show today" for notice popups */ }} // Can be implemented if needed


                language={language}


              />


            )}


      {activeTab !== 'ADMIN' && <Navigation activeTab={activeTab} setActiveTab={handleSetTab} language={language} setLanguage={setLanguage} />}


      <main>


        {renderContent()}


      </main>


      {activeTab !== 'ADMIN' && (


        <>


          <Footer onAdminClick={() => setActiveTab('ADMIN')} language={language} />


          <Assistant language={language} />


        </>


      )}


    </div>


  );


};


export default App;