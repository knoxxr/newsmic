
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import AdminDashboard from './components/AdminDashboard';
import { NavigationItem, ResearchArea, NoticeItem, TechDoc, Language } from './types';
import { translations } from './locales';
import { ArrowRight, Box, Brain, Cpu, FileText, Factory, ChevronRight, Activity, Users, Zap, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- Mock Data ---

const getResearchAreas = (lang: Language): ResearchArea[] => [
  {
    id: 'industrial-ai',
    title: lang === 'KO' ? 'Industrial AI' : 'Industrial AI',
    description: lang === 'KO' ? '제조 데이터 분석 및 공정 최적화를 위한 산업용 인공지능 기술' : 'Industrial AI technologies for manufacturing data analysis and process optimization',
    icon: 'Brain',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    details: lang === 'KO' ? ['예지보전 (Predictive Maintenance)', '품질 검사 자동화', '공정 최적화 강화학습'] : ['Predictive Maintenance', 'Quality Inspection Automation', 'Process Optimization Reinforcement Learning']
  },
  {
    id: 'physical-ai',
    title: lang === 'KO' ? 'Physical AI & Robotics' : 'Physical AI & Robotics',
    description: lang === 'KO' ? '인간과 협업하며 복잡한 물리적 작업을 수행하는 AI 로봇 제어 기술' : 'AI robot control technology for performing complex physical tasks in collaboration with humans',
    icon: 'Bot',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    details: lang === 'KO' ? ['협동로봇 힘 제어', '비정형 객체 파지 (Grasping)', '자율이동로봇 (AMR) 네비게이션'] : ['Collaborative Robot Force Control', 'Irregular Object Grasping', 'Autonomous Mobile Robot (AMR) Navigation']
  },
  {
    id: 'demo-factory',
    title: lang === 'KO' ? 'Demo Factory' : 'Demo Factory',
    description: lang === 'KO' ? '개발된 요소기술의 실증 및 테스트베드 역할을 수행하는 초연결 제조 인프라' : 'Hyper-connected manufacturing infrastructure serving as a testbed for developed technologies',
    icon: 'Factory',
    imageUrl: 'https://picsum.photos/800/600?random=3',
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
      <div className="absolute inset-0 opacity-40 overflow-hidden">
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=2"
          className="w-full h-full object-cover animate-kenburns origin-center"
          alt="Factory"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div className="md:w-2/3">
          <div className="inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 text-sm font-semibold text-brand-400 ring-1 ring-inset ring-brand-500/20 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            {t.title1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-300">{t.title2}</span>{t.title3}
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl leading-relaxed">
            {t.desc}
          </p>
          <div className="mt-10 flex gap-4">
            <button onClick={() => setTab('RESEARCH')} className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-brand-900/20 flex items-center">
              {t.btnResearch} <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button onClick={() => setTab('ABOUT')} className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-3 rounded-lg font-semibold transition-all border border-white/20">
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
            <img src="https://picsum.photos/800/600?random=10" alt="Center Building" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-medium">{t.location}</p>
            </div>
          </div>
          <div className="space-y-8">
            {[
              { icon: <Activity />, title: t.missionTitle, desc: t.missionDesc },
              { icon: <Users />, title: t.ecoTitle, desc: t.ecoDesc },
              { icon: <Zap />, title: t.infraTitle, desc: t.infraDesc },
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
                <img src={area.imageUrl} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-700 uppercase">
                  Core Tech
                </div>
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
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
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
              <button className="mt-4 md:mt-0 text-sm font-semibold text-slate-500 hover:text-brand-600 flex items-center">
                {t.download} <ArrowRight className="w-4 h-4 ml-1" />
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

const NoticesSection = ({ notices, language }: { notices: NoticeItem[]; language: Language }) => {
  const t = translations[language].notices;
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-slate-600 mt-2">{t.desc}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {notices.map((notice, index) => (
            <div key={notice.id} className={`p-6 hover:bg-slate-50 cursor-pointer group ${index !== notices.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded uppercase">{notice.category}</span>
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
          <h3 className="text-xl font-bold text-slate-900 mb-6">{t.gallery}</h3>
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

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationItem>('HOME');
  const [language, setLanguage] = useState<Language>('KO');
  const [notices] = useState<NoticeItem[]>(initialNotices);
  const [documents] = useState<TechDoc[]>(initialDocuments);

  const renderContent = () => {
    switch (activeTab) {
      case 'HOME':
        return (
          <>
            <HeroSection setTab={setActiveTab} language={language} />
            <AboutSection language={language} />
            <ResearchSection language={language} />
          </>
        );
      case 'ABOUT': return <AboutSection language={language} />;
      case 'RESEARCH': return <ResearchSection language={language} />;
      case 'DOCS': return <DocsSection documents={documents} language={language} />;
      case 'NOTICES': return <NoticesSection notices={notices} language={language} />;
      case 'ADMIN': return <AdminDashboard notices={notices} setNotices={() => { }} documents={documents} setDocuments={() => { }} onLogout={() => setActiveTab('HOME')} />;
      default: return <HeroSection setTab={setActiveTab} language={language} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {activeTab !== 'ADMIN' && <Navigation activeTab={activeTab} setActiveTab={setActiveTab} language={language} setLanguage={setLanguage} />}
      <main className="flex-grow">
        {renderContent()}
      </main>
      {activeTab !== 'ADMIN' && (
        <>
          <Footer onAdminClick={() => setActiveTab('ADMIN')} />
          <Assistant language={language} />
        </>
      )}
    </div>
  );
};

export default App;
