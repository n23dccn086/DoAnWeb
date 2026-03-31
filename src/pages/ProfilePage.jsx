import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StreakCalendar from '../components/common/StreakCalendar';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hồ sơ của tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">M</div>
            <div>
              <h2 className="text-xl font-bold">Minh Nguyễn</h2>
              <p className="text-gray-500">minh@example.com</p>
              <StreakCalendar streak={7} />
            </div>
          </div>
          <Button variant="outline">Chỉnh sửa hồ sơ</Button>
        </Card>
        <Card>
          <h3 className="font-semibold mb-2">Thống kê</h3>
          <ul className="space-y-2 text-sm">
            <li>📚 Tổng số thẻ đã học: 234</li>
            <li>📝 Bài test đã làm: 18</li>
            <li>🏆 Huy hiệu: 5</li>
            <li>🤖 Câu hỏi với AI: 42</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}