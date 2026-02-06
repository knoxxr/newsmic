import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import AdminDashboard from './components/AdminDashboard';
import AboutImageCarousel from './components/AboutImageCarousel';
import PopupModal from './components/PopupModal';
import { NavigationItem, ResearchArea, NoticeItem, TechDoc, Language } from './types';
import { translations } from './locales';
import { ArrowRight, Box, Brain, Cpu, FileText, Factory, ChevronRight, Activity, Users, Play, X, Search, MapPin, Phone, Mail, ClipboardList, MousePointerClick, Bell, FilePenLine, Lightbulb, CalendarDays, CheckCircle, Printer, ExternalLink } from 'lucide-react';
import ActivityChart from './components/ActivityChart';
import TransportMessagesChart from './components/TransportMessagesChart'; // 추가

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay'; // Autoplay module CSS (if needed)

// --- Image Data ---
const aboutImages = ['/그림1.jpg', '/그림2.png', '/그림3.png', '/그림4.jpg'];

// --- Mock Data ---
const getResearchAreas = (lang: Language): ResearchArea[] => [
  {
    id: 'ai-common-platform',
    title: lang === 'KO' ? '제조특화 AI 공통 플랫폼' : 'AI Common Platform Specialized for Manufacturing',
    description: lang === 'KO' 
      ? '자동차, 전자 등 주요 업종의 데이터를 통합 분석하여 범용적으로 활용 가능한 공통 AI 모델을 구축합니다. 이를 클라우드 기반 구독형 서비스(SaaS)로 제공하여 개별 기업의 중복 개발 비효율을 없애고, 자율제조 기술을 현장에 신속히 확산합니다.' 
      : 'Standardized Data & Common AI Model: Develops universally applicable AI models by integrating and analyzing manufacturing data across major sectors. SaaS for Autonomous Manufacturing: Provides the platform as a cloud-based subscription (SaaS).',
    icon: 'Factory',
    mediaUrl: '/미디어1.mp4',
    imageUrl: '/산업AI.jpg',
    details: lang === 'KO' 
      ? ['핵심: 산업별 공통 데이터 표준화 및 전처리 기술', '가치: 6대 주력 업종의 품질 검사와 설비 진단을 SaaS로 제공하여 초기 비용 절감'] 
      : ['Core: Industrial common data standardization', 'Value: Provides quality inspection and diagnosis as SaaS to reduce initial costs.']
  },
  {
    id: 'generative-on-device-ai',
    title: lang === 'KO' ? '생성형·온디바이스 AI 품질 검사' : 'Generative and On-device AI Quality Inspection',
    description: lang === 'KO' 
      ? '생성형 AI로 가상의 불량 데이터를 만들어 고질적인 데이터 부족 문제를 해결하고, 실제 데이터와 융합해 학습 효율을 극대화합니다. 또한 고성능 모델을 경량화하여 현장 장비에 직접 탑재함으로써 보안을 강화하고 지연 없는 실시간 품질 판정을 수행합니다.' 
      : 'Virtual Data & Light-weighted AI: Uses Generative AI to create virtual defect data. Real-Time On-device Inspection: Deploys light-weighted models directly on site equipment for secure, real-time quality determination.',
    icon: 'Cpu',
    mediaUrl: '/미디어2.mp4',
    imageUrl: '/산업AI.jpg',
    details: lang === 'KO' 
      ? ['핵심: 생성형 AI 기반 가상 결함 이미지 생성 및 모델 경량화', '가치: 부족한 불량 데이터를 가상으로 보완해 학습 효율 제고 및 현장 실시간 판정 구현'] 
      : ['Core: Generative AI-based virtual defect generation', 'Value: Complements insufficient data and implements real-time judgment on-site.']
  },
  {
    id: 'humanoid-robot-autonomous-operation',
    title: lang === 'KO' ? '휴머노이드 로봇 자율 운영' : 'Humanoid Robot Autonomous Operation',
    description: lang === 'KO' 
      ? '3D 비전과 상황 인지 AI를 통해 로봇이 스스로 작업 계획을 수립하며, 정밀한 양팔 제어 기술로 복잡한 공정을 수행합니다. 가상 환경 시뮬레이션으로 로봇을 사전 학습시켜, 실제 현장 투입 시 발생할 수 있는 시행착오를 최소화합니다.' 
      : 'AI Planning & Precise Control: Robots autonomously establish work plans using 3D vision. Simulation for Flexibility: Utilizes virtual environment simulations to pre-train robots, minimizing field errors.',
    icon: 'Users',
    mediaUrl: '/미디어3.mp4',
    imageUrl: '/산업AI.jpg',
    details: lang === 'KO' 
      ? ['핵심: 고도화된 상황 인지 판단 AI 및 양팔·보행 제어', '가치: 물류 이송부터 정밀 조립까지 복잡한 공정에 로봇을 투입하여 생산 유연성 확보'] 
      : ['Core: Advanced situation awareness AI and dual-arm control', 'Value: Deploys robots in complex processes to secure production flexibility.']
  },
  {
    id: 'edge-brain-framework',
    title: lang === 'KO' ? '엣지 브레인 프레임워크' : 'Edge Brain Framework',
    description: lang === 'KO' 
      ? '제조 현장에서 데이터를 즉각 처리해 통신 지연을 없애고, AI 기능을 컨테이너 단위로 구성하여 유연한 모듈 공유 체계를 확보합니다. 디지털 트윈과 실시간으로 데이터를 동기화하여 가상 시뮬레이션 결과를 실제 설비 제어에 즉시 반영합니다.' 
      : 'Ultra-Low Latency Edge AI: Processes data instantly on-site using 5G. Digital Twin Synchronization: Synchronizes data in real-time with the Digital Twin to reflect virtual simulation results into actual equipment.',
    icon: 'Brain',
    mediaUrl: '/미디어1.mp4',
    imageUrl: '/산업AI.jpg',
    details: lang === 'KO' 
      ? ['핵심: 5G 초저지연 통신 기반 컨테이너형 AI 모듈', '가치: 클라우드 없이 실시간 데이터 처리 및 디지털 트윈 동기화로 즉각적인 제어 수행'] 
      : ['Core: 5G ultra-low latency communication AI module', 'Value: Performs immediate recognition and control through real-time processing.']
  },
  {
    id: 'customized-autonomous-manufacturing',
    title: lang === 'KO' ? '산업별 맞춤형 자율제조 고도화' : 'Customized Autonomous Manufacturing Advancement',
    description: lang === 'KO' 
      ? '자동차, 반도체 등 각 산업의 고유한 공정 특성에 맞춘 특화 AI 모델과 제어 기술을 적용해 생산성을 극대화합니다. 설비 데이터를 실시간 분석하여 공구 마모를 예측하고 최적의 공정 레시피를 자동으로 탐색하는 통합 운영 플랫폼을 구축합니다.' 
      : 'Industry-Specific AI & Control: Applies specialized AI models tailored to each industry. Predictive Maintenance Platform: Builds an integrated platform for tool wear prediction and optimal process recipe search.',
    icon: 'Lightbulb',
    mediaUrl: '/미디어2.mp4',
    imageUrl: '/산업AI.jpg',
    details: lang === 'KO' 
      ? ['핵심: SDF 플랫폼, AI 레시피 및 설비 예지보전', '가치: 산업 특화 AI 모델 적용으로 마모 예측 및 최적 공정 조건 탐색 등 생산성 극대화'] 
      : ['Core: SDF platform, AI recipe, and predictive maintenance', 'Value: Maximizes productivity through specialized AI models and optimal process search.']
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

// --- Sub-Components ---

const HeroSection = ({ setTab, language }: { setTab: (t: NavigationItem) => void; language: Language }) => {
  const t = translations[language].hero;
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <video src="/메인영상.mp4" className="w-full h-full object-cover origin-center" autoPlay loop muted playsInline />
      </div>
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
            <button onClick={() => setTab('RESEARCH')} className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-brand-900/20 flex items-center">
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
          </div>
          <div className="space-y-8">
            {[
              { icon: <Lightbulb />, title: t.missionTitle, desc: t.missionDesc },
              { icon: <Users />, title: t.ecoTitle, desc: t.ecoDesc },
              { icon: <Factory />, title: t.infraTitle, desc: t.infraDesc },
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

const CARD_THEMES = [
  { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-500', border: 'border-blue-100' },
  { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-500', border: 'border-green-100' },
  { bg: 'bg-orange-400', light: 'bg-orange-50', text: 'text-orange-500', border: 'border-orange-100' },
  { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-500', border: 'border-purple-100' },
  { bg: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-500', border: 'border-rose-100' },
];

const ResearchSection = ({ language }: { language: Language }) => {
  const t = translations[language].research;
  const areas = getResearchAreas(language);

  const renderIcon = (iconName: string) => {
    const className = "w-10 h-10 text-white opacity-95";
    switch (iconName) {
      case 'Brain': return <Brain className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Factory': return <Factory className={className} />;
      case 'Lightbulb': return <Lightbulb className={className} />;
      default: return <Activity className={className} />;
    }
  };

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.desc}</p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24} // Tailwind CSS gap-6 (24px)
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            // when window width is >= 1536px (2xl)
            1536: {
              slidesPerView: 3, // Keep 3 for 2xl as per request
              spaceBetween: 24,
            }
          }}
          className="research-swiper"
        >
          {areas.map((area, index) => {
            const theme = CARD_THEMES[index % CARD_THEMES.length];
            return (
              <SwiperSlide key={area.id} className="h-full">
                <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-transform duration-300 border border-slate-100 shadow-lg shadow-gray-200">
                  {/* 1. Header (Fixed Height) */}
                  <div className={`${theme.bg} p-6 flex flex-col items-start gap-4 h-40 relative overflow-hidden shrink-0`}>
                    <div className="absolute -right-4 -bottom-4 opacity-10 transform rotate-12 scale-150">
                      {renderIcon(area.icon)}
                    </div>
                    <div className="z-10 bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      {renderIcon(area.icon)}
                    </div>
                    <h3 className="z-10 text-xl font-bold text-white leading-tight break-keep">
                      {area.title}
                    </h3>
                  </div>

                  {/* 2. Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* flex-grow ensures this section pushes the separator and footer to the bottom */}
                    <div className="flex-grow">
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 break-keep text-left">
                        {area.description}
                      </p>
                    </div>

                    {/* 구분선 */}
                    <div className="w-full h-px bg-slate-100 mb-5"></div>

                    {/* 3. Footer (Details) */}
                    <div className="space-y-3 shrink-0">
                      {area.details.map((detail, idx) => {
                        const parts = detail.split(':');
                        const label = parts.length > 1 ? parts[0].trim() : '';
                        const content = parts.length > 1 ? parts.slice(1).join(':').trim() : detail;
                        const isCore = label.includes('핵심') || label.includes('Core');

                        return (
                                                  <div key={idx} className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-2">
                                                      <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full tracking-wide ${isCore ? 'bg-slate-700 text-white' : `${theme.light} ${theme.text}`}`}>
                                                        {label || (isCore ? 'CORE' : 'VALUE')}
                                                      </span>
                                                    </div>
                                                    <p className="text-sm text-slate-700 font-medium pl-1 leading-snug break-keep">                              {content}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* [추가된 부분] ActivityChart: Research Section 하단에 배치 */}
        {/* SMIC Platform Activity Section */}
        <div className="mt-24 py-16 bg-white rounded-2xl shadow-2xl border border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t.platformStatusTitle}</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.platformStatusDesc}</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {/* 왼쪽: 활성 장치 수 */}
            <ActivityChart language={language} />

            {/* 오른쪽: 메시지 전송량 */}
            <TransportMessagesChart language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DocsSection = ({ documents, language }: { documents: TechDoc[]; language: Language }) => {
  const t = translations[language].docs;
  const handleDownload = (doc: TechDoc) => {
    if (!doc.content) { alert("다운로드할 내용이 없습니다."); return; }
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title}.${doc.type === 'PDF' ? 'pdf' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-[60vh]">
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
          <button className="bg-brand-600 hover:bg-brand-500 px-6 py-3 rounded-lg font-bold whitespace-nowrap">{t.bannerBtn}</button>
        </div>
      </div>
    </div>
  );
};

const NoticesSection = ({ notices, language, onNoticeClick, onShowGallery }: { notices: NoticeItem[]; language: Language; onNoticeClick: (notice: NoticeItem) => void; onShowGallery: () => void; }) => {
  const t = translations[language].notices;
  const viewGalleryText = language === 'KO' ? '갤러리 보러가기 →' : 'View Gallery →';
  return (
    <div className="pt-20 bg-white flex-grow">
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
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${notice.category === '공지' ? 'bg-blue-100 text-blue-700' : notice.category === '행사' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
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
            <button onClick={onShowGallery} className="text-sm font-semibold text-brand-600 hover:text-brand-800">{viewGalleryText}</button>
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
  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:lg-8">
        <button onClick={onBack} className="mb-8 text-sm font-semibold text-brand-600 hover:text-brand-800">← 목록으로 돌아가기</button>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-bold px-3 py-1 bg-slate-100 rounded uppercase">{notice.category}</span>
            <span className="text-sm text-slate-500">{notice.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-6">{notice.title}</h1>
          <div className="prose max-w-none text-slate-700">
            <p className="whitespace-pre-wrap">{notice.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = ({ onBack, language }: { onBack: () => void; language: Language }) => {
  const images = Array.from({ length: 16 }, (_, i) => `https://picsum.photos/400/400?random=${i + 1}`);
  const text = {
    title: language === 'KO' ? '활동 갤러리' : 'Activity Gallery',
    backButton: language === 'KO' ? '← 공지/홍보로 돌아가기' : '← Back to Notices',
  };
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">{text.title}</h2>
          <button onClick={onBack} className="text-sm font-semibold text-brand-600 hover:text-brand-800">{text.backButton}</button>
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // 1. 층별 배경색 지정 (8F~11F 색상 복구)
  const getFloorBgColor = (floor: string) => {
    if (floor.includes('8F') || floor.includes('11F')) return 'bg-[#D1D1D1]'; // 기업 입주 시설 (연한 회색)
    if (floor.includes('7F')) return 'bg-[#C0C0C0]'; // 교육/세미나
    if (floor.includes('6F')) return 'bg-[#A6A6A6]'; // 코워킹 스페이스
    if (floor.includes('5F')) return 'bg-[#6B84A8]'; // SMIC 운영룸
    if (floor.includes('4F')) return 'bg-[#98A8C7]'; // CO-LAB
    if (floor.includes('3F')) return 'bg-[#B1BED8]'; // 데모공장(구축 중)
    if (floor.includes('2F')) return 'bg-[#3C6EA6]'; // 데이터센터
    if (floor.includes('1F')) return 'bg-[#303542]'; // 데모공장
    if (floor.includes('B1') || floor.includes('B3')) return 'bg-[#D1D1D1]'; // 지하주차장
    return 'bg-slate-500'; // 기본값
  };

  // 2. 층별 동영상 경로 지정 (1F~5F만 설정, 나머지는 null)
  const getFloorVideo = (floor: string) => {
    if (floor.includes('8F') || floor.includes('11F')) return null;
    
    if (floor.includes('5F')) return '/5층.mp4';
    if (floor.includes('4F')) return '/4층.mp4';
    if (floor.includes('3F')) return '/3층.mp4';
    if (floor.includes('2F')) return '/2층.mp4';
    if (floor.includes('1F')) return '/1층.mp4';
    
    // 8F, 11F, 6F, 7F, 지하 등은 null 반환 -> 버튼 안 생김
    return null;
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.nav.floorplan}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">{t.floorplan.desc}</p>
        </div>
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden border border-slate-100">
          <div className="w-full lg:w-5/12 relative min-h-[400px] lg:min-h-auto">
            <img src="/층별안내1.jpg" alt="Building Exterior" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-7/12 flex flex-col bg-white">
            {t.floorplan.floorList.map((item, index) => {
              // 각 층에 맞는 비디오 경로 가져오기 (8F, 11F 등은 null이 됨)
              const videoPath = getFloorVideo(item.floor);
              
              return (
                <div 
                  key={index} 
                  className={`${getFloorBgColor(item.floor)} flex items-center justify-between px-8 py-5 border-b border-white/10 last:border-0 transition-all hover:brightness-105`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-2xl font-bold text-white w-24`}>{item.floor}</span>
                    <span className={`text-lg font-medium text-white`}>{item.name}</span>
                  </div>
                  
                  {/* videoPath가 존재하는 경우(1~5층)에만 버튼 표시 */}
                  {/* 8F, 11F 등은 videoPath가 null이므로 버튼이 렌더링되지 않음 */}
                  {videoPath && (
                    <button 
                      onClick={() => setSelectedVideo(videoPath)} 
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm transition-colors border border-white/30"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {t.floorplan.viewDetailsButton}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedVideo(null)}>
          <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"><X className="w-6 h-6" /></button>
            <video src={selectedVideo} controls autoPlay className="w-full h-auto max-h-[80vh]" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {steps.slice(0, 4).map((step, index) => (
            <div key={index} className="relative bg-white pt-14 pb-6 px-6 rounded-lg shadow-md border border-slate-200 flex flex-col items-center text-center group">
              <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-brand-600 text-white text-lg font-extrabold flex items-center justify-center group-hover:bg-brand-700 transition-colors shadow-md border-2 border-white">{index + 1}</div>
              <div className="mb-4 text-brand-500 group-hover:text-brand-600 transition-colors">{getStepIcon(index)}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 mb-4 flex-grow">{step.subtitle}</p>
              {step.buttonText && (
                <a href={(index === 1 && "https://ko.surveymonkey.com/r/52LLYW5") || (index === 3 && "https://smic.nlobbygo.kr/visitor/#") || `#link-${index + 1}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-md hover:bg-brand-600 transition-colors mt-auto">
                  {step.buttonText} <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
            {steps.slice(4).map((step, index) => (
              <div key={index + 4} className="relative bg-white pt-14 pb-6 px-6 rounded-lg shadow-md border border-slate-200 flex flex-col items-center text-center group">
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-brand-600 text-white text-lg font-extrabold flex items-center justify-center group-hover:bg-brand-700 transition-colors shadow-md border-2 border-white">{index + 5}</div>
                <div className="mb-4 text-brand-500 group-hover:text-brand-600 transition-colors">{getStepIcon(index + 4)}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-grow">{step.subtitle}</p>
                {step.buttonText && (
                  <a href={(index === 2 && "https://ko.surveymonkey.com/r/52CV8RY") || `#link-${index + 5}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-md hover:bg-brand-600 transition-colors mt-auto">
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
  
  // 수정됨: 경기도 안산시 상록구 해양3로 17 주소 적용
  const mapAddress = "경기도 안산시 상록구 해양3로 17";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h2>
          <p className="text-slate-500">{t.desc}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between h-auto">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-orange-300" />
                <h3 className="text-xl font-bold text-slate-900">{t.addressGuideTitle}</h3>
              </div>
              <div className="space-y-1 mb-8">
                {/* 주소 텍스트도 요청하신 주소와 일치하는지 확인하거나, locales 파일이 있다면 거기서 수정되어야 합니다.
                    여기서는 화면에 보이는 텍스트는 locales를 따르되, 지도는 확실하게 변경합니다. */}
                <p className="text-slate-700 font-medium text-lg">{t.address.addr1}</p>
                <p className="text-slate-600">{t.address.addr2}</p>
                <p className="text-blue-500 font-medium mt-2">{t.address.center}</p>
              </div>
              <div className="space-y-6 border-t border-slate-100 pt-8">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-slate-400 mt-1 mr-4" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.tel}</span>
                    <p className="text-slate-900 font-bold text-lg">{t.address.tel}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Printer className="w-5 h-5 text-slate-400 mt-1 mr-4" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.fax}</span>
                    <p className="text-slate-900 font-bold text-lg">{t.address.fax}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-slate-400 mt-1 mr-4" />
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">EMAIL</span>
                    <p className="text-slate-900 font-bold text-lg">{t.address.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-10">
              <a href={`https://map.kakao.com/link/search/${encodeURIComponent(mapAddress)}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#FAE100] hover:bg-[#FCE205] text-slate-900 py-3 rounded-lg font-bold text-sm flex items-center justify-center transition-colors">
                {t.kakaomap} <ExternalLink className="w-4 h-4 ml-1 opacity-60" />
              </a>
              <a href={`https://map.naver.com/v5/search/${encodeURIComponent(mapAddress)}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#03C75A] hover:bg-[#02B351] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center transition-colors">
                {t.navermap} <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-2/3 h-[500px] lg:h-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 relative">
             <iframe src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map" className="w-full h-full object-cover"></iframe>
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
    content: `2026년 3월, 4월에 개최 예정인 전시회 출품 진행 및 데모공장 인프라 업그레이드 작업을 위하여 부득이하게 2026년도 2월/3월 내방 투어는 미진행 예정입니다.\n\n2026년 4월부터 투어가 재개될 예정입니다.\n\n투어 참석 희망하시는 분들의 너른 양해 부탁드립니다. 감사합니다.\n\n\n문의 | smic@smic.kr (031-498-7160)`
  });

  useEffect(() => {
    const dontShowUntil = localStorage.getItem('popupDontShowUntil');
    if (!dontShowUntil || Date.now() > parseInt(dontShowUntil, 10)) {
      setIsInitialPopupVisible(true);
    }
  }, []);

  const handleCloseInitialPopup = () => setIsInitialPopupVisible(false);
  const handleCloseNoticePopup = () => setPopupNotice(null);
  const handleDontShowTodayInitialPopup = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem('popupDontShowUntil', tomorrow.getTime().toString());
    handleCloseInitialPopup();
  };

  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
    if (sectionElements.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      if (tabClickRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as NavigationItem);
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSetTab = (tab: NavigationItem) => {
    if (tab === 'DOCS' || tab === 'NOTICES' || tab === 'ADMIN') {
      setActiveTab(tab);
      return;
    }
    tabClickRef.current = true;
    setActiveTab(tab);
    document.getElementById(tab.toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => { tabClickRef.current = false; }, 1000);
  };

  useEffect(() => {
    if (activeTab !== 'NOTICES') {
      setSelectedNotice(null);
      setIsGalleryVisible(false);
      setPopupNotice(null);
    }
  }, [activeTab]);

  const handleNoticeClick = (notice: NoticeItem) => setSelectedNotice(notice);
  const handleBackFromNotice = () => setSelectedNotice(null);
  const handleShowGallery = () => setIsGalleryVisible(true);
  const handleBackFromGallery = () => setIsGalleryVisible(false);

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

    return (
      <>
        <div style={{ display: (activeTab !== 'DOCS' && activeTab !== 'NOTICES' && activeTab !== 'ADMIN') ? 'block' : 'none', minHeight: '60vh' }}>
          {mainPageContent}
        </div>
        {activeTab === 'DOCS' && <DocsSection documents={documents} language={language} />}
        {activeTab === 'NOTICES' && (
          isGalleryVisible ? 
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
        />}
      </>
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
          onDontShowToday={() => { }} 
          language={language}
        />
      )}
      {activeTab !== 'ADMIN' && <Navigation activeTab={activeTab} setActiveTab={handleSetTab} language={language} setLanguage={setLanguage} />}
      <main className="flex-grow">
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