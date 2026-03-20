const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("API_KEY_CUA_BAN");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Khi Frontend gửi yêu cầu đến, Backend sẽ gọi Gemini:
const result = await model.generateContent(prompt_tu_nguoi_dung);
const response = await result.response;
const text = response.text(); // Đây chính là câu trả lời của AI