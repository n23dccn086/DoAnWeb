import { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

export default function FlashcardForm({ onSubmit, initialData = null }) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [cards, setCards] = useState(initialData?.cards || [{ front: '', back: '', example: '' }]);

  const addCard = () => setCards([...cards, { front: '', back: '', example: '' }]);
  const updateCard = (idx, field, value) => {
    const updated = [...cards];
    updated[idx][field] = value;
    setCards(updated);
  };
  const removeCard = (idx) => setCards(cards.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Vui lòng nhập tên bộ thẻ');
    onSubmit({ name, description, cards: cards.filter(c => c.front.trim() && c.back.trim()) });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tên bộ thẻ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700"
            rows={2}
          />
        </div>
        <div className="space-y-3">
          <h4 className="font-medium">Các thẻ</h4>
          {cards.map((card, idx) => (
            <div key={idx} className="border p-3 rounded-lg space-y-2">
              <input
                placeholder="Mặt trước (từ/câu)"
                value={card.front}
                onChange={(e) => updateCard(idx, 'front', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                placeholder="Mặt sau (nghĩa)"
                value={card.back}
                onChange={(e) => updateCard(idx, 'back', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <input
                placeholder="Ví dụ (không bắt buộc)"
                value={card.example}
                onChange={(e) => updateCard(idx, 'example', e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
              <Button variant="ghost" size="sm" onClick={() => removeCard(idx)}>Xóa thẻ</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addCard} type="button">+ Thêm thẻ</Button>
        </div>
        <Button variant="primary" type="submit">Lưu bộ thẻ</Button>
      </form>
    </Card>
  );
}