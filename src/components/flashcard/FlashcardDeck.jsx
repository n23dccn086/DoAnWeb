import { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';

export default function FlashcardDeck({ deck, onSelect, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{deck.name}</h3>
          <p className="text-sm text-gray-500">{deck.cards?.length || 0} thẻ</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onSelect(deck)}>Học</Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>Chi tiết</Button>
          {onDelete && <Button variant="ghost" size="sm" onClick={() => onDelete(deck.id)}>🗑️</Button>}
        </div>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t text-sm">
          <p>Ngày tạo: {new Date(deck.createdAt).toLocaleDateString()}</p>
          <p>Lần ôn cuối: {deck.lastReviewed ? new Date(deck.lastReviewed).toLocaleDateString() : 'Chưa học'}</p>
        </div>
      )}
    </Card>
  );
}