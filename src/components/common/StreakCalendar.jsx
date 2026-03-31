export default function StreakCalendar({ streak = 5 }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-orange-500 text-2xl">🔥</span>
      <span className="font-bold text-lg">{streak} ngày liên tiếp</span>
    </div>
  );
}