import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { translations } from '../locales';
import { Language } from '../types';

interface ChartData {
  timestamp: number;
  date: string;
  value: number;
}

const TransportMessagesChart = ({ language }: { language: Language }) => {
  const t = translations[language].research;
  const [data, setData] = useState<ChartData[]>([]);

  // 1. 설정 정보
  const TB_URL = ""; 
  const USERNAME = "user@smic.kr"; 
  const PASSWORD = "smic1234";     
  
  const ENTITY_ID = "3ac98090-6f6c-11ef-bed0-f3a9cbdaba75"; 
  const ENTITY_TYPE = "API_USAGE_STATE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // [로그인]
        const authResponse = await fetch(`${TB_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: USERNAME, password: PASSWORD })
        });
        
        if (!authResponse.ok) throw new Error("로그인 실패");
        const { token } = await authResponse.json();

        // [데이터 요청]
        const endTs = Date.now();
        const startTs = endTs - (30 * 24 * 60 * 60 * 1000); 
        const keys = "transportMsgCountHourly"; 

        // &limit=1000 추가
        const dataResponse = await fetch(`${TB_URL}/api/plugins/telemetry/${ENTITY_TYPE}/${ENTITY_ID}/values/timeseries?keys=${keys}&startTs=${startTs}&endTs=${endTs}&limit=1000`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`
          }
        });

        if (!dataResponse.ok) throw new Error("데이터 요청 실패");
        const jsonData = await dataResponse.json();

        // [데이터 가공]
        const rawData = jsonData[keys] || [];
        const formattedData = rawData
          .sort((a: any, b: any) => a.ts - b.ts)
          .map((item: any) => ({
            timestamp: item.ts,
            date: new Date(item.ts).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }), 
            value: parseInt(item.value, 10)
          }));

        setData(formattedData);

      } catch (error) {
        console.error("ThingsBoard Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-96 bg-white p-6 rounded-xl shadow border border-slate-200 flex flex-col">
      <h3 className="text-lg font-bold mb-6 text-slate-900">{t.messageTransmissionStatusTitle} <span className="ml-2 px-2 py-1 bg-brand-100 text-brand-600 rounded-full text-xs font-medium">{t.last30Days}</span></h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            
            {/* X축: timestamp 기준 */}
            <XAxis 
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={['auto', 'auto']}
              tick={{fontSize: 12, fill: '#64748b'}} 
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              minTickGap={30}
              tickFormatter={(ts) => new Date(ts).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })}
            />
            
            <YAxis 
              tick={{fontSize: 12, fill: '#64748b'}} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} 
            />
            
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              labelFormatter={(ts) => new Date(ts).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit' })}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            
            <Bar 
              dataKey="value" 
              fill="#0284c7" // brand-600 (시그니처 블루)
              radius={[2, 2, 0, 0]} 
              barSize={8}
              animationDuration={1500} // 애니메이션 지속 시간 1.5초
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransportMessagesChart;