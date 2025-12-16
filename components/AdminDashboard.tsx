import React, { useState } from 'react';
import { Lock, LayoutDashboard, FileText, LogOut, Plus, Trash2, Edit2, Save, X, Users, Activity, Bell, BookOpen } from 'lucide-react';
import { NoticeItem, TechDoc } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  notices: NoticeItem[];
  setNotices: React.Dispatch<React.SetStateAction<NoticeItem[]>>;
  documents: TechDoc[];
  setDocuments: React.Dispatch<React.SetStateAction<TechDoc[]>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ notices, setNotices, documents, setDocuments, onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'NOTICES' | 'DOCS'>('DASHBOARD');
  
  // Notice State
  const [editingNotice, setEditingNotice] = useState<Partial<NoticeItem> | null>(null);

  // Doc State
  const [editingDoc, setEditingDoc] = useState<Partial<TechDoc> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'smic1234') {
      setIsLoggedIn(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // --- Notice Handlers ---
  const handleSaveNotice = () => {
    if (!editingNotice?.title || !editingNotice?.content) return;

    if (editingNotice.id) {
      setNotices(prev => prev.map(n => n.id === editingNotice.id ? editingNotice as NoticeItem : n));
    } else {
      const newId = Math.max(...notices.map(n => n.id), 0) + 1;
      const newItem: NoticeItem = {
        id: newId,
        title: editingNotice.title,
        content: editingNotice.content,
        date: new Date().toISOString().split('T')[0],
        category: editingNotice.category || '공지',
      };
      setNotices(prev => [newItem, ...prev]);
    }
    setEditingNotice(null);
  };

  const handleDeleteNotice = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setNotices(prev => prev.filter(n => n.id !== id));
    }
  };

  // --- Doc Handlers ---
  const handleSaveDoc = () => {
    if (!editingDoc?.title || !editingDoc?.summary) return;

    if (editingDoc.id) {
      setDocuments(prev => prev.map(d => d.id === editingDoc.id ? editingDoc as TechDoc : d));
    } else {
      const newId = `doc-${Date.now()}`;
      const newDoc: TechDoc = {
        id: newId,
        title: editingDoc.title,
        summary: editingDoc.summary,
        type: editingDoc.type || 'PDF',
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      };
      setDocuments(prev => [newDoc, ...prev]);
    }
    setEditingDoc(null);
  };

  const handleDeleteDoc = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setDocuments(prev => prev.filter(d => d.id !== id));
    }
  };

  const visitorData = [
    { name: 'Mon', visitors: 120 },
    { name: 'Tue', visitors: 145 },
    { name: 'Wed', visitors: 132 },
    { name: 'Thu', visitors: 190 },
    { name: 'Fri', visitors: 210 },
    { name: 'Sat', visitors: 85 },
    { name: 'Sun', visitors: 60 },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">관리자 로그인</h2>
            <p className="text-slate-500 mt-2">스마트제조혁신센터 관리 시스템</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              로그인
            </button>
            <div className="text-center mt-4">
               <span className="text-xs text-slate-400">초기 비밀번호: smic1234</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <span className="text-xl font-bold">SMIC Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('DASHBOARD')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'DASHBOARD' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            대시보드
          </button>
          <button
            onClick={() => setActiveTab('NOTICES')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'NOTICES' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <FileText className="w-5 h-5 mr-3" />
            공지사항 관리
          </button>
          <button
            onClick={() => setActiveTab('DOCS')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'DOCS' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            기술문서 관리
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="flex items-center text-slate-400 hover:text-white transition-colors w-full px-4 py-2">
            <LogOut className="w-5 h-5 mr-3" />
            나가기
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h1 className="text-lg font-bold text-slate-800">
            {activeTab === 'DASHBOARD' && '관리자 대시보드'}
            {activeTab === 'NOTICES' && '공지사항 관리'}
            {activeTab === 'DOCS' && '기술문서 관리'}
          </h1>
          <div className="flex items-center space-x-4">
             <div className="flex items-center text-sm text-slate-500">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> System Online
             </div>
             <button onClick={onLogout} className="md:hidden text-slate-500">
                <LogOut className="w-5 h-5" />
             </button>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-500 text-sm font-medium">총 방문자 (오늘)</h3>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">1,248</div>
                  <div className="text-green-500 text-xs mt-2 flex items-center">
                    +12.5% <span className="text-slate-400 ml-1">vs yesterday</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-500 text-sm font-medium">활성 AI 세션</h3>
                    <Activity className="w-5 h-5 text-brand-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">42</div>
                  <div className="text-slate-400 text-xs mt-2">Current Active Chats</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-500 text-sm font-medium">공지 게시글</h3>
                    <Bell className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{notices.length}</div>
                  <div className="text-slate-400 text-xs mt-2">Total Notices</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-500 text-sm font-medium">기술 문서</h3>
                    <BookOpen className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{documents.length}</div>
                  <div className="text-slate-400 text-xs mt-2">Total Docs</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                <h3 className="font-bold text-slate-800 mb-6">주간 방문자 추이</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="visitors" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'NOTICES' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">등록된 공지사항</h3>
                <button
                  onClick={() => setEditingNotice({ category: '공지', title: '', content: '' })}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" /> 새 공지 작성
                </button>
              </div>
              
              {editingNotice && (
                <div className="p-6 bg-slate-50 border-b border-slate-200 animate-in slide-in-from-top-2">
                  <div className="max-w-3xl space-y-4">
                    <div className="flex gap-4">
                      <select 
                        className="p-2 border border-slate-300 rounded-lg text-sm"
                        value={editingNotice.category}
                        onChange={(e) => setEditingNotice(prev => ({ ...prev, category: e.target.value as any }))}
                      >
                        <option value="공지">공지</option>
                        <option value="보도">보도</option>
                        <option value="행사">행사</option>
                      </select>
                      <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        className="flex-1 p-2 border border-slate-300 rounded-lg text-sm"
                        value={editingNotice.title || ''}
                        onChange={(e) => setEditingNotice(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <textarea
                      placeholder="내용을 입력하세요"
                      rows={4}
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                      value={editingNotice.content || ''}
                      onChange={(e) => setEditingNotice(prev => ({ ...prev, content: e.target.value }))}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setEditingNotice(null)}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm"
                      >
                        취소
                      </button>
                      <button 
                        onClick={handleSaveNotice}
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700"
                      >
                        저장하기
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 w-20">ID</th>
                      <th className="px-6 py-3 w-24">분류</th>
                      <th className="px-6 py-3">제목</th>
                      <th className="px-6 py-3 w-32">작성일</th>
                      <th className="px-6 py-3 w-32 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {notices.map((notice) => (
                      <tr key={notice.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{notice.id}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            notice.category === '공지' ? 'bg-slate-100 text-slate-700' :
                            notice.category === '행사' ? 'bg-orange-100 text-orange-700' :
                            'bg-brand-100 text-brand-700'
                          }`}>
                            {notice.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700">{notice.title}</td>
                        <td className="px-6 py-4 text-slate-500">{notice.date}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button 
                            onClick={() => setEditingNotice(notice)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteNotice(notice.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'DOCS' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">기술문서 관리</h3>
                <button
                  onClick={() => setEditingDoc({ type: 'PDF', title: '', summary: '' })}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" /> 문서 등록
                </button>
              </div>

              {editingDoc && (
                <div className="p-6 bg-slate-50 border-b border-slate-200 animate-in slide-in-from-top-2">
                  <div className="max-w-3xl space-y-4">
                    <div className="flex gap-4">
                      <select 
                        className="p-2 border border-slate-300 rounded-lg text-sm"
                        value={editingDoc.type}
                        onChange={(e) => setEditingDoc(prev => ({ ...prev, type: e.target.value as any }))}
                      >
                        <option value="PDF">PDF</option>
                        <option value="API">API</option>
                        <option value="Whitepaper">Whitepaper</option>
                      </select>
                      <input
                        type="text"
                        placeholder="문서 제목을 입력하세요"
                        className="flex-1 p-2 border border-slate-300 rounded-lg text-sm"
                        value={editingDoc.title || ''}
                        onChange={(e) => setEditingDoc(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <textarea
                      placeholder="문서 요약/설명을 입력하세요"
                      rows={3}
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                      value={editingDoc.summary || ''}
                      onChange={(e) => setEditingDoc(prev => ({ ...prev, summary: e.target.value }))}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setEditingDoc(null)}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm"
                      >
                        취소
                      </button>
                      <button 
                        onClick={handleSaveDoc}
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700"
                      >
                        저장하기
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 w-24">Type</th>
                      <th className="px-6 py-3">제목</th>
                      <th className="px-6 py-3">요약</th>
                      <th className="px-6 py-3 w-32">등록일</th>
                      <th className="px-6 py-3 w-32 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            doc.type === 'PDF' ? 'bg-red-100 text-red-700' : 
                            doc.type === 'API' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {doc.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-900 font-medium">{doc.title}</td>
                        <td className="px-6 py-4 text-slate-500 truncate max-w-xs">{doc.summary}</td>
                        <td className="px-6 py-4 text-slate-500">{doc.date}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button 
                            onClick={() => setEditingDoc(doc)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteDoc(doc.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;