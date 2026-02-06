
import { Language } from './types';

export const translations = {
  KO: {
    siteName: 'SMIC',
    siteSubName: '스마트제조혁신센터',
    nav: {
      home: '홈',
      about: '센터 소개',
      research: '핵심 연구',
      docs: '기술 문서',
      notices: '공지/홍보',
      floorplan: '층별 안내',
      visitorNotice: '방문 안내',
      directions: '오시는 길',
    },
    hero: {
      badge: '제조업의 미래',
      title1: '인공지능과 피지컬 AI로',
      title2: '제조업의 미래',
      title3: '를 엽니다',
      desc: '스마트제조혁신센터 안산은 첨단 제조 기술의 연구와 실증을 위한 데모공장을 운영하며,<br /> 대한민국 제조업의 디지털 전환을 선도합니다.',
      btnResearch: '핵심 기술 보기',
      btnAbout: '센터 소개',
    },
    about: {
      subtitle: 'About SMIC',
      title: '스마트제조혁신센터',
      desc: '제조 현장의 난제를 해결하는 실용적 기술 연구의 허브',
      missionTitle: '미션 (Mission)',
      missionDesc: '제조 데이터와 AI 기술의 융합을 통해 국내 중소/중견 기업의 제조 경쟁력을 글로벌 수준으로 향상시킵니다.',
      ecoTitle: '협력 생태계',
      ecoDesc: '산·학·연·관이 협력하여 기술 개발부터 실증, 인력 양성까지 이어지는 선순환 생태계를 구축합니다.',
      infraTitle: '데모공장 인프라',
      infraDesc: '실제 생산 라인과 동일한 환경의 데모공장에서 신기술을 사전 검증(Testbed)하여 도입 리스크를 최소화합니다.',
      location: '안산 사이언스 밸리 내 위치',
    },
    research: {
      title: '주요 연구 분야',
      desc: 'SMIC는 단순 자동화를 넘어, 인지하고 판단하는 지능형 제조 시스템을 연구합니다.',
      visualTitle: '데모공장 실시간 가동 현황 (Simulation)',
      visualDesc: 'Industrial AI Model #42 기반 공정 최적화 데이터',
      platformStatusTitle: 'SMIC 플랫폼 현황',
      platformStatusDesc: '실시간 수집 중인 장치 및 메시지 전송 현황입니다.',
      activeDeviceStatusTitle: '활성 장치 현황',
      messageTransmissionStatusTitle: '메시지 전송 현황',
      last30Days: '최근 30일',
    },
    docs: {
      title: '기술 문서 및 자료',
      desc: '연구 결과물, API 명세서, 백서를 열람할 수 있습니다.',
      search: '문서 검색...',
      download: '다운로드',
      bannerTitle: '연구용 데이터셋 & API 접근 권한이 필요하신가요?',
      bannerDesc: '파트너십 기업 및 연구기관에게 데모공장 실시간 데이터를 제공합니다.',
      bannerBtn: '파트너십 문의하기',
    },
    notices: {
      title: '공지사항 & 홍보',
      desc: 'SMIC의 새로운 소식과 행사를 알려드립니다.',
      gallery: '활동 갤러리',
    },
    floorplan: {
      desc: '각 층별 상세 정보를 확인하실 수 있습니다.',
      viewDetailsButton: '자세히 보기',
      floorList: [
        { floor: '8F ~ 11F', name: '기업입주 시설', color: 'bg-gray-400', hasVideo: false },
        { floor: '7F', name: '교육/세미나', color: 'bg-gray-400', hasVideo: false },
        { floor: '6F', name: '코워킹 스페이스', color: 'bg-gray-400', hasVideo: false },
        { floor: '5F', name: 'SMIC 운영룸', color: 'bg-blue-500', hasVideo: true },
        { floor: '4F', name: 'CO-LAB', color: 'bg-purple-400', hasVideo: true },
        { floor: '3F', name: '데모공장(구축 중)', color: 'bg-blue-600', hasVideo: true },
        { floor: '2F', name: '데이터센터', color: 'bg-blue-700', hasVideo: true },
        { floor: '1F', name: '데모공장', color: 'bg-slate-800', hasVideo: true },
        { floor: 'B1 ~ B3', name: '지하주차장', color: 'bg-gray-400', hasVideo: false }
      ]
    },
    visitorNotice: {
      title: '방문 안내',
      desc: '공지사항을 통해 공고되는 신청 기간에 방문 신청을 해 주시기 바랍니다.',
      steps: [
        { title: '신청 기간 안내', subtitle: '홈페이지 공지사항을 확인하여 신청 기간 확인' },
        { title: '방문신청 접수', subtitle: '안내된 신청 기간 내 선착순 방문 접수', buttonText: '신청 접수' },
        { title: '신청결과 안내', subtitle: '접수 기간 종료 후 신청 결과 통보' },
        { title: '내방신청', subtitle: '*확정 통보 받으신 분만 신청 가능', buttonText: '내방 신청' },
        { title: '내방확정', subtitle: '최종 내방 확정 안내' },
        { title: '투어 프로그램', subtitle: '확정된 시간에 맞추어 투어 프로그램 진행' },
        { title: '만족도 조사', subtitle: '방문 만족도 설문조사 참여', buttonText: '설문 참여' }
      ]
    },
    directions: {
      title: '오시는 길',
      desc: 'SMIC 디지털전환허브로 오시는 길을 안내해 드립니다.',
      addressGuideTitle: '주소 안내',
      kakaomap: '카카오맵',
      navermap: '네이버 지도',
      tel: "전화",
      fax: "팩스",
      address: {
        addr1: "경기도 안산시 상록구 해양3로 17",
        addr2: "디지털전환 허브 1~5층",
        center: "스마트제조혁신센터",
        tel: "031-498-7161",
        fax: "031-498-7114",
        email: "smic@smic.kr"
      }
    },
    footer: {
      desc: '미래 제조업의 경쟁력을 높이기 위해 AI와 Physical AI 기술을 연구하고 현장 적용을 실증하는 글로벌 허브입니다.',
      contact: '연락처',
      address: '경기도 안산시 상록구 해안로 705 스마트제조혁신센터',
      related: '관련 사이트',
      admin: '관리자 접속',
      familySite: 'FAMILY SITE',
    },
    assistant: {
      welcome: '안녕하세요! 스마트제조혁신센터 AI 연구원입니다. 궁금한 점이 있으신가요?',
      placeholder: '피지컬 AI 연구에 대해 물어보세요...',
      loading: '답변 생성 중...',
    },
    popup: {
      close: '닫기',
      dontShowToday: '오늘 하루 보지 않기',
    }
  },
  EN: {
    siteName: 'SMIC',
    siteSubName: 'Smart Manufacturing Innovation Center',
    nav: {
      home: 'Home',
      about: 'About',
      research: 'Research',
      docs: 'Docs',
      notices: 'Notices',
      floorplan: 'Floor Plan',
      visitorNotice: 'Visitor Info',
      directions: 'Directions',
    },
    hero: {
      badge: 'Future of Manufacturing',
      title1: 'Opening the ',
      title2: 'Future of Manufacturing',
      title3: ' with AI and Physical AI',
      desc: 'SMIC Ansan leads the digital transformation of the Korean manufacturing industry by operating a demo factory for research and verification of advanced manufacturing technologies.',
      btnResearch: 'View Core Tech',
      btnAbout: 'About Center',
    },
    about: {
      subtitle: 'About SMIC',
      title: 'SMIC',
      desc: 'A hub for practical technology research solving on-site manufacturing challenges',
      missionTitle: 'Mission',
      missionDesc: 'Enhance the manufacturing competitiveness of domestic SMEs to global levels through the fusion of manufacturing data and AI technology.',
      ecoTitle: 'Cooperative Ecosystem',
      ecoDesc: 'Establish a virtuous cycle ecosystem leading from technology development to verification and talent cultivation through cooperation between industry, academia, and research institutes.',
      infraTitle: 'Demo Factory Infra',
      infraDesc: 'Minimize adoption risks by pre-verifying new technologies (Testbed) in a demo factory environment identical to actual production lines.',
      location: 'Located in Ansan Science Valley',
    },
    research: {
      title: 'Key Research Areas',
      desc: 'SMIC researches intelligent manufacturing systems that perceive and judge, going beyond simple automation.',
      visualTitle: 'Real-time Demo Factory Status (Simulation)',
      visualDesc: 'Process optimization data based on Industrial AI Model #42',
      platformStatusTitle: 'SMIC Platform Status',
      platformStatusDesc: 'Status of real-time collected devices and message transmissions.',
      activeDeviceStatusTitle: 'Active Device Status',
      messageTransmissionStatusTitle: 'Message Transmission Status',
      last30Days: 'Last 30 Days',
    },
    docs: {
      title: 'Technical Documents',
      desc: 'Access research outputs, API specifications, and white papers.',
      search: 'Search documents...',
      download: 'Download',
      bannerTitle: 'Need access to datasets & APIs?',
      bannerDesc: 'We provide real-time demo factory data to partner companies and research institutes.',
      bannerBtn: 'Inquiry for Partnership',
    },
    notices: {
      title: 'Notice & PR',
      desc: 'Stay updated with SMIC news and events.',
      gallery: 'Activity Gallery',
    },
    floorplan: {
      desc: 'You can view detailed information for each floor.',
      viewDetailsButton: 'View Details',
      floorList: [
        { floor: '8F ~ 11F', name: 'Tenant Facilities', color: 'bg-gray-400', hasVideo: false },
        { floor: '7F', name: 'Education/Seminar', color: 'bg-gray-400', hasVideo: false },
        { floor: '6F', name: 'Coworking Space', color: 'bg-gray-400', hasVideo: false },
        { floor: '5F', name: 'SMIC Control Room', color: 'bg-blue-500', hasVideo: true },
        { floor: '4F', name: 'CO-LAB', color: 'bg-purple-400', hasVideo: true },
        { floor: '3F', name: 'Demo Factory (U.C.)', color: 'bg-blue-600', hasVideo: true },
        { floor: '2F', name: 'Data Center', color: 'bg-blue-700', hasVideo: true },
        { floor: '1F', name: 'Demo Factory', color: 'bg-slate-800', hasVideo: true },
        { floor: 'B1 ~ B3', name: 'Underground Parking', color: 'bg-gray-400', hasVideo: false },
      ]
    },
    visitorNotice: {
      title: 'Visitor Information',
      desc: 'Please apply for a visit during the application period announced through the notice.',
      steps: [
        { title: 'Application Period Guide', subtitle: 'Check the application period on the website notice' },
        { title: 'Visitor Application', subtitle: 'First-come, first-served basis within the announced period', buttonText: 'Apply Now' },
        { title: 'Result Notification', subtitle: 'Notification of results after the application period ends' },
        { title: 'Visit Registration', subtitle: '*Only for those who have received confirmation', buttonText: 'Register Visit' },
        { title: 'Visit Confirmation', subtitle: 'Final confirmation of your visit' },
        { title: 'Tour Program', subtitle: 'The tour will proceed at the confirmed time' },
        { title: 'Satisfaction Survey', subtitle: 'Participate in the visitor satisfaction survey', buttonText: 'Join Survey' },
      ]
    },
    directions: {
      title: 'Directions',
      desc: 'We guide you to SMIC Digital Transformation Hub.',
      addressGuideTitle: 'Address Information',
      kakaomap: 'Kakao Map',
      navermap: 'Naver Map',
      tel: "Tel",
      fax: "Fax",
      address: {
        addr1: "17, Haeyang 3-ro, Sangnok-gu, Ansan-si, Gyeonggi-do",
        addr2: "Digital Transformation Hub, 1st-5th floors",
        center: "Smart Manufacturing Innovation Center",
        tel: "031-498-7161",
        fax: "031-498-7114",
        email: "smic@smic.kr"
      }
    },
    footer: {
      desc: 'Global hub for researching AI and Physical AI technologies to enhance the competitiveness of future manufacturing.',
      contact: 'Contact',
      address: '705 Haean-ro, Sangnok-gu, Ansan-si, Gyeonggi-do, SMIC',
      related: 'Related Sites',
      admin: 'Admin Portal',
      familySite: 'FAMILY SITE',
    },
    assistant: {
      welcome: 'Hello! I am the SMIC AI researcher. How can I help you today?',
      placeholder: 'Ask about Physical AI research...',
      loading: 'Generating response...',
    },
    popup: {
      close: 'Close',
      dontShowToday: 'Don\'t show today',
    }
  }
};
