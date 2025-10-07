import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getFinancialAnalysis = async (dataSummary: string): Promise<string> => {
  try {
    const prompt = `
      Anda adalah seorang analis keuangan ahli. Berdasarkan ringkasan data keuangan berikut, berikan analisis singkat dan tajam dalam bahasa Indonesia.
      
      Fokus pada:
      1. Kesehatan keuangan secara keseluruhan.
      2. Tren atau pola yang menarik (misalnya, pertumbuhan pendapatan, peningkatan biaya).
      3. Rekomendasi praktis atau area yang perlu diperhatikan.
      
      Gunakan format markdown untuk membuat output mudah dibaca dengan heading dan bullet points.
      
      Data Keuangan:
      ---
      ${dataSummary}
      ---
      
      Analisis Anda:
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error getting financial analysis:", error);
    return "Maaf, terjadi kesalahan saat mencoba menganalisis data keuangan. Silakan coba lagi nanti.";
  }
};

export const getChatResponse = async (history: ChatMessage[], newMessage: string, dataContext: string): Promise<string> => {
    try {
        const systemInstruction = `
        Anda adalah asisten AI yang ramah dan sangat membantu untuk aplikasi ERP Akuntansi bernama AccounTech.
        Tugas Anda adalah menjawab pertanyaan pengguna terkait data operasional dan keuangan perusahaan.
        Gunakan data ringkasan yang disediakan di bawah ini sebagai konteks utama untuk jawaban Anda.
        Selalu berikan jawaban dalam bahasa Indonesia yang jelas dan mudah dipahami. Gunakan format markdown jika diperlukan.
        Jika pertanyaan di luar konteks data yang diberikan, jawablah dengan sopan bahwa Anda hanya dapat membantu dengan pertanyaan terkait data perusahaan yang ada di sistem.
        
        Berikut adalah ringkasan data perusahaan saat ini:
        ---
        ${dataContext}
        ---
        `;

        const contents = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));
        contents.push({ role: 'user', parts: [{ text: newMessage }] });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                systemInstruction,
            },
        });

        return response.text;

    } catch (error) {
        console.error("Error getting chat response:", error);
        return "Maaf, saya mengalami sedikit kendala. Bisakah Anda mengulangi pertanyaan Anda?";
    }
};