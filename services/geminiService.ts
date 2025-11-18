
import { GoogleGenAI, Chat } from '@google/genai';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const initializeChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a helpful and friendly AI assistant. Be concise and clear in your responses.',
    },
  });
};

export const sendMessage = async (chat: Chat, message: string) => {
  const result = await chat.sendMessage({ message });
  return result.text;
};
