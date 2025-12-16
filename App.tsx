import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import AdminDashboard from './components/AdminDashboard';
import { NavigationItem, ResearchArea, NoticeItem, TechDoc, Language } from './types';
import { ArrowRight, Box, Brain, Cpu, FileText, Factory, ChevronRight, Activity, Users, Zap, Search, ChevronLeft, X, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- Mock Data (Korean) ---

const researchAreasKO: ResearchArea[] = [
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

const initialNoticesKO: NoticeItem[] = [
  { id: 1, category: '공지', title: '2024년도 하반기 스마트제조 실증 지원사업 모집 공고', date: '2024-05-20', content: '2024년도 하반기 스마트제조 실증 지원사업을 다음과 같이 공고하오니 참여를 희망하는 기업은 절차에 따라 신청하여 주시기 바랍니다.\n\n1. 사업 개요\n- 지원 규모: 총 20개 과제 내외\n- 지원 기간: 협약 체결일로부터 6개월\n\n2. 신청 방법\n- 홈페이지 접수 및 이메일 제출', imageUrl: 'https://picsum.photos/800/400?random=101' },
  { id: 2, category: '행사', title: '제5회 안산 스마트제조 포럼 개최 안내', date: '2024-05-15', content: '스마트제조 혁신 트렌드를 공유하고 전문가 네트워킹을 위한 제5회 안산 스마트제조 포럼을 개최합니다.\n\n- 일시: 2024. 06. 10 (월) 14:00\n- 장소: 센터 대강당' },
  { id: 3, category: '보도', title: '[보도] SMIC, 독일 프라운호퍼 연구소와 MOU 체결', date: '2024-05-10', content: 'SMIC는 지난 9일 독일 프라운호퍼 연구소와 미래 제조 기술 공동 연구를 위한 업무 협약(MOU)을 체결했다고 밝혔다.', imageUrl: 'https://picsum.photos/800/400?random=102' },
  { id: 4, category: '공지', title: '데모공장 견학 프로그램 운영 재개 안내', date: '2024-05-01', content: '시설 보수로 인해 중단되었던 데모공장 견학 프로그램 운영이 5월 15일부터 재개됩니다. 홈페이지를 통해 예약 가능합니다.' },
];

const initialDocumentsKO: TechDoc[] = [
  { id: 'doc-1', title: '제조 데이터 표준화 가이드라인 v2.0', type: 'PDF', date: '2024.04.15', summary: 'AAS 기반의 제조 데이터 교환 표준 정의서', content: '본 가이드라인은 제조 현장에서 발생하는 다양한 데이터의 상호 운용성을 확보하기 위해 AAS(Asset Administration Shell) 기반의 표준 데이터 모델을 정의합니다. 주요 내용은 다음과 같습니다...\n\n- 데이터 수집 프로토콜\n- 메타데이터 정의\n- AAS 모델링 예시' },
  { id: 'doc-2', title: 'Physical AI 로봇 제어 API Reference', type: 'API', date: '2024.03.10', summary: '협동로봇 제어를 위한 RESTful API 명세', content: 'SMIC Physical AI Platform과 연동하기 위한 로봇 제어 API 명세서입니다. 토크 제어, 위치 제어, 임피던스 제어 모드를 지원합니다.' },
  { id: 'doc-3', title: '5G 특화망 기반 스마트공장 구축 백서', type: 'Whitepaper', date: '2024.02.20', summary: '이음 5G 도입 사례 및 성능 분석 리포트', content: '이음 5G(Private 5G)를 실제 제조 현장에 도입하여 구축한 사례와 성능 테스트 결과를 담은 백서입니다. Wi-Fi 대비 지연 시간 감소 및 연결 안정성 향상 효과를 분석하였습니다.' },
];

// --- Mock Data (English) ---

const researchAreasEN: ResearchArea[] = [
  {
    id: 'industrial-ai',
    title: 'Industrial AI',
    description: 'Industrial AI technology for manufacturing data analysis and process optimization',
    icon: 'Brain',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    details: ['Predictive Maintenance', 'Automated Quality Inspection', 'Process Optimization RL']
  },
  {
    id: 'physical-ai',
    title: 'Physical AI & Robotics',
    description: 'AI robot control technology performing complex physical tasks via human collaboration',
    icon: 'Bot',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    details: ['Cobot Force Control', 'Amorphous Object Grasping', 'AMR Navigation']
  },
  {
    id: 'demo-factory',
    title: 'Demo Factory',
    description: 'Hyper-connected manufacturing infrastructure for verification and testbed of developed technologies',
    icon: 'Factory',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    details: ['5G/6G Private Network', 'Digital Twin Sync', 'Flexible Manufacturing System']
  }
];

const initialNoticesEN: NoticeItem[] = [
  { id: 1, category: 'Notice', title: '2024 2nd Half Smart Manufacturing Support Program', date: '2024-05-20', content: 'We are announcing the 2024 2nd Half Smart Manufacturing Support Program. Companies wishing to participate should apply according to the procedure.\n\n1. Overview\n- Scale: About 20 projects\n- Period: 6 months from agreement\n\n2. How to Apply\n- Website or Email', imageUrl: 'https://picsum.photos/800/400?random=101' },
  { id: 2, category: 'Event', title: '5th Ansan Smart Manufacturing Forum', date: '2024-05-15', content: 'We are holding the 5th Ansan Smart Manufacturing Forum to share innovation trends and network with experts.\n\n- Date: 2024. 06. 10 (Mon) 14:00\n- Venue: Center Auditorium' },
  { id: 3, category: 'Press', title: '[Press] SMIC signs MOU with Fraunhofer', date: '2024-05-10', content: 'SMIC announced on the 9th that it has signed a Memorandum of Understanding (MOU) with the Fraunhofer Institute in Germany for joint research on future manufacturing technologies.', imageUrl: 'https://picsum.photos/800/400?random=102' },
  { id: 4, category: 'Notice', title: 'Demo Factory Tour Program Resumes', date: '2024-05-01', content: 'The Demo Factory tour program, which was suspended due to facility maintenance, will resume on May 15th. Reservations can be made through the website.' },
];

const initialDocumentsEN: TechDoc[] = [
  { id: 'doc-1', title: 'Manufacturing Data Standardization Guideline v2.0', type: 'PDF', date: '2024.04.15', summary: 'Definition of manufacturing data exchange standards based on AAS', content: 'This guideline defines a standard data model based on AAS (Asset Administration Shell) to ensure interoperability of various data generated at manufacturing sites. Key contents include...\n\n- Data Collection Protocols\n- Metadata Definition\n- AAS Modeling Examples' },
  { id: 'doc-2', title: 'Physical AI Robot Control API Reference', type: 'API', date: '2024.03.10', summary: 'RESTful API specification for cobot control', content: 'Robot control API specification for interfacing with the SMIC Physical AI Platform. Supports torque control, position control, and impedance control modes.' },
  { id: 'doc-3', title: '5G Private Network Smart Factory Whitepaper', type: 'Whitepaper', date: '2024.02.20', summary: 'Private 5G adoption cases and performance analysis report', content: 'A white paper containing cases of introducing Private 5G to actual manufacturing sites and performance test results. Analyzed the effect of reducing latency and improving connection stability compared to Wi-Fi.' },
];

const chartData = [
  { name: 'Jan', efficiency: 65, production: 400 },
  { name: 'Feb', efficiency: 72, production: 450 },
  { name: 'Mar', efficiency: 78, production: 520 },
  { name: 'Apr', efficiency: 85, production: 600 },
  { name: 'May', efficiency: 82, production: 580 },
  { name: 'Jun', efficiency: 91, production: 700 },
];

const aboutImages = [
  "https://picsum.photos/800/600?random=10",
  "https://picsum.photos/800/600?random=11",
  "https://picsum.photos/800/600?random=12",
  "https://picsum.photos/800/600?random=13"
];

// --- Sub-Components for Pages ---

const HeroSection = ({ setTab, language }: { setTab: (t: NavigationItem) => void, language: Language }) => (
  <div className="relative bg-slate-900 overflow-hidden">
    {/* Dynamic Background Image */}
    <div className="absolute inset-0 opacity-60 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop" 
        className="w-full h-full object-cover animate-float-zoom origin-center" 
        alt="Future Manufacturing Background" 
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/30"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
      <div className="md:w-2/3">
        <div className="inline-flex items-center rounded-full bg-brand-500/20 px-3 py-1 text-sm font-semibold text-brand-300 ring-1 ring-inset ring-brand-500/40 mb-6 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
          Future of Manufacturing
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight drop-shadow-lg">
          {language === 'KO' ? (
            <>
              인공지능과 피지컬 AI로<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-cyan-200">제조업의 미래</span>를 엽니다.
            </>
          ) : (
            <>
              Opening the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-cyan-200">Future of Manufacturing</span><br />
              with AI & Physical AI.
            </>
          )}
        </h1>
        <p className="mt-4 text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
          {language === 'KO' 
            ? '스마트제조혁신센터 안산은 첨단 제조 기술의 연구와 실증을 위한 데모공장을 운영하며, 대한민국 제조업의 디지털 전환을 선도합니다.'
            : 'SMIC Ansan leads the digital transformation of manufacturing by operating a demo factory for research and verification of advanced manufacturing technologies.'
          }
        </p>
        <div className="mt-10 flex gap-4">
          <button onClick={() => setTab('RESEARCH')} className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-brand-900/30 flex items-center transform hover:-translate-y-1">
            {language === 'KO' ? '핵심 기술 보기' : 'Core Tech'} <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button onClick={() => setTab('ABOUT')} className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-3 rounded-lg font-semibold transition-all border border-white/20 hover:border-white/40 shadow-lg">
            {language === 'KO' ? '센터 소개' : 'About Center'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AboutSection = ({ language }: { language: Language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % aboutImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase">About SMIC</h2>
          <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {language === 'KO' ? '스마트제조혁신센터 안산' : 'Smart Manufacturing Innovation Center Ansan'}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
            {language === 'KO' 
              ? '제조 현장의 난제를 해결하는 실용적 기술 연구의 허브'
              : 'A hub for practical research solving manufacturing challenges'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Slider */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px]">
            {aboutImages.map((img, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={img} alt={`Center View ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 text-white">
               <p className="font-medium text-lg">{language === 'KO' ? '안산 사이언스 밸리 내 위치' : 'Located in Ansan Science Valley'}</p>
               <div className="flex space-x-2 mt-2">
                 {aboutImages.map((_, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setCurrentSlide(idx)}
                     className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                   />
                 ))}
               </div>
            </div>

            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-slate-900">{language === 'KO' ? '미션 (Mission)' : 'Mission'}</h3>
                <p className="mt-2 text-slate-600">
                  {language === 'KO' 
                    ? '제조 데이터와 AI 기술의 융합을 통해 국내 중소/중견 기업의 제조 경쟁력을 글로벌 수준으로 향상시킵니다.'
                    : 'Enhancing the manufacturing competitiveness of SMEs to a global level through the convergence of manufacturing data and AI technology.'
                  }
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
                <h3 className="text-lg font-medium text-slate-900">{language === 'KO' ? '협력 생태계' : 'Ecosystem'}</h3>
                <p className="mt-2 text-slate-600">
                  {language === 'KO'
                    ? '산·학·연·관이 협력하여 기술 개발부터 실증, 인력 양성까지 이어지는 선순환 생태계를 구축합니다.'
                    : 'Building a virtuous cycle ecosystem from technology development to verification and talent training through cooperation between industry, academia, research, and government.'
                  }
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
                <h3 className="text-lg font-medium text-slate-900">{language === 'KO' ? '데모공장 인프라' : 'Infrastructure'}</h3>
                <p className="mt-2 text-slate-600">
                  {language === 'KO'
                    ? '실제 생산 라인과 동일한 환경의 데모공장에서 신기술을 사전 검증(Testbed)하여 도입 리스크를 최소화합니다.'
                    : 'Minimizing adoption risks by pre-verifying new technologies (Testbed) in a demo factory environment identical to actual production lines.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResearchSection = ({ language }: { language: Language }) => (
  <div className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">{language === 'KO' ? '주요 연구 분야' : 'Key Research Areas'}</h2>
        <p className="text-lg text-slate-600 max-w-3xl">
          {language === 'KO' 
            ? 'SMIC는 단순 자동화를 넘어, 인지하고 판단하는 지능형 제조 시스템을 연구합니다.'
            : 'SMIC researches intelligent manufacturing systems that perceive and judge beyond simple automation.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(language === 'KO' ? researchAreasKO : researchAreasEN).map((area) => (
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
              {language === 'KO' ? '데모공장 실시간 가동 현황 (Simulation)' : 'Real-time Demo Factory Status (Simulation)'}
            </h3>
            <p className="text-slate-500 text-sm mt-1">Industrial AI Model #42 {language === 'KO' ? '기반 공정 최적화 데이터' : 'Process Optimization Data'}</p>
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
              <Line type="monotone" dataKey="efficiency" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} name={language === 'KO' ? "공정 효율성 (%)" : "Efficiency (%)"} />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="production" fill="#3b82f6" radius={[4, 4, 0, 0]} name={language === 'KO' ? "생산량 (Unit)" : "Production (Unit)"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const DocsSection = ({ documents, onDocClick, language }: { documents: TechDoc[], onDocClick: (doc: TechDoc) => void, language: Language }) => (
  <div className="py-20 bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{language === 'KO' ? '기술 문서 및 자료' : 'Technical Documents'}</h2>
          <p className="text-slate-600 mt-2">{language === 'KO' ? '연구 결과물, API 명세서, 백서를 열람할 수 있습니다.' : 'Access research results, API specifications, and whitepapers.'}</p>
        </div>
        <div className="mt-4 md:mt-0 relative">
          <input 
            type="text" 
            placeholder={language === 'KO' ? "문서 검색..." : "Search docs..."}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none w-full md:w-64"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            onClick={() => onDocClick(doc)}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between group cursor-pointer"
          >
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
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{doc.summary}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 pl-16 md:pl-0">
              <button className="text-sm font-semibold text-slate-500 hover:text-brand-600 flex items-center transition-colors">
                {language === 'KO' ? '상세보기' : 'Details'} <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Banner for API Access */}
      <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between">
         <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{language === 'KO' ? '연구용 데이터셋 & API 접근 권한이 필요하신가요?' : 'Need access to Research Datasets & APIs?'}</h3>
            <p className="text-slate-300">{language === 'KO' ? '파트너십 기업 및 연구기관에게 데모공장 실시간 데이터를 제공합니다.' : 'We provide real-time demo factory data to partner companies and research institutes.'}</p>
         </div>
         <button className="bg-brand-600 hover:bg-brand-500 px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap">
           {language === 'KO' ? '파트너십 문의하기' : 'Contact Partnership'}
         </button>
      </div>
    </div>
  </div>
);

const NoticesSection = ({ notices, onNoticeClick, language }: { notices: NoticeItem[], onNoticeClick: (notice: NoticeItem) => void, language: Language }) => (
  <div className="py-20 bg-white min-h-screen">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">{language === 'KO' ? '공지사항 & 홍보' : 'Notices & PR'}</h2>
        <p className="text-slate-600 mt-2">{language === 'KO' ? 'SMIC의 새로운 소식과 행사를 알려드립니다.' : 'Latest news and events from SMIC.'}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        {notices.map((notice, index) => (
          <div 
            key={notice.id} 
            onClick={() => onNoticeClick(notice)}
            className={`p-6 hover:bg-slate-50 transition-colors cursor-pointer group ${index !== notices.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Thumbnail if available */}
              {notice.imageUrl && (
                 <div className="sm:w-32 sm:h-24 w-full h-48 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <img src={notice.imageUrl} alt={notice.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                 </div>
              )}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                   <span className={`text-xs font-bold px-2 py-1 rounded ${
                     (notice.category === '공지' || notice.category === 'Notice') ? 'bg-slate-100 text-slate-700' :
                     (notice.category === '행사' || notice.category === 'Event') ? 'bg-orange-100 text-orange-700' :
                     'bg-brand-100 text-brand-700'
                   }`}>
                     {notice.category}
                   </span>
                   <span className="text-xs text-slate-400">{notice.date}</span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 group-hover:text-brand-600 transition-colors">{notice.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{notice.content}</p>
              </div>
              <div className="flex items-center justify-end sm:w-10">
                 <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-brand-500" /> {language === 'KO' ? '활동 갤러리' : 'Activity Gallery'}
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

// --- Detail Modal Component ---
const DetailModal = ({ 
  item, 
  onClose, 
  type,
  language
}: { 
  item: NoticeItem | TechDoc | null, 
  onClose: () => void, 
  type: 'NOTICE' | 'DOC',
  language: Language
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10">
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Header Content */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-3">
             {type === 'NOTICE' ? (
               <span className={`px-2 py-1 rounded text-xs font-bold ${
                 ((item as NoticeItem).category === '공지' || (item as NoticeItem).category === 'Notice') ? 'bg-slate-100 text-slate-700' :
                 ((item as NoticeItem).category === '행사' || (item as NoticeItem).category === 'Event') ? 'bg-orange-100 text-orange-700' :
                 'bg-brand-100 text-brand-700'
               }`}>
                 {(item as NoticeItem).category}
               </span>
             ) : (
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                   (item as TechDoc).type === 'PDF' ? 'bg-red-100 text-red-700' : 
                   (item as TechDoc).type === 'API' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                   {(item as TechDoc).type}
                </span>
             )}
             <span className="text-sm text-slate-500 flex items-center">
               <Calendar className="w-3 h-3 mr-1" /> {item.date}
             </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">{item.title}</h2>
        </div>

        {/* Body Content */}
        <div className="px-8 pb-8 space-y-6">
          
          {type === 'NOTICE' && (item as NoticeItem).imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100">
               <img src={(item as NoticeItem).imageUrl} alt={item.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
            {type === 'NOTICE' 
              ? (item as NoticeItem).content 
              : (item as TechDoc).content || (item as TechDoc).summary
            }
          </div>

          {type === 'DOC' && (
             <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-bold flex items-center transition-colors shadow-sm">
                   <Download className="w-5 h-5 mr-2" />
                   {(item as TechDoc).type} {language === 'KO' ? '다운로드' : 'Download'}
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationItem>('HOME');
  const [language, setLanguage] = useState<Language>('KO');
  
  // Dynamic Content State
  const [notices, setNotices] = useState<NoticeItem[]>(initialNoticesKO);
  const [documents, setDocuments] = useState<TechDoc[]>(initialDocumentsKO);
  
  // Modal State
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<TechDoc | null>(null);

  // Auto-detect language by IP
  useEffect(() => {
    const checkCountry = async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/country');
        if (response.ok) {
          const countryCode = (await response.text()).trim();
          if (countryCode !== 'KR') {
            setLanguage('EN');
          }
        }
      } catch (error) {
        console.warn('Country detection failed, defaulting to Korean:', error);
      }
    };
    checkCountry();
  }, []);

  // Switch initial data when language changes
  useEffect(() => {
    if (language === 'KO') {
      setNotices(initialNoticesKO);
      setDocuments(initialDocumentsKO);
    } else {
      setNotices(initialNoticesEN);
      setDocuments(initialDocumentsEN);
    }
  }, [language]);

  const renderContent = () => {
    switch (activeTab) {
      case 'HOME':
        return (
          <>
            <HeroSection setTab={setActiveTab} language={language} />
            <AboutSection language={language} />
            <ResearchSection language={language} />
            <div className="bg-slate-50 py-16">
               <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-2xl font-bold text-slate-900 mb-8">{language === 'KO' ? '주요 파트너' : 'Key Partners'}</h2>
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
        return <AboutSection language={language} />;
      case 'RESEARCH':
        return <ResearchSection language={language} />;
      case 'DOCS':
        return <DocsSection documents={documents} onDocClick={setSelectedDoc} language={language} />;
      case 'NOTICES':
        return <NoticesSection notices={notices} onNoticeClick={setSelectedNotice} language={language} />;
      case 'ADMIN':
        return (
          <AdminDashboard 
            notices={notices} 
            setNotices={setNotices} 
            documents={documents}
            setDocuments={setDocuments}
            onLogout={() => setActiveTab('HOME')} 
          />
        );
      default:
        return <HeroSection setTab={setActiveTab} language={language} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {activeTab !== 'ADMIN' && (
        <Navigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          language={language} 
          setLanguage={setLanguage} 
        />
      )}
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      {/* Modals */}
      {selectedNotice && (
        <DetailModal 
          item={selectedNotice} 
          onClose={() => setSelectedNotice(null)} 
          type="NOTICE"
          language={language}
        />
      )}
      {selectedDoc && (
        <DetailModal 
          item={selectedDoc} 
          onClose={() => setSelectedDoc(null)} 
          type="DOC"
          language={language}
        />
      )}

      {activeTab !== 'ADMIN' && (
        <>
          <Footer 
            onAdminClick={() => { setActiveTab('ADMIN'); window.scrollTo(0, 0); }} 
            language={language}
          />
          <Assistant language={language} />
        </>
      )}
    </div>
  );
};

export default App;