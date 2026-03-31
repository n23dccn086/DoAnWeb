import Card from '../components/common/Card';
import ProgressRing from '../components/common/ProgressRing';
import StreakCalendar from '../components/common/StreakCalendar';
import AITag from '../components/common/AITag';
import Button from '../components/common/Button';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chào mừng trở lại, Minh!</h1>
        <StreakCalendar streak={7} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <ProgressRing percentage={65} size={70} />
          <div>
            <h3 className="font-semibold">Hoàn thành hôm nay</h3>
            <p className="text-sm text-gray-500">13/20 thẻ</p>
          </div>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Bài test gần nhất</h3>
            <p className="text-2xl font-bold text-primary">85%</p>
          </div>
          <Button variant="outline">Làm lại</Button>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-2"><AITag /><span className="font-semibold">Gợi ý từ AI</span></div>
          <p className="text-sm">Bạn yếu về thì hiện tại hoàn thành. Hãy học bộ flashcard "Present Perfect" nhé!</p>
          <Button variant="primary" size="sm" className="mt-3">Học ngay</Button>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-3">Tiến độ tuần này</h2>
          <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400">Biểu đồ đường (sẽ tích hợp Chart.js)</div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-3">Hoạt động gần đây</h2>
          <ul className="space-y-2 text-sm">
            <li>✔️ Đã học "Business Vocabulary" - 15 thẻ</li>
            <li>📝 Đã làm bài test "Thì quá khứ" - 7/10 đúng</li>
            <li>🤖 Đã hỏi AI về "cụm động từ"</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}