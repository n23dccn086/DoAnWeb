import React, { useState } from 'react';
import { callGemini } from '../utils/gemini';

export default function Chatbot({ question }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const context = `Câu hỏi hiện tại: ${question?.text}\nĐáp án: ${question?.options.join(', ')}\nNgười dùng hỏi: ${input}`;
    const res = await callGemini(context);
    const botMsg = { role: 'bot', content: res };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
      <button onClick={() => setOpen(!open)}>🤖 Hỏi AI</button>
      {open && (
        <div style={{ width: 300, height: 400, border: '1px solid #ccc', background: 'white', padding: 10, overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: 5 }}>
              <b>{msg.role === 'user' ? 'Bạn' : 'AI'}:</b> {msg.content}
            </div>
          ))}
          {loading && <div>AI đang suy nghĩ...</div>}
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Hỏi thêm về câu hỏi..." />
          <button onClick={sendMessage}>Gửi</button>
        </div>
      )}
    </div>
  );
}