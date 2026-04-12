import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="logo">📚 English Quiz AI</div>
      <button onClick={handleLogout} className="btn btn-danger">
        🚪 Đăng xuất
      </button>
    </div>
  );
}