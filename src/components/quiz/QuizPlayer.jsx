import { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

export default function QuizPlayer({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (onComplete) onComplete(answers);
  };

  if (submitted) {
    const score = Object.keys(answers).reduce((acc, qId) => {
      const q = questions.find(q => q.id === qId);
      return acc + (q.correctAnswer === answers[qId] ? 1 : 0);
    }, 0);
    return <QuizResult score={score} total={questions.length} answers={answers} questions={questions} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex justify-between">
        <span>Câu {current + 1} / {questions.length}</span>
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="px-3 py-1 bg-gray-200 rounded">Trước</button>
        <button onClick={() => setCurrent(Math.min(questions.length - 1, current + 1))} disabled={current === questions.length - 1} className="px-3 py-1 bg-gray-200 rounded">Sau</button>
      </div>
      <QuizQuestion
        question={questions[current]}
        selected={answers[questions[current].id]}
        onSelect={(ans) => handleAnswer(questions[current].id, ans)}
      />
      {current === questions.length - 1 && (
        <div className="mt-6 text-center">
          <button onClick={handleSubmit} className="bg-primary text-white px-6 py-2 rounded-lg">Nộp bài</button>
        </div>
      )}
    </div>
  );
}