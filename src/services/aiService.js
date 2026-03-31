// src/services/aiService.js

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Gọi Gemini API để trả lời chat
 * @param {string} prompt - Câu hỏi/nội dung cần AI xử lý
 * @returns {Promise<string>} - Câu trả lời từ AI
 */
export async function callGemini(prompt) {
  if (!API_KEY) {
    console.error("❌ API key chưa được cấu hình! Kiểm lại file .env");
    return "Lỗi: API key chưa được cấu hình. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env";
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    // Xử lý lỗi rate limit
    if (response.status === 429) {
      return "⚠️ API đang quá tải (rate limit). Vui lòng thử lại sau 30 giây.";
    }

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!result) {
      console.error("API response:", data);
      return "Xin lỗi, AI chưa trả lời được. Vui lòng thử lại.";
    }
    
    return result;
  } catch (error) {
    console.error("Lỗi gọi Gemini API:", error);
    return "Có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra kết nối mạng.";
  }
}

/**
 * Tạo flashcard từ chủ đề (tính năng nâng cao)
 */
export async function generateFlashcardDeck(topic) {
  const prompt = `Hãy tạo 5 thẻ flashcard học tiếng Anh về chủ đề "${topic}".
  Mỗi thẻ có định dạng:
  - Từ vựng: [từ]
  - Nghĩa: [nghĩa tiếng Việt]
  - Ví dụ: [câu ví dụ bằng tiếng Anh]
  Hãy trả về dạng JSON array, mỗi object có 3 field: word, meaning, example.
  Chỉ trả về JSON, không thêm bất kỳ text nào khác.`;
  
  const result = await callGemini(prompt);
  try {
    // Thử parse JSON từ kết quả
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Giải thích ngữ pháp
 */
export async function explainGrammar(sentence) {
  const prompt = `Hãy giải thích cấu trúc ngữ pháp của câu tiếng Anh sau bằng tiếng Việt, dễ hiểu cho người mới học: "${sentence}"`;
  return callGemini(prompt);
}