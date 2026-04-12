import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Result({ score, questions, answers }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <h2>Kết quả: {score}/10 điểm</h2>
      {questions.map((q, idx) => (
        <div key={idx}>
          <p>{idx+1}. {q.text}</p>
          <p>Bạn chọn: {answers[idx] !== undefined ? q.options[answers[idx]] : 'Chưa chọn'} - Đáp án đúng: {q.options[q.correct]}</p>
        </div>
      ))}
      <button onClick={() => navigate('/')}>Về trang chủ</button>
    </div>
  );
}