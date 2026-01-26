
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const getSystemInstruction = (lang: Language) => `
당신은 대한민국 안산에 위치한 '스마트제조혁신센터(SMIC)'의 AI 가상 연구원입니다.
현재 사용자의 선호 언어는 [${lang === 'KO' ? '한국어' : '영어'}]입니다.

센터 주요 정보:
1. 위치: 경기도 안산시 (안산 사이언스 밸리 내).
2. 미션: 제조업 디지털 전환 선도, 중소/중견 기업 경쟁력 강화.
3. 핵심 연구: 산업용 AI(예지보전, 공정 최적화), 피지컬 AI 및 로보틱스(협동로봇, AMR), 5G/6G 제조 응용.
4. 데모공장: 실제 제조 공정과 동일한 실증 테스트베드 운영.

지침:
- 사용자가 질문하는 언어에 맞춰 답변하세요. (주로 ${lang === 'KO' ? '한국어' : '영어'})
- 답변은 전문적이면서도 친절해야 합니다.
- 간결하고 명확하게 답변해 주세요.
`;

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[], lang: Language) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model' as any,
          parts: [{ text: h.text }],
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'KO' 
      ? "죄송합니다. 현재 AI 시스템 연결이 원활하지 않습니다." 
      : "Sorry, I am having trouble connecting to the AI system right now.";
  }
};
