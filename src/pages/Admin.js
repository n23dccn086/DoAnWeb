import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({ text: '', options: ['','','',''], correct: 0, level: 'easy', topic: 'grammar', translation: '' });

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'questions'));
      setQuestions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetch();
  }, []);

  const addQuestion = async () => {
    await addDoc(collection(db, 'questions'), newQ);
    window.location.reload();
  };

  const deleteQ = async (id) => {
    await deleteDoc(doc(db, 'questions', id));
    window.location.reload();
  };

  return (
    <div>
      <h2>Quản lý câu hỏi</h2>
      <div>
        <input placeholder="Câu hỏi" value={newQ.text} onChange={e => setNewQ({...newQ, text: e.target.value})} />
        {newQ.options.map((opt, idx) => (
          <input key={idx} placeholder={`Đáp án ${idx+1}`} value={opt} onChange={e => { let opts = [...newQ.options]; opts[idx]=e.target.value; setNewQ({...newQ, options: opts}); }} />
        ))}
        <select value={newQ.correct} onChange={e => setNewQ({...newQ, correct: parseInt(e.target.value)})}>
          <option value="0">A đúng</option><option value="1">B đúng</option><option value="2">C đúng</option><option value="3">D đúng</option>
        </select>
        <select value={newQ.level} onChange={e => setNewQ({...newQ, level: e.target.value})}>
          <option>easy</option><option>medium</option><option>hard</option>
        </select>
        <button onClick={addQuestion}>Thêm câu hỏi</button>
      </div>
      <ul>
        {questions.map(q => (
          <li key={q.id}>{q.text} <button onClick={() => deleteQ(q.id)}>Xoá</button></li>
        ))}
      </ul>
    </div>
  );
}