import AIChatbot from '../components/ai/AIChatbot';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function AIPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trợ lý AI</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIChatbot />
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold mb-2">✨ Tạo nội dung nhanh</h3>
            <Button variant="primary" className="w-full mb-2">Tạo flashcard từ chủ đề</Button>
            <Button variant="outline" className="w-full">Tạo câu hỏi từ văn bản</Button>
          </Card>
          <Card>
            <h3 className="font-semibold mb-2">🎤 Luyện nói</h3>
            <p className="text-sm text-gray-500">Nhấn micro và nói chuyện với AI</p>
          </Card>
        </div>
      </div>
    </div>
  );
}