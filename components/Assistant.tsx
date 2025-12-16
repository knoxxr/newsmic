import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface AssistantProps {
  language: Language;
}

const Assistant: React.FC<AssistantProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting based on language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        role: 'model', 
        text: language === 'KO' 
          ? '안녕하세요! 스마트제조혁신센터 AI 연구원입니다. 궁금한 점이 있으신가요?' 
          : 'Hello! I am the AI Researcher at SMIC. How can I assist you today?',
        timestamp: new Date() 
      }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the conversation history to the service
      const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(input, historyForApi);
      
      const modelMsg: ChatMessage = { role: 'model', text: responseText || "응답을 생성할 수 없습니다.", timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: language === 'KO' ? '오류가 발생했습니다.' : 'An error occurred.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 duration-200 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-full sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'}`} style={{ maxHeight: '80vh', height: '600px' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-600 to-brand-800 text-white rounded-t-2xl">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">SMIC AI Assistant</h3>
              <p className="text-xs text-brand-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                Gemini 2.5 Flash {language === 'KO' ? '연결됨' : 'Connected'}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mr-2 shrink-0 border border-brand-200">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-brand-200' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mr-2 border border-brand-200">
                <Sparkles className="w-4 h-4 text-brand-600" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center">
                <Loader2 className="w-4 h-4 text-brand-600 animate-spin mr-2" />
                <span className="text-xs text-slate-500">{language === 'KO' ? '답변 생성 중...' : 'Thinking...'}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 rounded-b-2xl">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={language === 'KO' ? "피지컬 AI 연구에 대해 물어보세요..." : "Ask about Physical AI research..."}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-800 placeholder:text-slate-400"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`ml-2 p-1.5 rounded-full transition-all ${
                input.trim() && !isLoading 
                  ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-md' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center mt-2">
             <span className="text-[10px] text-slate-400">Powered by Google Gemini</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assistant;