import { useState } from 'react';
import Flashcard from './Flashcard';

export default function FlashcardStudy({ deck }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(deck.cards);

  const handleDifficulty = (level) => {
    // Ở đây sẽ gọi SRS algorithm để lưu lại
    console.log(`Card ${cards[currentIndex].id} rated ${level}`);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('Hoàn thành bộ thẻ!');
    }
  };

  if (!cards.length) return <div>Không có thẻ nào</div>;

  return (
    <div className="py-6">
      <div className="text-center mb-4">
        Tiến độ: {currentIndex + 1} / {cards.length}
      </div>
      <Flashcard card={cards[currentIndex]} onDifficulty={handleDifficulty} />
    </div>
  );
}