import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Result({ score, questions, answers }) {
  const navigate = useNavigate();
  const total = questions.length;
  const percentage = (score / total) * 10; // điểm thang 10
  const correctCount = questions.filter((q, idx) => q.correct === answers[idx]).length;

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊 Kết quả bài thi</h1>
        <div style={{ 
          width: '150px', 
          height: '150px', 
          borderRadius: '50%', 
          background: `conic-gradient(#4f46e5 0deg ${percentage * 3.6}deg, #e2e8f0 ${percentage * 3.6}deg 360deg)`,
          margin: '1rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#1f2937'
        }}>
          {percentage.toFixed(1)}/10
        </div>
        <p style={{ fontSize: '1.2rem' }}>Bạn trả lời đúng <strong>{correctCount}</strong> / {total} câu</p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          🏠 Về trang chủ
        </button>
      </div>

      <h2 style={{ marginBottom: '1rem' }}>📝 Chi tiết câu hỏi</h2>
      {questions.map((q, idx) => {
        const isCorrect = q.correct === answers[idx];
        return (
          <div key={idx} className="card" style={{ marginBottom: '1rem', borderLeft: `6px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Câu {idx + 1}</h3>
              <span style={{ 
                background: isCorrect ? '#d1fae5' : '#fee2e2', 
                color: isCorrect ? '#065f46' : '#991b1b',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {isCorrect ? '✅ Đúng' : '❌ Sai'}
              </span>
            </div>
            <p style={{ marginTop: '0.75rem' }}>{q.text}</p>
            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '0.75rem', marginTop: '0.5rem' }}>
              <div><strong>🔹 Đáp án của bạn:</strong> {answers[idx] !== undefined ? q.options[answers[idx]] : 'Chưa chọn'}</div>
              <div><strong>🔸 Đáp án đúng:</strong> {q.options[q.correct]}</div>
              {q.explanation && <div><strong>💡 Giải thích:</strong> {q.explanation}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}