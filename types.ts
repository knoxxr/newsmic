export type NavigationItem = 'HOME' | 'ABOUT' | 'RESEARCH' | 'DOCS' | 'NOTICES' | 'CONTACT';

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  details: string[];
}

export interface NoticeItem {
  id: number;
  title: string;
  date: string;
  category: '공지' | '보도' | '행사';
  content: string;
}

export interface TechDoc {
  id: string;
  title: string;
  type: 'PDF' | 'API' | 'Whitepaper';
  date: string;
  summary: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
