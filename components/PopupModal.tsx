import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales';

interface PopupModalProps {
  title: string;
  content: string;
  onClose: () => void;
  onDontShowToday: () => void;
  language: Language;
}

const PopupModal: React.FC<PopupModalProps> = ({ title, content, onClose, onDontShowToday, language }) => {
  const t = translations[language].popup; // Assuming 'popup' key exists in your translations

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center mb-4">
          <img src="/logo.png" alt="SMIC Logo" className="h-6 w-auto mr-2" />
          <span className="font-bold text-xl text-slate-900 tracking-tight mr-4">SMIC</span>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        </div>        <div className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">
          {content}
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-3 mt-auto">
          <button
            onClick={onClose}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {t.close || '닫기'}
          </button>
          <button
            onClick={onDontShowToday}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {t.dontShowToday || '오늘 하루 보지 않기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
