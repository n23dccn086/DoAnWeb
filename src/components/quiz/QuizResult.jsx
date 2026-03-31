export default function QuizResult({ score, total, answers, questions }) {
  const percentage = (score / total) * 100;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">Kết quả</h2>
      <p className="text-lg">Điểm số: {score} / {total} ({percentage.toFixed(0)}%)</p>
      <div className="mt-6 space-y-4">
        {questions.map(q => (
          <div key={q.id} className="border-b pb-3">
            <p className="font-medium">{q.text}</p>
            <p className={`text-sm ${answers[q.id] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
              Đáp án của bạn: {answers[q.id] || 'Chưa trả lời'} | Đúng: {q.correctAnswer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}