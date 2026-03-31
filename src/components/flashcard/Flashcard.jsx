import { useState } from 'react';
import { Volume2 } from 'lucide-react';

export default function Flashcard({ card, onDifficulty }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="perspective-1000 w-full max-w-lg mx-auto">
      <div
        className={`relative w-full h-80 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Mặt trước */}
        <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-3xl font-bold text-center">{card.front}</p>
          <button
            onClick={(e) => { e.stopPropagation(); speak(card.front); }}
            className="absolute bottom-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        {/* Mặt sau */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-2xl font-semibold text-primary">{card.back}</p>
          {card.example && <p className="mt-4 text-gray-600 dark:text-gray-400 italic">"{card.example}"</p>}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => onDifficulty('hard')} className="px-4 py-2 bg-red-500 text-white rounded-lg">😞 Khó</button>
        <button onClick={() => onDifficulty('medium')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">😐 Trung bình</button>
        <button onClick={() => onDifficulty('easy')} className="px-4 py-2 bg-green-500 text-white rounded-lg">😀 Dễ</button>
      </div>
    </div>
  );
}