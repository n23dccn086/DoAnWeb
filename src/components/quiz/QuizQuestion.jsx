export default function QuizQuestion({ question, selected, onSelect }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <label key={idx} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
            <input
              type="radio"
              name={`q-${question.id}`}
              value={opt}
              checked={selected === opt}
              onChange={() => onSelect(opt)}
              className="w-4 h-4"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}