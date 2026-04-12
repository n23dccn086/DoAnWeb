import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [topics, setTopics] = useState(['easy', 'medium', 'hard']);

  return (
    <>
      <Header />
      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1>Chào bạn, {currentUser?.email} 👋</h1>
          <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>Hãy chọn một bộ đề để bắt đầu luyện tập</p>
        </div>

        <div className="grid">
          {topics.map(level => (
            <div key={level} className="card" style={{ textAlign: 'center' }}>
              <h2 style={{ textTransform: 'uppercase', marginBottom: '1rem' }}>
                {level === 'easy' && '🌱 Dễ'}
                {level === 'medium' && '⚡ Trung bình'}
                {level === 'hard' && '🔥 Khó'}
              </h2>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to={`/exam?mode=thi-thu&level=${level}`}>
                  <button className="btn btn-primary">📝 Thi thử</button>
                </Link>
                <Link to={`/exam?mode=luyen-tap&level=${level}`}>
                  <button className="btn btn-secondary">📖 Luyện tập</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/history">
            <button className="btn btn-secondary">📜 Lịch sử làm bài</button>
          </Link>
          {currentUser?.email === 'admin@example.com' && (
            <Link to="/admin" style={{ marginLeft: '1rem' }}>
              <button className="btn btn-primary">⚙️ Quản trị</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}