
import { GoogleGenAI } from "@google/genai";

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
