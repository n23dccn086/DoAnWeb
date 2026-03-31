import { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

export default function QuizForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const addQuestion = () => setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const updateQuestion = (idx, field, value) => {
    const updated = [...questions];
    if (field === 'options') {
      updated[idx].options = value;
    } else {
      updated[idx][field] = value;
    }
    setQuestions(updated);
  };
  const removeQuestion = (idx) => setQuestions(questions.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Vui lòng nhập tiêu đề');
    const valid = questions.every(q => q.text.trim() && q.options.every(opt => opt.trim()) && q.correctAnswer.trim());
    if (!valid) return alert('Vui lòng điền đầy đủ câu hỏi, các lựa chọn và đáp án đúng');
    onSubmit({ title, questions });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Tiêu đề bài test</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        {questions.map((q, idx) => (
          <div key={idx} className="border p-4 rounded-lg space-y-2">
            <input
              placeholder="Nội dung câu hỏi"
              value={q.text}
              onChange={(e) => updateQuestion(idx, 'text', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
            {q.options.map((opt, optIdx) => (
              <input
                key={optIdx}
                placeholder={`Lựa chọn ${optIdx + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOpts = [...q.options];
                  newOpts[optIdx] = e.target.value;
                  updateQuestion(idx, 'options', newOpts);
                }}
                className="w-full border rounded px-2 py-1 mt-1"
              />
            ))}
            <select
              value={q.correctAnswer}
              onChange={(e) => updateQuestion(idx, 'correctAnswer', e.target.value)}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Chọn đáp án đúng</option>
              {q.options.map((opt, i) => opt && <option key={i} value={opt}>{opt}</option>)}
            </select>
            <Button variant="ghost" onClick={() => removeQuestion(idx)} type="button">Xóa câu hỏi</Button>
          </div>
        ))}
        <Button variant="outline" onClick={addQuestion} type="button">+ Thêm câu hỏi</Button>
        <Button variant="primary" type="submit">Lưu bài test</Button>
      </form>
    </Card>
  );
}