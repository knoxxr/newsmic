export type NavigationItem = 'HOME' | 'ABOUT' | 'RESEARCH' | 'FLOOR_INFO' | 'VISIT_GUIDE' | 'DOCS' | 'NOTICES' | 'CONTACT' | 'ADMIN';
export type Language = 'KO' | 'EN';

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  mediaUrl: string;
  imageUrl: string;
  details: string[];
}

export interface NoticeItem {
  id: number;
  title: string;
  date: string;
  category: '공지' | '보도' | '행사';
  content: string;
  imageUrl?: string;
}

export interface TechDoc {
  id: string;
  title: string;
  type: 'PDF' | 'API' | 'Whitepaper';
  date: string;
  summary: string;
  content?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}