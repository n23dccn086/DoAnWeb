import React, { useState } from 'react';
import { callGemini } from '../utils/gemini';

export default function Question({ data, selected, onSelect, showAi, index, total }) {
  const [explanation, setExplanation] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!data) return;
    setLoading(true);
    const prompt = `Bạn là giáo viên tiếng Anh. Câu hỏi: ${data.text}. Đáp án đúng là ${data.options[data.correct]}. Giải thích ngắn gọn bằng tiếng Việt.`;
    try {
      const res = await callGemini(prompt);
      setExplanation(res);
    } catch (error) {
      setExplanation('Không thể kết nối AI. Vui lòng thử lại sau.');
    }
    setLoading(false);
  };

  const handleTranslate = async () => {
    if (!data) return;
    setLoading(true);
    const prompt = `Dịch câu sau sang tiếng Việt: ${data.text}`;
    try {
      const res = await callGemini(prompt);
      setTranslation(res);
    } catch (error) {
      setTranslation('Dịch thất bại. Vui lòng thử lại.');
    }
    setLoading(false);
  };

  if (!data) return <div>Đang tải câu hỏi...</div>;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Câu {index}/{total}
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.5 }}>{data.text}</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        {data.options.map((opt, idx) => (
          <div 
            key={idx} 
            className={`option ${selected === idx ? 'selected' : ''}`}
            onClick={() => onSelect(idx)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              background: selected === idx ? '#e0e7ff' : '#f8fafc',
              marginBottom: '0.5rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              border: selected === idx ? '2px solid #667eea' : '1px solid #e2e8f0'
            }}
          >
            <input 
              type="radio" 
              name="answer" 
              checked={selected === idx} 
              onChange={() => onSelect(idx)} 
              style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 600, minWidth: '1.5rem' }}>{String.fromCharCode(65+idx)}.</span>
            <span>{opt}</span>
          </div>
        ))}
      </div>

      {showAi && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={handleExplain} 
            disabled={loading} 
            className="btn btn-secondary"
            style={{ background: '#4f46e5', color: 'white' }}
          >
            🤖 Giải thích (AI)
          </button>
          <button 
            onClick={handleTranslate} 
            disabled={loading} 
            className="btn btn-secondary"
          >
            🌐 Dịch (AI)
          </button>
        </div>
      )}

      {loading && <p style={{ color: '#4b5563' }}>Đang xử lý...</p>}

      {explanation && (
        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
          <strong>💡 Giải thích:</strong> {explanation}
        </div>
      )}

      {translation && (
        <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1rem' }}>
          <strong>📖 Dịch:</strong> {translation}
        </div>
      )}
    </div>
  );
}