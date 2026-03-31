import { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

export default function AIExplanation() {
  const [sentence, setSentence] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!sentence.trim()) return;
    setLoading(true);
    // Giả lập AI giải thích
    setTimeout(() => {
      setExplanation(`Giải thích về câu: "${sentence}". Đây là câu mẫu. (Tích hợp OpenAI thật để có giải thích chi tiết)`);
      setLoading(false);
    }, 800);
  };

  return (
    <Card>
      <h3 className="font-semibold mb-2">Giải thích ngữ pháp / câu</h3>
      <textarea
        rows={3}
        placeholder="Dán câu tiếng Anh bạn chưa hiểu vào đây..."
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        className="w-full border rounded-lg p-2 mb-2"
      />
      <Button variant="primary" onClick={handleExplain} disabled={loading}>
        {loading ? 'Đang giải thích...' : 'Giải thích'}
      </Button>
      {explanation && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm">{explanation}</p>
        </div>
      )}
    </Card>
  );
}