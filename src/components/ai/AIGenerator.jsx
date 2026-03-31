import { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import AITag from '../common/AITag';

export default function AIGenerator({ type, onGenerated }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert('Vui lòng nhập chủ đề');
    setLoading(true);
    // Giả lập gọi API AI (thay bằng thật sau)
    setTimeout(() => {
      const mockData = type === 'flashcard'
        ? { cards: [{ front: topic, back: 'Nghĩa mẫu', example: 'Ví dụ' }] }
        : { questions: [{ text: `Câu hỏi về ${topic}`, options: ['A', 'B', 'C'], correctAnswer: 'A' }] };
      setResult(mockData);
      if (onGenerated) onGenerated(mockData);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <div className="flex items-center gap-2 mb-3"><AITag /><h3 className="font-semibold">AI Tạo {type === 'flashcard' ? 'Flashcard' : 'Trắc nghiệm'}</h3></div>
      <input
        type="text"
        placeholder={type === 'flashcard' ? 'Nhập chủ đề (VD: 10 từ vựng về AI)' : 'Dán văn bản hoặc nhập chủ đề'}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-3"
      />
      <Button variant="primary" onClick={handleGenerate} disabled={loading}>
        {loading ? 'Đang tạo...' : 'Tạo ngay'}
      </Button>
      {result && (
        <pre className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </Card>
  );
}