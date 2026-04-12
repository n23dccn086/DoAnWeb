const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

exports.callGemini = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Cần đăng nhập');
  const prompt = data.prompt;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return { text: response.text() };
});