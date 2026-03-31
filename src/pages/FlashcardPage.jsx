import { useState } from 'react';
import FlashcardStudy from '../components/flashcard/FlashcardStudy';
import Button from '../components/common/Button';

const mockDeck = {
  id: 1,
  name: 'Từ vựng TOEIC Part 1',
  cards: [
    { id: 1, front: 'negotiate', back: 'đàm phán', example: 'We need to negotiate the contract.' },
    { id: 2, front: 'deadline', back: 'hạn chót', example: 'The deadline is tomorrow.' },
    { id: 3, front: 'flexible', back: 'linh hoạt', example: 'My schedule is flexible.' },
  ]
};

export default function FlashcardPage() {
  const [selectedDeck, setSelectedDeck] = useState(mockDeck);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Flashcard</h1>
      <FlashcardStudy deck={selectedDeck} />
    </div>
  );
}