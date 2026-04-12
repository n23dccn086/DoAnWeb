import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import Question from '../components/Question';
import Timer from '../components/Timer';
import Chatbot from '../components/Chatbot';
import Result from '../components/Result';
import Header from '../components/Header';

export default function Exam() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const mode = params.get('mode');
  const level = params.get('level');

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mode === 'thi-thu' ? 60 * 10 : null);

  useEffect(() => {
    const loadQuestions = async () => {
      const q = query(collection(db, 'questions'), where('level', '==', level));
      const snapshot = await getDocs(q);
      const qs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(qs);
      setAnswers(new Array(qs.length).fill(null));
    };
    loadQuestions();
  }, [level]);

  const handleAnswer = (selected) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selected;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = async () => {
    let score = 0;
    const results = questions.map((q, idx) => {
      const isCorrect = q.correct === answers[idx];
      if (isCorrect) score++;
      return { questionId: q.id, userAnswer: answers[idx], correct: q.correct, isCorrect };
    });
    const finalScore = (score / questions.length) * 10;
    await addDoc(collection(db, 'history'), {
      userId: auth.currentUser.uid,
      mode, level,
      date: new Date(),
      score: finalScore,
      details: results
    });
    setSubmitted(true);
  };

  if (submitted) return <Result score={(answers.filter((a,i) => a === questions[i]?.correct).length / questions.length) * 10} questions={questions} answers={answers} />;
  if (!questions.length) return (
    <>
      <Header />
      <div className="container" style={{ textAlign: 'center' }}>
        <p>Đang tải câu hỏi...</p>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <div className="container">
        {mode === 'thi-thu' && <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeout={handleSubmit} />}
        <div className="card">
          <Question
            data={questions[currentIndex]}
            selected={answers[currentIndex]}
            onSelect={handleAnswer}
            showAi={true}
            index={currentIndex + 1}
            total={questions.length}
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1} className="btn btn-primary">
              Câu tiếp theo →
            </button>
            <button onClick={handleSubmit} className="btn btn-secondary">
              📤 Nộp bài
            </button>
          </div>
        </div>
        <Chatbot question={questions[currentIndex]} />
      </div>
    </>
  );
}