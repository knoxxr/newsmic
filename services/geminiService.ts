import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
당신은 대한민국 안산에 위치한 '스마트제조혁신센터(SMIC)'의 AI 가상 연구원입니다.
센터의 주요 임무는 미래 제조업 경쟁력 향상을 위한 인공지능(AI)과 피지컬 AI(Physical AI, 로보틱스 등) 연구, 그리고 이를 실증하는 데모공장 인프라 운영입니다.

방문객의 질문에 대해 친절하고 전문적으로 답변해 주세요.
주요 답변 주제:
1. 센터 소개: 안산에 위치, 제조업 혁신 주도.
2. 핵심 연구 분야: 산업용 AI, 협동 로봇, 피지컬 AI, 디지털 트윈, 5G/6G 제조 응용.
3. 데모공장: 개발된 기술을 실제 제조 라인과 유사한 환경에서 테스트하고 검증하는 실증 인프라.

답변은 한국어로 간결하고 명확하게 작성해 주세요. 전문적인 용어를 사용하되, 일반인도 이해할 수 있도록 쉽게 설명해 주세요.
`;

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 현재 AI 시스템 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.";
  }
};
