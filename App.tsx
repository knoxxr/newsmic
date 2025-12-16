import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import { NavigationItem, ResearchArea, NoticeItem, TechDoc } from './types';
import { ArrowRight, Box, Brain, Cpu, FileText, Factory, ChevronRight, Activity, Users, Zap, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- Mock Data ---

const researchAreas: ResearchArea[] = [
  {
    id: 'industrial-ai',
    title: 'Industrial AI',
    description: '제조 데이터 분석 및 공정 최적화를 위한 산업용 인공지능 기술',
    icon: 'Brain',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    details: ['예지보전 (Predictive Maintenance)', '품질 검사 자동화', '공정 최적화 강화학습']
  },
  {
    id: 'physical-ai',
    title: 'Physical AI & Robotics',
    description: '인간과 협업하며 복잡한 물리적 작업을 수행하는 AI 로봇 제어 기술',
    icon: 'Bot',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    details: ['협동로봇 힘 제어', '비정형 객체 파지 (Grasping)', '자율이동로봇 (AMR) 네비게이션']
  },
  {
    id: 'demo-factory',
    title: 'Demo Factory',
    description: '개발된 요소기술의 실증 및 테스트베드 역할을 수행하는 초연결 제조 인프라',
    icon: 'Factory',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    details: ['5G/6G 특화망', 'Digital Twin 동기화', '유연생산 시스템 (FMS)']
  }
];

const notices: NoticeItem[] = [
  { id: 1, category: '공지', title: '2024년도 하반기 스마트제조 실증 지원사업 모집 공고', date: '2024-05-20', content: '...' },
  { id: 2, category: '행사', title: '제5회 안산 스마트제조 포럼 개최 안내', date: '2024-05-15', content: '...' },
  { id: 3, category: '보도', title: '[보도] SMIC, 독일 프라운호퍼 연구소와 MOU 체결', date: '2024-05-10', content: '...' },
  { id: 4, category: '공지', title: '데모공장 견학 프로그램 운영 재개 안내', date: '2024-05-01', content: '...' },
];

const documents: TechDoc[] = [
  { id: 'doc-1', title: '제조 데이터 표준화 가이드라인 v2.0', type: 'PDF', date: '2024.04.15', summary: 'AAS 기반의 제조 데이터 교환 표준 정의서' },
  { id: 'doc-2', title: 'Physical AI 로봇 제어 API Reference', type: 'API', date: '2024.03.10', summary: '협동로봇 제어를 위한 RESTful API 명세' },
  { id: 'doc-3', title: '5G 특화망 기반 스마트공장 구축 백서', type: 'Whitepaper', date: '2024.02.20', summary: '이음 5G 도입 사례 및 성능 분석 리포트' },
];

const chartData = [
  { name: '1월', efficiency: 65, production: 400 },
  { name: '2월', efficiency: 72, production: 450 },
  { name: '3월', efficiency: 78, production: 520 },
  { name: '4월', efficiency: 85, production: 600 },
  { name: '5월', efficiency: 82, production: 580 },
  { name: '6월', efficiency: 91, production: 700 },
];

// --- Sub-Components for Pages ---

const HeroSection = ({ setTab }: { setTab: (t: NavigationItem) => void }) => (
  <div className="relative bg-slate-900 overflow-hidden">
    <div className="absolute inset-0 opacity-40">
      <img src="https://picsum.photos/1920/1080?grayscale&blur=2" className="w-full h-full object-cover" alt="Factory Background" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
      <div className="md:w-2/3">
        <div className="inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 text-sm font-semibold text-brand-400 ring-1 ring-inset ring-brand-500/20 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
          Future of Manufacturing
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
          인공지능과 피지컬 AI로<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-300">제조업의 미래</span>를 엽니다.
        </h1>
        <p className="mt-4 text-xl text-slate-300 max-w-2xl leading-relaxed">
          스마트제조혁신센터 안산은 첨단 제조 기술의 연구와 실증을 위한 데모공장을 운영하며, 대한민국 제조업의 디지털 전환을 선도합니다.
        </p>
        <div className="mt-10 flex gap-4">
          <button onClick={() => setTab('RESEARCH')} className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-brand-900/20 flex items-center">
            핵심 기술 보기 <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button onClick={() => setTab('ABOUT')} className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-3 rounded-lg font-semibold transition-all border border-white/20">
            센터 소개
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AboutSection = () => (
  <div className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-brand-600 font-semibold tracking-wide uppercase">About SMIC</h2>
        <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">스마트제조혁신센터 안산</p>
        <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
          제조 현장의 난제를 해결하는 실용적 기술 연구의 허브
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img src="https://picsum.photos/800/600?random=10" alt="Center Building" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <p className="text-white font-medium">안산 사이언스 밸리 내 위치</p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-slate-900">미션 (Mission)</h3>
              <p className="mt-2 text-slate-600">
                제조 데이터와 AI 기술의 융합을 통해 국내 중소/중견 기업의 제조 경쟁력을 글로벌 수준으로 향상시킵니다.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-slate-900">협력 생태계</h3>
              <p className="mt-2 text-slate-600">
                산·학·연·관이 협력하여 기술 개발부터 실증, 인력 양성까지 이어지는 선순환 생태계를 구축합니다.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                <Zap className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-slate-900">데모공장 인프라</h3>
              <p className="mt-2 text-slate-600">
                실제 생산 라인과 동일한 환경의 데모공장에서 신기술을 사전 검증(Testbed)하여 도입 리스크를 최소화합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResearchSection = () => (
  <div className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">주요 연구 분야</h2>
        <p className="text-lg text-slate-600 max-w-3xl">
          SMIC는 단순 자동화를 넘어, 인지하고 판단하는 지능형 제조 시스템을 연구합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {researchAreas.map((area) => (
          <div key={area.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 group">
            <div className="h-48 overflow-hidden relative">
               <img src={area.imageUrl} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-700">
                 CORE TECH
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

      {/* Demo Factory Data Visualization Mockup */}
      <div className="mt-20 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Activity className="w-6 h-6 text-brand-500 mr-2" />
              데모공장 실시간 가동 현황 (Simulation)
            </h3>
            <p className="text-slate-500 text-sm mt-1">Industrial AI Model #42 기반 공정 최적화 데이터</p>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span> OPERATIONAL
             </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="efficiency" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} name="공정 효율성 (%)" />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="production" fill="#3b82f6" radius={[4, 4, 0, 0]} name="생산량 (Unit)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const DocsSection = () => (
  <div className="py-20 bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">기술 문서 및 자료</h2>
          <p className="text-slate-600 mt-2">연구 결과물, API 명세서, 백서를 열람할 수 있습니다.</p>
        </div>
        <div className="mt-4 md:mt-0 relative">
          <input 
            type="text" 
            placeholder="문서 검색..." 
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none w-full md:w-64"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between group">
            <div className="flex items-start">
              <div className={`p-3 rounded-lg mr-4 ${
                doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 
                doc.type === 'API' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {doc.type === 'API' ? <Box className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      doc.type === 'PDF' ? 'bg-red-100 text-red-700' : 
                      doc.type === 'API' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                   }`}>{doc.type}</span>
                   <span className="text-slate-400 text-xs">{doc.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{doc.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{doc.summary}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 pl-16 md:pl-0">
              <button className="text-sm font-semibold text-slate-500 hover:text-brand-600 flex items-center transition-colors">
                다운로드 <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Banner for API Access */}
      <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
         <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">연구용 데이터셋 & API 접근 권한이 필요하신가요?</h3>
            <p className="text-slate-300">파트너십 기업 및 연구기관에게 데모공장 실시간 데이터를 제공합니다.</p>
         </div>
         <button className="bg-brand-600 hover:bg-brand-500 px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap">
           파트너십 문의하기
         </button>
      </div>
    </div>
  </div>
);

const NoticesSection = () => (
  <div className="py-20 bg-white min-h-screen">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">공지사항 & 홍보</h2>
        <p className="text-slate-600 mt-2">SMIC의 새로운 소식과 행사를 알려드립니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        {notices.map((notice, index) => (
          <div key={notice.id} className={`p-6 hover:bg-slate-50 transition-colors cursor-pointer group ${index !== notices.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                   <span className={`text-xs font-bold px-2 py-1 rounded ${
                     notice.category === '공지' ? 'bg-slate-100 text-slate-700' :
                     notice.category === '행사' ? 'bg-orange-100 text-orange-700' :
                     'bg-brand-100 text-brand-700'
                   }`}>
                     {notice.category}
                   </span>
                   <span className="text-xs text-slate-400">{notice.date}</span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 group-hover:text-brand-600 transition-colors">{notice.title}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 transition-colors hidden sm:block" />
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-brand-500" /> 활동 갤러리
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
               <img src={`https://picsum.photos/400/400?random=${i + 20}`} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationItem>('HOME');

  const renderContent = () => {
    switch (activeTab) {
      case 'HOME':
        return (
          <>
            <HeroSection setTab={setActiveTab} />
            <AboutSection />
            <ResearchSection />
            <div className="bg-slate-50 py-16">
               <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-2xl font-bold text-slate-900 mb-8">주요 파트너</h2>
                 <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder logos */}
                    <div className="h-12 w-32 bg-slate-300 rounded"></div>
                    <div className="h-12 w-32 bg-slate-300 rounded"></div>
                    <div className="h-12 w-32 bg-slate-300 rounded"></div>
                    <div className="h-12 w-32 bg-slate-300 rounded"></div>
                    <div className="h-12 w-32 bg-slate-300 rounded"></div>
                 </div>
               </div>
            </div>
          </>
        );
      case 'ABOUT':
        return <AboutSection />;
      case 'RESEARCH':
        return <ResearchSection />;
      case 'DOCS':
        return <DocsSection />;
      case 'NOTICES':
        return <NoticesSection />;
      default:
        return <HeroSection setTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      <Assistant />
    </div>
  );
};

export default App;
