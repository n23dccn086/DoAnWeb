import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function History() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchHistory = async () => {
      const q = query(collection(db, 'history'), where('userId', '==', auth.currentUser.uid), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchHistory();
  }, []);
  return (
    <div>
      <h2>Lịch sử làm bài</h2>
      <ul>
        {history.map(h => (
          <li key={h.id}>Ngày: {h.date?.toDate().toLocaleString()} - Điểm: {h.score} - {h.mode} - {h.level}</li>
        ))}
      </ul>
    </div>
  );
}